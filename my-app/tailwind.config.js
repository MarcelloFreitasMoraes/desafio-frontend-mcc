/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        starJedi: ['"Star Jedi"', "sans-serif"],
        starJediHollow: ['"Star Jedi Hollow"', "sans-serif"],
        orbitron: ['"Orbitron"', "sans-serif"],
        dosis: ['"Dosis"', "sans-serif"],
      },
    },
  },
  plugins: [],
}

