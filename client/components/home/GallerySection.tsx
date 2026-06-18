"use client";

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    alt: "Clinic Reception",
    label: "Reception",
  },
  {
    src: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    alt: "Examination Room",
    label: "Examination",
  },
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    alt: "Laboratory",
    label: "Laboratory",
  },
  {
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    alt: "Waiting Lounge",
    label: "Lounge",
  },
  {
    src: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=800&q=80",
    alt: "Consultation Suite",
    label: "Consultation",
  },
  {
    src: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=800&q=80",
    alt: "Modern Diagnostics",
    label: "Diagnostics",
  },
];

export default function GallerySection() {
  return (
    <section className="section-lg" style={{ background: "#0B3B6E", position: "relative", overflow: "hidden" }}>

      {/* Subtle noise / pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="section-container relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-5 mb-10 md:mb-14 reveal-on-scroll flex flex-col items-center">
          <span className="eyebrow mx-auto flex justify-center" style={{ color: "#2BB8A6" }}>Our Facility</span>
          <h2
            className="text-headline"
            style={{ color: "#FFFFFF" }}
          >
            World-Class<br />
            <span style={{ color: "#2BB8A6" }}>Clinical</span> Spaces
          </h2>
          <p
            className="leading-relaxed text-center mx-auto"
            style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(14px, 1.5vw, 16px)", maxWidth: "400px" }}
          >
            Every corner of AuraClinic is designed with one purpose — your comfort, confidence, and care.
          </p>
        </div>

        {/* ── DESKTOP BENTO GRID (md+) ── */}
        <div className="hidden md:grid reveal-on-scroll" style={{
          display: "grid",
          gap: "clamp(8px, 1.2vw, 14px)",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto auto",
        }}>
          {/* A — Large tall hero cell */}
          <div
            className="bento-cell group cursor-pointer reveal-on-scroll"
            style={{
              gridColumn: "1 / 6",
              gridRow: "1 / 3",
              minHeight: "clamp(300px, 35vw, 500px)",
              position: "relative",
            }}
          >
            <img src={GALLERY[0].src} alt={GALLERY[0].alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
              className="group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span
              className="absolute bottom-5 left-5 text-white font-semibold uppercase tracking-widest"
              style={{ fontSize: "11px", letterSpacing: "0.12em" }}
            >
              {GALLERY[0].label}
            </span>
          </div>

          {/* B */}
          <div className="bento-cell group cursor-pointer reveal-on-scroll" style={{ gridColumn: "6 / 9", gridRow: "1 / 2", minHeight: "clamp(140px, 16vw, 240px)", position: "relative" }}>
            <img src={GALLERY[1].src} alt={GALLERY[1].alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }} className="group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-semibold uppercase tracking-widest" style={{ fontSize: "10px" }}>{GALLERY[1].label}</span>
          </div>

          {/* C */}
          <div className="bento-cell group cursor-pointer reveal-on-scroll" style={{ gridColumn: "9 / 13", gridRow: "1 / 2", minHeight: "clamp(140px, 16vw, 240px)", position: "relative" }}>
            <img src={GALLERY[2].src} alt={GALLERY[2].alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }} className="group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-semibold uppercase tracking-widest" style={{ fontSize: "10px" }}>{GALLERY[2].label}</span>
          </div>

          {/* D */}
          <div className="bento-cell group cursor-pointer reveal-on-scroll" style={{ gridColumn: "6 / 10", gridRow: "2 / 3", minHeight: "clamp(140px, 16vw, 240px)", position: "relative" }}>
            <img src={GALLERY[3].src} alt={GALLERY[3].alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }} className="group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-semibold uppercase tracking-widest" style={{ fontSize: "10px" }}>{GALLERY[3].label}</span>
          </div>

          {/* E */}
          <div className="bento-cell group cursor-pointer reveal-on-scroll" style={{ gridColumn: "10 / 13", gridRow: "2 / 3", minHeight: "clamp(140px, 16vw, 240px)", position: "relative" }}>
            <img src={GALLERY[4].src} alt={GALLERY[4].alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }} className="group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-semibold uppercase tracking-widest" style={{ fontSize: "10px" }}>{GALLERY[4].label}</span>
          </div>
        </div>

        {/* ── MOBILE SWIPE CAROUSEL (below md) ── */}
        <div className="md:hidden">
          {/* Scroll hint */}
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[16px]" style={{ color: "#2BB8A6" }}>swipe</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 500 }}>Swipe to explore</span>
          </div>
          <div className="gallery-mobile-scroll">
            {GALLERY.map((img, i) => (
              <div key={i} className="gallery-mobile-card" style={{ position: "relative" }}>
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span
                  className="absolute bottom-4 left-4 text-white font-semibold uppercase tracking-widest"
                  style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                >
                  {img.label}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll dot indicators */}
          <div className="flex justify-center gap-1.5 mt-4">
            {GALLERY.map((_, i) => (
              <span
                key={i}
                style={{ display: "inline-block", width: i === 0 ? "20px" : "6px", height: "6px", borderRadius: "9999px", background: i === 0 ? "#2BB8A6" : "rgba(255,255,255,0.25)", transition: "all 0.3s" }}
              />
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <div
          className="mt-12 md:mt-16 grid grid-cols-3 gap-px reveal-on-scroll"
          style={{ background: "rgba(255,255,255,0.1)", borderRadius: "clamp(12px, 2vw, 20px)", overflow: "hidden" }}
        >
          {[
            { value: "14,000 sq ft", label: "Clinical Space" },
            { value: "24 Suites", label: "Exam Rooms" },
            { value: "Floor 14", label: "Manhattan Views" },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center"
              style={{ padding: "clamp(16px, 3vw, 32px) clamp(12px, 2vw, 24px)", background: "rgba(11,59,110,0.3)" }}
            >
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(18px, 2.5vw, 28px)", color: "#FFFFFF", letterSpacing: "-0.03em" }}>{s.value}</p>
              <p style={{ fontSize: "clamp(10px, 1.1vw, 12px)", fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "4px" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
