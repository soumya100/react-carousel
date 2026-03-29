import { JSX } from 'react';
import { cn } from '../utils/cn';

interface CarouselEmptyProps {
  message?: string;
  className?: string;
}

/**
 * Component displayed when carousel has no items
 */
export function CarouselEmpty({
  message = 'No items found',
  className,
}: CarouselEmptyProps): JSX.Element {
  return (
    <div
      role="status"
      aria-label={message}
      className={cn(
        'flex flex-col items-center justify-center gap-2 w-full min-h-30',
        'rounded-[--radius-carousel] bg-[--color-carousel-muted]',
        'text-[--color-carousel-muted-fg] text-sm',
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{message}</span>
    </div>
  );
}
