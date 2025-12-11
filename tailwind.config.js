/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        garamond: ["EB Garamond", "serif"],
      },
      colors: {
        primary: {
          50: "#e6f0ff",
          100: "#bfd8ff",
          200: "#99c0ff",
          300: "#73a8ff",
          400: "#4d90ff",
          500: "#2678ff",
          600: "#1560e6",
          700: "#0C2260",
          800: "#082050",
          900: "#051840",
        },
        gold: {
          50: "#fef8ec",
          100: "#fdedc9",
          200: "#fbe2a6",
          300: "#f9d783",
          400: "#f7cc60",
          500: "#E88925",
          600: "#D48A28",
          700: "#b8741f",
          800: "#9c5e17",
          900: "#80480f",
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "slide-down": "slideDown 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.6s ease-out forwards",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      transitionDuration: {
        1500: "1500ms",
        2000: "2000ms",
        3000: "3000ms",
        4000: "4000ms",
      },
    },
  },
  plugins: [],
};
