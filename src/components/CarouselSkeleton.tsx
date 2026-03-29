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
          style={{ animationDelay: `${i * 80}ms` }}
          className="flex-1 min-w-0 h-32 rounded-[--radius-carousel] bg-[--color-carousel-muted] animate-pulse"
        />
      ))}
    </div>
  );
}
