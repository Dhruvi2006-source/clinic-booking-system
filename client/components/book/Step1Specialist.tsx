"use client";

import { Doctor } from "@/types";

interface Step1SpecialistProps {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  selectedDoctor: Doctor | null;
  specialtyFilter: string;
  onSelectDoctor: (doc: Doctor) => void;
  onFilterChange: (f: string) => void;
  onContinue: () => void;
}

export default function Step1Specialist({
  doctors,
  loading,
  error,
  selectedDoctor,
  specialtyFilter,
  onSelectDoctor,
  onFilterChange,
  onContinue,
}: Step1SpecialistProps) {
  const filtered = doctors.filter((doc) =>
    specialtyFilter === "All" ? true : doc.specialty.toLowerCase() === specialtyFilter.toLowerCase()
  );

  return (
    <div className="animate-pop-in space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-headline-md font-headline-md text-primary font-bold">Choose Specialist</h2>
        <div className="flex flex-wrap gap-2">
          {["All", "Cardiology", "Neurology", "Dermatology"].map((spec) => (
            <button
              key={spec}
              onClick={() => onFilterChange(spec)}
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
          {filtered.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDoctor(doc)}
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
                <p className="text-label-md text-secondary font-bold">{doc.specialty}</p>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                  <span className="flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-yellow-500 font-fill text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
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

      {selectedDoctor && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={onContinue}
            className="bg-primary text-on-primary hover:bg-primary-container px-8 py-4 rounded-full font-label-md text-label-md hover:scale-[1.02] hover:shadow-md transition-all cursor-pointer font-bold flex items-center gap-2"
          >
            <span>Continue with {selectedDoctor.name}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
}
