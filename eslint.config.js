// Use 'import' instead of 'require'
import eslint from "eslint";

export default {
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  rules: {
    // Your ESLint rules go here
  },
};
