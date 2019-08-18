// 并发
const fs = require('fs');

let schoolInfo = {};

let e = {
    arr: [],
    on(fn) {
        this.arr.push(fn);
    },
    emit() {
        this.arr.forEach(fn => fn());
    }
}

e.on(() => {
    console.log('ok')
})

e.on(() => {
    if(Object.keys(schoolInfo).length === 2) console.log(schoolInfo);
})


fs.readFile('architect/1.highfunction/testfile/name.txt', 'utf8', (err, data) => {
    schoolInfo.name = data;
    e.emit();
})

fs.readFile('architect/1.highfunction/testfile//age.txt', 'utf8', (err, data) => {
    schoolInfo.age = data;
    e.emit();
})