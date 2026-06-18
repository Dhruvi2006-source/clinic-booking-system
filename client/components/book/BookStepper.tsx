"use client";

import { Doctor } from "@/types";

interface BookStepperProps {
  step: number;
  onGoToStep: (s: number) => void;
}

const STEP_LABELS = ["Specialist", "Type", "Date", "Time", "Details", "Confirmation"];

export default function BookStepper({ step, onGoToStep }: BookStepperProps) {
  return (
    <div className="mb-12 text-center md:text-left relative z-10">
      <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary mb-2 font-bold tracking-tight">
        Concierge Scheduling
      </h1>
      <p className="text-on-surface-variant font-body-md text-body-md font-medium">
        Experience frictionless clinical booking tailored to your schedule.
      </p>

      {/* Progress Bar */}
      <div className="mt-8 flex items-center justify-between relative w-full max-w-2xl mx-auto md:mx-0">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-outline-variant/30 -z-10" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary -z-10 transition-all duration-500"
          style={{ width: `${((step - 1) / 5) * 100}%` }}
        />
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2 relative">
            <button
              onClick={() => { if (s < step) onGoToStep(s); }}
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
              {STEP_LABELS[s - 1]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
