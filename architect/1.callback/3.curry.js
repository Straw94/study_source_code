// 柯里化
const checkType = (type, target) => Object.prototype.toString.call(target) === `[object ${type}]`;


const curry = (fn, ...argArr) => {
    return (...args) => {
        argArr = argArr.concat(args);
        if(fn.length > argArr.length) {
            return curry(fn, argArr)
        }
        return fn(...argArr);
    }
}

const utils = {};

const typeList = ['Number', 'String', 'Boolean', 'Function', 'Object'];

typeList.forEach(type => {
    console.log(type)
    utils['is' + type] = curry(checkType)(type);
});

console.log(utils.isNumber(1))