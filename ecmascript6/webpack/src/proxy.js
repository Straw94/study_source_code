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
var handler = {
    has (target, key) {
        if (key[0] === '_') {
            return false;
        }
        return key in target;
    }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
console.log('_prop' in proxy)