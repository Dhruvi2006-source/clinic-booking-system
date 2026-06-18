import Link from "next/link";
import { Doctor } from "@/types";

interface Step6ConfirmationProps {
  selectedDoctor: Doctor | null;
  consultationType: "Virtual" | "In-Clinic" | null;
  selectedDate: string;
  selectedTime: string | null;
  firstName: string;
  lastName: string;
  email: string;
}

export default function Step6Confirmation({
  selectedDoctor,
  consultationType,
  selectedDate,
  selectedTime,
  firstName,
  lastName,
  email,
}: Step6ConfirmationProps) {
  return (
    <div className="animate-pop-in flex flex-col items-center justify-center py-6 text-center space-y-8 max-w-2xl mx-auto">
      {/* Confirmation image */}
      <div className="w-full h-64 rounded-3xl overflow-hidden relative shadow-level-3 bg-surface-container border border-outline-variant/20">
        <img
          alt="Minimalist luxury lounge clinic room"
          className="w-full h-full object-cover opacity-95"
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
          Your appointment is finalized for <strong>{selectedDate} at {selectedTime}</strong>. We have generated your clinic check-in coordinates and sent an email confirmation to{" "}
          <strong>{email || "patient@example.com"}</strong>.
        </p>
      </div>

      {/* Email preview */}
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
  );
}
