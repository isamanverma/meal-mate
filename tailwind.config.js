/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pinkRed: "#FF5678",
        darkPinkRed: "#ff1a47"
      }
    },
  },
  plugins: [],
}

