"use client";

interface QuickFiltersProps {
  quickFilter: string | null;
  onToggle: (filter: string) => void;
}

const FILTERS = [
  { key: "today",      label: "Available Today" },
  { key: "telehealth", label: "Telehealth"       },
  { key: "rated",      label: "Highly Rated"     },
];

export default function DoctorQuickFilters({ quickFilter, onToggle }: QuickFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-2 items-center">
      <span className="text-caption font-caption text-outline-variant mr-2 flex items-center">Popular:</span>
      {FILTERS.map((f) => (
        <button
          key={f.key}
          onClick={() => onToggle(f.key)}
          className={`px-4 py-1.5 rounded-full border text-caption font-caption transition-colors cursor-pointer ${
            quickFilter === f.key
              ? "bg-primary border-primary text-on-primary"
              : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary bg-surface-container-lowest"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
