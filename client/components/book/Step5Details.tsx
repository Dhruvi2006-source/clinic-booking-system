"use client";

import AuthModal from "@/components/AuthModal";
import { Doctor } from "@/types";

interface Step5DetailsProps {
  selectedDoctor: Doctor | null;
  consultationType: "Virtual" | "In-Clinic" | null;
  selectedDate: string;
  selectedTime: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  isLoggedIn: boolean;
  bookingLoading: boolean;
  bookingError: string | null;
  onBack: () => void;
  onFirstNameChange: (v: string) => void;
  onLastNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onReasonChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLoginSuccess: () => void;
}

export default function Step5Details({
  selectedDoctor,
  consultationType,
  selectedDate,
  selectedTime,
  firstName,
  lastName,
  email,
  phone,
  reason,
  isLoggedIn,
  bookingLoading,
  bookingError,
  onBack,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneChange,
  onReasonChange,
  onSubmit,
  onLoginSuccess,
}: Step5DetailsProps) {
  return (
    <div className="animate-pop-in space-y-6">
      <div
        className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary transition-colors w-fit font-bold text-sm"
        onClick={onBack}
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span>Back to Time Slots</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
        {/* Patient form */}
        <div className={`md:col-span-8 bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-5 sm:p-8 shadow-sm transition-all duration-300 ${!isLoggedIn ? "blur-md pointer-events-none" : ""}`}>
          <h2 className="text-headline-md font-headline-md text-primary mb-2 font-bold">Patient Information</h2>
          <p className="text-on-surface-variant font-body-md text-body-md mb-8 font-medium">
            Provide your profile coordinates to complete booking.
          </p>

          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "First Name", value: firstName, onChange: onFirstNameChange, placeholder: "John",  type: "text",  readOnly: isLoggedIn },
                { label: "Last Name",  value: lastName,  onChange: onLastNameChange,  placeholder: "Doe",   type: "text",  readOnly: isLoggedIn },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-primary font-bold">{f.label}</label>
                  <input
                    className="h-14 px-4 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-body-md text-body-md read-only:opacity-85 read-only:cursor-not-allowed"
                    placeholder={f.placeholder}
                    required
                    readOnly={f.readOnly}
                    type={f.type}
                    value={f.value}
                    onChange={(e) => f.onChange(e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Email Address", value: email, onChange: onEmailChange, placeholder: "john.doe@example.com", type: "email", readOnly: isLoggedIn },
                { label: "Phone Number",  value: phone, onChange: onPhoneChange, placeholder: "(555) 123-4567",       type: "tel",   readOnly: false },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-primary font-bold">{f.label}</label>
                  <input
                    className="h-14 px-4 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-body-md text-body-md read-only:opacity-85 read-only:cursor-not-allowed"
                    placeholder={f.placeholder}
                    required
                    readOnly={f.readOnly}
                    type={f.type}
                    value={f.value}
                    onChange={(e) => f.onChange(e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-primary font-bold">Reason for Visit (Optional)</label>
              <textarea
                className="min-h-[110px] p-4 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-body-md text-body-md resize-none"
                placeholder="Symptoms, preventative assessments, or treatment follow-ups..."
                value={reason}
                onChange={(e) => onReasonChange(e.target.value)}
              />
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

        {/* Summary sidebar */}
        <div className="md:col-span-4 translucent-glass rounded-3xl p-6 space-y-6 shadow-sm border border-outline-variant/30">
          <h3 className="font-headline-md text-primary font-bold pb-4 border-b border-outline-variant/20">
            Appointment Summary
          </h3>
          {selectedDoctor && (
            <div className="flex items-center gap-3">
              <img alt={selectedDoctor.name} className="w-12 h-12 rounded-full object-cover" src={selectedDoctor.avatar} />
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

        {/* Auth overlay */}
        {!isLoggedIn && (
          <AuthModal
            canClose={false}
            onSuccess={onLoginSuccess}
          />
        )}
      </div>
    </div>
  );
}
