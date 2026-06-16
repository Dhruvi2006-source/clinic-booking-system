const prisma = require('../config/db');

const getStats = async (req, res, next) => {
  try {
    const totalDoctors = await prisma.doctor.count();
    const totalAppointments = await prisma.appointment.count();

    // Get today's range (midnight to midnight)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const todayAppointments = await prisma.appointment.count({
      where: {
        appointmentDate: {
          gte: todayStart,
          lt: todayEnd
        }
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        totalDoctors,
        totalAppointments,
        todayAppointments
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats
};
