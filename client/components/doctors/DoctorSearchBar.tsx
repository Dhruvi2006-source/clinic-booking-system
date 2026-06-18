"use client";

interface DoctorSearchBarProps {
  searchTerm: string;
  specialtyFilter: string;
  locationFilter: string;
  onSearchChange: (v: string) => void;
  onSpecialtyChange: (v: string) => void;
  onLocationChange: (v: string) => void;
}

export default function DoctorSearchBar({
  searchTerm,
  specialtyFilter,
  locationFilter,
  onSearchChange,
  onSpecialtyChange,
  onLocationChange,
}: DoctorSearchBarProps) {
  return (
    <div className="glass-panel w-full rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-4 justify-center items-center">
      <div
        className="w-full md:flex-1 flex items-center bg-surface-container-lowest rounded-xl soft-border focus-within:border-tertiary transition-colors"
        style={{ padding: 9 }}
      >
        <span className="material-symbols-outlined text-outline mr-3">
          search
        </span>
        <input
          className="w-full bg-transparent border-none focus:ring-0 p-0 text-body-md font-body-md placeholder-gray-900 focus:outline-none text-gray-800"
          placeholder="Search by name or condition..."
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div
        className="w-full md:flex-1 flex items-center bg-surface-container-lowest rounded-xl px-4 py-3 soft-border focus-within:border-tertiary transition-colors"
        style={{ padding: 9 }}
      >
        <span className="material-symbols-outlined text-outline mr-3">
          stethoscope
        </span>
        <select
          className="w-full bg-transparent border-none focus:ring-0 p-0 text-body-md font-body-md text-on-surface appearance-none cursor-pointer focus:outline-none"
          value={specialtyFilter}
          onChange={(e) => onSpecialtyChange(e.target.value)}
        >
          <option value="">All Specialties</option>
          <option value="cardio">Cardiology</option>
          <option value="neuro">Neurology</option>
          <option value="derma">Dermatology</option>
          <option value="pedia">Pediatrics</option>
        </select>
      </div>
      <div
        className="w-full md:flex-1 flex items-center bg-surface-container-lowest rounded-xl px-4 py-3 soft-border focus-within:border-tertiary transition-colors"
        style={{ padding: 9 }}
      >
        <span className="material-symbols-outlined text-outline mr-3">
          location_on
        </span>
        <select
          className="w-full bg-transparent border-none focus:ring-0 p-0 text-body-md font-body-md text-on-surface appearance-none cursor-pointer focus:outline-none"
          value={locationFilter}
          onChange={(e) => onLocationChange(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="ny">New York Central</option>
          <option value="sf">San Francisco Bay</option>
          <option value="ln">London West End</option>
        </select>
      </div>
      <button
        className=" md:w-auto bg-primary text-on-primary  rounded-xl text-label-md font-label-md hover:bg-primary/95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        style={{ paddingTop: 9 , paddingLeft: 15 , paddingRight: 15 , paddingBottom: 9}}
      >
        Search
      </button>
    </div>
  );
}
