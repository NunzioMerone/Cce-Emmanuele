export const layout = {
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-16 md:py-24",
  grid: {
    cols2: "grid grid-cols-1 md:grid-cols-2 gap-8",
    cols3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
    cols4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
  },
} as const;

export const spacing = {
  section: {
    sm: "py-12",
    md: "py-16",
    lg: "py-24",
  },
  card: "p-6",
  button: {
    sm: "px-3 py-1.5",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  },
} as const;

export const typography = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-bold",
  h2: "text-3xl md:text-4xl lg:text-5xl font-bold",
  h3: "text-2xl md:text-3xl font-bold",
  h4: "text-xl md:text-2xl font-semibold",
  body: "text-base md:text-lg",
  small: "text-sm",
} as const;
