/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'italian-plate': ['Italian Plate No2 Expanded', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
