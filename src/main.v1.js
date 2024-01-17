/**
 * @Author: hy
 * @Date: 2024-01-17 21:47:57
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-17 21:56:30
 * @FilePath: /mini-react/main.js
 * @Copyright 2024 hy, All Rights Reserved.
 **/
console.log("mini react main start ~");

// 在页面创建一个文本显示出来

// 1. 创建一个父节点，插入根节点下
const dom = document.createElement("div");
dom.id = "root";
dom.style = "color:pink;";
document.querySelector("#root").append(dom);

// 2. 创建一个文本节点
const textNode = document.createTextNode("");
textNode.nodeValue = "app";

// 3. 把文本节点插入父节点下
dom.append(textNode);
