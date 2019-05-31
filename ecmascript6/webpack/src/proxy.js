const log = console.log.bind(console.log);
const logErr = console.error.bind(console.error);
/**
 *
 * GET 拦截
 */

// ///////////////////////// 兜底
// let proto = new Proxy({}, {
//     get(target, propertyKey, receiver) {
//         console.log('GET ' + propertyKey);
//         return target[propertyKey];
//     }
// });

// let obj = Object.create(proto);
// console.log(obj.target)
// ///////////////////////// 数组负数拦截
// function createArray(...elements) {
//     let handler = {
//         get(target, propKey, receiver) {
//             let index = Number(propKey);
//             if (index < 0) {
//                 propKey = String(target.length + index);
//             }
//             return Reflect.get(target, propKey, receiver);
//         }
//     };
//     let target = [];
//     target.push(...elements);
//     return new Proxy(target, handler);
// }

// let arr = createArray('a', 'b', 'c');
// console.log(arr[-1])
// ///////////////////////// 管道符
// var pipe = function(value) {
//         var funcStack = [];
//         var oproxy = new Proxy({} , {
//             get : function (pipeObject, fnName) {
//                 if (fnName === 'get') {
//                     return funcStack.reduce(function (val, fn) {
//                         // return fn(val);
//                     }, value);
//                 }
//                 funcStack.push(window[fnName]);
//                 return oproxy;
//             }
//         });
//         return oproxy;
//     }
// var double = n => n * 2;
// var pow    = n => n * n;
// var reverseInt = n => n.toString().split("").reverse().join("") | 0;
// pipe(3).double.pow.reverseInt.get; // 63
// /////////////////////// dom
// const dom = new Proxy({}, {
//     get(target, property) {
//       return function(attrs = {}, ...children) {
//         const el = document.createElement(property);
//         for (let prop of Object.keys(attrs)) {
//           el.setAttribute(prop, attrs[prop]);
//         }
//         for (let child of children) {
//           if (typeof child === 'string') {
//             child = document.createTextNode(child);
//           }
//           el.appendChild(child);
//         }
//         return el;
//       }
//     }
//   });

// const el = dom.div({},
//     'Hello, my name is ',
//     dom.a({href: '//example.com'}, 'Mark'),
//     '. I like:',
//     dom.ul({},
//         dom.li({}, 'The web'),
//         dom.li({}, 'Food'),
//         dom.li({}, '…actually that\'s it')
//     )
// );
// document.body.appendChild(el);

// 对象兜底
// Object.prototype.proxy = function() {
//     return new Proxy(this, {
//         get: function(target, property) {
//             return target[property] || target.proxy(target);
//         }
//     })
// }




/**
 *
 * SET 拦截
 */
// 私有属性
// var handler = {
//     set (obj, key, value, receiver) {
//         log(obj);
//         log(receiver);
//         if (key[0] === '_') {
//             return false;
//         }
//         obj.key = 123
//         // return key in target;
//     }
// };
// var target = { _prop: 'foo', prop: 'foo' };
// var proxy = new Proxy(target, handler);
// // console.log('_prop' in proxy)
// proxy.aaa = 123;
// console.log(proxy)


/**
*
* apply 拦截
*
*/
// var twice = {
//   apply (target, ctx, args) {
//     console.log(`target: ${JSON.stringify(target)}`)
//     return Reflect.apply(...arguments) * 2;
//   }
// };
// function sum (left, right) {
//   return left + right;
// };
// var proxy = new Proxy(sum, twice);
// proxy(1, 2) // 6
// proxy.call({}, 5, 6) // 22
// proxy.apply(null, [7, 8]) // 30


/**
 *
 * has 拦截
 */
// 私有属性
// var handler = {
//     has (target, key) {
//         if (key[0] === '_') {
//             return false;
//         }
//         return key in target;
//     }
// };
// var target = { _prop: 'foo', prop: 'foo' };
// var proxy = new Proxy(target, handler);
// console.log('_prop' in proxy)

/*
 *
 * construct 拦截 构造函数
 * @{params} target: 目标对象
 * @{params} args: 参数
 * @{params} newTarget: Proxy实例
 *
*/
// function Person(value) {
//   this.value = value;
// }
// Person.prototype.setValue = function(value) {
//   this.value = value;
// }
// var Child = new Proxy(Person, {
//   construct: function(target, args, newTarget) {
//     target.prototype.getValue = function(){ return this.value}
//     return new target(...args);
//   }
// });


/*
 * deleteProperty
 * @{params} target: 目标对象
 * @{params} key： key值
 * 拦截delete  返回false或抛出错误
*/
// var handler = {
//   deleteProperty (target, key) {
//     invariant(key, 'delete');
//     delete target[key];
//     return true;
//   }
// };
// function invariant (key, action) {
//   if (key[0] === '_') {
//     throw new Error(`Invalid attempt to ${action} private "${key}" property`);
//   }
// }
//
// var target = { _prop: 'foo' };
// var proxy = new Proxy(target, handler);
// delete proxy._prop


/*
 * defineProperty
 * @{params} target: 目标对象
 * @{params} key： key值
 * @{params} descriptor: 描述对象
 *
 * 拦截Object.defineProperty
 * 返回false 为失败
 *
*/



/*
 *
 * getOwnPropertyDescriptor
 * @{params} target: 目标对象
 * @{params} key： key值
 *
 * 拦截 Object.getOwnPropertyDescriptor
*/

// var handler = {
//   getOwnPropertyDescriptor (target, key) {
//     if (key[0] === '_') {
//       return;
//     }
//     return Object.getOwnPropertyDescriptor(target, key);
//   }
// };
// var target = { _foo: 'bar', baz: 'tar' };
// var proxy = new Proxy(target, handler);
// Object.getOwnPropertyDescriptor(proxy, 'wat')
// // undefined
// Object.getOwnPropertyDescriptor(proxy, '_foo')
// // undefined
// Object.getOwnPropertyDescriptor(proxy, 'baz')
// // { value: 'tar', writable: true, enumerable: true, configurable: true }

/*
 *
 * getPrototypeOf
 * @{params} target: 目标对象
 *
 * 拦截
 *      Object.prototype.__proto__
 *      Object.prototype.isPrototypeOf()
 *      Object.getPrototypeOf()
 *      Reflect.getPrototypeOf()
 *      instanceof
*/

// var proto = {};
// var p = new Proxy({}, {
//   getPrototypeOf(target) {
//     return proto;
//   }
// });
// Object.getPrototypeOf(p) === proto // true



/*
 *
 * ownKeys
 * @{params} target: 目标对象
 *
 * 拦截
 *      Object.getOwnPropertyNames()
 *      Object.getOwnPropertySymbols()
 *      Object.keys()
 *      for... in
 *
 *  三类属性会被ownKeys方法自动过滤，不会返回。
 *
 *  目标对象上不存在的属性
 *  属性名为 Symbol 值
 *  不可遍历（enumerable）的属性
 *
 *  数组成员，只能是字符串或 Symbol 值
 *  目标对象自身包含不可配置的属性，则该属性必须被ownKeys方法返回
 *  如果目标对象是不可扩展的（non-extensible）Object.preventExtensions(obj)
 *  这时ownKeys方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性
*/

// let target = {
//   _bar: 'foo',
//   _prop: 'bar',
//   prop: 'baz'
// };
//
// let handler = {
//   ownKeys (target) {
//     return Reflect.ownKeys(target).filter(key => key[0] !== '_');
//   }
// };
//
// let proxy = new Proxy(target, handler);
// for (let key of Object.keys(proxy)) {
//   console.log(target[key]);
// }
// "baz"



/*
 *
 * setPrototypeOf
 * @{params} target: 目标对象
 * @{params} proto: 目标对象
 *
 * 拦截  Object.setPrototypeOf()

*/

// var handler = {
//   setPrototypeOf (target, proto) {
//     throw new Error('Changing the prototype is forbidden');
//   }
// };
// var proto = {};
// var target = function () {};
// var proxy = new Proxy(target, handler);
// Object.setPrototypeOf(proxy, proto);
// // Error: Changing the prototype is forbidden


/*
 * Proxy.revocable方法返回一个可取消的 Proxy 实例
*/

// let target = {};
// let handler = {};
// let {proxy, revoke} = Proxy.revocable(target, handler);
// proxy.foo = 123;
// proxy.foo // 123
// revoke();
// proxy.foo // TypeError: Revoked

















