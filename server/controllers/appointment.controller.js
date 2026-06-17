const appointmentService = require('../services/appointment.service');

const bookAppointment = async (req, res, next) => {
  try {
    // Override patientEmail and patientName from authenticated user
    const appointmentData = {
      ...req.body,
      patientEmail: req.user.email,
      patientName: req.user.name
    };
    const appointment = await appointmentService.createAppointment(appointmentData);

    return res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

const getBookedSlots = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date query parameter is required'
      });
    }

    const slots = await appointmentService.getBookedSlotsForDoctor(doctorId, date);
    return res.status(200).json({
      success: true,
      data: slots
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
  getBookedSlots,
  getAppointments,
  getAppointmentDetail
};
