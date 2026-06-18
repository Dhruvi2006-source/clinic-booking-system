import Link from "next/link";

const WHY = [
  {
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Patient-First Philosophy",
    title: "Your Health Story\nDeserves Personalized Attention",
    desc: "Every patient receives a care plan built around their unique health history, lifestyle, and goals — not a generic protocol. Our physicians spend time listening, understanding, and collaborating with you on every step.",
    points: [
      { icon: "person", text: "Dedicated care coordinator for every patient" },
      { icon: "schedule", text: "Extended 45-minute appointment slots" },
      { icon: "sync", text: "Continuity of care — same physician, every visit" },
    ],
    accent: "#0B3B6E",
    dark: false,
  },
  {
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "State-of-the-Art Technology",
    title: "Modern Diagnostics,\nPrecise Results",
    desc: "Our clinic is equipped with cutting-edge diagnostic technology, digital health records, and telehealth infrastructure — all designed to deliver accurate, efficient, and compassionate care from day one.",
    points: [
      { icon: "biotech", text: "In-house lab with same-day results" },
      { icon: "monitor_heart", text: "Digital imaging, EKG & ultrasound" },
      { icon: "smartphone", text: "24/7 patient portal access" },
    ],
    accent: "#2BB8A6",
    dark: true,
  },
];

export default function WhyUsSection() {
  return (
    <section id="about" style={{ background: "#FAFBFD" }}>

      {/* Section header */}
      <div className="section-lg" style={{ paddingBottom: "0" }}>
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto space-y-5 reveal-on-scroll">
            <span className="eyebrow">Why AuraClinic</span>
            <h2 className="text-headline" style={{ color: "#0F172A" }}>
              A New Standard in<br />
              <span style={{ color: "#0B3B6E" }}>Patient Care</span>
            </h2>
          </div>
        </div>
      </div>

      {WHY.map((item, i) => (
        <div
          key={item.eyebrow}
          className="section-lg"
          style={{ background: item.dark ? "#071B34" : "#FAFBFD" }}
        >
          <div className="section-container">
            <div
              className="reveal-on-scroll"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "clamp(32px, 5vw, 72px)",
                alignItems: "center",
              }}
            >
              {/* Image */}
              <div
                className={`relative reveal-on-scroll ${i % 2 === 0 ? "reveal-left" : "reveal-right"} img-col`}
                style={{ order: i % 2 === 0 ? 0 : 1 }}
              >
                <div
                  style={{
                    borderRadius: "clamp(20px, 3vw, 36px)",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: item.dark
                      ? "0 40px 80px rgba(0,0,0,0.4)"
                      : "0 32px 72px rgba(11,59,110,0.14)",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.eyebrow}
                    className="split-image"
                    loading="lazy"
                  />
                  {/* Accent corner badge */}
                  <div
                    className="absolute bottom-5 right-5"
                    style={{
                      background: item.accent,
                      borderRadius: "14px",
                      padding: "12px 18px",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(18px, 2.5vw, 24px)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {i === 0 ? "10K+" : "99%"}
                    </p>
                    <p style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {i === 0 ? "Patients Served" : "Satisfaction"}
                    </p>
                  </div>
                </div>

                {/* Decorative blob */}
                <div
                  className="absolute -z-10"
                  style={{
                    width: "60%",
                    height: "60%",
                    borderRadius: "50%",
                    background: item.accent,
                    opacity: 0.07,
                    filter: "blur(60px)",
                    bottom: i % 2 === 0 ? "-10%" : undefined,
                    top: i % 2 === 1 ? "-10%" : undefined,
                    right: i % 2 === 0 ? "-10%" : undefined,
                    left: i % 2 === 1 ? "-10%" : undefined,
                  }}
                />
              </div>

              {/* Copy */}
              <div
                className={`space-y-8 reveal-on-scroll ${i % 2 === 0 ? "reveal-right" : "reveal-left"} copy-col`}
                style={{ order: i % 2 === 0 ? 1 : 0 }}
              >
                <span className="eyebrow" style={{ color: item.accent }}>{item.eyebrow}</span>

                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(24px, 3.5vw, 48px)",
                    color: item.dark ? "#FFFFFF" : "#0F172A",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.title}
                </h3>

                <p style={{ color: item.dark ? "rgba(255,255,255,0.6)" : "#64748B", fontSize: "clamp(14px, 1.6vw, 17px)", lineHeight: 1.75, maxWidth: "480px" }}>
                  {item.desc}
                </p>

                <ul className="space-y-4">
                  {item.points.map((pt) => (
                    <li key={pt.text} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: item.dark ? "rgba(255,255,255,0.08)" : `${item.accent}18` }}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ color: item.accent }}>
                          {pt.icon}
                        </span>
                      </div>
                      <span style={{ fontSize: "clamp(14px, 1.4vw, 16px)", fontWeight: 500, color: item.dark ? "rgba(255,255,255,0.8)" : "#0F172A", lineHeight: 1.5, paddingTop: "10px", paddingBottom:"10"}}>
                        {pt.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/book"
                  className="btn-primary inline-flex"
                  style={{
                    background: item.accent,
                    fontSize: "clamp(13px, 1.3vw, 15px)",
                    padding: "clamp(12px, 1.5vw, 16px) clamp(24px, 3vw, 36px)",
                    boxShadow: `0 8px 24px ${item.accent}40`,
                    marginTop: 10 
                  }}
                >
                  Schedule Appointment
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @media (min-width: 768px) {
          .img-col, .copy-col { order: unset !important; }
          .section-container > .reveal-on-scroll {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
