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
      spacing: {
        // Using the 8px increment system
        '0.5': '0.5rem', // 8px
        '1': '1rem',     // 16px
        '1.5': '1.5rem', // 24px
        '2': '2rem',     // 32px
        '3': '3rem',     // 48px
      },
      borderRadius: {
        'DEFAULT': '6px',
        'lg': '8px',
      },
    },
  },
  plugins: [],
}