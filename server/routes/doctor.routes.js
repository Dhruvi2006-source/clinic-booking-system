const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorDetail);
router.put('/:id/availability', authenticate, doctorController.updateAvailability);

module.exports = router;
