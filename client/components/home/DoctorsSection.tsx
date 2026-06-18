"use client";

import Link from "next/link";
import DoctorCard from "@/components/doctors/DoctorCard";
import { mapApiDoctor } from "@/types";

export default function DoctorsSection({ doctors }: { doctors: any[] }) {
  if (doctors.length === 0) return null;

  const mappedDoctors = doctors.slice(0, 3).map(mapApiDoctor);

  return (
    <section
      id="doctors"
      className="section-lg"
      style={{ background: "#FFFFFF" }}
    >
      <div className="section-container w-full max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-12 md:mb-16 reveal-on-scroll flex flex-col items-center">
          <span className="eyebrow mx-auto flex justify-center">
            Our Specialists
          </span>
          <h2 className="text-headline" style={{ color: "#0F172A" }}>
            Meet the Physicians
            <br />
            <span style={{ color: "#0B3B6E" }}>Behind Your Care</span>
          </h2>
          <Link
            href="/doctors"
            className="btn-secondary mt-2 inline-flex"
            style={{
              fontSize: "clamp(12px, 1.3vw, 14px)",
              padding: "10px 24px",
              marginBottom: "clamp(12px, 1.5vw, 16px)",
            }}
          >
            View All Doctors
            <span className="material-symbols-outlined text-[15px]">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mappedDoctors.map((doc) => (
            <DoctorCard key={doc.id} doc={doc} />
          ))}
        </div>
      </div>
    </section>
  );
}
