import { useState, useRef, useCallback, useMemo, RefObject, TransitionEvent } from 'react';

interface UseCarouselStateProps {
  items: unknown[];
  visibleSlides: number;
  infinite: boolean;
  isServerMode: boolean;
}

interface UseCarouselStateReturn {
  trackRef: RefObject<HTMLDivElement>;
  extendedItems: unknown[];
  totalExtended: number;
  translatePercent: number;
  realPageIndex: number;
  totalRealPages: number;
  isScrollable: boolean;
  isInfinite: boolean;
  isTransitioning: boolean;
  disableTransition: boolean;
  next: () => void;
  prev: () => void;
  goToPage: (idx: number) => void;
  handleTransitionEnd: (e: TransitionEvent<HTMLDivElement>) => void;
}

/**
 * Hook to manage carousel state including pagination, transitions, and infinite looping
 */
export function useCarouselState({
  items,
  visibleSlides,
  infinite,
  isServerMode,
}: UseCarouselStateProps): UseCarouselStateReturn {
  const trackRef = useRef<HTMLDivElement>(null);

  const isScrollable = items.length > visibleSlides || isServerMode;
  const isInfinite = !isServerMode && infinite && isScrollable;

  const totalRealPages = Math.max(1, Math.ceil(items.length / visibleSlides));

  const extendedItems = useMemo(() => {
    if (isServerMode || !isInfinite || items.length === 0) return items;
    return [
      ...items.slice(-visibleSlides),
      ...items,
      ...items.slice(0, visibleSlides),
    ];
  }, [isServerMode, isInfinite, items, visibleSlides]);

  const totalExtended = extendedItems.length;

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [disableTransition, setDisableTransition] = useState<boolean>(false);

  const realPageIndex = useMemo(
    () =>
      totalRealPages > 0
        ? ((pageIndex % totalRealPages) + totalRealPages) % totalRealPages
        : 0,
    [pageIndex, totalRealPages]
  );

  const extendedIndex = isInfinite
    ? (pageIndex + 1) * visibleSlides
    : pageIndex * visibleSlides;

  const translatePercent =
    totalExtended > 0 ? (extendedIndex * 100) / totalExtended : 0;

  const next = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPageIndex((prev) =>
      isInfinite ? prev + 1 : Math.min(prev + 1, totalRealPages - 1)
    );
  }, [isTransitioning, isInfinite, totalRealPages]);

  const prev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPageIndex((prev) =>
      isInfinite ? prev - 1 : Math.max(prev - 1, 0)
    );
  }, [isTransitioning, isInfinite]);

  const goToPage = useCallback(
    (idx: number) => {
      if (isTransitioning) return;
      const clamped = Math.max(0, Math.min(idx, totalRealPages - 1));
      if (clamped === realPageIndex) return;
      setIsTransitioning(true);
      setPageIndex(clamped);
    },
    [isTransitioning, realPageIndex, totalRealPages]
  );

  const handleTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.target !== trackRef.current) return;
      if (!isInfinite) {
        setIsTransitioning(false);
        return;
      }

      if (pageIndex < 0 || pageIndex >= totalRealPages) {
        setDisableTransition(true);
        setPageIndex(pageIndex < 0 ? totalRealPages - 1 : 0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setDisableTransition(false);
            setIsTransitioning(false);
          });
        });
        return;
      }

      setIsTransitioning(false);
    },
    [isInfinite, pageIndex, totalRealPages]
  );

  return {
    trackRef,
    extendedItems,
    totalExtended,
    translatePercent,
    realPageIndex,
    totalRealPages,
    isScrollable,
    isInfinite,
    isTransitioning,
    disableTransition,
    next,
    prev,
    goToPage,
    handleTransitionEnd,
  };
}
