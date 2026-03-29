import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useVisibleSlides } from './useVisibleSlides';

describe('useVisibleSlides hook', () => {
  it('should return a valid number based on viewport', () => {
    const { result } = renderHook(() => useVisibleSlides({ xl: 5 }));
    expect(typeof result.current).toBe('number');
    expect(result.current).toBeGreaterThanOrEqual(1);
    expect(result.current).toBeLessThanOrEqual(5);
  });

  it('should return correct value when responsive config is provided', () => {
    const { result } = renderHook(() =>
      useVisibleSlides({ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 })
    );
    expect(typeof result.current).toBe('number');
    expect(result.current).toBeGreaterThanOrEqual(1);
    expect(result.current).toBeLessThanOrEqual(5);
  });

  it('should use default values when not provided', () => {
    const { result } = renderHook(() => useVisibleSlides({}));
    expect(result.current).toBeGreaterThanOrEqual(1);
  });
});
