// eslint.config.mjs
import { defineConfig } from 'eslint-define-config';
import eslintRecommended from '@eslint/js';
import tsPluginRecommended from '@typescript-eslint/eslint-plugin';

export default defineConfig({
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.url,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
});
