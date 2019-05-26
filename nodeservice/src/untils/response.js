module.exports = (response = {}) => ({
    status: response.status || 0,
    code: response.code || 200,
    data:response.data || null,
    msg: response.msg || null,
})