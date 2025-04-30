module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended" // <-- правильне підключення Prettier тут
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect" // <-- краще "detect", не вручну вказувати версію
    }
  },
  plugins: [
    "react-refresh",
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "react/prop-types": "warn", // <-- постав "warn", щоб підсвічувало, але не ламало білд
  }
};
