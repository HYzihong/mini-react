/**
 * @Author: hy
 * @Date: 2024-01-17 22:05:55
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-17 22:05:57
 * @FilePath: /mini-react/main copy.js
 * @Copyright 2024 hy, All Rights Reserved.
 **/
/**
 * @Author: hy
 * @Date: 2024-01-17 21:57:24
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-17 22:04:40
 * @FilePath: /mini-react/main.js
 * @Copyright 2024 hy, All Rights Reserved.
 **/
console.log("mini react main start ~");

// 在页面创建一个文本显示出来
// 使用vdom =》 js Object
const textEl = {
  type: "TEXT_ELEMENT",
  props: {
    nodeValue: "app",
    children: [],
  },
};
const el = {
  type: "div",
  props: {
    id: "app",
    style: "color:pink;",
    children: [
      textEl,
      // {
      //   type:"TEXT_ELEMENT",
      //   props:{
      //     nodeValue:"app",
      //     children:[]
      //   }
      // }
    ],
  },
};

// 知识点：如果你不想算法太过复杂，可以从数据结构优化入手

// 1. 创建一个父节点，插入根节点下
const dom = document.createElement(el.type);
dom.id = el.props.id;
dom.style = el.props.style;
document.querySelector("#root").append(dom);

// 2. 创建一个文本节点
const textNode = document.createTextNode("");
textNode.nodeValue = textEl.props.nodeValue;

// 3. 把文本节点插入父节点下
dom.append(textNode);
