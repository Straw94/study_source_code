const fs = require('fs');
const controller = require('./controller');

console.log(controller.qualityController.qualityController)
module.exports = (app) => {
  // 登陆接口
  app.post('/testdemointerface/login', function(req, res) {
    controller.loginController.loginControl(res, req.body);
  });

  app.get('/testdemointerface/getqualitylist', function(req, res) {
    controller.qualityController.qualityController(res, req.query);
  })
}
