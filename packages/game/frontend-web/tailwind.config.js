/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
    './node_modules/@sandbox/game-frontend-components/src/**/*.{js,ts,jsx,tsx,css}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
