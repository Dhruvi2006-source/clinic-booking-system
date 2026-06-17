const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing database records...');
  await prisma.appointment.deleteMany({});
  await prisma.doctor.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Hashing passwords...');
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const patientPasswordHash = await bcrypt.hash('patient123', 10);

  console.log('Seeding default users...');
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@auraclinic.com',
      password: adminPasswordHash,
      role: 'ADMIN'
    }
  });
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

  console.log('Hashing doctor passwords...');
  const doctorPasswordHash = await bcrypt.hash('123456', 10);

  console.log('Seeding doctors...');
  const doctorsData = [
    {
      name: 'Dr. Evelyn Monroe',
      email: 'monroe@auraclinic.com',
      specialty: 'Cardiology',
      bio: 'Board-certified cardiologist specializing in preventive cardiovascular medicine, heart failure management, and advanced non-invasive cardiac imaging.',
      experience: 12,
      rating: 4.9,
      consultationFee: 280.0,
      image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'Dr. Marcus Vance',
      email: 'vance@auraclinic.com',
      specialty: 'Neurology',
      bio: 'Expert clinical neurologist focusing on neuromuscular disorders, chronic migraine therapy, sleep medicine, and comprehensive stroke prevention research.',
      experience: 15,
      rating: 4.8,
      consultationFee: 320.0,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'Dr. Sarah Jenkins',
      email: 'jenkins@auraclinic.com',
      specialty: 'Dermatology',
      bio: 'Dedicated dermatologist passionate about clinical skincare treatments, pediatric dermatology, early melanoma diagnosis, and state-of-the-art laser surgeries.',
      experience: 8,
      rating: 4.9,
      consultationFee: 240.0,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80'
    }
  ];

  for (const doc of doctorsData) {
    const user = await prisma.user.create({
      data: {
        name: doc.name,
        email: doc.email,
        password: doctorPasswordHash,
        role: 'DOCTOR'
      }
    });

    const createdDoctor = await prisma.doctor.create({
      data: {
        name: doc.name,
        specialty: doc.specialty,
        bio: doc.bio,
        experience: doc.experience,
        rating: doc.rating,
        consultationFee: doc.consultationFee,
        image: doc.image,
        userId: user.id
      }
    });
    console.log(`Created doctor: ${createdDoctor.name} linked to user: ${user.email} (ID: ${createdDoctor.id})`);
  }

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
