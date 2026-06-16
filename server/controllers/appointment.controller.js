const appointmentService = require('../services/appointment.service');

const bookAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);

    return res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

const getAppointments = async (req, res, next) => {
  try {
    const { email, role } = req.user;
    const appointments = await appointmentService.getAllAppointments(email, role);

    return res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

const getAppointmentDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, role } = req.user;
    const appointment = await appointmentService.getAppointmentById(id, email, role);

    return res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  bookAppointment,
  getAppointments,
  getAppointmentDetail
};
