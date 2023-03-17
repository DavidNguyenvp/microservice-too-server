const httpStatus = require('http-status');
const { Service } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a service
 * @param {Object} serviceBody
 * @returns {Promise<User>}
 */
const createService = async (serviceBody) => {
  if (await Service.isNameTaken(serviceBody.serviceName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service name already taken');
  }
  return Service.create(serviceBody);
};

/**
 * Query for service
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryServices = async (filter, options) => {
  const services = await Service.paginate(filter, options);
  return services;
};

/**
 * Update service by id
 * @param {ObjectId} serviceId
 * @param {Object} updateBody
 * @returns {Promise<Service>}
 */
const updateServiceById = async (serviceId, updateBody) => {
  const service = await getServiceById(serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'service not found');
  }
  if (updateBody.serviceName && (await Service.isNameTaken(updateBody.serviceName, serviceId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service name already taken');
  }
  Object.assign(service, updateBody);
  await service.save();
  return service;
};

/**
 * Delete service by id
 * @param {ObjectId} serviceId
 * @returns {Promise<Service>}
 */
const deleteServiceById = async (serviceId) => {
  const service = await getServiceById(serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'service not found');
  }
  await service.remove();
  return service;
};


/**
 * Get service by id
 * @param {ObjectId} id
 * @returns {Promise<Service>}
 */
const getServiceById = async (id) => {
  console.log(id)
  return Service.findById(id);
};


module.exports = {
  createService,
  queryServices,
  getServiceById,
  updateServiceById,
  deleteServiceById
};
