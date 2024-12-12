/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-bold': '#181D27',
        'text-light': '#535862',
        'button-active': '#F9F5FF',
        'button-active-text': '#7F56D9',
      },
    },
  },
  plugins: [],
};
