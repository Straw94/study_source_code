// class Parent {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
//
//   printParent(msg: string) {
//     console.log(`parentPrint: ${msg}`);
//   }
// }
//
// class ChildClass extends Parent {
//   constructor(name: string) {
//     super(name);
//   }
//
//   printChild(msg: string) {
//     console.log(`childPring: ${msg}`);
//   }
//
//   printParent(msg: string) {
//     super.printParent(msg)
//   }
// }
//
// const testClass = new ChildClass('anran');
//
// testClass.printChild('msg~');
// testClass.printParent('msg2~');


// class Animal {
//     private name: string;
//     constructor(theName: string) { this.name = theName; }
// }
// new Animal("Cat").name;   // 报错


/*
  * 构造函数也可以被标记成 protected。
  * 这意味着这个类不能在包含它的类外被实例化，但是能被继承
*/
// class Person {
//     protected name: string;
//     protected constructor(theName: string) { this.name = theName; }
// }
// // Employee 能够继承 Person
// class Employee extends Person {
//     private department: string;
//     constructor(name: string, department: string) {
//         super(name);
//         this.department = department;
//     }
//     public getElevatorPitch() {
//         return `Hello, my name is ${this.name} and I work in ${this.department}.`;
//     }
// }
// let howard = new Employee("Howard", "Sales");
// let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.


// class Octopus {
//     readonly name: string;
//     readonly numberOfLegs: number = 8;
//     constructor (theName: string) {
//         this.name = theName;
//     }
// }
// let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.


// class Octopus {
//     readonly numberOfLegs: number = 8;
//     constructor(readonly name: string) {
//     }
// }
// const readonlyTest = new Octopus('anran');
// console.log(readonlyTest.name)


// abstract class Department {
//     constructor(public name: string) {
//     }
//     printName(): void {
//         console.log('Department name: ' + this.name);
//     }
//     abstract printMeeting(): void; // 必须在派生类中实现
// }
//
// class AccountingDepartment extends Department {
//     constructor() {
//         super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
//     }
//     printMeeting(): void {
//         console.log('The Accounting Department meets each Monday at 10am.');
//     }
//     generateReports(): void {
//         console.log('Generating accounting reports...');
//     }
// }
//
// let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
// department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
// department.printName();
// department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在


// class Greeter {
//     static standardGreeting = "Hello, there";
//     greeting: string;
//     greet() {
//         if (this.greeting) {
//             return "Hello, " + this.greeting;
//         }
//         else {
//             return Greeter.standardGreeting;
//         }
//     }
// }
// let greeter1: Greeter;
// greeter1 = new Greeter();
// greeter1.greeting = "what's mother fucker!";
// console.log(greeter1.greet());
// let greeterMaker: typeof Greeter = Greeter;
// greeterMaker.standardGreeting = "Hey there!";
// let greeter2: Greeter = new greeterMaker();
// console.log(greeter2.greet());



// class Point {
//     x: number;
//     y: number;
// }
// interface Point3d extends Point {
//     z: number;
// }
// let point3d: Point3d = {x: 1, y: 2, z: 3};







