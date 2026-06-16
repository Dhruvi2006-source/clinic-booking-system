const { z } = require('zod');

const appointmentSchema = z.object({
  doctorId: z.string().min(1, 'Doctor ID is required'),
  patientName: z.string().min(2, 'Patient name must be at least 2 characters long'),
  patientEmail: z.string().email('Invalid patient email format'),
  patientPhone: z.string().min(10, 'Patient phone must be at least 10 characters long'),
  consultationType: z.enum(['VIRTUAL', 'IN_CLINIC'], {
    errorMap: () => ({ message: 'Consultation type must be VIRTUAL or IN_CLINIC' })
  }),
  appointmentDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid datetime format for appointment date' })
    .transform((val) => new Date(val))
});

module.exports = {
  appointmentSchema
};
