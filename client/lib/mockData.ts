import { Doctor, Appointment, Message, Vital, Review } from "../types";

export const mockDoctors: Doctor[] = [
  {
    id: "julian-mercer",
    name: "Dr. Julian Mercer",
    title: "MD, Board-Certified",
    specialty: "Internal Medicine",
    rating: 4.9,
    reviewsCount: 142,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80",
    bio: "Dr. Mercer specializes in primary care and acute adult illness management. He combines thorough diagnostic methods with a compassionate approach to support both quick-recovery checkups and chronic care management.",
    experience: "14+ Years",
    languages: ["English", "Spanish"],
    location: "Midtown Manhattan Suite, NY",
    nextAvailable: "Today, 2:00 PM",
    verified: true,
    availableToday: true,
    telehealth: true,
    initialConsultationFee: 150,
    boardCertifications: [
      { title: "Internal Medicine Specialist", board: "American Board of Internal Medicine" }
    ],
    specialties: ["Acute Illness Care", "Hypertension Control", "Diabetes Management", "Annual Screenings"]
  },
  {
    id: "clara-vance",
    name: "Dr. Clara Vance",
    title: "MD, Board-Certified",
    specialty: "Family Medicine",
    rating: 4.9,
    reviewsCount: 115,
    avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=256&q=80",
    bio: "Focused on holistic family health, preventive screening consultations, and prompt-care urgent treatments. Her empathetic patient care and check-up methods are highly rated in the metropolitan community.",
    experience: "10+ Years",
    languages: ["English", "French"],
    location: "Midtown Manhattan Suite, NY",
    nextAvailable: "Tomorrow, 10:00 AM",
    verified: true,
    availableToday: true,
    telehealth: true,
    initialConsultationFee: 140,
    boardCertifications: [
      { title: "Family Medicine Specialist", board: "American Board of Family Medicine" }
    ],
    specialties: ["Pediatric & Adult Acute Care", "Preventive Physicals", "Allergy Care", "Immunization Counseling"]
  },
  {
    id: "alexander-sterling",
    name: "Dr. Alexander Sterling",
    title: "MD, FACC",
    specialty: "Cardiology",
    rating: 4.9,
    reviewsCount: 128,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=256&q=80",
    bio: "Specializing in coronary interventions and preventative cardiology. Dr. Sterling works with general practitioners to provide rapid screening and cardiovascular risk profiles.",
    experience: "15+ Years",
    languages: ["English"],
    location: "Midtown Manhattan Suite, NY",
    nextAvailable: "Tomorrow, 11:00 AM",
    verified: true,
    availableToday: false,
    telehealth: true,
    initialConsultationFee: 250,
    boardCertifications: [
      { title: "Cardiovascular Disease", board: "American Board of Internal Medicine" }
    ],
    specialties: ["Preventive Cardiology", "Echocardiography", "Hypertension Management"]
  }
];

export const mockReviews: Review[] = [
  {
    id: "1",
    author: "Robert H.",
    avatarLetter: "R",
    avatarBg: "bg-secondary-fixed text-on-secondary-fixed",
    text: "Superb treatment. I walked in with severe seasonal allergy symptoms and was seen within 15 minutes. The physician was thorough, knowledgeable, and put me on a path to recovery immediately. The office is beautiful and spotless.",
    rating: 5,
    time: "2 weeks ago",
    type: "Allergy Care"
  },
  {
    id: "2",
    author: "Elena M.",
    avatarLetter: "E",
    avatarBg: "bg-tertiary-fixed text-on-tertiary-fixed",
    text: "I booked a same-day annual physical exam. The clinical team was exceptionally friendly and professional. They explained everything clearly and completed all the tests efficiently. Definitely my new go-to clinic.",
    rating: 5,
    time: "1 month ago",
    type: "Preventive Exam"
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
  { name: "Dr. Julian Mercer", specialty: "Internal Medicine", hours: "09:00 - 15:00", status: "Available", initials: "JM", bg: "bg-tertiary-fixed text-on-tertiary-fixed" },
  { name: "Dr. Clara Vance", specialty: "Family Medicine", hours: "11:00 - 18:00", status: "Available", initials: "CV", bg: "bg-secondary-fixed text-on-secondary-fixed" }
];

export const mockAdminAppointments = [
  { id: "PT-8492", patientName: "Arthur Morgan", initials: "AM", bg: "bg-primary-fixed-dim text-on-primary-fixed", doctorName: "Dr. J. Mercer", time: "09:30 AM", date: "Oct 24, 2026", status: "Confirmed" },
  { id: "PT-1102", patientName: "Sadie Adler", initials: "SL", bg: "bg-secondary-fixed-dim text-on-secondary-fixed", doctorName: "Dr. C. Vance", time: "11:15 AM", date: "Oct 24, 2026", status: "Pending" }
];
