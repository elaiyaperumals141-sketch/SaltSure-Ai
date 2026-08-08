 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        salt: {
          navy: "#080B14",
          navyLight: "#0F1420",
          card: "#131A2B",
          teal: "#2F6FFF",
          tealDark: "#1D4FD1",
          amber: "#FF7A29",
          sand: "#EDEFF4",
          red: "#FF3B5C",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}