export const animations = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  slideDown: "animate-slide-down",
  scaleIn: "animate-scale-in",
} as const;

export const transitions = {
  fast: "transition-all duration-200 ease-in-out",
  normal: "transition-all duration-300 ease-in-out",
  slow: "transition-all duration-500 ease-in-out",
} as const;

export const getStaggerDelay = (index: number, baseDelay = 100): string => {
  return `${index * baseDelay}ms`;
};
