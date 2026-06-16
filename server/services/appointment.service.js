const prisma = require('../config/db');

const createAppointment = async (appointmentData) => {
  const { doctorId, patientName, patientEmail, patientPhone, consultationType, appointmentDate } = appointmentData;

  // Verify the doctor exists
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId }
  });

  if (!doctor) {
    const error = new Error(`Doctor with ID ${doctorId} does not exist`);
    error.statusCode = 400;
    throw error;
  }

  // Enforce Business Rule: Prevent duplicate appointment booking:
  // Same doctor, Same appointmentDate
  const targetDate = new Date(appointmentDate);
  const duplicate = await prisma.appointment.findFirst({
    where: {
      doctorId,
      appointmentDate: targetDate
    }
  });

  if (duplicate) {
    const error = new Error('This doctor is already booked for an appointment at this exact date and time');
    error.statusCode = 400;
    throw error;
  }

  return await prisma.appointment.create({
    data: {
      doctorId,
      patientName,
      patientEmail,
      patientPhone,
      consultationType,
      appointmentDate: targetDate
    },
    include: {
      doctor: true
    }
  });
};

const getAllAppointments = async (userEmail, userRole) => {
  // Enforce security rule: Admin sees all; Patient sees only their own
  if (userRole === 'ADMIN') {
    return await prisma.appointment.findMany({
      include: {
        doctor: true
      },
      orderBy: {
        appointmentDate: 'asc'
      }
    });
  }

  return await prisma.appointment.findMany({
    where: {
      patientEmail: userEmail
    },
    include: {
      doctor: true
    },
    orderBy: {
      appointmentDate: 'asc'
    }
  });
};

const getAppointmentById = async (id, userEmail, userRole) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      doctor: true
    }
  });

  if (!appointment) {
    const error = new Error(`Appointment with ID ${id} not found`);
    error.statusCode = 404;
    throw error;
  }

  // Security check: patients can only access their own appointments
  if (userRole !== 'ADMIN' && appointment.patientEmail !== userEmail) {
    const error = new Error('Access denied. This appointment belongs to another patient.');
    error.statusCode = 403;
    throw error;
  }

  return appointment;
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById
};
