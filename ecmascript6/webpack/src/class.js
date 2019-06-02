
// 自动绑定构造函数this
// function selfish (target) {
//   const cache = new WeakMap();
//   const handler = {
//     get (target, key) {
//       const value = Reflect.get(target, key);
//       if (typeof value !== 'function') {
//         return value;
//       }
//       if (!cache.has(value)) {
//         cache.set(value, value.bind(target));
//       }
//       return cache.get(value);
//     }
//   };
//   const proxy = new Proxy(target, handler);
//   return proxy;
// }
// const logger = selfish(new Logger());
//
// class Obj {
//   constructor() {
//     this.getThis = () => this;
//   }
// }
// const myObj = new Obj();
// myObj.getThis() === myObj




// function Person(name) {
//   if (new.target !== undefined) {
//     this.name = name;
//   } else {
//     throw new Error('必须使用 new 命令生成实例');
//   }
// }

// // 另一种写法
// function Person(name) {
//   if (new.target === Person) {
//     this.name = name;
//   } else {
//     throw new Error('必须使用 new 命令生成实例');
//   }
// }
// var person = new Person('张三'); // 正确
// // var notAPerson = Person.call(person, '张三');  // 报错
//



// class A {
//   constructor() {
//     console.log(new.target.name);
//   }
// }
// class B extends A {
//   constructor() {
//     super();
//   }
// }
// new A() // A
// new B() // B

// class A {
//   constructor(value) {
//     this.value = value;
//   }
//   static hello() {
//     console.log('hello world');
//   }
//   print() {
//     console.log(this);
//   }
//   printValue() {
//     console.log(this.value)
//   }
// }
//
// class B extends A {
//   printSuper() {
//     super.print();  // 实际上执行的是super.print.call(this)
//   }
// }
//
// const TestExtends = new B('value');
// _.log(TestExtends)
// TestExtends.printValue();
// TestExtends.printSuper();
//


class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print();
  }
}

_.log(new B())


/*
 * mixin 实现
*/
// function mix(...mixins) {
//   class Mix {
//     constructor() {
//       for (let mixin of mixins) {
//         copyProperties(this, new mixin()); // 拷贝实例属性
//       }
//     }
//   }
//   for (let mixin of mixins) {
//     copyProperties(Mix, mixin); // 拷贝静态属性
//     copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
//   }
//   return Mix;
// }
// function copyProperties(target, source) {
//   for (let key of Reflect.ownKeys(source)) {
//     if ( key !== 'constructor'
//       && key !== 'prototype'
//       && key !== 'name'
//     ) {
//       let desc = Object.getOwnPropertyDescriptor(source, key);
//       Object.defineProperty(target, key, desc);
//     }
//   }
// }






































