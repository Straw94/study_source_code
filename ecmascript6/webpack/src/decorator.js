// const mixines = (...list) => (target) => { Object.assign(target.prototype, ...list) }
//
// const Foo = {
//   foo() { console.log('foo') }
// };
//
// @mixines(Foo)
// class MyClass {}
//
// let obj = new MyClass();
// obj.foo()

// const readonly = (target, name, descriptor) => {
//   _.log(target);
//   _.log(name);
//   _.log(descriptor);
//   descriptor.writable = false;
//   return descriptor;
// }
//
// class Person {
//   @readonly
//   names() { return `${this.first} ${this.last}` }
// }
//
// const Child = new Person();
//
// Child.names()






//
// class Math {
//   @log
//   add(a, b) {
//     return a + b;
//   }
// }
//
// function log(target, name, descriptor) {
//   var oldValue = descriptor.value;
//
//   descriptor.value = function() {
//     console.log(`Calling ${name} with`, arguments);
//     return oldValue.apply(this, arguments);
//   };
//
//   return descriptor;
// }
//
// const math = new Math();
// math.add(2, 4);



let Mixin1 = (superclass) => class extends superclass {
  foo() {
    console.log('foo from Mixin1');
    if (super.foo) super.foo();
  }
};

let Mixin2 = (superclass) => class extends superclass {
  foo() {
    console.log('foo from Mixin2');
    if (super.foo) super.foo();
  }
};
class S {
  foo() {
    console.log('foo from S');
  }
}
class C extends Mixin1(Mixin2(S)) {
  foo() {
    console.log('foo from C');
    super.foo();
  }
}

new C().foo()














