function co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            const { value, done } = it.next(data);
            if(!done) {
                Promise.resolve(value).then(data => next(data))
            } else {
                resolve(value)
            }
        }
        next();
    })
}

function *Test() {
    const first = yield 1;
    const second = first + 2;
    const third = second + 3;
    return third
}

co(Test()).then(res => {
    console.log(res)
})