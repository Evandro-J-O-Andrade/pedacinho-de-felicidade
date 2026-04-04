/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ec4899',
        secondary: '#fbbf24'
      }
    },
  },
  plugins: [],
}
