class Subject {
    constructor() {
        this.arr = [];
        this.state = '开心';
    }

    attach(o) {
        this.arr.push(o);
        return this;
    }

    setState(newState) {
        this.state = newState;
        this.arr.forEach(o => o.update(newState));
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    update(state) {
        console.log(`观察者: ${this.name}, 被观察者状态: ${state}`)
    }
}

const sub = new Subject('小宝宝');
const ob1 = new Observer('爸爸');
const ob2 = new Observer('妈妈');

sub.attach(ob1);
sub.attach(ob2);
sub.setState('不开心')