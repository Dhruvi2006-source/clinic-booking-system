const prisma = require('../config/db');

const updatePatientVitals = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bloodPressure, heartRate, weight, medicalReport } = req.body;

    let patient;
    if (id.includes('@')) {
      patient = await prisma.user.findUnique({
        where: { email: id }
      });
    } else {
      patient = await prisma.user.findUnique({
        where: { id }
      });
    }

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: `Patient with identifier ${id} not found`
      });
    }

    const updateData = {};
    if (bloodPressure !== undefined) updateData.bloodPressure = bloodPressure;
    if (heartRate !== undefined) updateData.heartRate = heartRate;
    if (weight !== undefined) updateData.weight = weight;
    if (medicalReport !== undefined) updateData.medicalReport = medicalReport;

    const updatedPatient = await prisma.user.update({
      where: { id: patient.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        bloodPressure: true,
        heartRate: true,
        weight: true,
        medicalReport: true
      }
    });

    return res.status(200).json({
      success: true,
      data: updatedPatient
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updatePatientVitals
};
