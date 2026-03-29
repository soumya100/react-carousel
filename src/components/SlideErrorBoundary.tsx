import { Component, ReactNode, ErrorInfo } from 'react';
import { cn } from '../utils/cn';

interface SlideErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface SlideErrorBoundaryState {
  hasError: boolean;
}

/**
 * Error boundary component to catch errors in slide rendering
 */
export class SlideErrorBoundary extends Component<
  SlideErrorBoundaryProps,
  SlideErrorBoundaryState
> {
  constructor(props: SlideErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SlideErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
      console.error('[Carousel] Slide render error:', error, info);
    }
    this.props.onError?.(error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          className={cn(
            'flex items-center justify-center min-h-20 w-full',
            'rounded-[--radius-carousel] bg-[--color-carousel-muted]',
            'text-[--color-carousel-muted-fg] text-sm opacity-60 select-none'
          )}
        >
          —
        </div>
      );
    }
    return this.props.children;
  }
}
