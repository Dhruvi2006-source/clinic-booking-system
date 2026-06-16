const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing database records...');
  await prisma.appointment.deleteMany({});
  await prisma.doctor.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Seeding doctors...');
  console.log(`Created admin: ${admin.email}`);

  const patient = await prisma.user.create({
    data: {
      name: 'Default Patient',
      email: 'patient@example.com',
      password: patientPasswordHash,
      role: 'PATIENT'
    }
  });
  console.log(`Created patient: ${patient.email}`);

  console.log('Database seeding successfully completed.');
}

main()
  .catch((e) => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
