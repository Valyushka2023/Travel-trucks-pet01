// eslint.config.js
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended, // <-- підключаємо базову конфігурацію JavaScript
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        fetch: 'readonly',
        location: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        window: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
        URLSearchParams: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,

      'prettier/prettier': 'error', // Prettier помилки як ESLint errors
      'react/prop-types': 'warn',
      'react/jsx-uses-react': 'off', // для нового JSX трансформу
      'react/react-in-jsx-scope': 'off', // для нового JSX трансформу
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
