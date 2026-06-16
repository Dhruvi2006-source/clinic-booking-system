const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { authenticate } = require('../middleware/auth.middleware');
const validate = require('../middleware/validation.middleware');
const { appointmentSchema } = require('../validators/appointment.validation');

router.post('/', validate(appointmentSchema), appointmentController.bookAppointment);
router.get('/', authenticate, appointmentController.getAppointments);
router.get('/:id', authenticate, appointmentController.getAppointmentDetail);

module.exports = router;
