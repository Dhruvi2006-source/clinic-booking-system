const STEPS = [
  {
    num: "01",
    title: "Book Online",
    desc: "Schedule in under 60 seconds — same-day slots always available.",
    icon: "event_available",
    accent: "#0B3B6E",
  },
  {
    num: "02",
    title: "Meet a Specialist",
    desc: "Face-to-face consultation with your board-certified physician.",
    icon: "stethoscope",
    accent: "#0F5DAA",
  },
  {
    num: "03",
    title: "Get Your Plan",
    desc: "Receive a personalised treatment plan built exclusively for you.",
    icon: "assignment",
    accent: "#2BB8A6",
  },
  {
    num: "04",
    title: "Ongoing Support",
    desc: "Continuous care and 24/7 portal access to track your progress.",
    icon: "health_metrics",
    accent: "#16A34A",
  },
];

export default function PatientJourneySection() {
  return (
    <section
      id="treatments"
      className="section-lg"
      style={{ background: "#FFFFFF" }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-5 mb-16 reveal-on-scroll flex flex-col items-center">
          <span className="eyebrow mx-auto flex justify-center">
            Patient Journey
          </span>
          <h2 className="text-headline" style={{ color: "#0F172A" }}>
            Your Experience,
            <br />
            <span style={{ color: "#2BB8A6" }}>Elevated</span>
          </h2>
          <p
            style={{
              color: "#64748B",
              fontSize: "clamp(14px, 1.6vw, 17px)",
              lineHeight: 1.7,
              paddingBottom: "clamp(6px, 1vw, 32px)",
            }}
          >
            A seamless, anxiety-free experience — from your first click to full
            recovery.
          </p>
        </div>

        {/* Steps grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "clamp(16px, 2vw, 24px)",
          }}
          className="steps-grid"
        >
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="relative reveal-on-scroll reveal-scale"
              style={{
                transitionDelay: `${i * 100}ms`,
                borderRadius: "clamp(16px, 2vw, 24px)",
                overflow: "hidden",
                background: "#FAFBFD",
                border: "1px solid rgba(15,23,42,0.06)",
                padding: "clamp(24px, 3vw, 40px)",
              }}
            >
              {/* Giant background number */}
              <span
                className="absolute -bottom-4 -right-2 pointer-events-none select-none"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(80px, 10vw, 120px)",
                  letterSpacing: "-0.06em",
                  lineHeight: 1,
                  color: step.accent,
                  opacity: 0.06,
                  userSelect: "none",
                }}
              >
                {step.num}
              </span>

              {/* Icon + step number row */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="flex items-center justify-center rounded-2xl"
                  style={{
                    width: "clamp(48px, 6vw, 64px)",
                    height: "clamp(48px, 6vw, 64px)",
                    background: step.accent,
                    boxShadow: `0 12px 32px ${step.accent}40`,
                  }}
                >
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontSize: "clamp(22px, 3vw, 28px)" }}
                  >
                    {step.icon}
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(11px, 1.1vw, 13px)",
                    letterSpacing: "0.1em",
                    color: step.accent,
                    opacity: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Step {step.num}
                </span>
              </div>

              {/* Content */}
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(18px, 2vw, 24px)",
                  color: "#0F172A",
                  letterSpacing: "-0.02em",
                  marginBottom: "10px",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  color: "#64748B",
                  fontSize: "clamp(13px, 1.3vw, 15px)",
                  lineHeight: 1.65,
                }}
              >
                {step.desc}
              </p>

              {/* Bottom accent line */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: step.accent,
                  opacity: 0.6,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .steps-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
