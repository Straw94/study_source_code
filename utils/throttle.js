module.throttle = function(func, wait = 3000, immediate = false) {
  let timestamp = null;

  return function() {
    let now = Date.now();
    let diffence = timestamp ? now - timestamp : false;
    if(diffence && timestamp < wait) return;
    return func();
    if(immediate) return func();
    setTimeout(() => {
      func();
    }, wait)
  }
}