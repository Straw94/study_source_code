// react的事务
const perform = (fn, wrappers = []) => {
    wrappers.forEach(wrap => wrap.initial());
    const result = fn();
    wrappers.map(w => w).reverse().forEach(wrap => wrap.close());
    return result;
}

perform(() => {
        console.log('说什么东西')
    }, [
        {
            initial: () => console.log('你好'),
            close: () => console.log('再见'),
        },
        {
            initial: () => console.log('你好1'),
            close: () => console.log('再见1'),
        }
    ]
);