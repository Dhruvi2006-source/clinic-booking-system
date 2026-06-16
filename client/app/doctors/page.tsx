"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Doctor } from "@/types";

function DirectoryContent() {
  const searchParams = useSearchParams();

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [quickFilter, setQuickFilter] = useState<string | null>(null);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize from URL search parameters if present
  useEffect(() => {
    const spec = searchParams.get("specialty");
    const loc = searchParams.get("location");
    if (spec) setSpecialtyFilter(spec);
    if (loc) setLocationFilter(loc);
  }, [searchParams]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors");
        const json = await res.json();
        if (json.success) {
          const mapped = json.data.map((doc: any) => ({
            id: doc.id,
            name: doc.name,
            title: "MD, Board-Certified",
            specialty: doc.specialty,
            rating: doc.rating,
            reviewsCount: Math.floor(doc.rating * 25) + 12,
            avatar: doc.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80",
            bio: doc.bio,
            experience: `${doc.experience}+ Years`,
            languages: ["English", "Spanish"],
            location: "Midtown Manhattan Suite, NY",
            nextAvailable: "Today, 2:00 PM",
            verified: true,
            availableToday: true,
            telehealth: true,
            initialConsultationFee: doc.consultationFee,
            boardCertifications: [
              { title: `${doc.specialty} Specialist`, board: `American Board of ${doc.specialty}` }
            ],
            specialties: [doc.specialty, "Preventive Exams", "Chronic Care Management"]
          }));
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

  // Derived filtered doctors
  const filteredDoctors = doctors.filter((doc) => {
    // Search Name or Specialty or Bio
    const matchSearch =
      searchTerm === "" ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.bio.toLowerCase().includes(searchTerm.toLowerCase());

    // Specialty selector
    const matchSpecialty =
      specialtyFilter === "" ||
      doc.specialty.toLowerCase() === specialtyFilter.toLowerCase() ||
      (specialtyFilter === "cardio" && doc.specialty.toLowerCase() === "cardiology") ||
      (specialtyFilter === "neuro" && doc.specialty.toLowerCase() === "neurology") ||
      (specialtyFilter === "derma" && doc.specialty.toLowerCase() === "dermatology") ||
      (specialtyFilter === "pedia" && doc.specialty.toLowerCase() === "pediatrics");

    // Location selector
    const matchLocation =
      locationFilter === "" ||
      doc.location.toLowerCase().includes(locationFilter.toLowerCase()) ||
      (locationFilter === "ny" && doc.location.toLowerCase().includes("ny")) ||
      (locationFilter === "sf" && doc.location.toLowerCase().includes("sf")) ||
      (locationFilter === "ln" && doc.location.toLowerCase().includes("london"));

    // Quick filter badges
    let matchQuick = true;
    if (quickFilter === "today") {
      matchQuick = doc.availableToday;
    } else if (quickFilter === "telehealth") {
      matchQuick = doc.telehealth;
    } else if (quickFilter === "rated") {
      matchQuick = doc.rating >= 4.9;
    }

    return matchSearch && matchSpecialty && matchLocation && matchQuick;
  });

  const toggleQuickFilter = (filter: string) => {
    if (quickFilter === filter) {
      setQuickFilter(null);
    } else {
      setQuickFilter(filter);
    }
  };

  return (
    <main className="flex-grow flex flex-col items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-12 gap-section-gap">
      {/* Hero & Search Section */}
      <section className="w-full flex flex-col gap-8 text-center md:text-left">
        <div className="max-w-2xl">
          <h1 className="text-headline-lg-mobile md:text-display-lg font-headline-lg-mobile md:font-display-lg text-on-surface mb-4 font-bold">
            Find your specialist.
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            Exceptional care tailored to your needs. Browse our directory of world-class medical professionals.
          </p>
        </div>

        {/* Advanced Search Bar */}
        <div className="glass-panel w-full rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-sm relative z-10">
          <div className="flex-1 flex items-center bg-surface-container-lowest rounded-xl px-4 py-3 soft-border focus-within:border-tertiary transition-colors">
            <span className="material-symbols-outlined text-outline mr-3">search</span>
            <input
              className="w-full bg-transparent border-none focus:ring-0 p-0 text-body-md font-body-md placeholder-outline focus:outline-none"
              placeholder="Search by name or condition..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1 flex items-center bg-surface-container-lowest rounded-xl px-4 py-3 soft-border focus-within:border-tertiary transition-colors">
            <span className="material-symbols-outlined text-outline mr-3">stethoscope</span>
            <select
              className="w-full bg-transparent border-none focus:ring-0 p-0 text-body-md font-body-md text-on-surface appearance-none cursor-pointer focus:outline-none"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
            >
              <option value="">All Specialties</option>
              <option value="cardio">Cardiology</option>
              <option value="neuro">Neurology</option>
              <option value="derma">Dermatology</option>
              <option value="pedia">Pediatrics</option>
            </select>
          </div>
          <div className="flex-1 flex items-center bg-surface-container-lowest rounded-xl px-4 py-3 soft-border focus-within:border-tertiary transition-colors">
            <span className="material-symbols-outlined text-outline mr-3">location_on</span>
            <select
              className="w-full bg-transparent border-none focus:ring-0 p-0 text-body-md font-body-md text-on-surface appearance-none cursor-pointer focus:outline-none"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="ny">New York Central</option>
              <option value="sf">San Francisco Bay</option>
              <option value="ln">London West End</option>
            </select>
          </div>
          <button className="bg-primary text-on-primary px-8 py-3 rounded-xl text-label-md font-label-md hover:bg-primary/95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
            Search
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3 mt-2 items-center">
          <span className="text-caption font-caption text-outline-variant mr-2 flex items-center">
            Popular:
          </span>
          <button
            onClick={() => toggleQuickFilter("today")}
            className={`px-4 py-1.5 rounded-full border text-caption font-caption transition-colors cursor-pointer ${
              quickFilter === "today"
                ? "bg-primary border-primary text-on-primary"
                : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary bg-surface-container-lowest"
            }`}
          >
            Available Today
          </button>
          <button
            onClick={() => toggleQuickFilter("telehealth")}
            className={`px-4 py-1.5 rounded-full border text-caption font-caption transition-colors cursor-pointer ${
              quickFilter === "telehealth"
                ? "bg-primary border-primary text-on-primary"
                : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary bg-surface-container-lowest"
            }`}
          >
            Telehealth
          </button>
          <button
            onClick={() => toggleQuickFilter("rated")}
            className={`px-4 py-1.5 rounded-full border text-caption font-caption transition-colors cursor-pointer ${
              quickFilter === "rated"
                ? "bg-primary border-primary text-on-primary"
                : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary bg-surface-container-lowest"
            }`}
          >
            Highly Rated
          </button>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-headline-md font-headline-md text-on-surface font-semibold">
            Available Specialists
          </h2>
          <span className="text-caption font-caption text-on-surface-variant font-medium">
            Showing {filteredDoctors.length} results
          </span>
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
        ) : filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-surface-container-lowest rounded-2xl soft-border p-6 ambient-shadow ambient-shadow-hover transition-all duration-300 flex flex-col h-full cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="relative">
                    <img
                      alt={doc.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-surface-container-low"
                      src={doc.avatar}
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-4 h-4 border-2 border-surface-container-lowest rounded-full ${
                        doc.availableToday ? "bg-green-500" : "bg-yellow-500"
                      }`}
                      title={doc.availableToday ? "Available" : "Busy"}
                    ></span>
                  </div>
                  <button className="text-outline hover:text-primary hover:bg-surface-container p-2 rounded-full transition-colors">
                    <span className="material-symbols-outlined">favorite_border</span>
                  </button>
                </div>

                <div className="mb-4 flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-headline-md font-headline-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                      {doc.name}
                    </h3>
                    {doc.verified && (
                      <span
                        className="material-symbols-outlined text-primary text-sm font-fill"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    )}
                  </div>
                  <p className="text-label-md font-label-md text-on-tertiary-container mb-2 font-medium">
                    {doc.specialty}
                  </p>
                  <div className="flex items-center gap-1 text-caption font-caption text-on-surface-variant mb-4">
                    <span
                      className="material-symbols-outlined text-yellow-500 text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-medium text-on-surface">{doc.rating}</span>
                    <span>({doc.reviewsCount} reviews)</span>
                  </div>

                  <div className="flex flex-col gap-2 text-caption font-caption text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span>{doc.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">event_available</span>
                      <span
                        className={`${
                          doc.availableToday ? "text-green-600 font-semibold" : "text-on-surface-variant"
                        }`}
                      >
                        {doc.availableToday
                          ? `Next available: ${doc.nextAvailable}`
                          : `Next available: ${doc.nextAvailable}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-container-highest mt-auto">
                  <Link
                    href={`/doctors/${doc.id}`}
                    className="w-full py-2.5 rounded-lg border border-primary text-primary text-label-md font-label-md hover:bg-primary hover:text-on-primary transition-colors duration-200 text-center block"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-xl p-12 text-center soft-border">
            <span className="material-symbols-outlined text-outline text-5xl mb-4">
              search_off
            </span>
            <h3 className="font-headline-md text-headline-md text-primary mb-2 font-semibold">
              No Specialists Found
            </h3>
            <p className="text-on-surface-variant font-body-md text-body-md max-w-md mx-auto">
              We couldn&apos;t find any doctors matching your current filters. Try resetting or adjusting your search parameters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSpecialtyFilter("");
                setLocationFilter("");
                setQuickFilter(null);
              }}
              className="mt-6 bg-primary text-on-primary px-6 py-3 rounded-full text-label-md font-label-md hover:scale-[1.02] transition-transform"
            >
              Reset All Filters
            </button>
          </div>
        )}

        <div className="w-full flex justify-center mt-8">
          <button className="px-6 py-3 rounded-full border border-outline-variant text-label-md font-label-md text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer">
            Load More Specialists
          </button>
        </div>
      </section>
    </main>
  );
}

export default function DoctorDirectory() {
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
      <DirectoryContent />
    </Suspense>
  );
}
