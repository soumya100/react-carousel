import { memo, useCallback, useMemo, useRef } from 'react';
import { useVisibleSlides } from '../hooks/useVisibleSlides';
import { useCarouselState } from '../hooks/useCarouselState';
import { LazySlide } from './LazySlide';
import { SlideErrorBoundary } from './SlideErrorBoundary';
import { CarouselDots } from './CarouselDots';
import { NavButton } from './NavButton';
import { CarouselSkeleton } from './CarouselSkeleton';
import { CarouselEmpty } from './CarouselEmpty';
import { cn } from '../utils/cn';

const DEFAULT_RESPONSIVE = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };

function Carousel({
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
}) {
  const isServerMode  = page !== null && pageSize !== null && totalCount !== null;
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
  } = useCarouselState({ items, visibleSlides, infinite, isServerMode });

  const handleNext = useCallback(() => {
    if (isServerMode && onPageChange) return onPageChange(page + 1);
    next();
  }, [isServerMode, onPageChange, page, next]);

  const handlePrev = useCallback(() => {
    if (isServerMode && onPageChange) return onPageChange(page - 1);
    prev();
  }, [isServerMode, onPageChange, page, prev]);

  const canGoPrev = isServerMode ? page > 0 : true;
  const canGoNext = isServerMode ? (page + 1) * pageSize < totalCount : true;

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft')  handlePrev();
  }, [handleNext, handlePrev]);

  const trackStyle = useMemo(() => ({
    width: totalExtended > 0 ? `${(totalExtended * 100) / visibleSlides}%` : '100%',
    transform: `translateX(-${translatePercent}%)`,
    transition: disableTransition ? 'none' : 'transform var(--duration-carousel, 500ms) ease',
    willChange: isTransitioning ? 'transform' : 'auto',
  }), [totalExtended, visibleSlides, translatePercent, disableTransition, isTransitioning]);

  const slideWidth = totalExtended > 0 ? `${100 / totalExtended}%` : '100%';

  const touchStartX = useRef(0);
  const touchHandled = useRef(false);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchHandled.current = false;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchHandled.current) return;
    touchHandled.current = true;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? handleNext() : handlePrev();
  }, [handleNext, handlePrev]);

  if (status === 'loading') return customLoader ?? <CarouselSkeleton count={visibleSlides} />;
  if (status === 'error')   return customError  ?? <CarouselEmpty message={errorMessage} />;

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
            : <NavButton direction="prev" onClick={handlePrev} disabled={!canGoPrev} className={prevButtonClassName} />
          }
          {renderNextButton
            ? renderNextButton({ onClick: handleNext, disabled: !canGoNext })
            : <NavButton direction="next" onClick={handleNext} disabled={!canGoNext} className={nextButtonClassName} />
          }
        </>
      )}

      <div className={cn('overflow-hidden w-full', viewportClassName)}>
        <div
          ref={trackRef}
          className={cn('flex', trackClassName)}
          style={trackStyle}
          onTransitionEnd={handleTransitionEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-live="off"
        >
          {extendedItems.map((item, idx) => {
            const isClone =
              idx < visibleSlides ||
              idx >= extendedItems.length - visibleSlides;
            return (
              <div
                key={getItemKey(item, idx)}
                className={cn('shrink-0 box-border p-1', slideClassName)}
                style={{ width: slideWidth }}
                aria-hidden={isClone ? 'true' : undefined}
              >
                <SlideErrorBoundary onError={onSlideError} fallback={slideFallback}>
                  <LazySlide>{renderItem(item, idx)}</LazySlide>
                </SlideErrorBoundary>
              </div>
            );
          })}
        </div>
      </div>

      {showDots && isScrollable && totalRealPages > 1 && (
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

export default memo(Carousel, (prev, next) =>
  prev.items === next.items &&
  prev.renderItem === next.renderItem &&
  prev.status === next.status &&
  prev.page === next.page
);