import { useState, useRef, useCallback, useMemo } from 'react';

export function useCarouselState({ items, visibleSlides, infinite, isServerMode }) {
  const trackRef = useRef(null);

  const isScrollable = items.length > visibleSlides || isServerMode;
  const isInfinite   = !isServerMode && infinite && isScrollable;

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

  const [realPageIndex,     setRealPageIndex]     = useState(0);
  const [isTransitioning,   setIsTransitioning]   = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);

  const extendedIndex = isInfinite
    ? realPageIndex * visibleSlides + visibleSlides
    : realPageIndex * visibleSlides;

  const translatePercent = totalExtended > 0
    ? (extendedIndex * 100) / totalExtended
    : 0;

  const next = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setRealPageIndex((prev) =>
      isInfinite
        ? (prev + 1) % totalRealPages
        : Math.min(prev + 1, totalRealPages - 1)
    );
  }, [isTransitioning, isInfinite, totalRealPages]);

  const prev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setRealPageIndex((prev) =>
      isInfinite
        ? (prev - 1 + totalRealPages) % totalRealPages
        : Math.max(prev - 1, 0)
    );
  }, [isTransitioning, isInfinite, totalRealPages]);

  const goToPage = useCallback((idx) => {
    if (isTransitioning) return;
    const clamped = Math.max(0, Math.min(idx, totalRealPages - 1));
    if (clamped === realPageIndex) return;
    setIsTransitioning(true);
    setRealPageIndex(clamped);
  }, [isTransitioning, realPageIndex, totalRealPages]);

  const handleTransitionEnd = useCallback((e) => {
    if (e.target !== trackRef.current) return;
    if (!isInfinite) {
      setIsTransitioning(false);
      return;
    }
    setDisableTransition(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableTransition(false);
        setIsTransitioning(false);
      });
    });
  }, [isInfinite]);

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