// Promise 主要解决两大类问题，解决并发问题，链式调用的问题

// 初级：特点
// Promise 是一个类
// 每次new 一个promise都需要传递一个执行器， 执行器是立即执行的
// 执行器函数中有两个 resolve， reject
// 默认promies 有三个状态， pending resolve reject
// 状态不可改变
// 有一个then方法
// 可以调用多次




new Promise((resolve, reject) => {
    throw Error('something wrong!')
}).then(res => {}, err => {
    console.log('fail' + err)
})


const PENDING = 'PENDING';
const REJECTED = 'REJECTED';
const FULFILLED = 'FULFILLED';

class Promise {
    constructor(executor) {
        this.status = 'PENDING';
        this.value = undefined;
        this.reason = undefined;
        this.onRejectedCallbacks = [];
        this.onFulfuilledCallbacks = [];

        const resolve = (value) => {
            if(this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onFulfuilledCallbacks.forEach(cb => cb(this.value));
            }
        }
        const reject = (reason) => {
            if(this.status === REJECTED) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(cb => cb(this.reason));
            }
        }

        try {
            executor(resolve, reject);
        } catch(e) {
            reject(e);
        }
    }
    then(onFulfuilled, onRejected) {
        // onFulfuilled();
        if(this.status === FULFILLED) {
            onFulfuilled(this.value);
        }
        if(this.status === REJECTED) {
            onRejected(this.reason);
        }
        if(this.status === PENDING) {
            this.onFulfuilledCallbacks.push(onFulfuilled);
            this.onRejectedCallbacks.push(onRejected);
        }
    }
}


new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    })
    // reject('something wrong');
}).then(res => {
    console.log(res)
}, err => {
    console.log('fail' + err)
})