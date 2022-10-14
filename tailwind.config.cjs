/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'cyan-un': 'rgba(33, 208, 168, 0.37)',
        'cyan-hover': 'rgba(10, 253, 204, 0.64)',
        'cyan-active': '#0AFDCC',
        'red-un': 'rgba(175, 46, 80, 0.47)',
        'red-hover': 'rgba(212, 33, 79, 0.64)',
        'red-active': '#D4214F',
        'blue-un': 'rgba(56, 75, 107, 0.32)',
        'blue-hover': 'rgba(44, 100, 196, 0.64)',
        'blue-active': '#2C64C4',
        'border-color': 'rgba(0, 0, 0, 0.17)',
        'footer-color': 'rgba(14, 34, 54, 0.61)'
      },
      backgroundImage: {
        'bg-madeon': "url('./public/bg.jpg')",
      }
    },
  },
  plugins: [],
}
