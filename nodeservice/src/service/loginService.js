const resData = require('../untils/response');

const getToken = (params) => {
    let rtnData = {};
    const { username, password } = params;
    if(username === 'user' && password === 'user') {
        rtnData = resData({
            status: 1,
            msg: '成功',
            data: {
                token: 'asdf5213fasdf5nahgn234jg98aufn',
            },
        })
    } else {
        rtnData = resData({
            status: 1,
            msg: '用户名密码错误！',
            data: null,
        })
    }
    return rtnData
}

module.exports = {
    getToken,
}