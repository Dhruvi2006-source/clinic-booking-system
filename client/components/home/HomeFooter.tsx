import Link from "next/link";
import { SERVICES } from "@/components/home/ServicesSection";

export default function HomeFooter() {
  return (
    <footer style={{ background: "#071B34", color: "rgba(255,255,255,0.65)" }}>

      {/* ── CTA STRIP ── */}
      <div className="cta-strip section-md">
        <div className="section-container relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(22px, 3.5vw, 42px)",
                  color: "#FFFFFF",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Ready to Prioritize<br className="hidden md:block" /> Your Health?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(13px, 1.5vw, 16px)", marginTop: "10px" }}>
                Same-day appointments available · Walk-ins always welcome
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/book"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "#FFFFFF",
                  color: "#0B3B6E",
                  fontWeight: 700,
                  fontSize: "clamp(13px, 1.4vw, 15px)",
                  padding: "clamp(12px, 1.5vw, 16px) clamp(22px, 3vw, 36px)",
                  borderRadius: "9999px",
                  transition: "all 0.25s ease",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                  whiteSpace: "nowrap",
                }}
              >
                Book Appointment
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <a
                href="tel:+12125550199"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.12)",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "clamp(13px, 1.4vw, 15px)",
                  padding: "clamp(12px, 1.5vw, 16px) clamp(22px, 3vw, 36px)",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.25)",
                  transition: "all 0.25s ease",
                  whiteSpace: "nowrap",
                }}
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                (212) 555-0199
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER LINKS ── */}
      <div className="section-md" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "clamp(32px, 5vw, 48px)",
            }}
            className="footer-grid text-center md:text-left"
          >
            {/* Brand */}
            <div className="space-y-5 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                <div
                  className="rounded-xl flex items-center justify-center"
                  style={{ width: "40px", height: "40px", background: "#0B3B6E" }}
                >
                  <span className="material-symbols-outlined text-white text-[20px] icon-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                    health_and_safety
                  </span>
                </div>
                <div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#FFFFFF", fontSize: "17px", letterSpacing: "-0.02em" }}>
                    AuraClinic
                  </p>
                  <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2BB8A6", marginTop: "1px" }}>
                    Medical Excellence
                  </p>
                </div>
              </div>

              <p style={{ fontSize: "clamp(13px, 1.3vw, 14px)", lineHeight: 1.75, maxWidth: "280px" }}>
                Delivering world-class healthcare with compassion, precision, and unwavering commitment to every patient.
              </p>

              {/* Social */}
              <div className="flex gap-2 justify-center md:justify-start">
                {["facebook", "twitter", "linkedin", "instagram"].map((soc) => (
                  <a
                    key={soc}
                    href="#"
                    className="flex items-center justify-center transition-colors hover:bg-[#0B3B6E]"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    aria-label={soc}
                  >
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>
                      {soc[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#FFFFFF", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {["Home", "Services", "Find a Doctor", "Book Appointment", "Patient Portal", "About Us"].map((l) => (
                  <li key={l}>
                    <Link href="/" className="text-[14px] hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#FFFFFF", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Services
              </h4>
              <ul className="space-y-2.5">
                {SERVICES.map((s) => (
                  <li key={s.title}>
                    <a href="/#services" className="text-[14px] hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#FFFFFF", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Health Newsletter
              </h4>
              <p style={{ fontSize: "clamp(13px, 1.3vw, 14px)", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}>
                Monthly health tips, clinic updates, and preventive care reminders.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  style={{
                    width: "100%",
                    height: "46px",
                    padding: "0 16px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                <button
                  className="btn-accent w-full justify-center cursor-pointer"
                  style={{ fontSize: "14px", padding: "12px 20px", borderRadius: "12px" }}
                >
                  Subscribe
                  <span className="material-symbols-outlined text-[15px]">send</span>
                </button>
              </div>

              {/* Contact snippet */}
              <div className="pt-4 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>730 Fifth Avenue, Floor 14, New York, NY 10019</p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Mon–Fri 8AM–8PM · Sat 9AM–5PM · Sun 10AM–3PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "clamp(16px, 2vw, 24px) 0" }}>
        <div
          className="section-container flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left"
        >
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} AuraClinic. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Privacy Policy", "Terms of Service", "HIPAA Notice"].map((l) => (
              <a key={l} href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }} className="hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: 1.4fr 1fr 1fr 1.4fr !important; }
        }
      `}</style>
    </footer>
  );
}
