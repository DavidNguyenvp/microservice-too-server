const { required } = require('joi');

module.exports.authController = require('./auth.controller');
module.exports.userController = require('./user.controller');
module.exports.serviceController = required('./service.controller');
module.exports.versionController = required('./version.controller.js');
