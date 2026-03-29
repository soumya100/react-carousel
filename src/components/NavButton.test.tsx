import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavButton } from './NavButton';

describe('NavButton component', () => {
  it('should render prev button with correct label', () => {
    render(<NavButton direction="prev" onClick={() => {}} />);
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
  });

  it('should render next button with correct label', () => {
    render(<NavButton direction="next" onClick={() => {}} />);
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const mockClick = vi.fn();
    render(<NavButton direction="next" onClick={mockClick} />);
    const button = screen.getByLabelText('Next slide');
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<NavButton direction="next" onClick={() => {}} disabled={true} />);
    const button = screen.getByLabelText('Next slide');
    expect(button).toBeDisabled();
  });

  it('should not call onClick when disabled', () => {
    const mockClick = vi.fn();
    render(
      <NavButton direction="next" onClick={mockClick} disabled={true} />
    );
    const button = screen.getByLabelText('Next slide');
    fireEvent.click(button);
    expect(mockClick).not.toHaveBeenCalled();
  });

  it('should render custom children', () => {
    render(
      <NavButton direction="next" onClick={() => {}}>
        Custom Icon
      </NavButton>
    );
    expect(screen.getByText('Custom Icon')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <NavButton
        direction="next"
        onClick={() => {}}
        className="custom-class"
      />
    );
    const button = container.querySelector('.custom-class');
    expect(button).toBeInTheDocument();
  });
});
