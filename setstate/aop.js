var myFunc = function(){
    console.log(2);
  }

  Function.prototype.before = function(fn){
    var _this = this;       //用来保存调用这个函数的引用，如myFunc调用此函数，则_this指向myFunc
    return function(){      //返回一个函数，相当于一个代理函数，也就是说，这里包含了原函数和新函数，原函数指的是myFunc，新函数指的是fn
        fn.apply(this,arguments);   //修正this的指向，将this指针指向fn，将myFunc接收的参数传给fn处理。
        return _this.apply(this,arguments);     //执行原函数
    }
  }

  Function.prototype.after = function(fn){
    var _this = this;
    return function(){
        var r = _this.apply(this,arguments); //先执行原函数，也就是myFunc
        fn.apply(this,arguments);   //再执行新函数
        return r;
    }
  }
  myFunc = myFunc.before(function(){
    console.log(1);
  }).after(function(){
    console.log(3);
  });

  // 参考
  // https://segmentfault.com/a/1190000010820460
  // 扩展
  // https://www.cnblogs.com/rubylouvre/archive/2009/08/08/1541578.html

  myFunc();   //先输出1,再输出2,最后输出3





