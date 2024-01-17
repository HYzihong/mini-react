/**
 * @Author: hy
 * @Date: 2024-01-18 00:05:35
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-18 00:24:18
 * @FilePath: /mini-react/src/hreact/core/React.js
 * @Copyright 2024 hy, All Rights Reserved.
 **/

function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "string" ? createTextNode(child) : child;
      }),
    },
  };
}

function render(el, container) {
  console.log("render el =>", el);
  console.log("render container =>", container);
  // 1. 判断类型来创建dom
  const dom =
    el.type != "TEXT_ELEMENT"
      ? document.createElement(el.type)
      : document.createTextNode("");

  //  2. 添加props
  Object.keys(el.props).forEach((key) => {
    if (key != "children") {
      dom[key] = el.props[key];
    }
  });
  // 处理children
  const childrens = el.props.children;
  childrens.forEach((child) => {
    render(child, dom);
  });

  // 3. 插入父节点中
  container.append(dom);
}

const React = {
  render,
  createElement,
};

export default React;
