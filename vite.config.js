/**
 * @Author: hy
 * @Date: 2024-01-18 11:54:59
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-18 18:56:51
 * @FilePath: /mini-react/vite.config.js
 * @Copyright 2024 hy, All Rights Reserved.
 **/
/// <reference types="vitest" />
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  test: {
    root: "src",
  },
  resolve: {
    extensions: ["js", "jsx"],
  },
  plugins: [
    eslintPlugin({
      include: ["src/**/*.jsx", "src/**/*.js", "src/*.js", "src/*.jsx"],
    }),
  ],
});
