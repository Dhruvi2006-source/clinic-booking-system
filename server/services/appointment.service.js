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

  // Enforce Business Rule: Prevent historical bookings
  const targetDate = new Date(appointmentDate);
  if (targetDate <= new Date()) {
    const error = new Error('Appointment date and time must be in the future');
    error.statusCode = 400;
    throw error;
  }

  // Enforce Business Rule: Prevent duplicate appointment booking:
  // Same doctor, Same appointmentDate
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

const getBookedSlotsForDoctor = async (doctorId, dateStr) => {
  const parsedDate = new Date(dateStr);
  if (isNaN(parsedDate.getTime())) {
    const error = new Error('Invalid date format');
    error.statusCode = 400;
    throw error;
  }

  // Define start and end of that day in UTC/local boundary
  const startOfDay = new Date(parsedDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(parsedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId,
      appointmentDate: {
        gte: startOfDay,
        lte: endOfDay
      }
    },
    select: {
      appointmentDate: true
    }
  });

  return appointments.map(app => app.appointmentDate.toISOString());
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
  getBookedSlotsForDoctor,
  getAllAppointments,
  getAppointmentById
};
