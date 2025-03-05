/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'px-6',
    'py-3',
    'rounded-md'
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'navy-blue': '#1B365D',
        'alpine-white': '#FFFFFF',
        
        // Supporting Colors
        'mountain-blue': '#2B517A',
        'ice-blue': '#E8EEF4',
        
        // Background Colors
        'pearl-white': '#F7FAFC',
        'deep-navy': '#152A4A',
      },
      padding: {
        '3': '0.75rem',
        '6': '1.5rem',
      }
    },
  },
  plugins: [],
}