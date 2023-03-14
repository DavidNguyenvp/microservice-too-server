const express = require('express');
const validate = require('../../middlewares/validate');
const versionValidation = require('../../validations/version.validation');
const versionController = require('../../controllers/version.controller');

const router = express.Router();

router.post('/create-version', validate(),versionController.createVersion);
router.get('/', validate(), versionController.getVersions);
router.post('/update-version', validate(), versionController.updateVersion);
router.delete('/delete-version', validate(), versionController.deleteVersion);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: version
 *   description: version management and retrieval
 */
 