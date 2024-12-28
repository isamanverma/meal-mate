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
        darkPinkRed: "#ff1a47",
        offwhite: "#F3EAD7",
        royalGreen: "#013F2F",
        sexymaroon: "#3C0008"
      },
      fontFamily: {
        magtis: ["Magtis"],
        castaThin: ["Casta-Thin"],
        forum: ["Forum"], 
        work: ["Work-Sans"]
      }
    },
  },
  plugins: [
    require('tailwindcss-motion'),
  ],

}

