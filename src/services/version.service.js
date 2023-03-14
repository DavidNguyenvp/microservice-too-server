const httpStatus = require('http-status');
const { Version } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a version
 * @param {Object} versionBody
 * @returns {Promise<User>}
 */
const createVersion = async (versionBody) => {
  if (await Version.isNameTaken(versionBody.versionName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'version name already taken');
  }
  return Version.create(versionBody);
};

/**
 * Query for version
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryVersions = async (filter, options) => {
  const versions = await Version.paginate(filter, options);
  return versions;
};

/**
 * Update version by id
 * @param {ObjectId} versionId
 * @param {Object} updateBody
 * @returns {Promise<version>}
 */
const updateVersionById = async (versionId, updateBody) => {
  const version = await getVersionById(versionId);
  if (!version) {
    throw new ApiError(httpStatus.NOT_FOUND, 'version not found');
  }
  if (updateBody.versionName && (await Version.isNameTaken(updateBody.versionName, versionId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'version name already taken');
  }
  Object.assign(version, updateBody);
  await version.save();
  return version;
};

/**
 * Delete version by id
 * @param {ObjectId} versionId
 * @returns {Promise<version>}
 */
const deleteVersionById = async (versionId) => {
  const version = await getVersionById(versionId);
  if (!version) {
    throw new ApiError(httpStatus.NOT_FOUND, 'version not found');
  }
  await version.remove();
  return version;
};


/**
 * Get version by id
 * @param {ObjectId} id
 * @returns {Promise<Version>}
 */
const getVersionById = async (id) => {
  return Version.findById(id);
};


module.exports = {
  createVersion,
  queryVersions,
  getVersionById,
  updateVersionById,
  deleteVersionById
};
