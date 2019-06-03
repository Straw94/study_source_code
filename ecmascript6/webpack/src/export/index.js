import * as test from './middleware';

test.print(111)
test.tests()

const valueClass = new test.TestClass('value');
_.log(valueClass.getValue());


