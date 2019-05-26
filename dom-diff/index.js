
let virtualDom1 = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['a']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('li', { class: 'item' }, ['c']),
])
let virtualDom2 = createElement('ul', { class: 'list-group' }, [
  createElement('li', { class: 'item' }, ['a']),
  createElement('li', { class: 'item' }, ['1']),
  createElement('li', { class: 'item' }, ['90']),
])


console.log(virtualDom1);

// 虚拟dom 转化为真实dom渲染到页面上
let el = render(virtualDom1)
console.log(el);

// 渲染dom
renderDom(el, window.root)

// 比对视图
let patches = diff(virtualDom1, virtualDom2)
console.log(patches);

// 给元素打补丁，重新更新视图
patch(el, patches)


// DOM diff b比较的是两个虚拟dom 的区别，比较两个对象区别
// DOM diff 作用，根据两个虚拟对象创建出补丁，描述改变的内容，用这个补丁更新dom


