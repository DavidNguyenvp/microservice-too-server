const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const serviceValidation = require('../../validations/service.validation');
const serviceController = require('../../controllers/service.controller');

const router = express.Router();

router.post('/create-service', validate(serviceValidation.createService),serviceController.createService);
router.get('/', validate(), serviceController.getServices);
router.post('/update-service', validate(), serviceController.updateService);
router.delete('/delete-service', validate(), serviceController.deleteService);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Service
 *   description: Service management and retrieval
 */
 