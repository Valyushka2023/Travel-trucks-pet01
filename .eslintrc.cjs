module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true 
  },
  extends: [
    "eslint:recommended",                // Базові правила ESLint
    "plugin:react/recommended",          // Рекомендації для React
    "plugin:react/jsx-runtime",          // Підтримка JSX Runtime
    "plugin:react-hooks/recommended",    // Рекомендації для React-хуків
    "prettier"                           // Вимкнення правил, що конфліктують з Prettier
  ],
  ignorePatterns: [
    "dist", 
    ".eslintrc.cjs"                      // Ігнорування певних папок/файлів
  ],
  parserOptions: { 
    ecmaVersion: "latest",               // Сучасна версія ECMAScript
    sourceType: "module"                 // Використання модулів ES
  },
  settings: { 
    react: { version: "18.3.1" }         // Вказуємо версію React (18.3.1)
  },
  plugins: [
    "react-refresh"                      // Плагін для React Refresh
  ],
  rules: {
    "react/prop-types": 0,               // Вимикаємо валідацію PropTypes
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "prettier/prettier": "error"         // Додаємо правило для перевірки Prettier
  }
};

