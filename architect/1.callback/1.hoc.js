// aop 方法
Function.prototype.before = function(beforeFn) {
    return (...args) => {
        beforeFn(...args);
        return this(...args);
    }
}

Function.prototype.after = function(afterFn) {
    return (...args) => {
        const result = this(...args);
        afterFn(...args);
        return result;
    }
}


const say = (...args) => {
    console.log('说话', args);
}

const newSay = say.before(() => {
    console.log('天气很好');
}).before((args) => {
    console.log(`前置方法，参数: ${args}`)
}).after((args) => {
    console.log(`后置方法，参数: ${args}`)
})

newSay(1,2,3);