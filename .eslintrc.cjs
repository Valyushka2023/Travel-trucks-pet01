module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // <-- правильне підключення Prettier тут
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect', // <-- краще "detect", не вручну вказувати версію
    },
  },
  plugins: ['react-refresh'],
  rules: {
    // вимкнуто помилки для console (замість no-undef і no-console)
    'no-undef': ['error', { typeof: true }],
    'no-console': 'off',

    'react/prop-types': 'warn', // <-- постав "warn", щоб підсвічувало, але не ламало білд
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
// module.exports = {
//   env: {
//     browser: true,
//     node: true,
//     es2020: true,
//   },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react/jsx-runtime',
//     'plugin:react-hooks/recommended',
//     'plugin:prettier/recommended',
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//     ecmaFeatures: { jsx: true },
//   },
//   settings: {
//     react: { version: 'detect' },
//   },
//   plugins: ['react-refresh'],
//   // Перенаправлення налаштувань для Node.js файлів у src/db
//   overrides: [
//     {
//       files: ['src/db/**/*.js'],
//       env: { node: true },
//       globals: {
//         console: 'readonly',
//         process: 'readonly',
//       },
//     },
//   ],
//   rules: {
//     // Вимикаємо перевірку console, оскільки для цих файлів дозволено Node.js globals
//     'no-console': 'off',

//     'react/prop-types': 'warn',
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//   },
// };
