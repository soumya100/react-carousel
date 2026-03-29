import { Component } from 'react';
import { cn } from '../utils/cn';

export class SlideErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[Carousel] Slide render error:', error, info);
    }
    this.props.onError?.(error, info);
  }

  render() {
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