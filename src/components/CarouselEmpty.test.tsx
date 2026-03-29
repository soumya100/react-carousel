import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CarouselEmpty } from './CarouselEmpty';

describe('CarouselEmpty component', () => {
  it('should render with default message', () => {
    render(<CarouselEmpty />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    const customMessage = 'No products available';
    render(<CarouselEmpty message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('should have status role', () => {
    render(<CarouselEmpty />);
    const element = screen.getByRole('status');
    expect(element).toBeInTheDocument();
  });

  it('should have aria-label with message', () => {
    const message = 'Custom error message';
    render(<CarouselEmpty message={message} />);
    expect(screen.getByLabelText(message)).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <CarouselEmpty className="custom-class" />
    );
    const div = container.querySelector('.custom-class');
    expect(div).toBeInTheDocument();
  });
});
