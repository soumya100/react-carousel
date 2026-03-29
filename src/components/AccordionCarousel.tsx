import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  memo,
  JSX,
  ReactNode,
} from 'react';
import { useVisibleSlides } from '../hooks/useVisibleSlides';
import { useCarouselState } from '../hooks/useCarouselState';
import { LazySlide } from './LazySlide';
import { SlideErrorBoundary } from './SlideErrorBoundary';
import { CarouselDots } from './CarouselDots';
import { CarouselSkeleton } from './CarouselSkeleton';
import { CarouselEmpty } from './CarouselEmpty';
import { cn } from '../utils/cn';

type CarouselStatus = 'success' | 'loading' | 'error';

interface ResponsiveConfig {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

interface ExpandButtonRenderProps {
  isExpanded: boolean;
  onClick: () => void;
}

interface DotsRenderProps {
  totalPages: number;
  activePage: number;
  onPageChange: (idx: number) => void;
}

interface AccordionCarouselProps<T = unknown> {
  // Data
  items?: T[];
  renderItem: (item: T, idx: number) => ReactNode;
  getItemKey?: (item: T, idx: number) => React.Key;

  // Status
  status?: CarouselStatus;
  errorMessage?: string;
  customLoader?: ReactNode;
  customError?: ReactNode;

  // Behaviour
  responsiveSlides?: ResponsiveConfig;
  infinite?: boolean;
  showDots?: boolean;

  // Error handling
  onSlideError?: (error: Error, info: unknown) => void;
  slideFallback?: ReactNode;

  // Controlled expand
  expanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;

  // Class overrides
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
  expandButtonClassName?: string;
  dotsContainerClassName?: string;
  dotClassName?: string;
  activeDotClassName?: string;

  // Slot overrides
  renderExpandButton?: (props: ExpandButtonRenderProps) => ReactNode;
  renderDots?: (props: DotsRenderProps) => ReactNode;
}

const DEFAULT_RESPONSIVE: ResponsiveConfig = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

function AccordionCarouselComponent<T = unknown>({
  // Data
  items = [],
  renderItem,
  getItemKey = (_, idx) => idx,

  // Status
  status = 'success',
  errorMessage = 'No items found',
  customLoader,
  customError,

  // Behaviour
  responsiveSlides = DEFAULT_RESPONSIVE,
  infinite = true,
  showDots = true,

  // Error handling
  onSlideError,
  slideFallback,

  // Controlled expand
  expanded: controlledExpanded,
  onExpandChange,

  // Class overrides
  className,
  viewportClassName,
  trackClassName,
  slideClassName,
  expandButtonClassName,
  dotsContainerClassName,
  dotClassName,
  activeDotClassName,

  // Slot overrides
  renderExpandButton,
  renderDots,
}: AccordionCarouselProps<T>): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledExpanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState<boolean>(false);
  const isExpanded = isControlled
    ? controlledExpanded
    : internalExpanded;

  const setExpanded = useCallback(
    (val: boolean) => {
      if (isControlled) onExpandChange?.(val);
      else setInternalExpanded(val);
    },
    [isControlled, onExpandChange]
  );

  const toggleExpanded = useCallback(
    () => setExpanded(!isExpanded),
    [setExpanded, isExpanded]
  );

  const visibleSlides = useVisibleSlides(responsiveSlides);

  const {
    trackRef,
    extendedItems,
    totalExtended,
    translatePercent,
    realPageIndex,
    totalRealPages,
    isScrollable,
    isTransitioning,
    disableTransition,
    next,
    prev,
    goToPage,
    handleTransitionEnd,
  } = useCarouselState({
    items: items as unknown[],
    visibleSlides,
    infinite,
    isServerMode: false,
  });

  // Accordion height animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const startH = el.offsetHeight;
    el.style.maxHeight = `${startH}px`;
    const raf = requestAnimationFrame(() => {
      el.style.transition = 'max-height 300ms ease';
      el.style.maxHeight = `${el.scrollHeight}px`;
    });
    const t = setTimeout(() => {
      el.style.maxHeight = 'none';
      el.style.transition = '';
    }, 320);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [isExpanded]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isExpanded) {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleExpanded();
      }
    },
    [isExpanded, next, prev, toggleExpanded]
  );

  const collapsedTrackStyle = useMemo(
    () => ({
      width:
        totalExtended > 0
          ? `${(totalExtended * 100) / visibleSlides}%`
          : '100%',
      transform: `translateX(-${translatePercent}%)`,
      transition: disableTransition
        ? 'none'
        : 'transform var(--duration-carousel, 500ms) ease',
      willChange: isTransitioning ? 'transform' : ('auto' as const),
    }),
    [
      totalExtended,
      visibleSlides,
      translatePercent,
      disableTransition,
      isTransitioning,
    ]
  );

  const touchStartX = useRef<number>(0);
  const touchHandled = useRef<boolean>(false);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      touchStartX.current = e.touches[0]?.clientX ?? 0;
      touchHandled.current = false;
    },
    []
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (isExpanded || touchHandled.current) return;
      touchHandled.current = true;
      const delta = touchStartX.current - (e.changedTouches[0]?.clientX ?? 0);
      if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    },
    [isExpanded, next, prev]
  );

  if (status === 'loading')
    return (
      (customLoader ?? <CarouselSkeleton count={visibleSlides} />) as JSX.Element
    );
  if (status === 'error')
    return (
      (customError ?? <CarouselEmpty message={errorMessage} />) as JSX.Element
    );

  const slideItems = isExpanded ? items : extendedItems;
  const slideWidth = isExpanded
    ? `${100 / visibleSlides}%`
    : totalExtended > 0
      ? `${100 / totalExtended}%`
      : '100%';

  const defaultExpandButton = (
    <button
      type="button"
      onClick={toggleExpanded}
      aria-label={isExpanded ? 'Collapse carousel' : 'Expand carousel'}
      aria-expanded={isExpanded}
      className={cn(
        'absolute top-1/2 right-0 -translate-y-1/2 z-10',
        'flex items-center justify-center size-8 rounded-full',
        'bg-[--color-carousel-bg] border border-[--color-carousel-border]',
        'text-[--color-carousel-fg] shadow-sm',
        'transition-opacity duration-150 hover:opacity-80',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[--color-carousel-accent]',
        expandButtonClassName
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{
          transform: isExpanded ? 'rotate(-90deg)' : 'rotate(90deg)',
          transition: 'transform 0.3s',
        }}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full outline-none',
        'focus-visible:ring-2 focus-visible:ring-[--color-carousel-accent]',
        'focus-visible:ring-offset-2 rounded-[--radius-carousel]',
        className
      )}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Expandable content carousel"
      aria-expanded={isExpanded}
      onKeyDown={handleKeyDown}
    >
      {isScrollable &&
        (renderExpandButton
          ? renderExpandButton({ isExpanded, onClick: toggleExpanded })
          : defaultExpandButton)}

      <div className={cn('overflow-hidden w-full', viewportClassName)}>
        <div
          ref={trackRef}
          className={cn('flex', isExpanded && 'flex-wrap', trackClassName)}
          style={
            (isExpanded
              ? { width: '100%' }
              : collapsedTrackStyle) as React.CSSProperties
          }
          onTransitionEnd={
            isExpanded ? undefined : (handleTransitionEnd as any)
          }
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slideItems.map((item, idx) => (
            <div
              key={getItemKey(item as T, idx)}
              className={cn('shrink-0 box-border p-1', slideClassName)}
              style={{ width: slideWidth }}
            >
              <SlideErrorBoundary
                onError={onSlideError}
                fallback={slideFallback}
              >
                <LazySlide>{renderItem(item as T, idx)}</LazySlide>
              </SlideErrorBoundary>
            </div>
          ))}
        </div>
      </div>

      {showDots &&
        !isExpanded &&
        isScrollable &&
        totalRealPages > 1 &&
        (renderDots
          ? renderDots({
            totalPages: totalRealPages,
            activePage: realPageIndex,
            onPageChange: goToPage,
          })
          : (
            <CarouselDots
              totalPages={totalRealPages}
              activePage={realPageIndex}
              onPageChange={goToPage}
              itemCount={(items as unknown[]).length}
              visibleSlides={visibleSlides}
              containerClassName={dotsContainerClassName}
              dotClassName={dotClassName}
              activeDotClassName={activeDotClassName}
            />
          ))}
    </div>
  );
}

const AccordionCarousel = memo(
  AccordionCarouselComponent
) as typeof AccordionCarouselComponent;

export default AccordionCarousel;
