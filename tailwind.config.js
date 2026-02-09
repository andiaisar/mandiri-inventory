/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mandiri-blue': '#003D79',
        'mandiri-gold': '#FDB913',
      },
    },
  },
  plugins: [],
}
