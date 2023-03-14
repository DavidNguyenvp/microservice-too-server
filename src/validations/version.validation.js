const Joi = require('joi');
const { serviceName } = require('./custom.validation');

const createVersion = {
  body: Joi.object().keys({
    versionName: Joi.string().required().custom(serviceName),
  }),
};



module.exports = {
    createVersion
};
