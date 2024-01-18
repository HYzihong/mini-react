/*
 * @Author: hy
 * @Date: 2024-01-18 18:49:33
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-18 19:04:16
 * @FilePath: /mini-react/.eslintrc.cjs
 * Copyright 2024 hy, All Rights Reserved.
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["@antfu", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
};