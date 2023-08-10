module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  rules: {
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/triple-slash-reference': 'warn',
  },
};
