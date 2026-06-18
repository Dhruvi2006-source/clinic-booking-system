"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const SLIDES = [
  {
    id: 0,
    badge: "Trusted by Thousands of Patients",
    headline: ["Healthcare", "Designed", "Around Your", "Well-Being"],
    headlineAccent: [false, true, false, true],
    sub: "Expert care, advanced technology, and a patient-first experience that delivers confidence at every step of your health journey.",
    cta1: { label: "Book Appointment", href: "/book" },
    cta2: { label: "Meet Our Specialists", href: "/doctors" },
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Premium clinic examination room",
    floatingCards: [
      {
        position: "top-left",
        content: { icon: "star", iconBg: "#E8F0FB", iconColor: "#0B3B6E", title: "4.9", sub: "Patient Rating", extra: <StarRow />, extraNote: "Based on 2,400+ reviews" },
      },
      {
        position: "bottom-left",
        content: { icon: "verified_user", iconBg: "#E6F9F7", iconColor: "#2BB8A6", title: "Board Certified", sub: "All Physicians" },
      },
      {
        position: "right",
        content: { dot: "#16A34A", dotLabel: "Available Today", title: "Same-Day Slots", sub: "Book in 60 seconds" },
      },
    ],
    stats: [
      { value: "4.9", label: "Patient Rating", isRating: true },
      { value: "20+", label: "Years of Experience" },
      { value: "10,000+", label: "Patients Treated" },
    ],
    gradient: "linear-gradient(135deg, #FAFBFD 0%, #EBF3FF 50%, #FAFBFD 100%)",
    glow1: "rgba(43,184,166,0.08)",
    glow2: "rgba(11,59,110,0.06)",
  },
  {
    id: 1,
    badge: "Advanced Technology & Care",
    headline: ["Precision Medicine", "Powered by", "Cutting-Edge", "Technology"],
    headlineAccent: [true, false, true, false],
    sub: "State-of-the-art diagnostics, AI-assisted analysis, and digital health infrastructure — all working together to deliver faster, smarter care.",
    cta1: { label: "Explore Services", href: "/#services" },
    cta2: { label: "Our Facilities", href: "/#about" },
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Modern medical technology",
    floatingCards: [
      {
        position: "top-left",
        content: { icon: "biotech", iconBg: "#F0FDF4", iconColor: "#16A34A", title: "Rapid Results", sub: "In-House Lab", extra: null, extraNote: "Same-day diagnostics" },
      },
      {
        position: "bottom-left",
        content: { icon: "monitor_heart", iconBg: "#EBF3FF", iconColor: "#0F5DAA", title: "Digital Imaging", sub: "EKG & Ultrasound" },
      },
      {
        position: "right",
        content: { dot: "#0B3B6E", dotLabel: "Integrated", title: "Patient Portal", sub: "24/7 Access" },
      },
    ],
    stats: [
      { value: "50+", label: "Specialists", isRating: false },
      { value: "99%", label: "Satisfaction", isRating: false },
      { value: "24/7", label: "Portal Access", isRating: false },
    ],
    gradient: "linear-gradient(135deg, #F0F7FF 0%, #E8F5F3 50%, #F0F7FF 100%)",
    glow1: "rgba(11,59,110,0.08)",
    glow2: "rgba(43,184,166,0.06)",
  },
  {
    id: 2,
    badge: "Your Health, Your Schedule",
    headline: ["Flexible Booking,", "Zero Wait,", "World-Class", "Specialists"],
    headlineAccent: [false, true, false, true],
    sub: "Same-day appointments, walk-ins welcome, and seamless telehealth options — because your health shouldn't have to wait.",
    cta1: { label: "Book Now — Same Day", href: "/book" },
    cta2: { label: "View All Doctors", href: "/doctors" },
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Patient consultation with doctor",
    floatingCards: [
      {
        position: "top-left",
        content: { icon: "event_available", iconBg: "#FFF7ED", iconColor: "#EA580C", title: "Same Day", sub: "Appointments", extra: null, extraNote: "Walk-ins welcome" },
      },
      {
        position: "bottom-left",
        content: { icon: "video_call", iconBg: "#EBF3FF", iconColor: "#0B3B6E", title: "Telehealth", sub: "Secure Video Visits" },
      },
      {
        position: "right",
        content: { dot: "#2BB8A6", dotLabel: "Open Now", title: "Walk-Ins OK", sub: "~20 min wait" },
      },
    ],
    stats: [
      { value: "60s", label: "To Book Online", isRating: false },
      { value: "20m", label: "Avg Wait Time", isRating: false },
      { value: "7 Days", label: "A Week Open", isRating: false },
    ],
    gradient: "linear-gradient(135deg, #FAFBFD 0%, #F3F0FF 50%, #FAFBFD 100%)",
    glow1: "rgba(147,51,234,0.06)",
    glow2: "rgba(43,184,166,0.06)",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback(
    (idx: number) => {
      if (animating || idx === active) return;
      setDirection(idx > active ? "right" : "left");
      setAnimating(true);
      setTimeout(() => {
        setActive(idx);
        setAnimating(false);
      }, 400);
    },
    [active, animating]
  );

  const next = useCallback(() => goTo((active + 1) % SLIDES.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + SLIDES.length) % SLIDES.length), [active, goTo]);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next]);

  const slide = SLIDES[active];

  return (
    <section
      id="hero"
      className="relative min-h-[calc(50dvh-30px)] md:min-h-[calc(60dvh-58px)] flex items-center overflow-hidden"
      style={{ background: slide.gradient, transition: "background 0.8s ease" }}
    >
      {/* Radial glows */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${slide.glow1} 0%, transparent 70%)`,
          transition: "background 0.8s ease",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${slide.glow2} 0%, transparent 70%)`,
          transition: "background 0.8s ease",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#0B3B6E 1px, transparent 1px), linear-gradient(90deg, #0B3B6E 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10"
        style={{
          paddingLeft: "clamp(16px, 4vw, 32px)",
          paddingRight: "clamp(16px, 4vw, 32px)",
          paddingTop: "clamp(32px, 5vw, 80px)",
          paddingBottom: "clamp(32px, 5vw, 80px)",
          gap: "clamp(24px, 4vw, 80px)",
        }}
      >
        {/* LEFT — Copy */}
        <div
          className="space-y-3 lg:space-y-8 flex flex-col text-center lg:text-left items-center lg:items-start"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? direction === "right"
                ? "translateX(-32px)"
                : "translateX(32px)"
              : "translateX(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          {/* Trust badge */}
          <span
            className="inline-flex items-center gap-2 px-4 py-2 pt-4 rounded-full text-[12px] font-semibold tracking-wide uppercase"
            style={{
              background: "#E8F0FB",
              color: "#0B3B6E",
              border: "1px solid rgba(11,59,110,0.15)",
            }}
          >
            <svg className="w-3 h-3 fill-[#0B3B6E]" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {slide.badge}
          </span>

          {/* Headline */}
          <h1
            className="text-balance leading-[1.1] tracking-tight text-hero"
            style={{
              fontFamily: "'Plus Jakarta Sans', Manrope, sans-serif",
              fontWeight: 600,
              color: "#0F172A",
            }}
          >
            {slide.headline.map((line, i) => (
              <span key={i}>
                {slide.headlineAccent[i] ? (
                  i === slide.headline.length - 1 ? (
                    <span
                      style={{
                        background:
                          "linear-gradient(135deg, #0B3B6E 0%, #2BB8A6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {line}
                    </span>
                  ) : (
                    <span style={{ color: "#0B3B6E" }}>{line}</span>
                  )
                ) : (
                  line
                )}
                {i < slide.headline.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          {/* Sub */}
          <p
            className="leading-relaxed max-w-xl"
            style={{
              color: "#64748B",
              fontSize: "clamp(14px, 2vw, 18px)",
              paddingTop: "clamp(6px, 1vw, 32px)",
            }}
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto px-4 sm:px-0 pt-4"
            style={{ paddingTop: "clamp(6px, 1vw, 32px)" }}
          >
            <Link
              href={slide.cta1.href}
              className="btn-primary text-[15px] px-8 py-4 w-full sm:w-auto justify-center"
            >
              {slide.cta1.label}
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </Link>
            <Link
              href={slide.cta2.href}
              className="btn-secondary text-[15px] px-8 py-4 w-full sm:w-auto justify-center"
              style={{ paddingTop: "clamp(6px, 1vw, 32px)" }}
            >
              {slide.cta2.label}
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-8 pt-6 border-t"
            style={{
              borderColor: "rgba(15,23,42,0.08)",
              paddingTop: "clamp(6px, 1vw, 32px)",
            }}
          >
            {slide.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                {stat.isRating && (
                  <div className="flex -space-x-2">
                    {[
                      "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=60&q=80",
                      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=60&q=80",
                      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=60&q=80",
                    ].map((src, j) => (
                      <img
                        key={j}
                        src={src}
                        alt="patient"
                        className="w-9 h-9 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                )}
                <div>
                  {stat.isRating && <StarRow />}
                  <p
                    className={
                      stat.isRating
                        ? "text-[12px] font-semibold mt-0.5"
                        : "text-[24px] font-bold leading-none"
                    }
                    style={{
                      color: stat.isRating ? "#64748B" : "#0B3B6E",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {stat.isRating
                      ? `${stat.value} Patient Rating`
                      : stat.value}
                  </p>
                  {!stat.isRating && (
                    <p
                      className="text-[12px] font-semibold"
                      style={{ color: "#64748B" }}
                    >
                      {stat.label}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Image + floating cards */}
        <div
          className="relative flex items-center justify-center order-first lg:order-none"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? direction === "right"
                ? "translateX(32px)"
                : "translateX(-32px)"
              : "translateX(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <div
            className="relative w-full"
            style={{ maxWidth: "clamp(280px, 50vw, 500px)" }}
          >
            {/* Main image */}
            <div
              className="w-full overflow-hidden shadow-xl"
              style={{
                borderRadius: "clamp(16px, 3vw, 32px)",
                boxShadow: "0 40px 80px rgba(11,59,110,0.18)",
                /* Responsive aspect ratio: taller on mobile, 4/5 on desktop */
                aspectRatio: "4 / 3",
              }}
            >
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="w-full h-full"
                style={{ objectFit: "cover", objectPosition: "center center" }}
                loading="eager"
              />
            </div>

            {/* Floating card — top left (hidden on smallest screens to avoid overflow) */}
            <div
              className="absolute -left-8 sm:-left-14 top-6 sm:top-16 glass-card rounded-2xl p-3 sm:p-4 shadow-lg animate-float-a hidden sm:block"
              style={{
                boxShadow: "0 12px 40px rgba(11,59,110,0.12)",
                width: "clamp(140px, 20vw, 208px)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: slide.floatingCards[0].content.iconBg }}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: slide.floatingCards[0].content.iconColor }}
                  >
                    {slide.floatingCards[0].content.icon}
                  </span>
                </div>
                <div>
                  <p
                    className="font-bold text-[18px] leading-none"
                    style={{
                      color: "#0B3B6E",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {slide.floatingCards[0].content.title}
                  </p>
                  <p
                    className="text-[11px] font-semibold mt-0.5"
                    style={{ color: "#64748B" }}
                  >
                    {slide.floatingCards[0].content.sub}
                  </p>
                </div>
              </div>
              {slide.floatingCards[0].content.extra && (
                <div className="mt-2">
                  {slide.floatingCards[0].content.extra}
                </div>
              )}
              {slide.floatingCards[0].content.extraNote && (
                <p className="text-[10px] mt-1" style={{ color: "#64748B" }}>
                  {slide.floatingCards[0].content.extraNote}
                </p>
              )}
            </div>

            {/* Floating card — bottom left */}
            <div
              className="absolute -left-4 sm:-left-10 bottom-10 sm:bottom-24 glass-card rounded-2xl p-3 sm:p-4 shadow-lg animate-float-b hidden sm:block"
              style={{
                width: "clamp(140px, 20vw, 208px)",
                boxShadow: "0 12px 40px rgba(43,184,166,0.15)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: slide.floatingCards[1].content.iconBg }}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ color: slide.floatingCards[1].content.iconColor }}
                  >
                    {slide.floatingCards[1].content.icon}
                  </span>
                </div>
                <div>
                  <p
                    className="font-bold text-[13px]"
                    style={{ color: "#0F172A" }}
                  >
                    {slide.floatingCards[1].content.title}
                  </p>
                  <p className="text-[11px]" style={{ color: "#64748B" }}>
                    {slide.floatingCards[1].content.sub}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating card — right */}
            <div
              className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 glass-card rounded-2xl p-3 sm:p-4 shadow-lg animate-float-c hidden md:block "
              style={{
                width: "clamp(120px, 16vw, 192px)",
                boxShadow: "0 12px 40px rgba(11,59,110,0.10)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className="w-2 h-2 rounded-full animate-dot-pulse"
                  style={{ background: slide.floatingCards[2].content.dot }}
                />
                <p
                  className="text-[11px] font-bold"
                  style={{ color: slide.floatingCards[2].content.dot }}
                >
                  {slide.floatingCards[2].content.dotLabel}
                </p>
              </div>
              <p className="font-bold text-[13px]" style={{ color: "#0F172A" }}>
                {slide.floatingCards[2].content.title}
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "#64748B" }}>
                {slide.floatingCards[2].content.sub}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Carousel Controls ── */}
      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(11,59,110,0.12)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 16px rgba(11,59,110,0.12)",
        }}
      >
        <span
          className="material-symbols-outlined text-[20px]"
          style={{ color: "#0B3B6E" }}
        >
          chevron_left
        </span>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(11,59,110,0.12)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 16px rgba(11,59,110,0.12)",
        }}
      >
        <span
          className="material-symbols-outlined text-[20px]"
          style={{ color: "#0B3B6E" }}
        >
          chevron_right
        </span>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300 rounded-full cursor-pointer"
            style={{
              width: i === active ? "32px" : "8px",
              height: "8px",
              background: i === active ? "#0B3B6E" : "rgba(11,59,110,0.25)",
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-2 text-[13px] font-semibold"
        style={{ color: "#64748B" }}
      >
        <span
          style={{
            color: "#0B3B6E",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "16px",
          }}
        >
          0{active + 1}
        </span>
        <span>/</span>
        <span>0{SLIDES.length}</span>
      </div>
    </section>
  );
}
