/**
 * @Author: hy
 * @Date: 2024-01-18 00:05:35
 * @LastEditors: hy
 * @Description:
 * @LastEditTime: 2024-01-18 17:08:10
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

function initChildren(work) {
  let prevChild = null;
  console.log("initChildren", work.props?.children);
  work.props?.children?.forEach((child, index) => {
    const newWork = {
      type: child.type,
      props: child.props,
      dom: null,
      child: null,
      sibling: null,
      parent: work,
    };
    if (index === 0) {
      work.child = newWork;
    } else {
      prevChild.sibling = child;
    }
    prevChild = newWork;
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
  while (!shouldYield && nextWorkOfUnit) {
    // 在执行完当前任务后返回新的任务
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

function performWorkOfUnit(work) {
  if (!work.dom) {
    // 1. 创建我们的dom,给当前 work 赋值
    const dom = (work.dom =
      work.type === "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(work.type));
    // const dom = (work.dom = createDom(work.type));

    // 2. 处理props
    Object.keys(work.props).forEach((key) => {
      if (key != "children") {
        dom[key] = work.props[key];
      }
    });
    // updateProps(dom, work.props);

    work.parent.dom.append(dom);
  }

  console.log("performWorkOfUnit work ==>", work);

  // 3. 转换链表，设置好指针
  const children = work.props?.children;
  let prevChild = null; // 上一个节点
  children?.forEach((child, index) => {
    const newWork = {
      type: child.type,
      props: child.props,
      child: null,
      parent: work,
      sibling: null,
      dom: null,
    };
    if (index === 0) {
      work.child = newWork;
    } else {
      prevChild.sibling = newWork; // 兄弟节点
    }
    prevChild = newWork;
  });
  // initChildren(work);

  // 4. 返回下一个要执行的任务
  // 检查是否有子节点
  if (work.child) {
    return work.child;
  }
  // 检查是否有兄弟节点
  if (work.sibling) {
    return work.sibling;
  }
  // 返回父节点的子节点，当返回undefined 则结束
  return work.parent?.sibling;
}

requestIdleCallback(workLoop);

function render(el, container) {
  console.log("render el =>", el);
  console.log("render container =>", container);
  // 1. 判断类型来创建dom
  // const dom =
  //   el.type != "TEXT_ELEMENT"
  //     ? document.createElement(el.type)
  //     : document.createTextNode("");

  // //  2. 添加props
  // Object.keys(el.props).forEach((key) => {
  //   if (key != "children") {
  //     dom[key] = el.props[key];
  //   }
  // });
  // // 处理children
  // const childrens = el.props.children;
  // childrens.forEach((child) => {
  //   render(child, dom);
  // });

  // // 3. 插入父节点中
  // container.append(dom);

  // 根节点
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };
}

const React = {
  render,
  createElement,
};

export default React;
