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
