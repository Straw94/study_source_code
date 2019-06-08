const log = console.log.bind(console);

interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

var ooo:{a?:string,b?:number} = {};

let {a = 'something', b = 2} = ooo;

console.log(a);
console.log(b);


interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch: SearchFunc = function mySearch(source, subString) {
    let result = source.search(subString);
    return result > -1;
};

// mySearch('aaa', 'bbb');
log(mySearch('aaa', '1'))


interface StringArray {
    [indexs: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];


interface ClockInterfaces {
    currentTime: Date;
    setTime(d: Date): void;
}
class Clock implements ClockInterfaces {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}




interface ClockConstructor {
    new (h: number, m: number): ClockInterface;
}
interface ClockInterface {
    tick(): void;
}
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
        return 123
    }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);



interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
