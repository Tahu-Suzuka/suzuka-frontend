/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
      colors: {
        primary: "#DC2626",
        secondary: "#FBBF24",
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },

      maxWidth: {
        "screen-xl": "1130px",
      },

      width: {
        90: "360px",
        95: "440px",
        100: "480px",
      },

      fontFamily: {
        bebas: ['"Bebas Neue"', "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
