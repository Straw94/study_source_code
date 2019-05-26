
// react 深度优先遍历

// 规则：1.当节点类型相同时，看一下属性是否相同，产生一个属性的补丁包 类似 action 描述： {type:‘ATTRS’, attrs: {class: 'list-group'} }
//      2.旧的dom节点不存在  {type: 'REMOVE', index: xx}
//      3.节点类型不相同，直接替换 {type: 'REPLACE', newNode: newNode}
//      4.文本变化了， {type: 'TEXT', text: xx} 

function diff(oldTree, newTree) {
  let patches = {}    // {0:[], 1:[], 2: []}
  let index = 0
  // 递归树，比较后的结果放到补丁中
  walk(oldTree, newTree, index, patches)
  return patches
}

function diffAttr(oldAttrs, newAttrs) {
  let patch = {}
  // 判断老的属性和新的属性的关系
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]   //有可能为undefined
    }
  }
  for (let key in newAttrs) {
    // 老节点没有新节点的属性
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key]
    }
  }
  return patch
}

const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
let Index = 0

function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]'
}

function diffChildren(oldChildren, newChildren, patches) {
  // 比较老的第一个和新的第一个
  oldChildren.forEach((child, idx) => {
    // 索引不应该是index 了
    // index 每次传递给walk时，index 是递增，所有的人基于一个序号实现
    walk(child, newChildren[idx], ++Index, patches)
  });
}

function walk(oldNode, newNode, index, patches) {
  console.log(oldNode, newNode);

  // 每个元素都有一个补丁对象
  let currentPatch = []
  if (!newNode) {
    currentPatch.push({ type: REMOVE, index })
  } else if (isString(oldNode) && isString(newNode)) {
    // 判断文本是否一致
    if (oldNode !== newNode) {
      currentPatch.push({ type: TEXT, text: newNode })
    }
  } else if (oldNode.type === newNode.type) {
    // 比较属性是否有更改
    let attrs = diffAttr(oldNode.props, newNode.props)
    // console.log(attrs);
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({ type: ATTRS, attrs })
    }

    // 如果有儿子节点，遍历儿子节点
    diffChildren(oldNode.children, newNode.children, patches)

  } else {
    // 说明节点被替换了
    currentPatch.push({ type: REPLACE, newNode })
  }

  //当前元素确实有补丁，
  if (currentPatch.length > 0) {
    //将元素和补丁对应起来，放在大的补丁包里
    patches[index] = currentPatch
  }
}

