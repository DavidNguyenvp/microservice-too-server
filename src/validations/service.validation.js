const Joi = require('joi');
const { serviceName } = require('./custom.validation');

const createService = {
  body: Joi.object().keys({
    serviceName: Joi.string().required().custom(serviceName),
    serviceUrl: Joi.string().required(),
    status: Joi.string().required(),
  }),
};



module.exports = {
    createService
};
