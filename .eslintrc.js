module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["xo", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "no-prompt": "off",
    "no-alert": "off",
  },
};
