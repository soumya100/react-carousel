import { cn } from '../utils/cn';

export function CarouselDots({
  totalPages,
  activePage,
  onPageChange,
  itemCount,
  visibleSlides,
  containerClassName,
  dotClassName,
  activeDotClassName,
}) {
  const startItem = activePage * visibleSlides + 1;
  const endItem   = Math.min((activePage + 1) * visibleSlides, itemCount);

  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Showing items ${startItem} to ${endItem} of ${itemCount}`}
      </div>

      <div
        role="tablist"
        aria-label="Carousel pages"
        className={cn('flex items-center justify-center gap-1.5 mt-4', containerClassName)}
      >
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={activePage === idx}
            aria-label={`Go to page ${idx + 1} of ${totalPages}`}
            tabIndex={activePage === idx ? 0 : -1}
            onClick={() => onPageChange(idx)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') onPageChange(Math.min(idx + 1, totalPages - 1));
              if (e.key === 'ArrowLeft')  onPageChange(Math.max(idx - 1, 0));
            }}
            className={cn(
              'size-2 rounded-full border-0 p-0 cursor-pointer',
              'bg-[--color-carousel-border]',
              'transition-[background-color,transform] duration-200',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-[--color-carousel-accent]',
              dotClassName,
              activePage === idx && cn('bg-[--color-carousel-accent] scale-125', activeDotClassName)
            )}
          />
        ))}
      </div>
    </>
  );
}