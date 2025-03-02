/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'primary': '#FF6B00',     // Orange
          'secondary': '#166534',    // Green-800
          'white': '#FFFFFF',
          'dark': '#18181B',        // Zinc-900
          'gray': '#71717A',        // Zinc-500
          'light': '#E4E4E7',       // Zinc-200
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'opensans': ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3rem', { lineHeight: '1.2' }],
        'h2': ['2.25rem', { lineHeight: '1.2' }],
        'h3': ['1.5rem', { lineHeight: '1.2' }],
        'h4': ['1.25rem', { lineHeight: '1.2' }],
        'h5': ['1rem', { lineHeight: '1.2' }],
        'body-lg': ['1.125rem', { lineHeight: '1.5' }],
        'body': ['1rem', { lineHeight: '1.5' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5' }],
      }
    },
  },
  plugins: [],
}