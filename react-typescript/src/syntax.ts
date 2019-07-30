interface I_Test {
  [property: string]: any;
}

abstract class Parent {
  constructor(private ParentName: string) {};

  [property: string]: any;

  printProperty(property: string) {
    // console.log(this.ParentName);
    console.log(this[property])
  }
  abstract print(property: string): void;
}


class Child extends Parent {
  constructor(public name: string, parentname: string) {
    super(parentname);
  }

  print(property: any): void {
    console.log(this.name);
  }
}

const test = new Child('child', 'parent');
test.printProperty('ParentName');
test.print('test');



export default () => {}
