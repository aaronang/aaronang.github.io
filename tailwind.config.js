/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Mona Sans', ...defaultTheme.fontFamily.sans],
        'heading': ['Hubot Sans', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}