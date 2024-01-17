/**
 * @Author: hy
 * @Date: 2024-01-17 23:56:06
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-17 23:56:08
 * @FilePath: /mini-react/src/main copy.js
 * @Copyright 2024 hy, All Rights Reserved.
 **/
/**
 * @Author: hy
 * @Date: 2024-01-17 21:57:24
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-17 23:46:23
 * @FilePath: /mini-react/src/main.js
 * @Copyright 2024 hy, All Rights Reserved.
 **/
console.log("mini react main start ~");

// 在页面创建一个文本显示出来
// 使用vdom =》 js Object => 动态创建

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

// const textEl = createTextNode("app");
// const App = createElement("app", { id: "app", style: "color:pink;" }, textEl);
// // 知识点：如果你不想算法太过复杂，可以从数据结构优化入手

// // 1. 创建一个父节点，插入根节点下
// const dom = document.createElement(App.type);
// dom.id = App.props.id;
// dom.style = App.props.style;
// document.querySelector("#root").append(dom);

// // 2. 创建一个文本节点
// const textNode = document.createTextNode("");
// textNode.nodeValue = textEl.props.nodeValue;

// // 3. 把文本节点插入父节点下
// dom.append(textNode);

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

const textEl = createTextNode("app");
// const App = createElement("app", { id: "app", style: "color:pink;" }, textEl);
// const App = createElement("app", { id: "app", style: "color:pink;" }, "app");
const App = createElement(
  "app",
  { id: "app", style: "color:pink;" },
  "hi ",
  "mini-react"
);

render(App, document.querySelector("#root"));
