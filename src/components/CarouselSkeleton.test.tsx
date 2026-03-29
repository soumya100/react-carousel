import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CarouselSkeleton } from './CarouselSkeleton';

describe('CarouselSkeleton component', () => {
  it('should render with default count', () => {
    const { container } = render(<CarouselSkeleton />);
    const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
    expect(skeletons).toHaveLength(5);
  });

  it('should render with custom count', () => {
    const { container } = render(<CarouselSkeleton count={3} />);
    const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
    expect(skeletons).toHaveLength(3);
  });

  it('should have aria-busy attribute', () => {
    const { container } = render(<CarouselSkeleton />);
    const element = container.firstChild as HTMLElement;
    expect(element.getAttribute('aria-busy')).toBe('true');
  });

  it('should have aria-label', () => {
    const { container } = render(<CarouselSkeleton />);
    const element = container.firstChild as HTMLElement;
    expect(element.getAttribute('aria-label')).toBe('Loading carousel');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <CarouselSkeleton className="custom-class" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element.classList.contains('custom-class')).toBe(true);
  });
});
