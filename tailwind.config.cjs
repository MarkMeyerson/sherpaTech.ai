/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'navy-blue': '#1B365D',
        'alpine-white': '#FFFFFF',
        
        // Supporting colors
        'mountain-blue': '#2B517A',
        'ice-blue': '#E8EEF4',
        
        // Background colors
        'pearl-white': '#F7FAFC',
        'deep-navy': '#152A4A',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}