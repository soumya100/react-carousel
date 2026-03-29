import { memo, useCallback, useMemo, useRef, JSX, ReactNode } from 'react';
import { useVisibleSlides } from '../hooks/useVisibleSlides';
import { useCarouselState } from '../hooks/useCarouselState';
import { LazySlide } from './LazySlide';
import { SlideErrorBoundary } from './SlideErrorBoundary';
import { CarouselDots } from './CarouselDots';
import { NavButton } from './NavButton';
import { CarouselSkeleton } from './CarouselSkeleton';
import { CarouselEmpty } from './CarouselEmpty';
import { cn } from '../utils/cn';

type CarouselStatus = 'success' | 'loading' | 'error';

export interface ResponsiveConfig {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface NavButtonRenderProps {
  onClick: () => void;
  disabled: boolean;
}

export interface DotsRenderProps {
  totalPages: number;
  activePage: number;
  onPageChange: (idx: number) => void;
}

export interface CarouselProps<T = unknown> {
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
  showNavigation?: boolean;

  // Error handling
  onSlideError?: (error: Error, info: unknown) => void;
  slideFallback?: ReactNode;

  // Class overrides
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  dotsContainerClassName?: string;
  dotClassName?: string;
  activeDotClassName?: string;

  // Slot overrides
  renderPrevButton?: (props: NavButtonRenderProps) => ReactNode;
  renderNextButton?: (props: NavButtonRenderProps) => ReactNode;
  renderDots?: (props: DotsRenderProps) => ReactNode;

  // Server pagination
  page?: number | null;
  pageSize?: number | null;
  totalCount?: number | null;
  onPageChange?: ((page: number) => void) | null;
}

const DEFAULT_RESPONSIVE: ResponsiveConfig = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };

function CarouselComponent<T = unknown>({
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
  showNavigation = true,

  // Error handling
  onSlideError,
  slideFallback,

  // Class overrides
  className,
  viewportClassName,
  trackClassName,
  slideClassName,
  prevButtonClassName,
  nextButtonClassName,
  dotsContainerClassName,
  dotClassName,
  activeDotClassName,

  // Slot overrides
  renderPrevButton,
  renderNextButton,
  renderDots,

  // Server pagination
  page = null,
  pageSize = null,
  totalCount = null,
  onPageChange = null,
}: CarouselProps<T>): JSX.Element {
  const isServerMode =
    page !== null && pageSize !== null && totalCount !== null;
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
    isServerMode,
  });

  const handleNext = useCallback(() => {
    if (isServerMode && onPageChange) return onPageChange((page ?? 0) + 1);
    next();
  }, [isServerMode, onPageChange, page, next]);

  const handlePrev = useCallback(() => {
    if (isServerMode && onPageChange) return onPageChange((page ?? 0) - 1);
    prev();
  }, [isServerMode, onPageChange, page, prev]);

  const canGoPrev = isServerMode ? (page ?? 0) > 0 : true;
  const canGoNext = isServerMode
    ? ((page ?? 0) + 1) * (pageSize ?? 0) < (totalCount ?? 0)
    : true;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    },
    [handleNext, handlePrev]
  );

  const trackStyle = useMemo(
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
    [totalExtended, visibleSlides, translatePercent, disableTransition, isTransitioning]
  );

  const slideWidth =
    totalExtended > 0 ? `${100 / totalExtended}%` : '100%';

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
      if (touchHandled.current) return;
      touchHandled.current = true;
      const delta = touchStartX.current - (e.changedTouches[0]?.clientX ?? 0);
      if (Math.abs(delta) <= 40) return;
      if (delta > 0) {
        handleNext();
        return;
      }
      handlePrev();
    },
    [handleNext, handlePrev]
  );

  if (status === 'loading')
    return (customLoader ?? <CarouselSkeleton count={visibleSlides} />) as JSX.Element;
  if (status === 'error')
    return (customError ?? <CarouselEmpty message={errorMessage} />) as JSX.Element;

  return (
    <div
      className={cn(
        'relative w-full outline-none',
        'focus-visible:ring-2 focus-visible:ring-[--color-carousel-accent]',
        'focus-visible:ring-offset-2 rounded-[--radius-carousel]',
        className
      )}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Content carousel"
      onKeyDown={handleKeyDown}
    >
      {showNavigation && isScrollable && (
        <>
          {renderPrevButton
            ? renderPrevButton({ onClick: handlePrev, disabled: !canGoPrev })
            : (
              <NavButton
                direction="prev"
                onClick={handlePrev}
                disabled={!canGoPrev}
                className={prevButtonClassName}
              />
            )}
          {renderNextButton
            ? renderNextButton({ onClick: handleNext, disabled: !canGoNext })
            : (
              <NavButton
                direction="next"
                onClick={handleNext}
                disabled={!canGoNext}
                className={nextButtonClassName}
              />
            )}
        </>
      )}

      <div className={cn('overflow-hidden w-full', viewportClassName)}>
        <div
          ref={trackRef}
          className={cn('flex', trackClassName)}
          style={trackStyle as React.CSSProperties}
          onTransitionEnd={handleTransitionEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-live="off"
        >
          {extendedItems.map((item, idx) => {
            const isClone =
              idx < visibleSlides ||
              idx >= extendedItems.length - visibleSlides;
            const uniqueKey = isClone
              ? `${getItemKey(item as T, idx)}-clone-${idx}`
              : getItemKey(item as T, idx);
            return (
              <div
                key={uniqueKey}
                className={cn('shrink-0 box-border p-1', slideClassName)}
                style={{ width: slideWidth }}
                aria-hidden={isClone ? 'true' : undefined}
              >
                <SlideErrorBoundary
                  onError={onSlideError}
                  fallback={slideFallback}
                >
                  <LazySlide>
                    {renderItem(item as T, idx)}
                  </LazySlide>
                </SlideErrorBoundary>
              </div>
            );
          })}
        </div>
      </div>

      {showDots &&
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

const Carousel = memo(CarouselComponent) as <T = unknown>(props: CarouselProps<T>) => JSX.Element;

export default Carousel;
export { Carousel };
