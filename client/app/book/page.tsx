"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Doctor } from "@/types";
import AuthModal from "@/components/AuthModal";

function BookContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 6-Step Wizard state
  const [step, setStep] = useState<number>(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultationType, setConsultationType] = useState<"Virtual" | "In-Clinic" | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Patient details form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");

  // Specialist filter in step 1
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("All");

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Dynamic Dates and Slots states
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Generate 14 days starting from today dynamically
  useEffect(() => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    setAvailableDates(dates);
    if (dates.length > 0) {
      setSelectedDate(dates[0].toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }));
    }
  }, []);

  // Check user authentication status and prefill details
  useEffect(() => {
    const checkAuthAndProfile = async () => {
      const token = localStorage.getItem("aura_patient_token");
      setIsLoggedIn(!!token);
      if (token) {
        try {
          const res = await fetch("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const json = await res.json();
          if (json.success) {
            const fullName = json.data.name || "";
            const parts = fullName.split(" ");
            setFirstName(parts[0] || "");
            setLastName(parts.slice(1).join(" ") || "");
            setEmail(json.data.email || "");
          }
        } catch (err) {
          console.error("Failed to fetch profile in book page", err);
        }
      } else {
        setFirstName("");
        setLastName("");
        setEmail("");
      }
    };
    checkAuthAndProfile();
    window.addEventListener("aura_auth_change", checkAuthAndProfile);
    return () => window.removeEventListener("aura_auth_change", checkAuthAndProfile);
  }, []);

  // Fetch booked slots for the selected doctor and date
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDoctor || !selectedDate) return;
      setLoadingSlots(true);
      try {
        const res = await fetch(`http://localhost:5000/api/appointments/booked-slots/doctor/${selectedDoctor.id}?date=${encodeURIComponent(selectedDate)}`);
        const json = await res.json();
        if (json.success) {
          setBookedSlots(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch booked slots", err);
      } finally {
        setLoadingSlots(false);
      }
    };
    if (step === 4 && selectedDoctor) {
      fetchBookedSlots();
    }
  }, [selectedDoctor, selectedDate, step]);

  // Fetch doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors");
        const json = await res.json();
        if (json.success) {
          const mapped = json.data.map((doc: any) => ({
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
              { title: `${doc.specialty} Specialist`, board: `American Board of ${doc.specialty}` }
            ],
            specialties: [doc.specialty, "Preventive Exams", "Chronic Care Management"]
          }));
          setDoctors(mapped);
        } else {
          setError(json.message || "Failed to load doctors");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch doctors");
      } finally {
        setLoadingLoadingState();
      }
    };
    const setLoadingLoadingState = () => {
      setLoading(false);
    };
    fetchDoctors();
  }, []);

  // Handle URL pre-selection once doctors are loaded
  useEffect(() => {
    if (doctors.length === 0) return;

    const docId = searchParams.get("doctor");
    const type = searchParams.get("type");
    const date = searchParams.get("date");
    const time = searchParams.get("time");

    if (docId) {
      const doc = doctors.find((d) => d.id === docId);
      if (doc) {
        setSelectedDoctor(doc);
        setStep(2); // Skip Step 1 if doctor is prefilled
      }
    }
    if (type) {
      if (type === "video" || type === "Virtual") {
        setConsultationType("Virtual");
      } else if (type === "clinic" || type === "In-Clinic") {
        setConsultationType("In-Clinic");
      }
    }
    if (date) setSelectedDate(date);
    if (time) {
      setSelectedTime(time);
      setStep(5); // Go directly to patient info if everything is filled
    }
  }, [searchParams, doctors]);

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  const handleSelectType = (type: "Virtual" | "In-Clinic") => {
    setConsultationType(type);
    setStep(3);
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setStep(5);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !consultationType || !selectedDate || !selectedTime) {
      setBookingError("Please complete all booking steps first.");
      return;
    }

    setBookingLoading(true);
    setBookingError(null);

    try {
      const dateTimeString = `${selectedDate} ${selectedTime}`;
      const appointmentDate = new Date(dateTimeString).toISOString();

      const payload = {
        doctorId: selectedDoctor.id,
        patientName: `${firstName} ${lastName}`,
        patientEmail: email,
        patientPhone: phone,
        consultationType: consultationType === "Virtual" ? "VIRTUAL" : "IN_CLINIC",
        appointmentDate
      };

      const token = localStorage.getItem("aura_patient_token");
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (json.success) {
        setStep(6);
      } else {
        setBookingError(json.message || "Failed to confirm appointment");
      }
    } catch (err: any) {
      setBookingError(err.message || "A network error occurred while booking");
    } finally {
      setBookingLoading(false);
    }
  };

  // Filter doctors for step 1
  const filteredDoctors = doctors.filter((doc) => {
    if (specialtyFilter === "All") return true;
    return doc.specialty.toLowerCase() === specialtyFilter.toLowerCase();
  });

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-12 relative flex flex-col justify-center">
      {/* Decorative background blur */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10" />

      {/* Stepper Header */}
      <div className="mb-12 text-center md:text-left relative z-10">
        <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary mb-2 font-bold tracking-tight">
          Concierge Scheduling
        </h1>
        <p className="text-on-surface-variant font-body-md text-body-md font-medium">
          Experience frictionless clinical booking tailored to your schedule.
        </p>

        {/* 6-Step Stepper Progress Bar */}
        <div className="mt-8 flex items-center justify-between relative w-full max-w-2xl mx-auto md:mx-0">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-outline-variant/30 -z-10"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / 5) * 100}%` }}
          ></div>
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2 relative">
              <button
                onClick={() => {
                  // Allow going back to completed steps
                  if (s < step) setStep(s);
                }}
                disabled={s >= step}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-label-md text-label-md shadow-sm transition-all duration-300 ${
                  s < step
                    ? "bg-primary text-on-primary cursor-pointer hover:scale-105"
                    : s === step
                    ? "bg-primary text-on-primary scale-105 ring-4 ring-primary/20"
                    : "bg-surface-container-lowest border border-outline-variant text-on-surface-variant cursor-not-allowed"
                }`}
              >
                {s < step ? (
                  <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                ) : (
                  s
                )}
              </button>
              <span
                className={`text-caption font-caption absolute -bottom-6 whitespace-nowrap font-bold text-[11px] hidden sm:block ${
                  s <= step ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {s === 1
                  ? "Specialist"
                  : s === 2
                  ? "Type"
                  : s === 3
                  ? "Date"
                  : s === 4
                  ? "Time"
                  : s === 5
                  ? "Details"
                  : "Confirmation"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps Content */}
      <div className="relative w-full flex-grow mt-6 z-10">
        
        {/* STEP 1: Choose Specialist */}
        {step === 1 && (
          <div className="animate-pop-in space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-headline-md font-headline-md text-primary font-bold">
                Choose Specialist
              </h2>
              {/* Specialty filter buttons */}
              <div className="flex flex-wrap gap-2">
                {["All", "Cardiology", "Neurology", "Dermatology"].map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setSpecialtyFilter(spec)}
                    className={`px-4 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                      specialtyFilter === spec
                        ? "bg-primary border-primary text-on-primary"
                        : "border-outline-variant text-on-surface-variant hover:border-primary/50 hover:text-primary bg-surface-container-lowest"
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-24 w-full">
                <span className="animate-spin material-symbols-outlined text-4xl text-primary">sync</span>
              </div>
            ) : error ? (
              <div className="bg-surface-container-lowest rounded-xl p-12 text-center soft-border w-full">
                <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
                <h3 className="font-headline-md text-headline-md text-red-500 mb-2 font-semibold">Error Loading Doctors</h3>
                <p className="text-on-surface-variant font-body-md text-body-md max-w-md mx-auto">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => handleSelectDoctor(doc)}
                    className={`bg-surface-container-lowest border rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-secondary transition-all duration-300 flex gap-5 cursor-pointer items-center group ${
                      selectedDoctor?.id === doc.id ? "border-primary ring-2 ring-primary/15" : "border-outline-variant/40"
                    }`}
                  >
                    <img
                      alt={doc.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-surface-container-low"
                      src={doc.avatar}
                    />
                    <div className="space-y-1">
                      <h3 className="font-headline-md text-primary font-bold group-hover:text-secondary transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-label-md text-secondary font-bold">
                        {doc.specialty}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-yellow-500 font-fill text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          {doc.rating}
                        </span>
                        <span>•</span>
                        <span>Next: {doc.nextAvailable}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Choose Consultation Type */}
        {step === 2 && (
          <div className="animate-pop-in space-y-6">
            <div
              className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary transition-colors w-fit font-bold text-sm"
              onClick={() => setStep(1)}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Back to Specialist</span>
            </div>

            <h2 className="text-headline-md font-headline-md text-primary font-bold">
              Choose Consultation Type
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Virtual Consultation Card */}
              <button
                onClick={() => handleSelectType("Virtual")}
                className={`flex flex-col items-start p-8 rounded-3xl shadow-sm border transition-all duration-300 text-left cursor-pointer group hover:shadow-md ${
                  consultationType === "Virtual"
                    ? "border-primary bg-surface-container-low"
                    : "bg-surface-container-lowest border-outline-variant/60 hover:border-primary/40"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                    consultationType === "Virtual"
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">videocam</span>
                </div>
                <h3 className="font-headline-md text-xl text-primary mb-3 font-bold flex items-center gap-2">
                  <span>🖥️</span> Virtual Consultation
                </h3>
                <ul className="space-y-2 text-sm text-on-surface-variant font-medium leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    <span>Meet with your doctor via secure video call</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    <span>Attend from home, office, or while traveling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    <span>Receive instant digital prescriptions &amp; clinical logs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    <span>Ideal for follow-ups, results review, and non-urgent care</span>
                  </li>
                </ul>
              </button>

              {/* In-Clinic Consultation Card */}
              <button
                onClick={() => handleSelectType("In-Clinic")}
                className={`flex flex-col items-start p-8 rounded-3xl shadow-sm border transition-all duration-300 text-left cursor-pointer group hover:shadow-md ${
                  consultationType === "In-Clinic"
                    ? "border-primary bg-surface-container-low"
                    : "bg-surface-container-lowest border-outline-variant/60 hover:border-primary/40"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                    consultationType === "In-Clinic"
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">home_clinic</span>
                </div>
                <h3 className="font-headline-md text-xl text-primary mb-3 font-bold flex items-center gap-2">
                  <span>🏥</span> In-Clinic Consultation
                </h3>
                <ul className="space-y-2 text-sm text-on-surface-variant font-medium leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    <span>Meet your doctor in person in our premium lounge suites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    <span>Comprehensive physical assessment &amp; checkup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    <span>Access on-site diagnostic laboratory &amp; imaging services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    <span>Ideal for detailed physical examinations and diagnostic treatment</span>
                  </li>
                </ul>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Select Date */}
        {step === 3 && (
          <div className="animate-pop-in space-y-6">
            <div
              className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary transition-colors w-fit font-bold text-sm"
              onClick={() => setStep(2)}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Back to Type</span>
            </div>

            <h2 className="text-headline-md font-headline-md text-primary font-bold">
              Select Appointment Date
            </h2>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {availableDates.map((d) => {
                  const dateStr = d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
                  const dayName = d.toLocaleDateString([], { weekday: 'short' });
                  const dayNum = d.toLocaleDateString([], { day: 'numeric' });
                  const monthName = d.toLocaleDateString([], { month: 'short' });
                  const isSelected = selectedDate === dateStr;

                  return (
                    <button
                      key={dateStr}
                      type="button"
                      onClick={() => handleSelectDate(dateStr)}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary font-bold shadow-sm"
                          : "border-outline-variant text-on-surface-variant hover:border-primary/50 hover:text-primary bg-surface-container-lowest"
                      }`}
                    >
                      <div className="text-xs uppercase tracking-wider font-semibold opacity-75">{dayName}</div>
                      <div className="text-3xl font-bold my-1">{dayNum}</div>
                      <div className="text-xs font-semibold">{monthName}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setStep(4)}
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:scale-[1.02] hover:shadow-md transition-all cursor-pointer font-bold"
              >
                Choose Time Slot
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Choose Time Slot */}
        {step === 4 && (
          <div className="animate-pop-in space-y-6">
            <div
              className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary transition-colors w-fit font-bold text-sm"
              onClick={() => setStep(3)}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Back to Date</span>
            </div>

            <h2 className="text-headline-md font-headline-md text-primary font-bold">
              Choose Time Slot
            </h2>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-4 sm:p-8 max-w-xl mx-auto shadow-sm space-y-6">
              <h3 className="font-headline-md text-primary font-bold text-center">
                Available slots for {selectedDate}
              </h3>
              
              {loadingSlots ? (
                <div className="flex justify-center items-center py-12">
                  <span className="animate-spin material-symbols-outlined text-3xl text-primary">sync</span>
                </div>
              ) : (
                (() => {
                  const candidateSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "01:30 PM", "02:00 PM", "03:45 PM", "04:15 PM"];
                  const availableSlots = candidateSlots.filter((time) => {
                    const slotDate = new Date(`${selectedDate} ${time}`);
                    
                    // 1. Enforce: Time must be in the future
                    if (slotDate <= new Date()) {
                      return false;
                    }
                    
                    // 2. Enforce: Double booking prevention
                    const isBooked = bookedSlots.some((isoStr) => {
                      const bookedDate = new Date(isoStr);
                      return bookedDate.getTime() === slotDate.getTime();
                    });
                    
                    return !isBooked;
                  });

                  if (availableSlots.length === 0) {
                    return (
                      <div className="text-center py-8 text-on-surface-variant font-medium">
                        <span className="material-symbols-outlined text-4xl text-outline mb-2">event_busy</span>
                        <p className="text-sm">No slots available for this date. Please choose another date.</p>
                      </div>
                    );
                  }

                  return (
                    <div className="time-slots-container grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {availableSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleSelectTime(time)}
                          className={`border py-3.5 rounded-xl font-label-md text-label-md transition-colors cursor-pointer font-semibold text-center ${
                            selectedTime === time
                              ? "border-primary bg-primary text-on-primary font-bold"
                              : "border-outline-variant text-primary hover:border-primary bg-surface-container-lowest"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        )}

        {/* STEP 5: Patient Information Form */}
        {step === 5 && (
          <div className="animate-pop-in space-y-6">
            <div
              className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary transition-colors w-fit font-bold text-sm"
              onClick={() => setStep(4)}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Back to Time Slots</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
              {/* Form details */}
              <div className={`md:col-span-8 bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-5 sm:p-8 shadow-sm transition-all duration-300 ${!isLoggedIn ? 'blur-md pointer-events-none' : ''}`}>
                <h2 className="text-headline-md font-headline-md text-primary mb-2 font-bold">
                  Patient Information
                </h2>
                <p className="text-on-surface-variant font-body-md text-body-md mb-8 font-medium">
                  Provide your profile coordinates to complete booking.
                </p>

                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-label-md text-label-md text-primary font-bold">First Name</label>
                      <input
                        className="h-14 px-4 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-body-md text-body-md read-only:opacity-85 read-only:cursor-not-allowed"
                        placeholder="John"
                        required
                        readOnly={isLoggedIn}
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-md text-label-md text-primary font-bold">Last Name</label>
                      <input
                        className="h-14 px-4 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-body-md text-body-md read-only:opacity-85 read-only:cursor-not-allowed"
                        placeholder="Doe"
                        required
                        readOnly={isLoggedIn}
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-label-md text-label-md text-primary font-bold">Email Address</label>
                      <input
                        className="h-14 px-4 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-body-md text-body-md read-only:opacity-85 read-only:cursor-not-allowed"
                        placeholder="john.doe@example.com"
                        required
                        readOnly={isLoggedIn}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-md text-label-md text-primary font-bold">Phone Number</label>
                      <input
                        className="h-14 px-4 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-body-md text-body-md"
                        placeholder="(555) 123-4567"
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-primary font-bold">Reason for Visit (Optional)</label>
                    <textarea
                      className="min-h-[110px] p-4 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-body-md text-body-md resize-none"
                      placeholder="Symptoms, preventative assessments, or treatment follow-ups..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    ></textarea>
                  </div>

                  {bookingError && (
                    <div className="p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl text-sm font-semibold">
                      {bookingError}
                    </div>
                  )}

                  <button
                    disabled={bookingLoading}
                    className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all w-full cursor-pointer font-bold disabled:opacity-50"
                    type="submit"
                  >
                    {bookingLoading ? "Confirming Booking..." : "Confirm Booking"}
                  </button>
                </form>
              </div>

              {/* Consultation Summary glass widget */}
              <div className="md:col-span-4 translucent-glass rounded-3xl p-6 space-y-6 shadow-sm border border-outline-variant/30">
                <h3 className="font-headline-md text-primary font-bold pb-4 border-b border-outline-variant/20">
                  Appointment Summary
                </h3>
                {selectedDoctor && (
                  <div className="flex items-center gap-3">
                    <img
                      alt={selectedDoctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                      src={selectedDoctor.avatar}
                    />
                    <div>
                      <h4 className="text-sm font-bold text-primary">{selectedDoctor.name}</h4>
                      <p className="text-xs text-secondary font-bold">{selectedDoctor.specialty}</p>
                    </div>
                  </div>
                )}
                <div className="space-y-3 pt-2 text-sm font-medium text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Format</span>
                    <span className="text-primary font-bold">{consultationType} Consultation</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date</span>
                    <span className="text-primary font-bold">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Slot</span>
                    <span className="text-primary font-bold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between border-t border-outline-variant/20 pt-3 text-base font-bold text-primary">
                    <span>Consultation Fee</span>
                    <span>${selectedDoctor?.initialConsultationFee || 250}</span>
                  </div>
                </div>
              </div>

              {/* Inline Authentication Overlay */}
              {!isLoggedIn && (
                <AuthModal
                  canClose={false}
                  onSuccess={() => {
                    setIsLoggedIn(true);
                    window.dispatchEvent(new Event("aura_auth_change"));
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* STEP 6: Booking Confirmation */}
        {step === 6 && (
          <div className="animate-pop-in flex flex-col items-center justify-center py-6 text-center space-y-8 max-w-2xl mx-auto">
            {/* Serene clinic room image */}
            <div className="w-full h-64 rounded-3xl overflow-hidden relative shadow-level-3 bg-surface-container border border-outline-variant/20">
              <img
                alt="Minimalist luxury lounge clinic room"
                className="w-full h-full object-cover opacity-95"
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg animate-pop-in">
                  <span
                    className="material-symbols-outlined text-emerald-500 text-4xl font-fill"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary mb-3 font-bold tracking-tight">
                Your Care is Confirmed
              </h2>
              <p className="text-on-surface-variant font-body-md text-body-md max-w-lg mx-auto font-medium leading-relaxed">
                Your appointment is finalized for <strong>{selectedDate} at {selectedTime}</strong>. We have generated your clinic check-in coordinates and sent an email confirmation to <strong>{email || "patient@example.com"}</strong>.
              </p>
            </div>

            {/* Email confirmation preview card */}
            <div className="w-full text-left bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm font-body-md text-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
                <span className="font-bold text-primary">EMAIL PREVIEW</span>
                <span className="text-xs text-on-surface-variant">To: {email || "patient@example.com"}</span>
              </div>
              <div className="space-y-2 text-on-surface-variant">
                <p><strong>Subject:</strong> Confirmed Appointment: AuraClinic Concierge Health</p>
                <div className="bg-surface-container-low/40 p-4 rounded-2xl border border-outline-variant/20 space-y-2 mt-2">
                  <p><strong>Patient:</strong> {firstName} {lastName}</p>
                  <p><strong>Doctor:</strong> {selectedDoctor?.name} ({selectedDoctor?.specialty})</p>
                  <p><strong>Format:</strong> {consultationType} Consultation</p>
                  <p><strong>Schedule:</strong> {selectedDate} at {selectedTime}</p>
                  {consultationType === "In-Clinic" ? (
                    <p className="text-xs text-secondary font-bold mt-2">
                      🚘 Lounge check-in and complimentary Valet voucher are attached. Please arrive 10 minutes early.
                    </p>
                  ) : (
                    <p className="text-xs text-secondary font-bold mt-2">
                      🖥️ Secure clinical video link will be active inside your patient dashboard 15 minutes before slot time.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button className="bg-surface-container-lowest border border-outline-variant text-primary px-8 py-3.5 rounded-full font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center justify-center gap-2 cursor-pointer font-bold">
                <span className="material-symbols-outlined text-sm">calendar_add_on</span> Add to Calendar
              </button>
              <Link
                href="/portal"
                className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-label-md text-label-md hover:scale-[1.01] hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer font-bold text-center"
              >
                View Patient Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-grow flex items-center justify-center py-24">
          <span className="animate-spin material-symbols-outlined text-4xl text-primary">
            sync
          </span>
        </div>
      }
    >
      <BookContent />
    </Suspense>
  );
}
