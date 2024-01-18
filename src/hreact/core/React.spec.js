/**
 * @Author: hy
 * @Date: 2024-01-18 11:59:21
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-18 12:15:11
 * @FilePath: /mini-react/src/hreact/core/React.spec.js
 * @Copyright 2024 hy, All Rights Reserved.
 **/
import { it, expect, describe } from "vitest";
import React from "./React.js";

describe("createElement", () => {
  it(" vdom ", () => {
    const el = React.createElement("div", { id: "app" }, "props is null");
    expect(el).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "props is null",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
          "id": "app",
        },
        "type": "div",
      }
    `);
  });
  it("props is null ", () => {
    const el = React.createElement("div", null, "props is null");
    expect(el).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "props is null",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
        },
        "type": "div",
      }
    `);
  });
  // 不能测试真实dom，配置方法没找到
  // it(" dom ", () => {
  //   // const vdom_el = React.createElement("div", { id: "app" }, "props is null");
  //   const el = <div id="app">props is null</div>;
  //   expect(el).toMatchInlineSnapshot();
  // });
});
