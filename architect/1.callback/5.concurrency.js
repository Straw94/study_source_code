// 并发
const fs = require('fs');

let schoolInfo = {};

const after = (timers, fn) => (...args) => --timers === 0 && fn(...args);

const asyncBackTimes = after(2, () => {
    console.log('schoolInfo is ok!')
    console.log(schoolInfo)
})

fs.readFile('architect/1.highfunction/testfile/name.txt', 'utf8', (err, data) => {
    schoolInfo.name = data;
    asyncBackTimes();
})

fs.readFile('architect/1.highfunction/testfile//age.txt', 'utf8', (err, data) => {
    schoolInfo.age = data;
    asyncBackTimes();
})