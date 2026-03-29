import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCarouselState } from './useCarouselState';

describe('useCarouselState hook', () => {
  const mockItems = ['item1', 'item2', 'item3', 'item4', 'item5'];

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() =>
      useCarouselState({
        items: mockItems,
        visibleSlides: 3,
        infinite: true,
        isServerMode: false,
      })
    );

    expect(result.current.realPageIndex).toBe(0);
    expect(result.current.totalRealPages).toBe(
      Math.ceil(mockItems.length / 3)
    );
    expect(result.current.isScrollable).toBe(true);
  });

  it('should handle next navigation', () => {
    const { result } = renderHook(() =>
      useCarouselState({
        items: mockItems,
        visibleSlides: 2,
        infinite: true,
        isServerMode: false,
      })
    );

    act(() => {
      result.current.next();
    });

    expect(result.current.isTransitioning).toBe(true);
  });

  it('should handle prev navigation', () => {
    const { result } = renderHook(() =>
      useCarouselState({
        items: mockItems,
        visibleSlides: 2,
        infinite: true,
        isServerMode: false,
      })
    );

    act(() => {
      result.current.next();
      result.current.next();
    });

    act(() => {
      result.current.prev();
    });

    expect(result.current.isTransitioning).toBe(true);
  });

  it('should handle goToPage navigation', () => {
    const { result } = renderHook(() =>
      useCarouselState({
        items: mockItems,
        visibleSlides: 2,
        infinite: false,
        isServerMode: false,
      })
    );

    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.isTransitioning).toBe(true);
  });

  it('should not navigate when transitioning', () => {
    const { result } = renderHook(() =>
      useCarouselState({
        items: mockItems,
        visibleSlides: 2,
        infinite: true,
        isServerMode: false,
      })
    );

    act(() => {
      result.current.next();
    });

    const indexAfterFirst = result.current.realPageIndex;

    act(() => {
      result.current.next();
    });

    expect(result.current.realPageIndex).toBe(indexAfterFirst);
  });

  it('should handle server mode correctly', () => {
    const { result } = renderHook(() =>
      useCarouselState({
        items: mockItems,
        visibleSlides: 2,
        infinite: true,
        isServerMode: true,
      })
    );

    expect(result.current.isInfinite).toBe(false);
    expect(result.current.isScrollable).toBe(true);
  });
});
