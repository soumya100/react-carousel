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
      className={cn('flex gap-2 w-full overflow-hidden', className)}
      aria-busy="true"
      aria-label="Loading carousel"
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="flex-1 min-w-0 h-32 rounded-[--radius-carousel] bg-[--color-carousel-muted] border border-[--color-carousel-border] relative overflow-hidden"
        >
          <div 
            style={{ animationDelay: `${i * 200}ms` }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-[--color-carousel-bg]/60 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"
          />
        </div>
      ))}
    </div>
  );
}
