/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'highlight': '#FE5196',
        'button': 'rgba(255, 255, 255, 0.3)'
      },
      fontFamily: {
        'sans': ['Satoshi', ...defaultTheme.fontFamily.sans],
        'heading': ['Hubot Sans', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}