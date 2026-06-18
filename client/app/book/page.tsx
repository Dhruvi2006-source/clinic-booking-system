"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Doctor } from "@/types";

// ── Booking Step Components ─────────────────────────────────
import BookStepper      from "@/components/book/BookStepper";
import Step1Specialist  from "@/components/book/Step1Specialist";
import Step2Type        from "@/components/book/Step2Type";
import Step3Date        from "@/components/book/Step3Date";
import Step4Time        from "@/components/book/Step4Time";
import Step5Details     from "@/components/book/Step5Details";
import Step6Confirmation from "@/components/book/Step6Confirmation";

function BookContent() {
  const searchParams = useSearchParams();

  // ── Wizard state ────────────────────────────────────────────
  const [step,              setStep]              = useState(1);
  const [selectedDoctor,    setSelectedDoctor]    = useState<Doctor | null>(null);
  const [consultationType,  setConsultationType]  = useState<"Virtual" | "In-Clinic" | null>(null);
  const [selectedDate,      setSelectedDate]      = useState("");
  const [selectedTime,      setSelectedTime]      = useState<string | null>(null);
  const [specialtyFilter,   setSpecialtyFilter]   = useState("All");

  // ── Patient form state ──────────────────────────────────────
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [phone,     setPhone]     = useState("");
  const [reason,    setReason]    = useState("");

  // ── Data state ──────────────────────────────────────────────
  const [doctors,      setDoctors]      = useState<Doctor[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);
  const [bookedSlots,  setBookedSlots]  = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError,   setBookingError]   = useState<string | null>(null);
  const [navDate,      setNavDate]      = useState(new Date());
  const [isLoggedIn,   setIsLoggedIn]   = useState(false);

  // Init date
  useEffect(() => {
    const today = new Date();
    setSelectedDate(today.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }));
    setNavDate(today);
  }, []);

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("aura_patient_token");
      setIsLoggedIn(!!token);
      if (token) {
        try {
          const res  = await fetch("http://localhost:5000/api/auth/me", { headers: { Authorization: `Bearer ${token}` } });
          const json = await res.json();
          if (json.success) {
            const parts = (json.data.name || "").split(" ");
            setFirstName(parts[0] || "");
            setLastName(parts.slice(1).join(" ") || "");
            setEmail(json.data.email || "");
          }
        } catch { /* ignore */ }
      } else {
        setFirstName(""); setLastName(""); setEmail("");
      }
    };
    checkAuth();
    window.addEventListener("aura_auth_change", checkAuth);
    return () => window.removeEventListener("aura_auth_change", checkAuth);
  }, []);

  // Fetch booked slots
  useEffect(() => {
    if (step !== 4 || !selectedDoctor) return;
    setLoadingSlots(true);
    fetch(`http://localhost:5000/api/appointments/booked-slots/doctor/${selectedDoctor.id}?date=${encodeURIComponent(selectedDate)}`)
      .then((r) => r.json())
      .then((j) => { if (j.success) setBookedSlots(j.data); })
      .catch(() => {})
      .finally(() => setLoadingSlots(false));
  }, [selectedDoctor, selectedDate, step]);

  // Fetch doctors
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          setDoctors(j.data.map((doc: any) => ({
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
            boardCertifications: [{ title: `${doc.specialty} Specialist`, board: `American Board of ${doc.specialty}` }],
            specialties: [doc.specialty, "Preventive Exams", "Chronic Care Management"],
            onDuty: doc.onDuty,
            activeSlots: doc.activeSlots,
          })));
        } else { setError(j.message || "Failed to load doctors"); }
      })
      .catch((e) => setError(e.message || "Failed to fetch doctors"))
      .finally(() => setLoading(false));
  }, []);

  // URL param pre-selection
  useEffect(() => {
    if (doctors.length === 0) return;
    const docId = searchParams.get("doctor");
    const type  = searchParams.get("type");
    const date  = searchParams.get("date");
    const time  = searchParams.get("time");
    if (docId) {
      const doc = doctors.find((d) => d.id === docId);
      if (doc) { setSelectedDoctor(doc); setStep(1); }
    }
    if (type) setConsultationType(type === "video" || type === "Virtual" ? "Virtual" : "In-Clinic");
    if (date) setSelectedDate(date);
    if (time) { setSelectedTime(time); setStep(5); }
  }, [searchParams, doctors]);

  // ── Handlers ─────────────────────────────────────────────────
  const handleSelectType = (type: "Virtual" | "In-Clinic") => {
    setConsultationType(type);
    setStep(3);
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setStep(5);
  };

  const handlePrevMonth = () => {
    const prev  = new Date(navDate.getFullYear(), navDate.getMonth() - 1, 1);
    const today = new Date();
    if (prev.getFullYear() < today.getFullYear() || (prev.getFullYear() === today.getFullYear() && prev.getMonth() < today.getMonth())) return;
    setNavDate(prev);
  };

  const handleNextMonth = () => setNavDate(new Date(navDate.getFullYear(), navDate.getMonth() + 1, 1));

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !consultationType || !selectedDate || !selectedTime) {
      setBookingError("Please complete all booking steps first.");
      return;
    }
    setBookingLoading(true);
    setBookingError(null);
    try {
      const payload = {
        doctorId: selectedDoctor.id,
        patientName: `${firstName} ${lastName}`,
        patientEmail: email,
        patientPhone: phone,
        consultationType: consultationType === "Virtual" ? "VIRTUAL" : "IN_CLINIC",
        appointmentDate: new Date(`${selectedDate} ${selectedTime}`).toISOString(),
      };
      const token = localStorage.getItem("aura_patient_token");
      const res   = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) setStep(6);
      else setBookingError(json.message || "Failed to confirm appointment");
    } catch (err: any) {
      setBookingError(err.message || "A network error occurred while booking");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-12 relative flex flex-col justify-center">
      {/* Decorative blur */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10" />

      <BookStepper step={step} onGoToStep={setStep} />

      <div className="relative w-full flex-grow mt-6 z-10">
        {step === 1 && (
          <Step1Specialist
            doctors={doctors}
            loading={loading}
            error={error}
            selectedDoctor={selectedDoctor}
            specialtyFilter={specialtyFilter}
            onSelectDoctor={setSelectedDoctor}
            onFilterChange={setSpecialtyFilter}
            onContinue={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <Step2Type
            consultationType={consultationType}
            onBack={() => setStep(1)}
            onSelect={handleSelectType}
          />
        )}

        {step === 3 && (
          <Step3Date
            selectedDate={selectedDate}
            navDate={navDate}
            onBack={() => setStep(2)}
            onSelectDate={handleSelectDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onContinue={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <Step4Time
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedDoctor={selectedDoctor}
            bookedSlots={bookedSlots}
            loadingSlots={loadingSlots}
            onBack={() => setStep(3)}
            onSelectTime={handleSelectTime}
          />
        )}

        {step === 5 && (
          <Step5Details
            selectedDoctor={selectedDoctor}
            consultationType={consultationType}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            firstName={firstName}
            lastName={lastName}
            email={email}
            phone={phone}
            reason={reason}
            isLoggedIn={isLoggedIn}
            bookingLoading={bookingLoading}
            bookingError={bookingError}
            onBack={() => setStep(4)}
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
            onEmailChange={setEmail}
            onPhoneChange={setPhone}
            onReasonChange={setReason}
            onSubmit={handleFormSubmit}
            onLoginSuccess={() => { setIsLoggedIn(true); window.dispatchEvent(new Event("aura_auth_change")); }}
          />
        )}

        {step === 6 && (
          <Step6Confirmation
            selectedDoctor={selectedDoctor}
            consultationType={consultationType}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            firstName={firstName}
            lastName={lastName}
            email={email}
          />
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
          <span className="animate-spin material-symbols-outlined text-4xl text-primary">sync</span>
        </div>
      }
    >
      <BookContent />
    </Suspense>
  );
}
