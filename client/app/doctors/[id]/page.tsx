"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { mockDoctors, mockReviews } from "@/lib/mockData";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DoctorProfilePage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  // Find Doctor
  const doctor = mockDoctors.find((doc) => doc.id === id);
  if (!doctor) {
    notFound();
  }

  // Booking Widget States
  const [consultType, setConsultType] = useState<"in-person" | "video">("in-person");
  const [selectedDate, setSelectedDate] = useState<number>(15); // Default Tue 15
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Quick navigation scroll to booking
  const scrollToBooking = () => {
    const el = document.getElementById("booking-widget");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedTime) return;
    
    const params = new URLSearchParams();
    params.append("doctor", doctor.id);
    params.append("type", consultType);
    params.append("date", `Oct ${selectedDate}, 2024`);
    params.append("time", selectedTime);
    
    router.push(`/book?${params.toString()}`);
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap flex flex-col gap-section-gap relative">
      {/* Background Decorative Glowing Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-tertiary/10 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10" />
      <div className="absolute top-[600px] right-10 w-[400px] h-[400px] bg-gradient-to-bl from-primary-fixed/20 to-transparent blur-3xl rounded-full -z-10" />

      {/* Hero / Profile Anchor Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start relative z-10">
        {/* Portrait */}
        <div className="lg:col-span-4 relative rounded-xl overflow-hidden bg-surface-container-low shadow-level-2 border border-outline-variant/30 aspect-[3/4]">
          <img
            alt={`Portrait of ${doctor.name}`}
            className="w-full h-full object-cover"
            src={doctor.avatar}
          />
        </div>
        {/* Intro Details */}
        <div className="lg:col-span-8 flex flex-col justify-center h-full pl-0 lg:pl-gutter py-8">
          <div className="inline-flex items-center gap-2 bg-surface-container-high px-3 py-1 rounded-full w-fit mb-6 border border-outline-variant/30">
            <span
              className="material-symbols-outlined text-[16px] text-tertiary font-fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="text-caption font-caption text-on-surface font-semibold text-[12px]">
              Accepting New Patients
            </span>
          </div>
          <h1 className="text-display-lg font-display-lg text-on-surface mb-2 font-bold leading-tight">
            {doctor.name},{" "}
            <span className="font-light text-on-surface-variant">{doctor.title}</span>
          </h1>
          <p className="text-headline-md font-headline-md text-secondary mb-8 font-semibold">
            {doctor.specialty} Specialist &amp; Medical Director
          </p>

          <div className="flex flex-wrap gap-x-12 gap-y-6 mb-10 pb-10 border-b border-outline-variant/30">
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant mb-1 font-semibold">
                Experience
              </p>
              <p className="text-body-lg font-body-lg font-semibold text-on-surface">
                {doctor.experience}
              </p>
            </div>
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant mb-1 font-semibold">
                Patient Rating
              </p>
              <div className="flex items-center gap-1">
                <span className="text-body-lg font-body-lg font-semibold text-on-surface">
                  {doctor.rating}
                </span>
                <div className="flex text-[#F59E0B]">
                  <span className="material-symbols-outlined text-[18px] icon-fill">star</span>
                  <span className="material-symbols-outlined text-[18px] icon-fill">star</span>
                  <span className="material-symbols-outlined text-[18px] icon-fill">star</span>
                  <span className="material-symbols-outlined text-[18px] icon-fill">star</span>
                  <span className="material-symbols-outlined text-[18px] icon-fill">star_half</span>
                </div>
                <span className="text-caption font-caption text-on-surface-variant ml-1 font-medium">
                  ({doctor.reviewsCount} Reviews)
                </span>
              </div>
            </div>
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant mb-1 font-semibold">
                Languages
              </p>
              <p className="text-body-lg font-body-lg font-semibold text-on-surface">
                {doctor.languages.join(", ")}
              </p>
            </div>
          </div>

          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed mb-10">
            {doctor.bio}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToBooking}
              className="bg-primary text-on-primary text-label-md font-label-md px-8 py-4 rounded-full hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer font-semibold"
            >
              <span>Book Appointment</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button className="bg-surface-container-lowest border border-outline-variant text-on-surface text-label-md font-label-md px-6 py-4 rounded-full hover:bg-surface-container-low transition-colors duration-200 flex items-center gap-2 cursor-pointer font-semibold">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              <span>Save Profile</span>
            </button>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Details & Booking */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start relative z-10">
        {/* Left Column: Deep Dive */}
        <div className="lg:col-span-7 flex flex-col gap-section-gap">
          {/* Biography */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 md:p-10 shadow-level-2">
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-6 flex items-center gap-3 font-bold">
              <span className="material-symbols-outlined text-outline">history_edu</span>
              Biography
            </h2>
            <div className="prose max-w-none text-body-md font-body-md text-on-surface-variant space-y-4 leading-relaxed">
              <p>
                {doctor.name} received medical degrees with alpha honors. Following clinical residency, fellowships focused on cutting-edge techniques and cardiovascular diagnostics.
              </p>
              <p>
                Prior to joining AuraClinic, they served as Associate Director at leading metropolitan clinics. Research focuses on valvular and preventative medicine to improve clinical and patient outcomes.
              </p>
              <p>
                In client care, {doctor.name} prioritizes clear, empathetic communication and collaborative decision making to ensure you feel comfortable throughout your healthcare journey.
              </p>
            </div>
          </div>

          {/* Qualifications & Specialties (Bento Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Board Certifications */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-level-2">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-outline text-[20px]">
                  workspace_premium
                </span>
                Board Certifications
              </h3>
              <ul className="space-y-4">
                {doctor.boardCertifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-tertiary mt-0.5 text-[20px] font-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <div>
                      <p className="text-body-md font-body-md font-semibold text-on-surface">
                        {cert.title}
                      </p>
                      <p className="text-caption font-caption text-on-surface-variant font-medium">
                        {cert.board}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Clinical Specialties */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-level-2">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-outline text-[20px]">
                  medical_services
                </span>
                Specialties
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="bg-surface-container-low border border-outline-variant/30 text-on-surface text-label-md font-label-md px-3 py-1.5 rounded font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Reviews */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 md:p-10 shadow-level-2">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2 flex items-center gap-3 font-bold">
                  <span className="material-symbols-outlined text-outline">reviews</span>
                  Patient Reviews
                </h2>
                <p className="text-body-md font-body-md text-on-surface-variant font-medium">
                  Verified feedback from recent visits.
                </p>
              </div>
              <button className="text-label-md font-label-md text-primary hover:underline hidden md:block cursor-pointer font-bold">
                View All {doctor.reviewsCount} Reviews
              </button>
            </div>
            <div className="space-y-6">
              {mockReviews.map((rev) => (
                <div key={rev.id} className="p-6 bg-surface-container-low/50 rounded-lg border border-outline-variant/20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-headline-md shrink-0 ${rev.avatarBg}`}
                      >
                        {rev.avatarLetter}
                      </div>
                      <div>
                        <p className="text-body-md font-body-md font-semibold text-on-surface">
                          {rev.author}
                        </p>
                        <p className="text-caption font-caption text-on-surface-variant font-medium">
                          Visited for {rev.type} • {rev.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-[#F59E0B]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[16px] icon-fill">
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                    &quot;{rev.text}&quot;
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-outline-variant rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-container-lowest transition-colors md:hidden cursor-pointer">
              View All {doctor.reviewsCount} Reviews
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Booking Calendar (Sticky Glass Widget) */}
        <div id="booking-widget" className="lg:col-span-5 relative">
          <div className="sticky top-[100px] bg-surface-container-lowest/80 backdrop-blur-md rounded-xl p-8 shadow-level-3 border border-outline-variant/40">
            <div className="mb-6">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-2 font-bold">
                Book an Appointment
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Select an available date and time.
              </p>
            </div>

            {/* Consultation Type Selector */}
            <div className="mb-6 bg-surface-container-low rounded-lg p-1 flex border border-outline-variant/30">
              <button
                onClick={() => setConsultType("in-person")}
                className={`flex-1 py-2 rounded-md text-label-md font-label-md transition-all cursor-pointer font-semibold ${
                  consultType === "in-person"
                    ? "bg-surface-container-lowest text-on-surface shadow-sm border border-outline-variant/20"
                    : "text-on-surface-variant border-transparent hover:bg-surface-container/50"
                }`}
              >
                In-Person
              </button>
              <button
                onClick={() => setConsultType("video")}
                className={`flex-1 py-2 rounded-md text-label-md font-label-md transition-all cursor-pointer font-semibold ${
                  consultType === "video"
                    ? "bg-surface-container-lowest text-on-surface shadow-sm border border-outline-variant/20"
                    : "text-on-surface-variant border-transparent hover:bg-surface-container/50"
                }`}
              >
                Video Consult
              </button>
            </div>

            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-body-lg font-body-lg font-bold text-on-surface">
                October 2024
              </span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-colors text-on-surface bg-surface-container-lowest cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Date Ribbon (Scrollable) */}
            <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-4 mb-6">
              {/* Date Item (Mon 14 - Past/Unavailable) */}
              <div className="min-w-[64px] py-3 flex flex-col items-center rounded-lg bg-surface-container-highest/20 opacity-40 cursor-not-allowed select-none">
                <span className="text-caption font-caption text-on-surface-variant uppercase mb-1 font-semibold">
                  Mon
                </span>
                <span className="text-headline-md font-headline-md text-on-surface-variant font-bold">14</span>
              </div>
              {/* Date Item (Tue 15 - Active) */}
              <div
                onClick={() => setSelectedDate(15)}
                className={`min-w-[64px] py-3 flex flex-col items-center rounded-lg cursor-pointer transition-transform hover:scale-105 border ${
                  selectedDate === 15
                    ? "bg-primary border-primary text-on-primary shadow-level-2"
                    : "bg-surface-container-lowest border-outline-variant/40 hover:border-primary"
                }`}
              >
                <span
                  className={`text-caption font-caption uppercase mb-1 font-semibold ${
                    selectedDate === 15 ? "text-on-primary/80" : "text-on-surface-variant"
                  }`}
                >
                  Tue
                </span>
                <span className="text-headline-md font-headline-md font-bold">15</span>
              </div>
              {/* Date Item (Wed 16) */}
              <div
                onClick={() => setSelectedDate(16)}
                className={`min-w-[64px] py-3 flex flex-col items-center rounded-lg cursor-pointer transition-transform hover:scale-105 border ${
                  selectedDate === 16
                    ? "bg-primary border-primary text-on-primary shadow-level-2"
                    : "bg-surface-container-lowest border-outline-variant/40 hover:border-primary"
                }`}
              >
                <span
                  className={`text-caption font-caption uppercase mb-1 font-semibold ${
                    selectedDate === 16 ? "text-on-primary/80" : "text-on-surface-variant"
                  }`}
                >
                  Wed
                </span>
                <span className="text-headline-md font-headline-md font-bold">16</span>
              </div>
              {/* Date Item (Thu 17) */}
              <div
                onClick={() => setSelectedDate(17)}
                className={`min-w-[64px] py-3 flex flex-col items-center rounded-lg cursor-pointer transition-transform hover:scale-105 border ${
                  selectedDate === 17
                    ? "bg-primary border-primary text-on-primary shadow-level-2"
                    : "bg-surface-container-lowest border-outline-variant/40 hover:border-primary"
                }`}
              >
                <span
                  className={`text-caption font-caption uppercase mb-1 font-semibold ${
                    selectedDate === 17 ? "text-on-primary/80" : "text-on-surface-variant"
                  }`}
                >
                  Thu
                </span>
                <span className="text-headline-md font-headline-md font-bold">17</span>
              </div>
              {/* Date Item (Fri 18) */}
              <div
                onClick={() => setSelectedDate(18)}
                className={`min-w-[64px] py-3 flex flex-col items-center rounded-lg cursor-pointer transition-transform hover:scale-105 border ${
                  selectedDate === 18
                    ? "bg-primary border-primary text-on-primary shadow-level-2"
                    : "bg-surface-container-lowest border-outline-variant/40 hover:border-primary"
                }`}
              >
                <span
                  className={`text-caption font-caption uppercase mb-1 font-semibold ${
                    selectedDate === 18 ? "text-on-primary/80" : "text-on-surface-variant"
                  }`}
                >
                  Fri
                </span>
                <span className="text-headline-md font-headline-md font-bold">18</span>
              </div>
            </div>

            {/* Time Slots */}
            <div className="mb-8">
              <p className="text-label-md font-label-md text-on-surface-variant mb-4 flex items-center gap-2 font-bold text-[13px]">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                Available Slots for {selectedDate === 15 ? "Tue, Oct 15" : selectedDate === 16 ? "Wed, Oct 16" : selectedDate === 17 ? "Thu, Oct 17" : "Fri, Oct 18"}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {["09:00 AM", "09:30 AM", "10:15 AM", "11:00 AM"].map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 rounded border text-body-md font-body-md transition-all cursor-pointer font-semibold ${
                      selectedTime === time
                        ? "border-primary bg-primary-fixed text-primary font-bold ring-1 ring-primary shadow-sm"
                        : "border-outline-variant/50 bg-surface-container-low text-on-surface hover:border-primary hover:text-primary"
                    }`}
                  >
                    {time}
                  </button>
                ))}
                {/* Disabled busy slot */}
                <button
                  disabled
                  className="py-2.5 rounded border border-outline-variant/30 bg-surface-container/30 text-outline/40 cursor-not-allowed line-through decoration-outline/30 select-none font-semibold"
                >
                  01:00 PM
                </button>
                <button
                  onClick={() => setSelectedTime("02:30 PM")}
                  className={`py-2.5 rounded border text-body-md font-body-md transition-all cursor-pointer font-semibold ${
                    selectedTime === "02:30 PM"
                      ? "border-primary bg-primary-fixed text-primary font-bold ring-1 ring-primary shadow-sm"
                      : "border-outline-variant/50 bg-surface-container-low text-on-surface hover:border-primary hover:text-primary"
                  }`}
                >
                  02:30 PM
                </button>
              </div>
            </div>

            {/* Action Summary */}
            <div className="pt-6 border-t border-outline-variant/30 flex flex-col gap-4">
              <div className="flex justify-between items-center text-body-md font-body-md text-on-surface">
                <span className="font-medium">Initial Consultation</span>
                <span className="font-bold text-headline-md">${doctor.initialConsultationFee}</span>
              </div>
              <button
                disabled={!selectedTime}
                onClick={handleConfirmBooking}
                className="w-full bg-primary text-on-primary text-label-md font-label-md py-4 rounded-full hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-bold text-center"
              >
                Confirm Appointment
              </button>
              <p className="text-caption font-caption text-center text-on-surface-variant flex items-center justify-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Secure booking via AuraClinic portal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
