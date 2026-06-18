"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Doctor, mapApiDoctor } from "@/types";

import DoctorSearchBar    from "@/components/doctors/DoctorSearchBar";
import DoctorQuickFilters from "@/components/doctors/DoctorQuickFilters";
import DoctorGrid         from "@/components/doctors/DoctorGrid";

/* ─────────────────────────────────────────────────
   Data fetching & filter logic extracted here
───────────────────────────────────────────────── */
function DirectoryContent() {
  const searchParams = useSearchParams();

  const [searchTerm,      setSearchTerm]      = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [locationFilter,  setLocationFilter]  = useState("");
  const [quickFilter,     setQuickFilter]     = useState<string | null>(null);
  const [doctors,         setDoctors]         = useState<Doctor[]>([]);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState<string | null>(null);

  // Initialise from URL params
  useEffect(() => {
    const spec = searchParams.get("specialty");
    const loc  = searchParams.get("location");
    if (spec) setSpecialtyFilter(spec);
    if (loc)  setLocationFilter(loc);
  }, [searchParams]);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res  = await fetch("http://localhost:5000/api/doctors");
        const json = await res.json();
        if (json.success) {
          const mapped = json.data.map(mapApiDoctor);
          setDoctors(mapped);
        } else {
          setError(json.message || "Failed to load doctors");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Filter logic
  const filteredDoctors = doctors.filter((doc) => {
    const matchSearch =
      searchTerm === "" ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchSpecialty =
      specialtyFilter === "" ||
      doc.specialty.toLowerCase() === specialtyFilter.toLowerCase() ||
      (specialtyFilter === "cardio" && doc.specialty.toLowerCase() === "cardiology") ||
      (specialtyFilter === "neuro"  && doc.specialty.toLowerCase() === "neurology")  ||
      (specialtyFilter === "derma"  && doc.specialty.toLowerCase() === "dermatology") ||
      (specialtyFilter === "pedia"  && doc.specialty.toLowerCase() === "pediatrics");

    const matchLocation =
      locationFilter === "" ||
      doc.location.toLowerCase().includes(locationFilter.toLowerCase()) ||
      (locationFilter === "ny" && doc.location.toLowerCase().includes("ny")) ||
      (locationFilter === "sf" && doc.location.toLowerCase().includes("sf")) ||
      (locationFilter === "ln" && doc.location.toLowerCase().includes("london"));

    let matchQuick = true;
    if      (quickFilter === "today")      matchQuick = doc.availableToday;
    else if (quickFilter === "telehealth") matchQuick = doc.telehealth;
    else if (quickFilter === "rated")      matchQuick = doc.rating >= 4.9;

    return matchSearch && matchSpecialty && matchLocation && matchQuick;
  });

  const handleReset = () => {
    setSearchTerm("");
    setSpecialtyFilter("");
    setLocationFilter("");
    setQuickFilter(null);
  };

  const toggleQuickFilter = (filter: string) =>
    setQuickFilter((prev) => (prev === filter ? null : filter));

  return (
    <main className="flex-grow flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 gap-12">

      {/* Hero & Search */}
      <section className="w-full flex flex-col gap-8 justify-center items-center text-center">
        <div className="max-w-3xl flex flex-col gap-4 mx-auto">
          <h1 className="text-headline md:text-display-lg text-on-surface font-bold text-center" style={{ paddingTop: 10 }}>
            Find your specialist.
          </h1>
          <p className="text-body-lg text-on-surface-variant text-center max-w-2xl mx-auto">
            Exceptional care tailored to your needs. Browse our directory of world-class medical professionals.
          </p>
        </div>

        <div className="flex justify-center w-full max-w-5xl mx-auto">
          <DoctorSearchBar
            searchTerm={searchTerm}
            specialtyFilter={specialtyFilter}
            locationFilter={locationFilter}
            onSearchChange={setSearchTerm}
            onSpecialtyChange={setSpecialtyFilter}
            onLocationChange={setLocationFilter}
          />
        </div>

        <div className="flex justify-center w-full max-w-5xl mx-auto">
          <DoctorQuickFilters quickFilter={quickFilter} onToggle={toggleQuickFilter} />
        </div>
      </section>

      {/* Directory Grid */}
      <section className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-8">
          <h2 className="text-headline-md text-on-surface font-semibold text-center sm:text-left mb-2 sm:mb-0">
            Available Specialists
          </h2>
          <span className="text-caption text-on-surface-variant font-medium">
            Showing {filteredDoctors.length} results
          </span>
        </div>

        <DoctorGrid
          doctors={filteredDoctors}
          loading={loading}
          error={error}
          onReset={handleReset}
        />
      </section>
    </main>
  );
}

export default function DoctorDirectory() {
  return (
    <Suspense
      fallback={
        <div className="flex-grow flex items-center justify-center py-24">
          <span className="animate-spin material-symbols-outlined text-4xl text-primary">sync</span>
        </div>
      }
    >
      <DirectoryContent />
    </Suspense>
  );
}
