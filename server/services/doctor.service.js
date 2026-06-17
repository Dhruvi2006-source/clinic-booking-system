const prisma = require('../config/db');

const getAllDoctors = async () => {
  return await prisma.doctor.findMany({
    select: {
      id: true,
      name: true,
      specialty: true,
      experience: true,
      rating: true,
      consultationFee: true,
      image: true,
      bio: true,
      onDuty: true,
      activeSlots: true
    }
  });
};

const getDoctorById = async (id) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id }
  });

  if (!doctor) {
    const error = new Error(`Doctor with ID ${id} not found`);
    error.statusCode = 404;
    throw error;
  }

  return doctor;
};

const updateDoctorAvailability = async (id, onDuty, activeSlots) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id }
  });

  if (!doctor) {
    const error = new Error(`Doctor with ID ${id} not found`);
    error.statusCode = 404;
    throw error;
  }

  const updateData = {};
  if (onDuty !== undefined) updateData.onDuty = onDuty;
  if (activeSlots !== undefined) updateData.activeSlots = activeSlots;

  return await prisma.doctor.update({
    where: { id },
    data: updateData
  });
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  updateDoctorAvailability
};
