const { loginService } = require('../service');

const loginControl = async (res, params) => {
    const response = loginService.getToken(params);
    res.send(response);
}

module.exports = {
    loginControl,
}