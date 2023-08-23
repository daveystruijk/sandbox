const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{css,xml,html,ts,tsx}',
    './node_modules/@sandbox/game-frontend-components/src/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('android', '.ns-android &');
      addVariant('ios', '.ns-ios &');
    }),
  ],
  corePlugins: {
    preflight: false, // disables browser-specific resets
  },
};
