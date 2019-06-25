module.debounce = (func, wait = 3000, immediate = false) => {
    let timer = null;
    let timestamp = null;
    return function() {
      let now = Date.now();
      let diffence = timestamp ? now - timestamp : false;
      if(diffence && diffence < wait) clearTimeout(timer);
      timestamp = now;

      if(immediate) {
        immediate = false;
        return func();
      } else {
        timer = setTimeout(() => {
          func();
        }, wait);
      }
    }
}


function debounce(func, wait, immediate) {
  let timeout, args, context, result;
  let timestamp = 0;
  let later = function() {
    let now = +new Date();
    // 据上一次触发时间间隔
    let last = now - timestamp;
    // 下次触发 func 剩余的时间
    let remaining = wait - last;
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    } else {
      timeout = setTimeout(later, remaining);
    }
  };

  /**
   * 防抖操作实现
   */
  let debounced = function() {
    let now = +new Date();
    context = this;
    args = arguments;
    timestamp = now;
    // 是否立即执行
    let callNow = immediate && !timeout;

    // 如果延时不存在，重新设定延时
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    // 如果没有剩余的时间了或者你改了系统时间
    if (callNow) {
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
    return result;
  };
  return debounced;
}