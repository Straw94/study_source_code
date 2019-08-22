// 链式调用， 如果返回一个普通值， 会走下一个then的成功

// new Promise((resolve, reject) => {
//     reject('fail');
// }).then(() => {}, (err) => {
//     console.log(err);
// }).then(res => {
//     console.log(res);
//     console.log('second thenable');
// })

// new Promise((resolve, reject) => {
//     reject('fail');
// }).then(() => {}).then(res => {
//     console.log(res);
//     console.log('second thenable');
// },  (err) => {
//     console.log(err);
//     console.log('second thenable fail')
// })
// 抛出错误，then失败的方法
// 如果是promise 就让promise执行采用他的状态
// 返回一新的promise来实现链式调用



// talk is cheap，show me the code
// 链式调用， 如果返回一个普通值， 会走下一个then的成功
// 抛出错误，then失败的方法
// 如果是promise 就让promise执行采用他的状态
// 返回一新的promise来实现链式调用

const handlePromise = (promise2, x, resolve, reject) => {
    if(promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }

    if((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then;
            if(typeof then === 'function') {
                then.call(x, (y) => resolve(y), (r) => reject(r));
            }else {
                resolve(x)
            }
        } catch(e) {
            reject(e);
        }
    } else {
        resolve(x)
    }
}

const PENDING = 'PENDING';
const REJECTED = 'REJECTED';
const FULFILLED = 'FULFILLED';

class Promise {
    constructor(exectuor) {
        this.status = PENDING;
        this.reason = null;
        this.value = null;
        this.onRejectedCallbacks = [];
        this.onFulfilledCallbacks = [];

        const resolve = (value) => {
            this.status = FULFILLED
            this.value = value;
            this.onFulfilledCallbacks.forEach(cb => cb());
        }

        const reject = (reason) => {
            this.status = REJECTED
            this.reason = reason;
            this.onRejectedCallbacks.forEach(cb => cb());
        }


        try {
            exectuor(resolve, reject);
        } catch(e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        const promise2 = new Promise((resolve, reject) => {
            if(this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        handlePromise(promise2, x, resolve, reject);
                    }catch(e) {
                        console.log('test error')
                        reject(e);
                    }
                });
            }
            if(this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        handlePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                })
            }
            if(this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            handlePromise(promise2, x, resolve, reject);
                        } catch(e) {
                            reject(e);
                        }
                    })
                });

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            handlePromise(promise2, x, resolve, reject);
                        } catch(e) {
                            reject(e);
                        }
                    })
                });
            }
        })
        return promise2;
    }
}

new Promise((resolve, reject) => {
    resolve('success')
}).then(res => {
    console.log(res);
    throw new Error('something wrong!');
}).then(res => {}, err => {
    console.log('error');
    console.log(err)
});