/**
 * @Author: hy
 * @Date: 2024-01-18 00:05:56
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-18 00:23:54
 * @FilePath: /mini-react/src/hreact/core/ReactDOM.js
 * @Copyright 2024 hy, All Rights Reserved.
 **/
import React from "./React.js";
const ReactDOM = {
  createRoot(container) {
    return {
      render(App) {
        React.render(App, container);
      },
    };
  },
};

export default ReactDOM;
