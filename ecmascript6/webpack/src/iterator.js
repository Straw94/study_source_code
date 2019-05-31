// class RangeIterator {
//   constructor(start, stop) {
//     this.value = start;
//     this.stop = stop;
//   }
//   [Symbol.iterator]() { return this; }
//   next() {
//     var value = this.value;
//     if (value < this.stop) {
//       this.value++;
//       return {done: false, value: value};
//     }
//     return {done: true, value: undefined};
//   }
// }
// function range(start, stop) {
//   return new RangeIterator(start, stop);
// }
// for (var value of range(0, 3)) {
//   _.log(value); // 0, 1, 2
// }



// class Obj {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
//   [Symbol.iterator]() {
//     var iterator = { next: next };
//     var current = this;
//     function next() {
//       if (current) {
//         var value = current.value;
//         current = current.next;
//         return { done: false, value: value };
//       } else {
//         return { done: true };
//       }
//     }
//     return iterator;
//   }
// }
// var one = new Obj(1);
// var two = new Obj(2);
// var three = new Obj(3);
// one.next = two;
// two.next = three;
// for (var i of one){
//   console.log(i); // 1, 2, 3
// }



// let iterable = {
//   0: 'a',
//   1: 'b',
//   2: 'c',
//   length: 3,
//   [Symbol.iterator]: Array.prototype[Symbol.iterator]
// };
// for (let item of iterable) {
//   console.log(item); // 'a', 'b', 'c'
// }



// // iterator数据结构使用 while循环
// var $iterator = ITERABLE[Symbol.iterator]();
// var $result = $iterator.next();
// while (!$result.done) {
//   var x = $result.value;
//   // ...
//   $result = $iterator.next();
// }



// const arr = ['red', 'green', 'blue'];
// for(let v of arr) {
//   console.log(v); // red green blue
// }
// const obj = {};
// obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
// for(let v of obj) {
//   console.log(v); // red green blue
// }
//


const obj = {
  a: 1,
  b: 2,
  c: 3
}
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

for (let [key, value] of entries(obj)) {
  console.log(key, '->', value);
}

