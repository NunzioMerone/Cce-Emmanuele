import React, { useState, useEffect } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  autoSlide?: boolean;
  slideInterval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoSlide = true,
  slideInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoSlide || children.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % children.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, slideInterval, children.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % children.length);
  };

  if (children.length === 0) return null;

  return (
    <div className="relative">
      {/* Slides */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="min-w-full px-2">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {children.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-r-lg shadow-lg transition-all"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-l-lg shadow-lg transition-all"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {children.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-primary-600 w-8" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
