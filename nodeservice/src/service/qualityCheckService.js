const resData = require('../untils/response');

const timeList = ['20190220',]

const initData = () => {
    const result = [];
    let i = 20190220;
    while(i < 20190402) {
        result.push({
            time: `${i}`,
            content: '王家赫' + i,
            orderStatue: Math.floor(Math.random(0, 1) * 10) + 1,
        })
        i++
    }
    return result;
}
const data = initData();

const qualityCheckService = (params) => {
    let rtnData = {};
    const { startTime, endTime, content, orderStatus, pageNum } = params;
    const cond = {
        ...endTime && {endTime},
        ...content && {content},
        ...startTime && {startTime},
        ...orderStatus && {orderStatus},
    };

    const resultList = data.filter(item => {
        if(cond.startTime && Number(item.time) < Number(cond.startTime)) return false
        if(cond.endTime && Number(item.time) > Number(cond.endTime)) return false
        if(cond.content && cond.content.indexOf(item.content) < 0) return false
        if(cond.orderStatus && item.orderStatus != cond.orderStatus) return false
        return true;
    })


    rtnData = resData({
        status: 1,
        msg: '用户名密码错误！',
        data: {
            list: resultList,
            pageNum: pageNum || 1,
            pageTotal: data.length,
        },
    })
    return rtnData
}

module.exports = {
    qualityCheckService,
}


