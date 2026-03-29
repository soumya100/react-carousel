import { useState, useEffect, useMemo, useCallback } from 'react';

interface ResponsiveConfig {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

interface Breakpoint {
  query: string;
  slides: number;
}

/**
 * Hook to get the number of visible slides based on responsive breakpoints
 * @param responsive - Object with slide counts for each breakpoint
 * @returns Number of visible slides
 */
export function useVisibleSlides(responsive: ResponsiveConfig): number {
  const breakpoints = useMemo<Record<string, Breakpoint>>(() => ({
    xs: {
      query: '(max-width: 479px)',
      slides: responsive.xs ?? 1,
    },
    sm: {
      query: '(min-width: 480px) and (max-width: 767px)',
      slides: responsive.sm ?? 2,
    },
    md: {
      query: '(min-width: 768px) and (max-width: 1023px)',
      slides: responsive.md ?? 3,
    },
    lg: {
      query: '(min-width: 1024px) and (max-width: 1279px)',
      slides: responsive.lg ?? 4,
    },
    xl: {
      query: '(min-width: 1280px)',
      slides: responsive.xl ?? 5,
    },
  }), [responsive.xs, responsive.sm, responsive.md, responsive.lg, responsive.xl]);

  const fallbackSlides = responsive.xl ?? 5;

  const getMatch = useCallback((): number => {
    if (typeof window === 'undefined') return fallbackSlides;
    for (const bp of Object.values(breakpoints)) {
      if (window.matchMedia(bp.query).matches) return bp.slides;
    }
    return fallbackSlides;
  }, [breakpoints, fallbackSlides]);

  const [visibleSlides, setVisibleSlides] = useState<number>(getMatch);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const listeners = Object.values(breakpoints).map(({ query, slides }) => {
      const mql = window.matchMedia(query);
      const handler = (e: MediaQueryListEvent) => {
        if (e.matches) setVisibleSlides(slides);
      };
      mql.addEventListener('change', handler);
      return { mql, handler };
    });

    setVisibleSlides(getMatch());

    return () => {
      listeners.forEach(({ mql, handler }) =>
        mql.removeEventListener('change', handler)
      );
    };
  }, [breakpoints, getMatch]);

  return visibleSlides;
}
