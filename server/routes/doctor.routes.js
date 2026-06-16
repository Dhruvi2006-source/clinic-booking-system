const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');

router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorDetail);

module.exports = router;
