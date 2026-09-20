module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    extraFileExtensions: [".vue"],
  },
  globals: {
    window: "readonly",
    document: "readonly",
    console: "readonly",
    navigator: "readonly",
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  plugins: ["vue"],
  ignorePatterns: ["dist", "node_modules"],
  overrides: [
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "espree",
      },
    },
  ],
  rules: {
    "no-console": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};
