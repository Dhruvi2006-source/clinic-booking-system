import { Doctor, Appointment, Message, Vital, Review } from "../types";

export const mockDoctors: Doctor[] = [
  {
    id: "alexander-sterling",
    name: "Dr. Alexander Sterling",
    title: "MD, FACC",
    specialty: "Cardiology",
    rating: 4.9,
    reviewsCount: 128,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80",
    bio: "Specializing in complex coronary interventions and structural heart disease. Dr. Sterling combines cutting-edge technology with a deeply empathetic approach to ensure the highest standard of cardiovascular care for his patients.",
    experience: "15+ Years",
    languages: ["English", "French"],
    location: "Central Plaza Clinic, NY",
    nextAvailable: "Tomorrow, 11:00 AM",
    verified: true,
    availableToday: false,
    telehealth: true,
    initialConsultationFee: 250,
    boardCertifications: [
      { title: "Interventional Cardiology", board: "American Board of Internal Medicine" },
      { title: "Cardiovascular Disease", board: "American Board of Internal Medicine" }
    ],
    specialties: ["Coronary Angioplasty", "TAVR Procedures", "Echocardiography", "Preventive Cardiology", "Heart Failure Management"]
  },
  {
    id: "sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    title: "MD",
    specialty: "Cardiology",
    rating: 4.9,
    reviewsCount: 120,
    avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=256&q=80",
    bio: "Specializing in preventative heart health and advanced diagnostics.",
    experience: "10+ Years",
    languages: ["English", "Spanish"],
    location: "Central Plaza Clinic, NY",
    nextAvailable: "Tomorrow, 10:00 AM",
    verified: true,
    availableToday: true,
    telehealth: true,
    initialConsultationFee: 220,
    boardCertifications: [
      { title: "Cardiovascular Disease", board: "American Board of Internal Medicine" }
    ],
    specialties: ["Preventative Cardiology", "Cardiac Rehabilitation", "Electrocardiography"]
  },
  {
    id: "marcus-thorne",
    name: "Dr. Marcus Thorne",
    title: "MD",
    specialty: "Neurology",
    rating: 4.8,
    reviewsCount: 95,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=256&q=80",
    bio: "Expert in cognitive disorders and comprehensive neurological care.",
    experience: "12+ Years",
    languages: ["English"],
    location: "West End Medical, SF",
    nextAvailable: "Nov 15",
    verified: false,
    availableToday: false,
    telehealth: true,
    initialConsultationFee: 280,
    boardCertifications: [
      { title: "Neurology", board: "American Board of Psychiatry and Neurology" }
    ],
    specialties: ["Cognitive Disorders", "Migraine Treatment", "Neuropathy"]
  },
  {
    id: "elena-rostova",
    name: "Dr. Elena Rostova",
    title: "MD, PhD",
    specialty: "Dermatology",
    rating: 5.0,
    reviewsCount: 210,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80",
    bio: "Advanced cosmetic and medical dermatological procedures.",
    experience: "8+ Years",
    languages: ["English", "Russian"],
    location: "Aura Wellness Center, NY",
    nextAvailable: "Today, 2:30 PM",
    verified: true,
    availableToday: true,
    telehealth: true,
    initialConsultationFee: 200,
    boardCertifications: [
      { title: "Dermatology", board: "American Board of Dermatology" }
    ],
    specialties: ["Cosmetic Dermatology", "Skin Cancer Screening", "Acne & Scar Treatment"]
  }
];

export const mockReviews: Review[] = [
  {
    id: "1",
    author: "Michael T.",
    avatarLetter: "M",
    avatarBg: "bg-secondary-fixed text-on-secondary-fixed",
    text: "Dr. Sterling is exceptional. He took the time to explain my test results in a way I could easily understand and outlined a clear path forward. I felt completely at ease and confident in his care. The clinic environment is also top-notch.",
    rating: 5,
    time: "2 weeks ago",
    type: "Consultation"
  },
  {
    id: "2",
    author: "Sarah K.",
    avatarLetter: "S",
    avatarBg: "bg-tertiary-fixed text-on-tertiary-fixed",
    text: "Incredibly professional and reassuring. The procedure went smoothly, and his follow-up care was thorough. You can tell he genuinely cares about his patients' well-being. Highly recommend him for anyone needing cardiac care.",
    rating: 5,
    time: "1 month ago",
    type: "Procedure"
  }
];

export const mockVitals: Vital[] = [
  { name: "Blood Pressure", value: "118/75", unit: "mmHg", status: "Normal", icon: "monitor_heart" },
  { name: "Heart Rate", value: "72", unit: "bpm", status: "Normal", icon: "favorite" },
  { name: "Weight", value: "142", unit: "lbs", status: undefined, icon: "scale" }
];

export const mockMessages: Message[] = [
  { id: "msg-1", text: "Hello, can you see me clearly?", time: "10:02 AM", sender: "doctor", isRead: true },
  { id: "msg-2", text: "Yes, connection is perfect.", time: "10:03 AM", sender: "patient", isRead: true }
];

export const mockAdminStats = {
  appointmentsToday: 42,
  newPatients: 18,
  dailyRevenue: 12450,
  cancellations: 3
};

export const mockAdminRoster = [
  { name: "Dr. Elena Wei", specialty: "Cardiology", hours: "09:00 - 15:00", status: "Available", initials: "EW", bg: "bg-tertiary-fixed text-on-tertiary-fixed" },
  { name: "Dr. Marcus Reed", specialty: "Neurology", hours: "11:00 - 18:00", status: "Available", initials: "MR", bg: "bg-secondary-fixed text-on-secondary-fixed" },
  { name: "Dr. Sarah Jenkins", specialty: "Pediatrics", hours: "Off Today", status: "Off", initials: "SJ", bg: "bg-surface-variant text-on-surface" }
];

export const mockAdminAppointments = [
  { id: "PT-8492", patientName: "Arthur Morgan", initials: "AM", bg: "bg-primary-fixed-dim text-on-primary-fixed", doctorName: "Dr. E. Wei", time: "09:30 AM", date: "Oct 24, 2024", status: "Confirmed" },
  { id: "PT-1102", patientName: "Sadie Adler", initials: "SL", bg: "bg-secondary-fixed-dim text-on-secondary-fixed", doctorName: "Dr. M. Reed", time: "11:15 AM", date: "Oct 24, 2024", status: "Pending" },
  { id: "PT-0045", patientName: "John Marston", initials: "JM", bg: "bg-tertiary-fixed-dim text-on-tertiary-fixed", doctorName: "Dr. E. Wei", time: "02:00 PM", date: "Oct 24, 2024", status: "Confirmed" }
];
