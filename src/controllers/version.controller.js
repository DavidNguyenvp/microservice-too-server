const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { versionService } = require('../services');

const createVersion = catchAsync(async (req, res) => {
    console.log(req.body)
  const service = await versionService.createVersion(req.body);
  res.status(httpStatus.CREATED).send(service);
});

const getVersions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['versionName', 'versionId', 'description', 'dependences']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await versionService.queryVersions(filter, options);
  res.send(result);
});

const updateVersion = catchAsync(async (req, res) => {
    const service = await versionService.updateVersionById(req.body.id, req.body);
    res.send(service);
  });
  
  const deleteVersion = catchAsync(async (req, res) => {
    const query = pick(req.query, ['id']);
    await versionService.deleteVersionById(query.id)
    res.status(httpStatus.NO_CONTENT).send();
  });


module.exports = {
  createVersion,
  getVersions,
  updateVersion,
  deleteVersion
};
