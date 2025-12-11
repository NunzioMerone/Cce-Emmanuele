import { useState, useEffect, useCallback } from "react";

interface UseCarouselProps {
  itemsCount: number;
  autoPlayInterval?: number;
  itemsPerView?: number;
}

export const useCarousel = ({
  itemsCount,
  autoPlayInterval = 3000,
  itemsPerView = 1,
}: UseCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const maxIndex = Math.max(0, itemsCount - itemsPerView);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex]
  );

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const resumeAutoPlay = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || itemsCount <= itemsPerView) return;

    const interval = setInterval(next, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next, autoPlayInterval, itemsCount, itemsPerView]);

  return {
    currentIndex,
    next,
    prev,
    goTo,
    pauseAutoPlay,
    resumeAutoPlay,
    isAutoPlaying,
  };
};
