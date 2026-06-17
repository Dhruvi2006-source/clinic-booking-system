const doctorService = require('../services/doctor.service');

const getDoctors = async (req, res, next) => {
  try {
    const doctors = await doctorService.getAllDoctors();

    return res.status(200).json({
      success: true,
      data: doctors
    });
  } catch (error) {
    next(error);
  }
};

const getDoctorDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doctor = await doctorService.getDoctorById(id);

    return res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

const updateAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { onDuty, activeSlots } = req.body;

    if (req.user.role === 'DOCTOR') {
      const doctor = await doctorService.getDoctorById(id);
      if (doctor.userId !== req.user.id) {
        const error = new Error('Access denied. You can only update your own availability.');
        error.statusCode = 403;
        throw error;
      }
    } else if (req.user.role !== 'ADMIN') {
      const error = new Error('Access denied. Insufficient permissions.');
      error.statusCode = 403;
      throw error;
    }

    const updated = await doctorService.updateDoctorAvailability(id, onDuty, activeSlots);
    return res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDoctors,
  getDoctorDetail,
  updateAvailability
};
