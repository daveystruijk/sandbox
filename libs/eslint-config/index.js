module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],

  rules: {
    // Warn on unused vars, but not if they have a leading underscore
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    // Warn instead of error, sometimes still necessary
    '@typescript-eslint/no-var-requires': 'warn',

    // Warn instead of error because this trips up nativescript's references.d.ts
    '@typescript-eslint/triple-slash-reference': 'warn',

    // Non-null assertions are usually solidjs workarounds
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
