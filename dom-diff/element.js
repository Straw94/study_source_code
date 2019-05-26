
// 虚拟dom的类
class Element {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

// 设置属性
function setAttr(node, key, value) {
  switch (key) {
    case 'value':
      // node 是一个input或者 textarea
      if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
        node.value = value
      } else {
        node.setAttribute(key, value)
      }
      break;
    case 'style':
      node.style.cssText = value
      break;
    default:
      node.setAttribute(key, value)
      break;
  }
}

// 返回虚拟节点 返回Object
function createElement(type, props, children) {
  return new Element(type, props, children)
}

// 将vnode转化为真实dom
function render(eleObj) {
  // console.log(eleObj.type);
  let el = document.createElement(eleObj.type)
  for (let key in eleObj.props) {
    // 设置属性
    setAttr(el, key, eleObj.props[key])
  }
  // 遍历儿子，如果是虚拟dom继续渲染，不是就代表文本节点  深度优先遍历
  eleObj.children.forEach(child => {
    child = (child instanceof Element) ? render(child) : document.createTextNode(child)
    el.appendChild(child)
  });
  return el
}

function renderDom(el, target) {
  target.appendChild(el)
}
