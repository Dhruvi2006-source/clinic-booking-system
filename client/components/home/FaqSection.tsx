"use client";

import { useState } from "react";

const FAQS = [
  { q: "Do you accept walk-in patients?",            a: "Yes. We welcome walk-in patients and strive to see them within 30 minutes during regular business hours. Same-day appointments are also always available for scheduling online." },
  { q: "What insurance plans do you accept?",         a: "We participate with most major insurance networks including Blue Cross Blue Shield, Aetna, Cigna, United Healthcare, Medicare, Oxford, EmblemHealth, and Humana. Contact us to verify your specific plan." },
  { q: "How do I access my medical records?",         a: "All patients have 24/7 access to their complete health records, test results, visit summaries, and prescriptions through our secure Patient Portal — accessible via web or mobile." },
  { q: "Are telehealth appointments available?",      a: "Yes. We offer secure video consultations for follow-ups, prescription renewals, minor illness evaluations, and mental health check-ins. Book directly through the patient portal." },
  { q: "What are your hours of operation?",           a: "Monday–Friday: 8:00 AM – 8:00 PM. Saturday: 9:00 AM – 5:00 PM. Sunday: 10:00 AM – 3:00 PM. Extended hours available by appointment." },
  { q: "How long does a standard appointment take?", a: "Initial consultations typically take 30–45 minutes. Follow-up visits are 20–30 minutes. We ensure no patient ever feels rushed through their appointment." },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-lg" style={{ background: "#FAFBFD" }}>
      <div className="section-container">
        {/* Centered header */}
        <div className="text-center max-w-2xl mx-auto space-y-5 mb-12 md:mb-16 reveal-on-scroll flex flex-col items-center">
          <span className="eyebrow mx-auto flex justify-center">FAQ</span>
          <h2 className="text-headline" style={{ color: "#0F172A" }}>
            Common
            <br />
            <span style={{ color: "#0B3B6E" }}>Questions</span>
          </h2>
          <p
            style={{
              color: "#64748B",
              fontSize: "clamp(14px, 1.5vw, 16px)",
              lineHeight: 1.75,
              maxWidth: "500px",
              paddingBottom: 7,
            }}
          >
            Can't find the answer you're looking for? Reach out to our patient
            care team directly — we're always happy to help.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 w-full pb-6">
            <a
              href="tel:+12125550199"
              className="flex items-center gap-3 group"
              style={{
                padding: "clamp(12px, 1.5vw, 16px) clamp(16px, 2vw, 24px)",
                borderRadius: "clamp(12px, 1.5vw, 16px)",
                background: "#E8F0FB",
                border: "1px solid rgba(11,59,110,0.12)",
                transition: "all 0.25s ease",
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0B3B6E] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-[18px]">
                  call
                </span>
              </div>
              <div className="text-left">
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#64748B",
                    marginBottom: "2px",
                  }}
                >
                  Call us directly
                </p>
                <p
                  style={{
                    fontWeight: 700,
                    color: "#0B3B6E",
                    fontSize: "clamp(13px, 1.4vw, 15px)",
                  }}
                >
                  (212) 555-0199
                </p>
              </div>
            </a>

            <a
              href="mailto:care@auraclinic.com"
              className="flex items-center gap-3"
              style={{
                padding: "clamp(12px, 1.5vw, 16px) clamp(16px, 2vw, 24px)",
                borderRadius: "clamp(12px, 1.5vw, 16px)",
                background: "#E6F9F7",
                border: "1px solid rgba(43,184,166,0.2)",
                transition: "all 0.25s ease",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "#2BB8A6" }}
              >
                <span className="material-symbols-outlined text-white text-[18px]">
                  mail
                </span>
              </div>
              <div className="text-left">
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#64748B",
                    marginBottom: "2px",
                  }}
                >
                  Email us
                </p>
                <p
                  style={{
                    fontWeight: 700,
                    color: "#2BB8A6",
                    fontSize: "clamp(13px, 1.4vw, 15px)",
                  }}
                >
                  care@auraclinic.com
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Accordion list */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="reveal-on-scroll hover:zoom-120"
              style={{
                borderRadius: "clamp(14px, 1.8vw, 20px)",
                overflow: "hidden",
                background: "#FFFFFF",
                border: `1px solid ${open === i ? "rgba(11,59,110,0.16)" : "rgba(15,23,42,0.06)"}`,
                boxShadow:
                  open === i ? "0 8px 32px rgba(11,59,110,0.07)" : "none",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                transitionDelay: `${i * 40}ms`,
                marginTop:7
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                style={{
                  padding: "clamp(18px, 2vw, 24px) clamp(20px, 2.5vw, 28px)",
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(11px, 1.1vw, 13px)",
                      color: open === i ? "#0B3B6E" : "rgba(15,23,42,0.2)",
                      letterSpacing: "0.05em",
                      minWidth: "24px",
                      transition: "color 0.3s",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(14px, 1.5vw, 16px)",
                      color: open === i ? "#0B3B6E" : "#0F172A",
                      lineHeight: 1.3,
                      transition: "color 0.3s",
                    }}
                  >
                    {faq.q}
                  </span>
                </div>
                <div
                  className="shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: "32px",
                    height: "32px",
                    background: open === i ? "#0B3B6E" : "rgba(15,23,42,0.05)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ color: open === i ? "#fff" : "#64748B" }}
                  >
                    add
                  </span>
                </div>
              </button>

              {open === i && (
                <div
                  className="animate-accordion"
                  style={{
                    padding:
                      "0 clamp(20px, 2.5vw, 28px) clamp(18px, 2vw, 24px) calc(clamp(20px, 2.5vw, 28px) + 40px)",
                  }}
                >
                  <p
                    style={{
                      color: "#64748B",
                      fontSize: "clamp(13px, 1.4vw, 15px)",
                      lineHeight: 1.75,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
