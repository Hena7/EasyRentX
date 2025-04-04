// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // Verify this line
  ],
  darkMode: 'class',    // Verify this line is exactly 'class'
  theme: {
    extend: {},
  },
  plugins: [],
}