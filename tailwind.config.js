/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors with their hex values
        'deep-navy': '#152A4A',  // darkest blue
        'navy-blue': '#1B365D',  // primary blue
        'mountain-blue': '#2B517A', // medium blue
        'alpine-white': '#FFFFFF', // pure white
        'pearl-white': '#F9FBFD', // off-white background
        'ice-blue': '#F7FAFC',   // very light blue
        'glacier-blue': '#6ac0ff', // accent light blue
        'sherpa-black': '#0D1525', // very dark blue/black
        'fog-gray': '#E2E8F0',   // light gray
        'steam-gray': '#C5D5F5',  // light blue-gray
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 25px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'button': '6px',
        'card': '8px',
      },
      fontFamily: {
        'sans': ['Open Sans', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
