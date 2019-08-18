const after = (times, fn) => () => --times === 0 && fn();

let newAfter = after(3, () => {
    console.log('三次后调用')
})

newAfter();
newAfter();
newAfter();
newAfter();
newAfter();
newAfter();