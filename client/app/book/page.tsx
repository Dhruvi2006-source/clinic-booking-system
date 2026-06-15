"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { mockDoctors } from "@/lib/mockData";

function BookContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Wizard state
  const [step, setStep] = useState<number>(1);
  const [visitType, setVisitType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("Oct 15, 2024");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");

  // Handle URL pre-selection
  useEffect(() => {
    const docId = searchParams.get("doctor");
    const type = searchParams.get("type");
    const date = searchParams.get("date");
    const time = searchParams.get("time");

    if (type) {
      if (type === "video") setVisitType("Telehealth Video");
      else setVisitType("Specialist Review");
    }
    if (date) setSelectedDate(date);
    if (time) {
      setSelectedTime(time);
      setStep(3);
    }
  }, [searchParams]);

  const handleSelectType = (type: string) => {
    setVisitType(type);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const doctorId = searchParams.get("doctor");
  const selectedDoctor = mockDoctors.find((d) => d.id === doctorId) || mockDoctors[0];

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-12 relative flex flex-col justify-center">
      {/* Background Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-tr from-tertiary/10 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10" />

      {/* Header & Stepper */}
      <div className="mb-12 text-center md:text-left relative z-10">
        <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary mb-2 font-bold">
          Schedule Appointment
        </h1>
        <p className="text-on-surface-variant font-body-md text-body-md font-medium">
          Complete the steps below to secure your visit.
        </p>

        {/* Stepper Progress Bar */}
        <div className="mt-8 flex items-center justify-between relative w-full max-w-md mx-auto md:mx-0">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-outline-variant/30 -z-10"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary -z-10 transition-all duration-500"
            style={{ width: `${(step - 1) * 33.33}%` }}
          ></div>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2 relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md shadow-sm transition-all duration-300 ${
                  s < step
                    ? "bg-primary text-on-primary"
                    : s === step
                    ? "bg-primary text-on-primary scale-105 ring-4 ring-primary/20"
                    : "bg-surface-container-lowest border border-outline-variant text-on-surface-variant"
                }`}
              >
                {s < step ? (
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                ) : (
                  s
                )}
              </div>
              <span
                className={`text-caption font-caption absolute -bottom-6 whitespace-nowrap font-semibold ${
                  s <= step ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {s === 1 ? "Type" : s === 2 ? "Time" : s === 3 ? "Details" : "Done"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps Content */}
      <div className="relative w-full flex-grow mt-8 z-10">
        
        {/* STEP 1: Visit Type */}
        {step === 1 && (
          <div className="animate-pop-in">
            <h2 className="text-headline-md font-headline-md text-primary mb-6 font-bold">
              Select Visit Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "General Consultation", desc: "Standard checkup, prescription refills, and minor concerns.", icon: "stethoscope" },
                { title: "Specialist Review", desc: "In-depth consultation with a specialized department.", icon: "psychiatry" },
                { title: "Telehealth Video", desc: "Virtual appointment from the comfort of your home.", icon: "videocam" }
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleSelectType(item.title)}
                  className={`flex flex-col items-start p-8 rounded-xl shadow-soft-card border transition-all duration-300 text-left cursor-pointer group ${
                    visitType === item.title
                      ? "border-primary bg-surface-container-low"
                      : "bg-surface-container-lowest border-outline-variant hover:shadow-soft-modal hover:border-primary/30"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${
                      visitType === item.title
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container group-hover:bg-primary group-hover:text-on-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2 font-bold">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
            <div className="mt-10 flex justify-end">
              <button
                disabled={!visitType}
                onClick={() => setStep(2)}
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:scale-[1.02] hover:shadow-md active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-bold"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Time Selection */}
        {step === 2 && (
          <div className="animate-pop-in">
            <div
              className="flex items-center gap-4 mb-6 cursor-pointer text-on-surface-variant hover:text-primary transition-colors w-fit font-bold"
              onClick={() => setStep(1)}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="font-label-md text-label-md">Back to Types</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-soft-card p-6 md:p-8 flex flex-col md:flex-row gap-10">
              {/* Calendar representation */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline-md text-headline-md text-primary font-bold">
                    October 2024
                  </h3>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant">
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center font-label-md text-label-md mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="text-outline font-bold">
                      {day}
                    </div>
                  ))}
                  <div></div>
                  <div></div>
                  {/* Days */}
                  <div className="text-outline cursor-not-allowed select-none">1</div>
                  <div className="text-outline cursor-not-allowed select-none">2</div>
                  <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full hover:bg-surface-container cursor-pointer text-primary transition-colors font-medium">3</div>
                  <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full hover:bg-surface-container cursor-pointer text-primary transition-colors font-medium">4</div>
                  <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full hover:bg-surface-container cursor-pointer text-primary transition-colors font-medium">5</div>
                  <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full hover:bg-surface-container cursor-pointer text-primary transition-colors font-medium">6</div>
                  <div
                    onClick={() => setSelectedDate("Oct 7, 2024")}
                    className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full cursor-pointer transition-colors font-bold ${
                      selectedDate.includes("7")
                        ? "bg-primary text-on-primary shadow-sm"
                        : "hover:bg-surface-container text-primary"
                    }`}
                  >
                    7
                  </div>
                  <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full hover:bg-surface-container cursor-pointer text-primary transition-colors font-medium">8</div>
                  <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full hover:bg-surface-container cursor-pointer text-primary transition-colors font-medium">9</div>
                  <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full hover:bg-surface-container cursor-pointer text-primary transition-colors font-medium">10</div>
                  <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full hover:bg-surface-container cursor-pointer text-primary transition-colors font-medium">11</div>
                  <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full hover:bg-surface-container cursor-pointer text-primary transition-colors font-medium">12</div>
                  <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full hover:bg-surface-container cursor-pointer text-primary transition-colors font-medium">13</div>
                  <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full hover:bg-surface-container cursor-pointer text-primary transition-colors font-medium">14</div>
                  <div
                    onClick={() => setSelectedDate("Oct 15, 2024")}
                    className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full cursor-pointer transition-colors font-bold ${
                      selectedDate.includes("15")
                        ? "bg-primary text-on-primary shadow-sm"
                        : "hover:bg-surface-container text-primary"
                    }`}
                  >
                    15
                  </div>
                </div>
              </div>

              {/* Time Slots Selection */}
              <div className="flex-1 md:border-l border-outline-variant md:pl-10">
                <h3 className="font-headline-md text-headline-md text-primary mb-6 font-bold">
                  Available on {selectedDate}
                </h3>
                <div className="time-slots-container grid grid-cols-2 gap-3 max-h-[250px] overflow-y-auto pr-2">
                  {["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "01:30 PM", "02:00 PM", "03:45 PM", "04:15 PM"].map((time) => (
                    <button
                      key={time}
                      onClick={() => handleSelectTime(time)}
                      className={`border py-3 rounded-lg font-label-md text-label-md transition-colors cursor-pointer font-semibold ${
                        selectedTime === time
                          ? "border-primary bg-primary text-on-primary font-bold"
                          : "border-outline-variant text-primary hover:border-primary bg-surface-container-lowest"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-end">
              <button
                disabled={!selectedTime}
                onClick={() => setStep(3)}
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:scale-[1.02] hover:shadow-md active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-bold"
              >
                Review Details
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Patient Information Form */}
        {step === 3 && (
          <div className="animate-pop-in">
            <div
              className="flex items-center gap-4 mb-6 cursor-pointer text-on-surface-variant hover:text-primary transition-colors w-fit font-bold"
              onClick={() => setStep(2)}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="font-label-md text-label-md">Back to Calendar</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-soft-card p-6 md:p-10">
              <h2 className="text-headline-md font-headline-md text-primary mb-2 font-bold">
                Patient Details
              </h2>
              <p className="text-on-surface-variant font-body-md text-body-md mb-8 font-medium">
                Please provide your contact information to finalize the booking.
              </p>

              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-primary font-semibold">First Name</label>
                    <input
                      className="h-14 px-4 bg-transparent border border-outline-variant rounded-lg focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors font-body-md text-body-md"
                      placeholder="Jane"
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-primary font-semibold">Last Name</label>
                    <input
                      className="h-14 px-4 bg-transparent border border-outline-variant rounded-lg focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors font-body-md text-body-md"
                      placeholder="Doe"
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-primary font-semibold">Email Address</label>
                    <input
                      className="h-14 px-4 bg-transparent border border-outline-variant rounded-lg focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors font-body-md text-body-md"
                      placeholder="jane@example.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-primary font-semibold">Phone Number</label>
                    <input
                      className="h-14 px-4 bg-transparent border border-outline-variant rounded-lg focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors font-body-md text-body-md"
                      placeholder="(555) 000-0000"
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-primary font-semibold">Reason for Visit (Optional)</label>
                  <textarea
                    className="min-h-[120px] p-4 bg-transparent border border-outline-variant rounded-lg focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors font-body-md text-body-md resize-none"
                    placeholder="Briefly describe your symptoms or concern..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  ></textarea>
                </div>

                <div className="bg-surface-container-low p-4 rounded-lg flex items-start gap-4 mt-4 border border-outline-variant/50">
                  <span className="material-symbols-outlined text-primary mt-1">info</span>
                  <div>
                    <p className="font-label-md text-label-md text-primary mb-1 font-bold">
                      Appointment Summary
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm font-medium leading-relaxed">
                      {visitType} with {selectedDoctor.name} on {selectedDate} at {selectedTime}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all w-full md:w-auto cursor-pointer font-bold"
                    type="submit"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* STEP 4: Booking Confirmation */}
        {step === 4 && (
          <div className="animate-pop-in flex flex-col items-center justify-center py-10 text-center">
            {/* Serene clinic room image */}
            <div className="w-full max-w-lg h-64 rounded-xl overflow-hidden mb-8 relative shadow-soft-modal bg-surface-container border border-outline-variant/20">
              <img
                alt="Minimalist modern hospital room"
                className="w-full h-full object-cover opacity-90"
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg animate-pop-in">
                  <span
                    className="material-symbols-outlined text-[#10B981] text-4xl font-fill"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
              </div>
            </div>

            <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary mb-4 font-bold">
              Booking Confirmed
            </h2>
            <p className="text-on-surface-variant font-body-md text-body-md max-w-md mx-auto mb-8 font-medium leading-relaxed">
              Your appointment is set for <strong>{selectedDate} at {selectedTime}</strong>. We&apos;ve sent a confirmation email to{" "}
              <strong>{email || "jane@example.com"}</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <button className="bg-surface-container-lowest border border-outline-variant text-primary px-6 py-3 rounded-full font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center justify-center gap-2 cursor-pointer font-bold">
                <span className="material-symbols-outlined text-sm">calendar_add_on</span> Add to Calendar
              </button>
              <Link
                href="/portal"
                className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer font-bold"
              >
                View Dashboard
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
