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
          pink: '#ec4899',
          blue: '#6366f1',
          purple: '#7c3aed',
          yellow: '#facc15',
          green: '#22c55e',
        }
      }
    },
  },
  plugins: [],
}
