// var arr = [1, [[2, 3], 4], [5, 6]];
//
// var flat = function* (a) {
//   var length = a.length;
//   for (var i = 0; i < length; i++) {
//     var item = a[i];
//     if (typeof item !== 'number') {
//       yield* flat(item);
//     } else {
//       yield item;
//     }
//   }
// };
//
// for (var f of flat(arr)) {
//   console.log(f);
// }
//
// _.log([...flat(arr)])

// function* f() {
//   for(var i = 0; true; i++) {
//     var reset = yield i;
//     if(reset) { i = -1; }
//   }
// }
//
// var g = f();
//
// _.log(g.next()) // { value: 0, done: false }
// _.log(g.next())// { value: 1, done: false }
// _.log(g.next(true)) // { value: 0, done: false }
// _.log(g.next(true))




// function* objectEntries(obj) {
//   let propKeys = Reflect.ownKeys(obj);
//
//   for (let propKey of propKeys) {
//     yield [propKey, obj[propKey]];
//   }
// }
// let jane = { first: 'Jane', last: 'Doe' };
// for (let [key, value] of objectEntries(jane)) {
//   console.log(`${key}: ${value}`);
// }
//


// function* objectEntries() {
//   let propKeys = Object.keys(this);
//   for (let propKey of propKeys) {
//     yield [propKey, this[propKey]];
//   }
// }
// let jane = { first: 'Jane', last: 'Doe' };
// jane[Symbol.iterator] = objectEntries;
// for (let [key, value] of jane) {
//   console.log(`${key}: ${value}`);
// }

// 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会推迟到finally代码块执行完再执行
// function* numbers () {
//   yield 1;
//   try {
//     yield 2;
//     yield 3;
//   } finally {
//     yield 4;
//     yield 5;
//   }
//   yield 6;
// }
// var g = numbers();
// g.next() // { value: 1, done: false }
// g.next() // { value: 2, done: false }
// g.return(7) // { value: 4, done: false }
// g.next() // { value: 5, done: false }
// g.next() // { value: 7, done: true }




// function* inner() {
//   yield 'hello!';
// }
// function* outer1() {
//   yield 'open';
//   yield inner();
//   yield 'close';
// }
// var gen = outer1()
// gen.next().value // "open"
// gen.next().value // 返回一个遍历器对象
// gen.next().value // "close"
// function* outer2() {
//   yield 'open'
//   yield* inner()
//   yield 'close'
// }
// var gen = outer2()
// gen.next().value // "open"
// gen.next().value // "hello!"
// gen.next().value // "close"
//
//
// function* gen(){
//   yield* ["a", "b", "c"];
// }
//
// gen().next() // { value:"a", done:false }



// function* foo() {
//   yield 2;
//   yield 3;
//   return "foo";
// }
// function* bar() {
//   yield 1;
//   var v = yield* foo();
//   console.log("v: " + v);
//   yield 4;
// }
// var it = bar();
// it.next()
// // {value: 1, done: false}
// it.next()
// // {value: 2, done: false}
// it.next()
// // {value: 3, done: false}
// it.next();
// // "v: foo"
// // {value: 4, done: false}
// it.next()
// // {value: undefined, done: true}



// // 下面是二叉树的构造函数，
// // 三个参数分别是左树、当前节点和右树
// function Tree(left, label, right) {
//   this.left = left;
//   this.label = label;
//   this.right = right;
// }
// // 下面是中序（inorder）遍历函数。
// // 由于返回的是一个遍历器，所以要用generator函数。
// // 函数体内采用递归算法，所以左树和右树要用yield*遍历
// function* inorder(t) {
//   if (t) {
//     yield* inorder(t.left);
//     yield t.label;
//     yield* inorder(t.right);
//   }
// }
// // 下面生成二叉树
// function make(array) {
//   // 判断是否为叶节点
//   if (array.length == 1) return new Tree(null, array[0], null);
//   return new Tree(make(array[0]), array[1], make(array[2]));
// }
// let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
// // 遍历二叉树
// var result = [];
// for (let node of inorder(tree)) {
//   result.push(node);
// }
// // result
// // ['a', 'b', 'c', 'd', 'e', 'f', 'g']


// function* F() {
//   this.a = 1;
//   yield this.b = 2;
//   yield this.c = 3;
// }
// var obj = {};
// var f = F.call(obj);
//
// f.next();  // Object {value: 2, done: false}
// f.next();  // Object {value: 3, done: false}
// f.next();  // Object {value: undefined, done: true}
//
// obj.a // 1
// obj.b // 2
// obj.c // 3


// function* gen() {
//   this.a = 1;
//   yield this.b = 2;
//   yield this.c = 3;
// }
//
// function F() {
//   return gen.call(gen.prototype);
// }
//
// var f = new F();
// f.next();  // Object {value: 2, done: false}
// f.next();  // Object {value: 3, done: false}
// f.next();  // Object {value: undefined, done: true}
// _.log(f)

//
// function* main() {
//   var result = yield request("http://some.url");
//   // console.log(result);
//   return 444
// }
// function request(url) {
//   // makeAjaxCall(url, function(response){
//
//     return new Promise((res) => {
//       setTimeout(() => {
//         res(1111)
//       }, 3000)
//     })
//     // it.next(response);
//   // });
// }
// var it = main();
// const result = it.next();
// // _.log(result.value)
// result.value.then(res => {
//   console.log(res)
// })
//
// _.log(it.next());
//

// const Thunk = function(fn) {
//   return function (...args) {
//     return function (callback) {
//       return fn.call(this, ...args, callback);
//     }
//   };
// };

// function thunkify(fn) {
//   return function() {
//     var args = new Array(arguments.length);
//     var ctx = this;
//     for (var i = 0; i < args.length; ++i) {
//       args[i] = arguments[i];
//     }
//     return function (done) {
//       var called;
//       args.push(function () {
//         if (called) return;
//         called = true;
//         done.apply(null, arguments);
//       });
//       try {
//         fn.apply(ctx, args);
//       } catch (err) {
//         done(err);
//       }
//     }
//   }
// };
//
// function f(a, b, callback){
//   var sum = a + b;
//   callback(sum);
//   callback(sum);
// }
// var ft = thunkify(f);
// var print = console.log.bind(console);
// ft(1, 2)(print);
//



// 基于thunk执行函数
// function run(fn) {
//   var gen = fn();
//
//   function next(err, data) {
//     var result = gen.next(data);
//     if (result.done) return;
//     result.value(next);
//   }
//   next();
// }
// function* g() {
//   // ...
// }
// run(g);
//
// // 基于promise 执行函数
// function run(gen){
//   var g = gen();
//   function next(data){
//     var result = g.next(data);
//     if (result.done) return result.value;
//     result.value.then(function(data){
//       next(data);
//     });
//   }
//   next();
// }
// run(gen);















