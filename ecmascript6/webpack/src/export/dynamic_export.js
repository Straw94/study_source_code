// 动态加载（提案中）    systemJS 可以实现
/*
  CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
  CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
*/

button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});

async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
