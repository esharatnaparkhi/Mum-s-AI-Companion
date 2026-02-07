/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFD6E8',
          blue: '#C3E5FF',
          purple: '#E5D4FF',
          yellow: '#FFF6D4',
          green: '#D4FFE5',
        }
      }
    },
  },
  plugins: [],
}