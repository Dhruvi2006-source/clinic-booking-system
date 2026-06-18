"use client";

import { useState, useEffect } from "react";

const TESTIMONIALS = [
  {
    name: "Robert Harrison",
    type: "Cardiology Patient",
    rating: 5,
    text: "The level of care I received was exceptional. From the moment I walked in, every staff member made me feel valued and reassured. My cardiologist was thorough, patient, and communicated everything clearly.",
    initials: "RH",
    color: "#0B3B6E",
    location: "New York, NY",
  },
  {
    name: "Elena Marchetti",
    type: "Annual Physical",
    rating: 5,
    text: "I've been coming to AuraClinic for three years now. Their preventive care approach has genuinely improved my overall health. The booking system is seamless, wait times are minimal, and the physicians are world-class.",
    initials: "EM",
    color: "#2BB8A6",
    location: "Manhattan, NY",
  },
  {
    name: "Thomas Lindqvist",
    type: "Acute Care Visit",
    rating: 5,
    text: "Needed urgent care for a severe sinus infection. They saw me within 20 minutes, ran rapid diagnostics, and had a prescription ready immediately. Far superior to any urgent care facility I've used before.",
    initials: "TL",
    color: "#0F5DAA",
    location: "Brooklyn, NY",
  },
];

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (idx: number) => {
    if (animating || idx === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 350);
  };

  useEffect(() => {
    const t = setInterval(() => go((active + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, [active]);

  const t = TESTIMONIALS[active];

  return (
    <section
      id="testimonials"
      className="section-xl relative overflow-hidden"
      style={{ background: "#071B34" }}
    >
      {/* Decorative orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(43,184,166,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left — Selector tabs */}
          <div className="lg:w-1/3 space-y-4 w-full order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="eyebrow block mb-6 mx-auto lg:mx-0 flex justify-center text-9xl">
              Patient Stories
            </span>
            {TESTIMONIALS.map((item, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="w-full text-left cursor-pointer"
                style={{
                  padding: "clamp(14px, 2vw, 20px) clamp(16px, 2vw, 24px)",
                  borderRadius: "clamp(12px, 1.5vw, 16px)",
                  background:
                    i === active
                      ? "rgba(43,184,166,0.12)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${i === active ? "rgba(43,184,166,0.3)" : "rgba(255,255,255,0.06)"}`,
                  marginTop: 8,
                  transition: "all 0.3s ease",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                    style={{ background: item.color, fontSize: "12px" }}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        color:
                          i === active ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                        fontSize: "clamp(13px, 1.3vw, 14px)",
                        transition: "color 0.3s",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color:
                          i === active ? "#2BB8A6" : "rgba(255,255,255,0.35)",
                        transition: "color 0.3s",
                      }}
                    >
                      {item.type}
                    </p>
                  </div>
                </div>
              </button>
            ))}

            {/* Trust stats */}
            <div
              className="mt-6 flex gap-4"
              style={{
                padding: "clamp(16px, 2vw, 24px)",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                marginTop: 6,
              }}
            >
              <div className="text-center flex-1">
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(20px, 2.5vw, 28px)",
                    color: "#FFFFFF",
                    letterSpacing: "-0.03em",
                  }}
                >
                  4.9★
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginTop: "2px",
                  }}
                >
                  Rating
                </p>
              </div>
              <div
                style={{ width: "1px", background: "rgba(255,255,255,0.08)" }}
              />
              <div className="text-center flex-1">
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(20px, 2.5vw, 28px)",
                    color: "#FFFFFF",
                    letterSpacing: "-0.03em",
                  }}
                >
                  2.4K
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginTop: "2px",
                  }}
                >
                  Reviews
                </p>
              </div>
            </div>
          </div>

          {/* Right — Large pull quote */}
          <div
            className="lg:w-2/3 w-full order-1 lg:order-2"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(12px)" : "translateY(0)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            {/* Big opening quote */}
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(80px, 12vw, 160px)",
                lineHeight: 0.7,
                color: "#2BB8A6",
                opacity: 0.25,
                marginBottom: "24px",
                userSelect: "none",
              }}
            >
              "
            </div>

            <StarRow />

            {/* Quote text */}
            <p
              className="pull-quote mt-6 mb-8"
              style={{ fontSize: "clamp(18px, 2.5vw, 30px)" }}
            >
              {t.text}
            </p>

            {/* Author */}
            <div
              className="flex items-center gap-4 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)" , marginTop: 6 }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-[18px] shrink-0"
                style={{
                  background: t.color,
                  boxShadow: `0 8px 24px ${t.color}40`,
                }}
              >
                {t.initials}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    fontSize: "clamp(15px, 1.5vw, 18px)",
                    marginTop: 5
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#2BB8A6",
                    fontWeight: 500,
                    marginTop: "2px",
                  }}
                >
                  {t.type} · {t.location}
                </p>
              </div>

              {/* Nav arrows */}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() =>
                    go((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                  }
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span className="material-symbols-outlined text-white text-[18px]">
                    arrow_back
                  </span>
                </button>
                <button
                  onClick={() => go((active + 1) % TESTIMONIALS.length)}
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                  style={{ background: "#2BB8A6", border: "1px solid #2BB8A6" }}
                >
                  <span className="material-symbols-outlined text-white text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
