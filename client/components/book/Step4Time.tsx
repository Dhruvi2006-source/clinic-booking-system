"use client";

import { Doctor } from "@/types";

interface Step4TimeProps {
  selectedDate: string;
  selectedTime: string | null;
  selectedDoctor: Doctor | null;
  bookedSlots: string[];
  loadingSlots: boolean;
  onBack: () => void;
  onSelectTime: (time: string) => void;
}

export default function Step4Time({
  selectedDate,
  selectedTime,
  selectedDoctor,
  bookedSlots,
  loadingSlots,
  onBack,
  onSelectTime,
}: Step4TimeProps) {
  const candidateSlots = selectedDoctor?.activeSlots || [
    "09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM",
    "01:30 PM", "02:00 PM", "03:45 PM", "04:15 PM",
  ];

  const availableSlots = candidateSlots.filter((time) => {
    const slotDate = new Date(`${selectedDate} ${time}`);
    if (slotDate <= new Date()) return false;
    const isBooked = bookedSlots.some((isoStr) => new Date(isoStr).getTime() === slotDate.getTime());
    return !isBooked;
  });

  return (
    <div className="animate-pop-in space-y-6">
      <div
        className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary transition-colors w-fit font-bold text-sm"
        onClick={onBack}
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span>Back to Date</span>
      </div>

      <h2 className="text-headline-md font-headline-md text-primary font-bold">Choose Time Slot</h2>

      <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-4 sm:p-8 max-w-xl mx-auto shadow-sm space-y-6">
        <h3 className="font-headline-md text-primary font-bold text-center">
          Available slots for {selectedDate}
        </h3>

        {loadingSlots ? (
          <div className="flex justify-center items-center py-12">
            <span className="animate-spin material-symbols-outlined text-3xl text-primary">sync</span>
          </div>
        ) : selectedDoctor?.onDuty === false ? (
          <div className="text-center py-8 text-on-surface-variant font-medium">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">event_busy</span>
            <p className="text-sm">This doctor is currently off duty. Please check back later or select another physician.</p>
          </div>
        ) : availableSlots.length === 0 ? (
          <div className="text-center py-8 text-on-surface-variant font-medium">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">event_busy</span>
            <p className="text-sm">No slots available for this date. Please choose another date.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {availableSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => onSelectTime(time)}
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
        )}
      </div>
    </div>
  );
}
