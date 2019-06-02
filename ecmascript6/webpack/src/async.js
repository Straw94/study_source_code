/*
 * async 重写thenable 方法
 *
*/
// class Sleep {
//   constructor(timeout) {
//     this.timeout = timeout;
//   }
//   then(resolve, reject) {
//     const startTime = Date.now();
//     setTimeout(
//       () => resolve(Date.now() - startTime),
//       this.timeout
//     );
//   }
// }
//
// (async () => {
//   const actualTime = await new Sleep(1000);
//   console.log(actualTime);
// })();

/*
 * 多次重复尝试
 *
*/
const testPromise = (index) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      index == 2 ? res('success') : rej('error')
    }, 1000)
  })
}
const NUM_RETRIES = 3;
async function test() {
  let result = null;
  for (let i = 0; i < NUM_RETRIES; ++i) {
    try {
      result = await testPromise(i)
      break;
    } catch(err) {}
  }
  console.log(result); // 3
}

test();


