/*
  数据劫持
*/
// const queuedObservers = new Set();
//
// const observe = fn => queuedObservers.add(fn);
// const observable = obj => new Proxy(obj, {set});
//
// function set(target, key, value, receiver) {
//   const result = Reflect.set(target, key, value, receiver);
//   queuedObservers.forEach(observer => observer());
//   return result;
// }
//
// const person = observable({
//     name: '张三',
//     age: 20
// });
//
// function print() {
//     console.log(`${person.name}, ${person.age}`)
// }
//
// observe(print);
// person.name = '李四';


/*
 * get
 * @{params} target 目标对象
 * @{params} key key
 * @{params} receiver 属性部署了读取函数，则读取函数的this绑定receiver
 *
*/

// var myObject = {
//   foo: 1,
//   bar: 2,
//   get baz() {
//     return this.foo + this.bar;
//   },
// };
// var myReceiverObject = {
//   foo: 4,
//   bar: 4,
// };
// Reflect.get(myObject, 'baz', myReceiverObject);  // 8


/*
 * set
 * @{params} target 目标对象
 * @{params} key key
 * @{params} value
 * @{params} receiver 属性部署了读取函数，则读取函数的this绑定receiver
 * 传入了receiver，Reflect.set会触发Proxy.defineProperty拦截
*/

// let p = {
//   a: 'a'
// };
// let handler = {
//   set(target, key, value, receiver) {
//     console.log('set');
//     Reflect.set(target, key, value, receiver)
//   },
//   defineProperty(target, key, attribute) {
//     console.log('defineProperty');
//     Reflect.defineProperty(target, key, attribute);
//   }
// };
// let obj = new Proxy(p, handler);
// obj.a = 'A';
// // set
// // defineProperty


/*
 * has
 * @{params} target 目标对象
 * @{params} key key
*/

// var myObject = {
//   foo: 1,
// };
// // 旧写法
// 'foo' in myObject // true
// // 新写法
// Reflect.has(myObject, 'foo') // true


/*
 * delete
 * @{params} target 目标对象
 * @{params} key key
*/
// const myObj = { foo: 'bar' };
// // 旧写法
// delete myObj.foo;
// // 新写法
// Reflect.deleteProperty(myObj, 'foo');


/*
 * construct
 * @{params} target 构造函数
 * @{params} args 参数
*/
// function Greeting(name) {
//   this.name = name;
// }
// // new 的写法
// const instance = new Greeting('张三');
// // Reflect.construct 的写法
// const instance = Reflect.construct(Greeting, ['张三']);


/*
 * getPrototypeOf
 * @{params} target 目标对象
*/
// const myObj = new FancyThing();
// // 旧写法
// Object.getPrototypeOf(myObj) === FancyThing.prototype;
// // 新写法
// Reflect.getPrototypeOf(myObj) === FancyThing.prototype;

/*
 * setPrototypeOf
 * @{params} target 目标对象
 * @{params} proto  原型对象
*/
// const myObj = {};
// // 旧写法
// Object.setPrototypeOf(myObj, Array.prototype);
// // 新写法
// Reflect.setPrototypeOf(myObj, Array.prototype);


/*
 * apply
 * @{params} func 函数方法
 * @{params} thisArg 执行上下文
 * @{params} args 参数
*/
// const ages = [11, 33, 12, 54, 18, 96];
// // 旧写法
// const youngest = Math.min.apply(Math, ages);
// const oldest = Math.max.apply(Math, ages);
// const type = Object.prototype.toString.call(youngest);
// // 新写法
// const youngest = Reflect.apply(Math.min, Math, ages);
// const oldest = Reflect.apply(Math.max, Math, ages);
// const type = Reflect.apply(Object.prototype.toString, youngest, []);


/*
 * defineProperty
 * @{params} target 目标对象
 * @{params} propertyKey key值
 * @{params} attributes 描述对象
 *
*/
// const p = new Proxy({}, {
//   defineProperty(target, prop, descriptor) {
//     console.log(descriptor);
//     return Reflect.defineProperty(target, prop, descriptor);
//   }
// });
// p.foo = 'bar';
// // {value: "bar", writable: true, enumerable: true, configurable: true}
// p.foo // "bar"



/*
 * getOwnPropertyDescriptor
 * @{params} target 目标对象
 * @{params} propertyKey
 *
 *
*/
// var myObject = {};
// Object.defineProperty(myObject, 'hidden', {
//   value: true,
//   enumerable: false,
// });
// // 旧写法
// var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');
// // 新写法
// var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');


/*
 * isExtensible 对象是否可扩展
 *
 *
*/
// const myObject = {};
// // 旧写法
// Object.isExtensible(myObject) // true
// // 新写法
// Reflect.isExtensible(myObject) // true



/*
 * preventExtensions
 *
 * 用于让一个对象变为不可扩展
*/

// var myObject = {};
// // 旧写法
// Object.preventExtensions(myObject) // Object {}
// // 新写法
// Reflect.preventExtensions(myObject) // true

/*
 * ownKeys
 * @{params} 目标对象
 * 等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
 *
*/

// var myObject = {
//   foo: 1,
//   bar: 2,
//   [Symbol.for('baz')]: 3,
//   [Symbol.for('bing')]: 4,
// };
// // 旧写法
// Object.getOwnPropertyNames(myObject)
// // ['foo', 'bar']
// Object.getOwnPropertySymbols(myObject)
// //[Symbol(baz), Symbol(bing)]
// // 新写法
// Reflect.ownKeys(myObject)
// // ['foo', 'bar', Symbol(baz), Symbol(bing)]
































