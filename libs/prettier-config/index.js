module.exports = {
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  importOrder: ['<THIRD_PARTY_MODULES>', '^@sandbox/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
