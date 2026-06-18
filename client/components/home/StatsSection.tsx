const STATS = [
  { value: "20+",  sup: "yrs",  label: "Years of Excellence",        icon: "workspace_premium", accent: "#0B3B6E" },
  { value: "10K+", sup: "",     label: "Patients Treated Annually",   icon: "favorite",          accent: "#2BB8A6" },
  { value: "50+",  sup: "",     label: "Board-Certified Specialists", icon: "verified_user",     accent: "#0F5DAA" },
  { value: "99%",  sup: "",     label: "Patient Satisfaction Rate",   icon: "star",              accent: "#16A34A" },
];

export default function StatsSection() {
  return (
    <section
      className="section-md"
      style={{ background: "#FFFFFF", borderTop: "1px solid rgba(15,23,42,0.06)", borderBottom: "1px solid rgba(15,23,42,0.06)" }}
    >
      <div className="section-container">
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: "1px", background: "rgba(15,23,42,0.07)", borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden" }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="reveal-on-scroll reveal-scale"
              style={{
                background: "#FFFFFF",
                padding: "clamp(24px, 4vw, 48px) clamp(20px, 3vw, 40px)",
                transitionDelay: `${i * 80}ms`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background ghost number */}
              <span
                className="absolute -top-2 -right-2 select-none pointer-events-none"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(48px, 6vw, 80px)",
                  letterSpacing: "-0.06em",
                  color: s.accent,
                  opacity: 0.04,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {s.value}
              </span>

              {/* Icon dot */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${s.accent}14` }}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ color: s.accent }}>
                  {s.icon}
                </span>
              </div>

              {/* Big value */}
              <div className="flex items-end gap-1 mb-1">
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(32px, 4.5vw, 60px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: s.accent,
                  }}
                >
                  {s.value}
                </span>
                {s.sup && (
                  <span
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "clamp(14px, 1.5vw, 18px)", color: s.accent, paddingBottom: "4px" }}
                  >
                    {s.sup}
                  </span>
                )}
              </div>

              <p
                style={{
                  fontSize: "clamp(12px, 1.2vw, 14px)",
                  fontWeight: 500,
                  color: "#64748B",
                  lineHeight: 1.4,
                  maxWidth: "160px",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
