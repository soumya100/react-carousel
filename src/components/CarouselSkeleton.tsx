import { JSX } from 'react';
import { cn } from '../utils/cn';

interface CarouselSkeletonProps {
  count?: number;
  className?: string;
}

/**
 * Skeleton loader component for carousel while loading
 */
export function CarouselSkeleton({
  count = 5,
  className,
}: CarouselSkeletonProps): JSX.Element {
  return (
    <div
      className={cn('flex w-full gap-3 overflow-hidden', className)}
      aria-busy="true"
      aria-label="Loading carousel"
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          data-testid="carousel-skeleton-card"
          className={cn(
            'relative min-w-0 flex-1 overflow-hidden rounded-[calc(var(--radius-carousel)+0.25rem)]',
            'border border-slate-200 bg-slate-50/80 p-3 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.28)]'
          )}
        >
          <div
            className="space-y-3"
            aria-hidden="true"
          >
            <div className="relative h-40 overflow-hidden rounded-[calc(var(--radius-carousel)+0.1rem)] bg-slate-200">
              <div className="absolute inset-x-0 top-0 h-12 bg-linear-to-b from-white/55 to-transparent" />
              <div
                style={{ animationDelay: `${i * 180}ms` }}
                className="absolute inset-0 animate-[shimmer_1.8s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/80 to-transparent"
              />
            </div>

            <div className="space-y-2.5 px-1 pb-1">
              <div className="relative h-2.5 w-16 overflow-hidden rounded-full bg-slate-200">
                <div
                  style={{ animationDelay: `${i * 180 + 60}ms` }}
                  className="absolute inset-0 animate-[shimmer_1.8s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/80 to-transparent"
                />
              </div>
              <div className="relative h-4 w-3/4 overflow-hidden rounded-full bg-slate-300">
                <div
                  style={{ animationDelay: `${i * 180 + 120}ms` }}
                  className="absolute inset-0 animate-[shimmer_1.8s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/80 to-transparent"
                />
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  style={{ animationDelay: `${i * 180 + 180}ms` }}
                  className="absolute inset-0 animate-[shimmer_1.8s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/80 to-transparent"
                />
              </div>
              <div className="relative h-3 w-5/6 overflow-hidden rounded-full bg-slate-200">
                <div
                  style={{ animationDelay: `${i * 180 + 240}ms` }}
                  className="absolute inset-0 animate-[shimmer_1.8s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/80 to-transparent"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="relative h-8 w-24 overflow-hidden rounded-full bg-slate-200">
                  <div
                    style={{ animationDelay: `${i * 180 + 300}ms` }}
                    className="absolute inset-0 animate-[shimmer_1.8s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/80 to-transparent"
                  />
                </div>
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                  <div
                    style={{ animationDelay: `${i * 180 + 360}ms` }}
                    className="absolute inset-0 animate-[shimmer_1.8s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/80 to-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/30"
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
}
