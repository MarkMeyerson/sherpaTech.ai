// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
      spacing: {
        'xs': '0.5rem',   // 8px
        'sm': '1rem',     // 16px
        'md': '1.5rem',   // 24px
        'lg': '2rem',     // 32px
        'xl': '3rem',     // 48px
      },
    },
  },
  plugins: [],
}