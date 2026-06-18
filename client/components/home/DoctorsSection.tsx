"use client";

import Link from "next/link";

interface Doctor {
  id: string;
  name: string;
  specialty?: string;
  experience?: string;
  rating?: string;
  bio?: string;
  image?: string;
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
];

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3 h-3 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function DoctorsSection({ doctors }: { doctors: Doctor[] }) {
  if (doctors.length === 0) return null;

  const [featured, second, third] = doctors.slice(0, 3).map((d, i) => ({
    ...d,
    image: d.image || FALLBACK_IMAGES[i] || FALLBACK_IMAGES[0],
  }));

  return (
    <section id="doctors" className="section-lg" style={{ background: "#FFFFFF" }}>
      <div className="section-container">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-12 md:mb-16 reveal-on-scroll flex flex-col items-center">
          <span className="eyebrow mx-auto flex justify-center">Our Specialists</span>
          <h2 className="text-headline" style={{ color: "#0F172A" }}>
            Meet the Physicians<br />
            <span style={{ color: "#0B3B6E" }}>Behind Your Care</span>
          </h2>
          <Link
            href="/doctors"
            className="btn-secondary mt-2 inline-flex"
            style={{ fontSize: "clamp(12px, 1.3vw, 14px)", padding: "10px 24px" }}
          >
            View All Doctors
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </Link>
        </div>

        {/* Magazine layout grid */}
        <div
          style={{
            display: "grid",
            gap: "clamp(12px, 1.5vw, 20px)",
            gridTemplateColumns: "1fr",
          }}
          className="reveal-on-scroll"
        >
          {/* Row 1: Large featured doctor */}
          {featured && (
            <div
              className="editorial-card group overflow-hidden"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
              }}
            >
              {/* On md+: side by side */}
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div
                  className="relative overflow-hidden shrink-0"
                  style={{
                    width: "100%",
                    height: "clamp(260px, 30vw, 400px)",
                  }}
                >
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 hidden md:block" />
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                      style={{ background: "#2BB8A6", color: "#fff" }}
                    >
                      Featured
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div
                  style={{
                    flex: 1,
                    padding: "clamp(24px, 3vw, 48px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background: "#FAFBFD",
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <p style={{ fontSize: "clamp(11px, 1vw, 12px)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0B3B6E", marginBottom: "6px" }}>
                        {featured.specialty || "General Medicine"}
                      </p>
                      <h3
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 800,
                          fontSize: "clamp(22px, 2.5vw, 32px)",
                          color: "#0F172A",
                          letterSpacing: "-0.03em",
                          lineHeight: 1.1,
                        }}
                      >
                        {featured.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <StarRow />
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#64748B" }}>
                        {featured.rating || "4.9"} · {featured.experience || "12+ Years"}
                      </span>
                    </div>

                    <p style={{ color: "#64748B", fontSize: "clamp(13px, 1.4vw, 15px)", lineHeight: 1.7, maxWidth: "480px" }}>
                      {featured.bio || "Board-certified specialist committed to clinical excellence, preventive care, and comprehensive patient outcomes with a focus on evidence-based medicine."}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {["Board Certified", "MD", "10+ Years"].map((badge) => (
                        <span
                          key={badge}
                          className="text-[11px] font-semibold px-3 py-1 rounded-full"
                          style={{ background: "#E8F0FB", color: "#0B3B6E" }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/book?doctor=${featured.id}`}
                      className="btn-primary inline-flex"
                      style={{ fontSize: "clamp(12px, 1.3vw, 14px)", padding: "12px 28px", marginTop: "8px" }}
                    >
                      Book with {featured.name.split(" ")[1] || featured.name}
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Row 2: Two smaller cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "clamp(12px, 1.5vw, 20px)",
            }}
            className="sm-grid-2col"
          >
            {[second, third].filter(Boolean).map((doc, i) => (
              <div
                key={doc.id}
                className="editorial-card group overflow-hidden flex flex-col sm:flex-row reveal-on-scroll reveal-scale"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden shrink-0"
                  style={{
                    width: "100%",
                    height: "clamp(180px, 20vw, 240px)",
                  }}
                >
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(15,23,42,0.5) 0%, transparent 50%)" }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: "clamp(18px, 2vw, 28px)", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0B3B6E", marginBottom: "4px" }}>
                      {doc.specialty || "Specialist"}
                    </p>
                    <h3
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(16px, 1.8vw, 22px)",
                        color: "#0F172A",
                        letterSpacing: "-0.02em",
                        marginBottom: "8px",
                      }}
                    >
                      {doc.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <StarRow />
                      <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>
                        {doc.rating || "4.8"}
                      </span>
                    </div>

                    <p style={{ color: "#64748B", fontSize: "clamp(12px, 1.2vw, 13px)", lineHeight: 1.6 }}>
                      {doc.experience || "10+ Years Experience"} · Board Certified
                    </p>
                  </div>

                  <Link
                    href={`/book?doctor=${doc.id}`}
                    className="btn-secondary inline-flex mt-4"
                    style={{ fontSize: "12px", padding: "9px 20px" }}
                  >
                    Book Consultation
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .sm-grid-2col { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 768px) {
          .editorial-card .flex-col.md\\:flex-row { flex-direction: row; }
          .editorial-card .flex-col.md\\:flex-row > div:first-child {
            width: clamp(280px, 35%, 420px) !important;
            height: auto !important;
            min-height: 360px;
          }
        }
      `}</style>
    </section>
  );
}
