const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { serviceService } = require('../services');

const createService = catchAsync(async (req, res) => {
  const service = await serviceService.createService(req.body);
  res.status(httpStatus.CREATED).send(service);
});

const getServices = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['serviceName', 'serviceUrl', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await serviceService.queryServices(filter, options);
  res.send(result);
});

const updateService = catchAsync(async (req, res) => {
    const service = await serviceService.updateServiceById(req.body.id, req.body);
    res.send(service);
  });
  
  const deleteService = catchAsync(async (req, res) => {
    const query = pick(req.query, ['id']);
    await serviceService.deleteServiceById(query.id)
    res.status(httpStatus.NO_CONTENT).send();
  });


module.exports = {
  createService,
  getServices,
  updateService,
  deleteService
};
