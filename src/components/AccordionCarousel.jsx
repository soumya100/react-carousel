import { useState, useRef, useCallback, useEffect, useMemo, memo } from 'react';
import { useVisibleSlides } from '../hooks/useVisibleSlides';
import { useCarouselState } from '../hooks/useCarouselState';
import { LazySlide } from './LazySlide';
import { SlideErrorBoundary } from './SlideErrorBoundary';
import { CarouselDots } from './CarouselDots';
import { CarouselSkeleton } from './CarouselSkeleton';
import { CarouselEmpty } from './CarouselEmpty';
import { cn } from '../utils/cn';

const DEFAULT_RESPONSIVE = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };

function AccordionCarousel({
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
}) {
  const containerRef = useRef(null);

  const isControlled = controlledExpanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = isControlled ? controlledExpanded : internalExpanded;

  const setExpanded = useCallback((val) => {
    if (isControlled) onExpandChange?.(val);
    else setInternalExpanded(val);
  }, [isControlled, onExpandChange]);

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
  } = useCarouselState({ items, visibleSlides, infinite, isServerMode: false });

  // Accordion height animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const startH = el.offsetHeight;
    el.style.maxHeight = `${startH}px`;
    const raf = requestAnimationFrame(() => {
      el.style.transition = 'max-height 300ms ease';
      el.style.maxHeight  = `${el.scrollHeight}px`;
    });
    const t = setTimeout(() => {
      el.style.maxHeight  = 'none';
      el.style.transition = '';
    }, 320);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [isExpanded]);

  const handleKeyDown = useCallback((e) => {
    if (!isExpanded) {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpanded();
    }
  }, [isExpanded, next, prev, toggleExpanded]);

  const collapsedTrackStyle = useMemo(() => ({
    width: totalExtended > 0 ? `${(totalExtended * 100) / visibleSlides}%` : '100%',
    transform: `translateX(-${translatePercent}%)`,
    transition: disableTransition ? 'none' : 'transform var(--duration-carousel, 500ms) ease',
    willChange: isTransitioning ? 'transform' : 'auto',
  }), [totalExtended, visibleSlides, translatePercent, disableTransition, isTransitioning]);

  const touchStartX = useRef(0);
  const touchHandled = useRef(false);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchHandled.current = false;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (isExpanded || touchHandled.current) return;
    touchHandled.current = true;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
  }, [isExpanded, next, prev]);

  if (status === 'loading') return customLoader ?? <CarouselSkeleton count={visibleSlides} />;
  if (status === 'error')   return customError  ?? <CarouselEmpty message={errorMessage} />;

  const slideItems = isExpanded ? items : extendedItems;
  const slideWidth = isExpanded
    ? `${100 / visibleSlides}%`
    : totalExtended > 0 ? `${100 / totalExtended}%` : '100%';

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
        width="16" height="16"
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
      {isScrollable && (
        renderExpandButton
          ? renderExpandButton({ isExpanded, onClick: toggleExpanded })
          : defaultExpandButton
      )}

      <div className={cn('overflow-hidden w-full', viewportClassName)}>
        <div
          ref={trackRef}
          className={cn('flex', isExpanded && 'flex-wrap', trackClassName)}
          style={isExpanded ? { width: '100%' } : collapsedTrackStyle}
          onTransitionEnd={isExpanded ? undefined : handleTransitionEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slideItems.map((item, idx) => (
            <div
              key={getItemKey(item, idx)}
              className={cn('shrink-0 box-border p-1', slideClassName)}
              style={{ width: slideWidth }}
            >
              <SlideErrorBoundary onError={onSlideError} fallback={slideFallback}>
                <LazySlide>{renderItem(item, idx)}</LazySlide>
              </SlideErrorBoundary>
            </div>
          ))}
        </div>
      </div>

      {showDots && !isExpanded && isScrollable && totalRealPages > 1 && (
        renderDots
          ? renderDots({ totalPages: totalRealPages, activePage: realPageIndex, onPageChange: goToPage })
          : (
            <CarouselDots
              totalPages={totalRealPages}
              activePage={realPageIndex}
              onPageChange={goToPage}
              itemCount={items.length}
              visibleSlides={visibleSlides}
              containerClassName={dotsContainerClassName}
              dotClassName={dotClassName}
              activeDotClassName={activeDotClassName}
            />
          )
      )}
    </div>
  );
}

export default memo(AccordionCarousel);