"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { mockReviews } from "@/lib/mockData";
import { Doctor } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DoctorProfilePage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/doctors/${id}`);
        const json = await res.json();
        if (json.success) {
          const doc = json.data;
          const mapped: Doctor = {
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
          };
          setDoctor(mapped);
        } else {
          setError(json.message || "Doctor profile not found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch doctor profile");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-32 flex items-center justify-center">
        <span className="animate-spin material-symbols-outlined text-4xl text-primary">sync</span>
      </main>
    );
  }

  if (error || !doctor) {
    return (
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 flex items-center justify-center">
        <div className="bg-surface-container-lowest rounded-xl p-12 text-center soft-border max-w-md w-full">
          <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
          <h3 className="font-headline-md text-headline-md text-red-500 mb-2 font-semibold">Error Loading Profile</h3>
          <p className="text-on-surface-variant font-body-md text-body-md mb-6">{error || "Doctor not found"}</p>
          <Link href="/doctors" className="bg-primary text-on-primary px-6 py-2.5 rounded-full text-label-md font-label-md">
            Back to Directory
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap flex flex-col gap-section-gap relative">
      {/* Background Decorative Glowing Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-tertiary/10 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10" />
      <div className="absolute top-[600px] right-10 w-[400px] h-[400px] bg-gradient-to-bl from-primary-fixed/20 to-transparent blur-3xl rounded-full -z-10" />

      {/* Hero / Profile Anchor Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start relative z-10">
        {/* Portrait */}
        <div className="lg:col-span-4 relative rounded-xl overflow-hidden bg-surface-container-low shadow-level-2 border border-outline-variant/30 aspect-[3/4]">
          <img
            alt={`Portrait of ${doctor.name}`}
            className="w-full h-full object-cover"
            src={doctor.avatar}
          />
        </div>
        {/* Intro Details */}
        <div className="lg:col-span-8 flex flex-col justify-center h-full pl-0 lg:pl-gutter py-8">
          <div className="inline-flex items-center gap-2 bg-surface-container-high px-3 py-1 rounded-full w-fit mb-6 border border-outline-variant/30">
            <span
              className="material-symbols-outlined text-[16px] text-tertiary font-fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="text-caption font-caption text-on-surface font-semibold text-[12px]">
              Accepting New Patients
            </span>
          </div>
          <h1 className="text-display-lg font-display-lg text-on-surface mb-2 font-bold leading-tight">
            {doctor.name},{" "}
            <span className="font-light text-on-surface-variant">{doctor.title}</span>
          </h1>
          <p className="text-headline-md font-headline-md text-secondary mb-8 font-semibold">
            {doctor.specialty} Specialist &amp; Medical Director
          </p>

          <div className="flex flex-wrap gap-x-12 gap-y-6 mb-10 pb-10 border-b border-outline-variant/30">
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant mb-1 font-semibold">
                Experience
              </p>
              <p className="text-body-lg font-body-lg font-semibold text-on-surface">
                {doctor.experience}
              </p>
            </div>
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant mb-1 font-semibold">
                Patient Rating
              </p>
              <div className="flex items-center gap-1">
                <span className="text-body-lg font-body-lg font-semibold text-on-surface">
                  {doctor.rating}
                </span>
                <div className="flex text-[#F59E0B]">
                  <span className="material-symbols-outlined text-[18px] icon-fill">star</span>
                  <span className="material-symbols-outlined text-[18px] icon-fill">star</span>
                  <span className="material-symbols-outlined text-[18px] icon-fill">star</span>
                  <span className="material-symbols-outlined text-[18px] icon-fill">star</span>
                  <span className="material-symbols-outlined text-[18px] icon-fill">star_half</span>
                </div>
                <span className="text-caption font-caption text-on-surface-variant ml-1 font-medium">
                  ({doctor.reviewsCount} Reviews)
                </span>
              </div>
            </div>
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant mb-1 font-semibold">
                Languages
              </p>
              <p className="text-body-lg font-body-lg font-semibold text-on-surface">
                {doctor.languages.join(", ")}
              </p>
            </div>
          </div>

          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed mb-10">
            {doctor.bio}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => router.push(`/book?doctor=${doctor.id}`)}
              className="bg-primary text-on-primary text-label-md font-label-md px-8 py-4 rounded-full hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer font-semibold w-full sm:w-auto"
            >
              <span>Book Appointment</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button className="bg-surface-container-lowest border border-outline-variant text-on-surface text-label-md font-label-md px-6 py-4 rounded-full hover:bg-surface-container-low transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer font-semibold w-full sm:w-auto">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              <span>Save Profile</span>
            </button>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Details & Booking */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start relative z-10">
        {/* Left Column: Deep Dive */}
        <div className="lg:col-span-12 flex flex-col gap-section-gap">
          {/* Biography */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 md:p-10 shadow-level-2">
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-6 flex items-center gap-3 font-bold">
              <span className="material-symbols-outlined text-outline">history_edu</span>
              Biography
            </h2>
            <div className="prose max-w-none text-body-md font-body-md text-on-surface-variant space-y-4 leading-relaxed">
              <p>
                {doctor.name} received medical degrees with alpha honors. Following clinical residency, fellowships focused on cutting-edge techniques and cardiovascular diagnostics.
              </p>
              <p>
                Prior to joining AuraClinic, they served as Associate Director at leading metropolitan clinics. Research focuses on valvular and preventative medicine to improve clinical and patient outcomes.
              </p>
              <p>
                In client care, {doctor.name} prioritizes clear, empathetic communication and collaborative decision making to ensure you feel comfortable throughout your healthcare journey.
              </p>
            </div>
          </div>

          {/* Qualifications & Specialties (Bento Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Board Certifications */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-level-2">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-outline text-[20px]">
                  workspace_premium
                </span>
                Board Certifications
              </h3>
              <ul className="space-y-4">
                {doctor.boardCertifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-tertiary mt-0.5 text-[20px] font-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <div>
                      <p className="text-body-md font-body-md font-semibold text-on-surface">
                        {cert.title}
                      </p>
                      <p className="text-caption font-caption text-on-surface-variant font-medium">
                        {cert.board}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Clinical Specialties */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-level-2">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-outline text-[20px]">
                  medical_services
                </span>
                Specialties
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="bg-surface-container-low border border-outline-variant/30 text-on-surface text-label-md font-label-md px-3 py-1.5 rounded font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Reviews */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 md:p-10 shadow-level-2">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2 flex items-center gap-3 font-bold">
                  <span className="material-symbols-outlined text-outline">reviews</span>
                  Patient Reviews
                </h2>
                <p className="text-body-md font-body-md text-on-surface-variant font-medium">
                  Verified feedback from recent visits.
                </p>
              </div>
              <button className="text-label-md font-label-md text-primary hover:underline hidden md:block cursor-pointer font-bold">
                View All {doctor.reviewsCount} Reviews
              </button>
            </div>
            <div className="space-y-6">
              {mockReviews.map((rev) => (
                <div key={rev.id} className="p-6 bg-surface-container-low/50 rounded-lg border border-outline-variant/20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-headline-md shrink-0 ${rev.avatarBg}`}
                      >
                        {rev.avatarLetter}
                      </div>
                      <div>
                        <p className="text-body-md font-body-md font-semibold text-on-surface">
                          {rev.author}
                        </p>
                        <p className="text-caption font-caption text-on-surface-variant font-medium">
                          Visited for {rev.type} • {rev.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-[#F59E0B]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[16px] icon-fill">
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                    &quot;{rev.text}&quot;
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-outline-variant rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-container-lowest transition-colors md:hidden cursor-pointer">
              View All {doctor.reviewsCount} Reviews
            </button>
          </div>
        </div>

      </section>
    </main>
  );
}
