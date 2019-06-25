// function handlePromise(promises, x, resolve, reject) {
//   if(promises === x) throw new Error('circular reference');
//
//   if(x !== 'null' && (typeof x === 'object' || typeof x === 'function')) {
//     let called;
//
//     if(typeof x === 'function') {
//       try {
//
//       } catch (e) {
//         if (called) return;
//         called = true;
//         reject(e);
//       }
//     } else {
//       resolve(x)
//     }
//   }
// }
//
//
// class Promise {
//   constructor(executor) {
//     this.status = 'pending';
//     this.value = null;
//     this.reason = null;
//     this.failStore = [];
//     this.successStore = [];
//
//     const resolver = (value) => {
//       if(this.status === 'pending') {
//         this.status = 'resolve';
//         this.value = value;
//         this.successStore.forEach(func => func());
//       }
//     }
//
//     const rejecter = (reason) => {
//       if(this.status === 'pending') {
//         this.status = 'reject';
//         this.reason = reason;
//         this.failStore.forEach(func => func());
//       }
//     }
//
//     try {
//       executor(resolver, rejecter);
//     } catch (e) {
//       rejecter(e)
//     }
//   }
//
//   then(onFulFilled, onRejected) {
//     if (this.status === 'resolve') {
//       onFulFilled(this.value);
//     }
//
//     if (this.status === 'reject') {
//       onRejected(this.reason);
//     }
//
//     if (this.status === 'pending') {
//       this.successStore.push(() => {
//         onFulFilled(this.value);
//       })
//       this.failStore.push(() => {
//         onRejected(this.reason)
//       })
//     }
//   }
// }
//
//
//
//
// new Promise((resolve, reject) => {
//   console.log('executor')
//   setTimeout(() => {
//     console.log('settimeout')
//     resolve('1111');
//   }, 5000)
// })
// .then(res => {
//   console.log(res)
// }, err => {
//   console.error(`err: ${err}`)
// })
//
//

function handlePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('circular reference')); //如果是抛出错误
    }
    //判断x不是bull且x是对象或者函数
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let called; //called控制resolve或reject 只执行一次，多次调用没有任何作用。
        try {
            let then = x.then; //取x.then()方法
            if (typeof then === 'function') { //如果是函数，就认为它是返回新的promise
                then.call(x, y => {  //如果y是promise继续递归解析
                    if (called) return;
                    called = true;
                    handlePromise(promise2, y, resolve, reject); //递归解析promise
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else { //不是函数，就是普通对象
                resolve(x); //直接将对象返回
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else { //x是普通值，直接走then的成功回调
        resolve(x);
    }
}
class Promise {
    constructor(executor) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.successStore = [];
        this.failStore = [];
        let resolve = (value) => {
            if (this.status === 'pending') {
                this.value = value;
                this.status = 'resolved';
                this.successStore.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if (this.status === 'pending') {
                this.reason = reason;
                this.status = 'rejected';
                this.failStore.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) { //原型上的方法
        let promise2; // 返回的新的promise
        if (this.status === 'resolved') {
            promise2 = new Promise((resolve, reject) => {
                try {
                    let x = onFulfilled(this.value);
                    console.log(`promise2: ${promise2}`)
                    handlePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }

            })
        }
        if (this.status === 'rejected') {
            promise2 = new Promise((resolve, reject) => {
                try {
                    let x = onRejected(this.reason); //x存放返回的结果
                    handlePromise(promise2, x, resolve, reject); //处理返回结果的函数，已经在上面定义
                } catch (e) {
                    reject(e);//报错执行reject
                }
            })
        }
        if (this.status === 'pending') {
            promise2 = new Promise((resolve, reject) => {
                this.successStore.push(() => {
                    try {
                        let x = onFulfilled(this.value); //x存放返回的结果
                        handlePromise(promise2, x, resolve, reject);//处理返回结果的函数，已经在上面定义
                    } catch (e) {
                        reject(e); //报错执行reject
                    }

                })
                this.failStore.push(() => {
                    try {
                        let x = onRejected(this.reason);//x存放返回的结果
                        handlePromise(promise2, x, resolve, reject);//处理返回结果的函数，已经在上面定义
                    } catch (e) {
                        reject(e);//报错执行reject
                    }
                })
            })
        }
        return promise2; //返回新的promise
    }
}

const test = function () {};
test.then = () => new Promise((res,rej) => {res('test func then')})

new Promise((res, rej) => {
  res()
}).then(res => {
  return new Promise((reso) => reso(1111))
}).then(res => {
  console.log(res)
})



















