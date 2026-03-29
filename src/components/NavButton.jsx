import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils/cn';

export function NavButton({
  direction,
  onClick,
  disabled = false,
  className,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : 'button';

  const defaultIcon = direction === 'prev'
    ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    )
    : (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18l6-6-6-6" />
      </svg>
    );

  return (
    <Comp
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      className={cn(
        'absolute top-1/2 -translate-y-1/2 z-10',
        direction === 'prev' ? 'left-0' : 'right-0',
        'flex items-center justify-center size-8 rounded-full',
        'bg-[--color-carousel-bg] border border-[--color-carousel-border]',
        'text-[--color-carousel-fg] shadow-sm',
        'transition-opacity duration-150 hover:opacity-80',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[--color-carousel-accent]',
        'disabled:opacity-30 disabled:pointer-events-none',
        className
      )}
      {...props}
    >
      {children ?? defaultIcon}
    </Comp>
  );
}