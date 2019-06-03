export const print = (msg) => _.log(msg);


export class TestClass {
  constructor(val) {
    this.value = val;
  }
  getValue() {
    return this.value;
  }
}