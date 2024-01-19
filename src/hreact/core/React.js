/**
 * @Author: hy
 * @Date: 2024-01-18 00:05:35
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-19 22:40:17
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

function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(type);
}

function updateProps(el, props) {
  Object.keys(props).forEach((key) => {
    if (key !== "children") {
      el[key] = props[key];
    }
  });
}

function initChildren(fiber) {
  let prevFiber = null; // 上一个节点
  fiber.props?.children?.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      dom: null,
      child: null,
      sibling: null,
      parent: fiber,
    };
    if (index === 0) {
      fiber.child = newFiber; // 兄弟节点
    } else {
      prevFiber.sibling = child;
    }
    prevFiber = newFiber;
  });
}

let nextWorkOfUnit = null;
/*******
 * @description:
 * @param {IdleDeadline} deadline
 * @return {*}
 */
function workLoop(deadline) {
  let shouldYield = false;
  // 当前任务还没有结束，有下一个节点要渲染
  while (!shouldYield && nextWorkOfUnit) {
    // 在执行完当前任务后返回新的任务
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit);
    shouldYield = deadline.timeRemaining() < 1;
  }

  // 节点生成结束，需要渲染到页面
  if (!nextWorkOfUnit && root) {
    // 统一把子节点添加到根节点
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

function commitRoot() {
  commitWork(root.child);
  root = null;
}

// 递归插入节点
function commitWork(fiber) {
  console.log("递归插入节点",fiber);
  if (!fiber) return;
  fiber.parent.dom.append(fiber.dom);
  if(fiber.child)commitWork(fiber.child);
  if(fiber.sibling)commitWork(fiber.sibling);
}

function performWorkOfUnit(fiber) {
  if (!fiber.dom) {
    // 1. 创建我们的dom,给当前 work 赋值
    const dom = (fiber.dom = createDom(fiber.type));

    // 2. 处理props
    updateProps(dom, fiber.props);

    // append dom
    // fiber.parent.dom.append(dom);
  }

  // 3. 转换链表，设置好指针
  initChildren(fiber);

  // 4. 返回下一个要执行的任务
  // 检查是否有子节点
  if (fiber.child) {
    return fiber.child;
  }
  // 检查是否有兄弟节点
  if (fiber.sibling) {
    return fiber.sibling;
  }
  // 返回父节点的子节点，当返回undefined 则结束
  return fiber.parent?.sibling;
}

requestIdleCallback(workLoop);

function render(el, container) {
  console.log("render el =>", el);
  console.log("render container =>", container);

  // 根节点
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };

  root = nextWorkOfUnit;
}

// 根节点
let root = null;

const React = {
  render,
  createElement,
};

export default React;
