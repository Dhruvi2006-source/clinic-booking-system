export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  avatar: string;
  bio: string;
  experience: string;
  languages: string[];
  location: string;
  nextAvailable: string;
  verified: boolean;
  availableToday: boolean;
  telehealth: boolean;
  initialConsultationFee: number;
  boardCertifications: { title: string; board: string }[];
  specialties: string[];
  onDuty?: boolean;
  activeSlots?: string[];
}

export interface Review {
  id: string;
  author: string;
  avatarLetter: string;
  avatarBg: string;
  text: string;
  rating: number;
  time: string;
  type: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  type: string;
  time: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface Message {
  id: string;
  text: string;
  time: string;
  sender: 'doctor' | 'patient';
  isRead: boolean;
}

export interface Vital {
  name: string;
  value: string;
  unit: string;
  status?: string;
  icon: string;
}

export function mapApiDoctor(doc: any): Doctor {
  return {
    id: doc.id,
    name: doc.name,
    title: "MD, Board-Certified",
    specialty: doc.specialty,
    rating: doc.rating,
    reviewsCount: Math.floor(doc.rating * 25) + 12,
    avatar: doc.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80",
    bio: doc.bio,
    experience: `${doc.experience}+ Years`,
    languages: ["English", "Spanish"],
    location: "Midtown Manhattan Suite, NY",
    nextAvailable: "Today, 2:00 PM",
    verified: true,
    availableToday: true,
    telehealth: true,
    initialConsultationFee: doc.consultationFee,
    boardCertifications: [
      { title: `${doc.specialty} Specialist`, board: `American Board of ${doc.specialty}` },
    ],
    specialties: [doc.specialty, "Preventive Exams", "Chronic Care Management"],
  };
}
