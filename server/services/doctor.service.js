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
      image: true
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

module.exports = {
  getAllDoctors,
  getDoctorById
};
