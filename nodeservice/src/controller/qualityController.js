const { qualityCheckService } = require('../service');

const qualityController = async (res, params) => {
    const response = qualityCheckService.qualityCheckService(params);
    res.send(response);
}

module.exports = {
    qualityController,
}