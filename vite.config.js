/**
 * @Author: hy
 * @Date: 2024-01-18 11:54:59
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-19 20:13:56
 * @FilePath: /mini-react/vite.config.js
 * @Copyright 2024 hy, All Rights Reserved.
 **/
/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    root: "src",
  },
  resolve: {
    extensions: ["js", "jsx"],
  },
});
