module.exports = {
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  importOrder: [
    '^react$',
    '<THIRD_PARTY_MODULES>',
    '^aws-cdk-lib/(.*)$',
    '^@sandbox/(.*)$',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx'],
  importOrderTypeScriptVersion: '5.0.0',
  overrides: [
    {
      files: '*.ts',
      options: {
        importOrderParserPlugins: ['typescript'],
      },
    },
  ],
};
