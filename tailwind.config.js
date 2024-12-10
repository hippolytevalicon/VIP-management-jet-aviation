/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E7E9EF',
          100: '#C2C9D6',
          200: '#9BA8BD',
          300: '#7487A3',
          400: '#4D6589',
          500: '#274470',
          600: '#233C65',
          700: '#1D325A',
          800: '#17284F',
          900: '#111E44',
        },
      },
    },
  },
  plugins: [],
};