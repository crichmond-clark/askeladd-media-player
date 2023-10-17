/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          light: "rgba(217, 217, 217, .1)",
          text: "#7C7C7C",
          300: "#828282",
          400: "#696969",
          500: "#3F3F3F",
          base: "#2C2A2A",
          dark: "#242424",
        },
      }
    },
  },
  plugins: [require("daisyui")],
}