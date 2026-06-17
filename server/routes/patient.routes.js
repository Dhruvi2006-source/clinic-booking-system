const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.put('/:id/vitals', authenticate, authorize('DOCTOR', 'ADMIN'), patientController.updatePatientVitals);

module.exports = router;
