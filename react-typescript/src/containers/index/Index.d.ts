interface Parent {
  name: string;
  type: string;
}

interface Implate {
  age: number;
  sex: string;
}

class Person extends Parent implements Implate {

}
