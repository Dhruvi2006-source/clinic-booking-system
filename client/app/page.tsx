"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: "vaccines",
    title: "Preventive Screenings",
    desc: "Comprehensive wellness exams, cholesterol panels, diabetes screenings, and annual health assessments tailored to your unique health profile.",
    color: "#E8F0FB",
    iconColor: "#0B3B6E",
  },
  {
    icon: "medical_services",
    title: "Illness & Acute Care",
    desc: "Same-day evaluation for sore throats, sinus infections, UTIs, ear aches, allergies, skin conditions, and minor injuries.",
    color: "#E6F9F7",
    iconColor: "#2BB8A6",
  },
  {
    icon: "cardiology",
    title: "Cardiology & Heart",
    desc: "Advanced cardiovascular risk assessment, blood pressure management, EKG testing, and personalized cardiac wellness plans.",
    color: "#EBF3FF",
    iconColor: "#0F5DAA",
  },
  {
    icon: "biotech",
    title: "Lab & Diagnostics",
    desc: "In-house rapid diagnostics, comprehensive blood panels, urinalysis, and pathology services with same-day results.",
    color: "#F0FDF4",
    iconColor: "#16A34A",
  },
  {
    icon: "psychiatry",
    title: "Mental Health",
    desc: "Confidential assessments, counseling referrals, and integrated behavioral health support for anxiety, depression, and stress management.",
    color: "#FFF7ED",
    iconColor: "#EA580C",
  },
  {
    icon: "healing",
    title: "Physical Therapy",
    desc: "Evidence-based rehabilitation programs, post-surgical recovery, sports medicine, and chronic pain management strategies.",
    color: "#FDF4FF",
    iconColor: "#9333EA",
  },
];

const STATS = [
  { value: "20+",  label: "Years of Excellence",       icon: "workspace_premium" },
  { value: "10K+", label: "Patients Treated",           icon: "favorite"          },
  { value: "50+",  label: "Board-Certified Specialists", icon: "verified_user"    },
  { value: "99%",  label: "Patient Satisfaction",        icon: "star"             },
];

const STEPS = [
  { num: "01", title: "Book Appointment",       desc: "Schedule online in 60 seconds — same-day slots available.", icon: "event" },
  { num: "02", title: "Consult a Specialist",   desc: "Meet face-to-face with a board-certified physician.",         icon: "stethoscope" },
  { num: "03", title: "Personalized Treatment", desc: "Receive a treatment plan built exclusively for your needs.", icon: "assignment" },
  { num: "04", title: "Recovery & Follow-Up",   desc: "Ongoing support and monitoring to ensure lasting results.",   icon: "health_metrics" },
];

const WHY = [
  {
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
    badge: "Patient-First",
    title: "Personalized Care at Every Step",
    desc: "Every patient receives a care plan built around their unique health history, lifestyle, and goals — not a generic protocol. Our physicians spend time listening, understanding, and collaborating with you.",
    points: ["Dedicated care coordinator", "Extended appointment times", "Continuity of care guaranteed"],
  },
  {
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80",
    badge: "Advanced Technology",
    title: "Modern Facilities & Diagnostics",
    desc: "Our clinic is equipped with state-of-the-art diagnostic technology, digital health records, and telehealth infrastructure — all designed to deliver precise, efficient, and compassionate care.",
    points: ["In-house rapid lab results", "Digital imaging & EKG", "Integrated patient portal"],
  },
];

const TESTIMONIALS = [
  {
    name: "Robert Harrison",
    type: "Cardiology Patient",
    rating: 5,
    text: "The level of care I received was exceptional. From the moment I walked in, every staff member made me feel valued and reassured. My cardiologist was thorough, patient, and communicated everything clearly. This is healthcare the way it should be.",
    initials: "RH",
    color: "#0B3B6E",
  },
  {
    name: "Elena Marchetti",
    type: "Annual Physical",
    rating: 5,
    text: "I've been coming to AuraClinic for three years now. Their preventive care approach has genuinely improved my overall health. The booking system is seamless, wait times are minimal, and the physicians are world-class. Highly recommend.",
    initials: "EM",
    color: "#2BB8A6",
  },
  {
    name: "Thomas Lindqvist",
    type: "Acute Care Visit",
    rating: 5,
    text: "Needed urgent care for a severe sinus infection. They saw me within 20 minutes, ran rapid diagnostics, and had a prescription ready immediately. The experience was far superior to any urgent care facility I've used before.",
    initials: "TL",
    color: "#0F5DAA",
  },
];

const FAQS = [
  { q: "Do you accept walk-in patients?",            a: "Yes. We welcome walk-in patients and strive to see them within 30 minutes during regular business hours. Same-day appointments are also available for scheduling." },
  { q: "What insurance plans do you accept?",         a: "We participate with most major insurance networks including Blue Cross Blue Shield, Aetna, Cigna, United Healthcare, Medicare, Oxford, EmblemHealth, and Humana. Contact us to verify your specific plan." },
  { q: "How do I access my medical records?",         a: "All patients have 24/7 access to their complete health records, test results, visit summaries, and prescriptions through our secure Patient Portal." },
  { q: "Are telehealth appointments available?",      a: "Yes. We offer secure video consultations for follow-ups, prescription renewals, minor illness evaluations, and mental health check-ins. Book directly through the portal." },
  { q: "What are your hours of operation?",           a: "Monday–Friday: 8:00 AM – 8:00 PM. Saturday: 9:00 AM – 5:00 PM. Sunday: 10:00 AM – 3:00 PM. Extended hours available by appointment." },
  { q: "How long does a standard appointment take?", a: "Initial consultations typically take 30–45 minutes. Follow-up visits are 20–30 minutes. We ensure no patient feels rushed through their appointment." },
];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80", alt: "Clinic Reception",    tall: true  },
  { src: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80", alt: "Examination Room",   tall: false },
  { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80", alt: "Laboratory",          tall: false },
  { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80", alt: "Waiting Lounge",      tall: true  },
  { src: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=800&q=80", alt: "Consultation Suite",  tall: false },
  { src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80", alt: "Medical Technology",  tall: false },
];

const INSURERS = [
  "Blue Cross Blue Shield", "Aetna Health",  "Cigna Healthcare",
  "United Healthcare",      "Medicare",      "Oxford Insurance",
  "EmblemHealth",           "Humana Plans",  "Medicaid",
];

/* ─────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────── */
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-badge">
      {children}
    </span>
  );
}

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

/* ─────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────── */
export default function PremiumClinicHomepage() {
  const [doctors, setDoctors]               = useState<any[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq]               = useState<number | null>(null);

  // Fetch doctors
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((r) => r.json())
      .then((j) => { if (j.success && j.data.length > 0) setDoctors(j.data); })
      .catch(() => {});
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-active");
            o.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07 }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [doctors]);

  const phone = "(212) 555-0199";

  return (
    <main className="w-full overflow-x-hidden" style={{ background: "#FAFBFD", color: "#0F172A" }}>

      {/* ═══════════════════════════════════════════════
          HERO — Split Layout
      ═══════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-[calc(100vh-88px)] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FAFBFD 0%, #EBF3FF 50%, #FAFBFD 100%)" }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none animate-pulse-glow"
          style={{ background: "radial-gradient(circle, rgba(43,184,166,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(11,59,110,0.06) 0%, transparent 70%)" }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(#0B3B6E 1px, transparent 1px), linear-gradient(90deg, #0B3B6E 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-[1280px] mx-auto w-full px-5 md:px-8 py-16 lg:py-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

          {/* LEFT — Editorial copy */}
          <div className="space-y-8 lg:py-20">
            {/* Trust badge */}
            <div className="animate-slide-up-fade" style={{ animationDelay: "0ms" }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide uppercase"
                style={{ background: "#E8F0FB", color: "#0B3B6E", border: "1px solid rgba(11,59,110,0.15)" }}>
                <svg className="w-3 h-3 fill-[#0B3B6E]" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Trusted by Thousands of Patients
              </span>
            </div>

            {/* Headline */}
            <div className="animate-slide-up-fade" style={{ animationDelay: "80ms" }}>
              <h1
                className="text-balance leading-[1.1] tracking-tight"
                style={{
                  fontFamily: "'Plus Jakarta Sans', Manrope, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(38px, 5vw, 72px)",
                  color: "#0F172A",
                }}
              >
                Healthcare{" "}
                <span style={{ color: "#0B3B6E" }}>Designed</span>{" "}
                Around Your{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #0B3B6E 0%, #2BB8A6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Well-Being
                </span>
              </h1>
            </div>

            {/* Sub */}
            <p
              className="text-[18px] leading-relaxed max-w-xl animate-slide-up-fade"
              style={{ color: "#64748B", animationDelay: "160ms" }}
            >
              Expert care, advanced technology, and a patient-first experience that delivers confidence at every step of your health journey.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-slide-up-fade" style={{ animationDelay: "240ms" }}>
              <Link href="/book" className="btn-primary text-[15px] px-8 py-4">
                Book Appointment
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <Link href="/doctors" className="btn-secondary text-[15px] px-8 py-4">
                Meet Our Specialists
              </Link>
            </div>

            {/* Social proof row */}
            <div
              className="flex flex-wrap gap-8 pt-6 border-t animate-slide-up-fade"
              style={{ borderColor: "rgba(15,23,42,0.08)", animationDelay: "320ms" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=60&q=80",
                    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=60&q=80",
                    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=60&q=80"
                  ].map((src, i) => (
                    <img key={i} src={src} alt="patient" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <div>
                  <StarRow />
                  <p className="text-[12px] font-semibold mt-0.5" style={{ color: "#64748B" }}>
                    4.9 Patient Rating
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[24px] font-bold" style={{ color: "#0B3B6E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>20+</p>
                <p className="text-[12px] font-semibold" style={{ color: "#64748B" }}>Years of Experience</p>
              </div>
              <div>
                <p className="text-[24px] font-bold" style={{ color: "#0B3B6E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>10,000+</p>
                <p className="text-[12px] font-semibold" style={{ color: "#64748B" }}>Patients Treated</p>
              </div>
            </div>
          </div>

          {/* RIGHT — Premium image with floating cards */}
          <div className="relative hidden lg:flex items-center justify-center lg:py-20">
            <div className="relative w-full max-w-[500px]">
              {/* Main image */}
              <div
                className="w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-xl animate-slide-img-right"
                style={{ boxShadow: "0 40px 80px rgba(11,59,110,0.18)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=900&q=80"
                  alt="Premium clinic examination room"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Floating card — top left */}
              <div
                className="absolute -left-14 top-16 glass-card rounded-2xl p-4 shadow-lg w-48 animate-float-a"
                style={{ boxShadow: "0 12px 40px rgba(11,59,110,0.12)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#E8F0FB" }}>
                    <span className="material-symbols-outlined text-[20px]" style={{ color: "#0B3B6E" }}>star</span>
                  </div>
                  <div>
                    <p className="font-bold text-[18px] leading-none" style={{ color: "#0B3B6E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>4.9</p>
                    <p className="text-[11px] font-semibold mt-0.5" style={{ color: "#64748B" }}>Patient Rating</p>
                  </div>
                </div>
                <div className="mt-2">
                  <StarRow />
                  <p className="text-[10px] mt-1" style={{ color: "#64748B" }}>Based on 2,400+ reviews</p>
                </div>
              </div>

              {/* Floating card — bottom left */}
              <div
                className="absolute -left-10 bottom-24 glass-card rounded-2xl p-4 shadow-lg w-52 animate-float-b"
                style={{ boxShadow: "0 12px 40px rgba(43,184,166,0.15)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#E6F9F7" }}>
                    <span className="material-symbols-outlined text-[18px]" style={{ color: "#2BB8A6" }}>verified_user</span>
                  </div>
                  <div>
                    <p className="font-bold text-[13px]" style={{ color: "#0F172A" }}>Board Certified</p>
                    <p className="text-[11px]" style={{ color: "#64748B" }}>All Physicians</p>
                  </div>
                </div>
              </div>

              {/* Floating card — right */}
              <div
                className="absolute -right-12 top-1/2 -translate-y-1/2 glass-card rounded-2xl p-4 shadow-lg w-48 animate-float-c"
                style={{ boxShadow: "0 12px 40px rgba(11,59,110,0.10)" }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-2 h-2 rounded-full animate-dot-pulse" style={{ background: "#16A34A" }}></span>
                  <p className="text-[11px] font-bold" style={{ color: "#16A34A" }}>Available Today</p>
                </div>
                <p className="font-bold text-[13px]" style={{ color: "#0F172A" }}>Same-Day Slots</p>
                <p className="text-[11px] mt-0.5" style={{ color: "#64748B" }}>Book in 60 seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TRUST STATS
      ═══════════════════════════════════════════════ */}
      <section id="stats" className="py-16" style={{ background: "#FFFFFF" }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="premium-card p-7 text-center reveal-on-scroll reveal-scale"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "#E8F0FB" }}
                >
                  <span className="material-symbols-outlined text-[22px]" style={{ color: "#0B3B6E" }}>
                    {s.icon}
                  </span>
                </div>
                <p
                  className="text-[40px] font-bold leading-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0B3B6E" }}
                >
                  {s.value}
                </p>
                <p className="text-[13px] font-semibold mt-2" style={{ color: "#64748B" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════════ */}
      <section id="services" className="py-24 md:py-32" style={{ background: "#FAFBFD" }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-5 reveal-on-scroll">
            <SectionBadge>Our Services</SectionBadge>
            <h2
              className="text-[32px] md:text-[44px] font-bold tracking-tight text-balance"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F172A" }}
            >
              Comprehensive Care for Every Stage of Life
            </h2>
            <p className="text-[17px] leading-relaxed" style={{ color: "#64748B" }}>
              From routine wellness to complex diagnostics, our board-certified specialists deliver evidence-based care across every discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.title}
                className="premium-card p-7 space-y-4 group reveal-on-scroll reveal-scale cursor-pointer"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: svc.color }}
                >
                  <span
                    className="material-symbols-outlined text-[26px]"
                    style={{ color: svc.iconColor }}
                  >
                    {svc.icon}
                  </span>
                </div>
                <h3
                  className="text-[18px] font-bold"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F172A" }}
                >
                  {svc.title}
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: "#64748B" }}>
                  {svc.desc}
                </p>
                <div className="flex items-center gap-1.5 pt-2">
                  <span className="text-[13px] font-semibold" style={{ color: "#0B3B6E" }}>Learn More</span>
                  <span className="material-symbols-outlined text-[14px] transition-transform duration-200 group-hover:translate-x-1" style={{ color: "#0B3B6E" }}>
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DOCTORS
      ═══════════════════════════════════════════════ */}
      {doctors.length > 0 && (
        <section id="doctors" className="py-24 md:py-32" style={{ background: "#FFFFFF" }}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal-on-scroll">
              <div className="space-y-4 max-w-xl">
                <SectionBadge>Our Specialists</SectionBadge>
                <h2
                  className="text-[32px] md:text-[44px] font-bold tracking-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F172A" }}
                >
                  Meet Our Expert Physicians
                </h2>
              </div>
              <Link href="/doctors" className="btn-secondary text-[14px] shrink-0">
                View All Doctors
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.slice(0, 3).map((doc, i) => (
                <div
                  key={doc.id}
                  className="doctor-card group reveal-on-scroll reveal-scale"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Photo */}
                  <div className="relative h-72 overflow-hidden rounded-t-[28px]">
                    <img
                      src={doc.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"}
                      alt={doc.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 50%)" }} />
                    <div className="absolute bottom-4 left-4">
                      <span
                        className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(43,184,166,0.9)", color: "#fff" }}
                      >
                        MD, Board-Certified
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3
                        className="text-[19px] font-bold"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F172A" }}
                      >
                        {doc.name}
                      </h3>
                      <p className="text-[13px] font-semibold mt-0.5" style={{ color: "#0B3B6E" }}>
                        {doc.specialty}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[13px]" style={{ color: "#64748B" }}>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]" style={{ color: "#2BB8A6" }}>schedule</span>
                        {doc.experience || "10+ Years Experience"}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span className="font-semibold">{doc.rating || "4.9"}</span>
                      </div>
                    </div>

                    <p className="text-[13px] leading-relaxed" style={{ color: "#64748B" }}>
                      {doc.bio || "Board-certified specialist committed to clinical excellence, preventive care, and comprehensive patient outcomes."}
                    </p>

                    <Link
                      href={`/book?doctor=${doc.id}`}
                      className="btn-primary w-full justify-center text-[14px] py-3"
                    >
                      Book Consultation
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          PATIENT EXPERIENCE TIMELINE
      ═══════════════════════════════════════════════ */}
      <section id="treatments" className="py-24 md:py-32" style={{ background: "#FAFBFD" }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-5 reveal-on-scroll">
            <SectionBadge>Patient Journey</SectionBadge>
            <h2
              className="text-[32px] md:text-[44px] font-bold tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F172A" }}
            >
              Your Experience, Elevated
            </h2>
            <p className="text-[17px] leading-relaxed" style={{ color: "#64748B" }}>
              A seamless, anxiety-free experience from your first click to full recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line (desktop) */}
            <div
              className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, #0B3B6E 20%, #2BB8A6 50%, #0B3B6E 80%, transparent)" }}
            />

            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center space-y-4 reveal-on-scroll"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Step bubble */}
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: i % 2 === 0 ? "#0B3B6E" : "#2BB8A6",
                    boxShadow: `0 8px 32px rgba(${i % 2 === 0 ? "11,59,110" : "43,184,166"},0.3)`,
                  }}
                >
                  <span className="material-symbols-outlined text-white text-[30px]">{step.icon}</span>
                  <span
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: "#FFFFFF", color: i % 2 === 0 ? "#0B3B6E" : "#2BB8A6", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
                  >
                    {step.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3
                    className="text-[17px] font-bold"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F172A" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed max-w-[200px] mx-auto" style={{ color: "#64748B" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHY CHOOSE US — Alternating
      ═══════════════════════════════════════════════ */}
      <section id="about" className="py-24 md:py-32 space-y-24" style={{ background: "#FFFFFF" }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-5 mb-20 reveal-on-scroll">
            <SectionBadge>Why AuraClinic</SectionBadge>
            <h2
              className="text-[32px] md:text-[44px] font-bold tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F172A" }}
            >
              A New Standard in Patient Care
            </h2>
          </div>

          <div className="space-y-24">
            {WHY.map((item, i) => (
              <div
                key={item.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                {/* Image */}
                <div className={`relative reveal-on-scroll ${i % 2 === 1 ? "reveal-right lg:col-start-2" : "reveal-left"}`}>
                  <div
                    className="w-full aspect-[4/3] rounded-[28px] overflow-hidden"
                    style={{ boxShadow: "0 24px 64px rgba(11,59,110,0.12)" }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Decorative accent */}
                  <div
                    className={`absolute -z-10 w-64 h-64 rounded-full blur-3xl opacity-30
                      ${i % 2 === 0 ? "-bottom-8 -right-8" : "-bottom-8 -left-8"}`}
                    style={{ background: "#2BB8A6" }}
                  />
                </div>

                {/* Content */}
                <div className={`space-y-7 reveal-on-scroll ${i % 2 === 1 ? "reveal-left lg:col-start-1 lg:row-start-1" : "reveal-right"}`}>
                  <SectionBadge>{item.badge}</SectionBadge>
                  <h3
                    className="text-[28px] md:text-[36px] font-bold tracking-tight leading-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F172A" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[17px] leading-relaxed" style={{ color: "#64748B" }}>
                    {item.desc}
                  </p>
                  <ul className="space-y-3">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: "#E6F9F7" }}>
                          <span className="material-symbols-outlined text-[13px]" style={{ color: "#2BB8A6" }}>check</span>
                        </div>
                        <span className="text-[15px] font-semibold" style={{ color: "#0F172A" }}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/book" className="btn-primary text-[14px] px-7 py-3.5 inline-flex">
                    Schedule Appointment
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#071B34" }}>
        {/* Radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center top, rgba(43,184,166,0.12) 0%, transparent 70%)" }}
        />

        <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-16 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-5 reveal-on-scroll">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide uppercase"
              style={{ background: "rgba(43,184,166,0.15)", color: "#2BB8A6", border: "1px solid rgba(43,184,166,0.2)" }}
            >
              Patient Stories
            </span>
            <h2
              className="text-[32px] md:text-[44px] font-bold tracking-tight text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              What Our Patients Say
            </h2>
          </div>

          {/* Testimonial carousel */}
          <div className="max-w-3xl mx-auto space-y-8">
            <div
              key={activeTestimonial}
              className="rounded-[28px] p-8 md:p-10 space-y-6 reveal-on-scroll reveal-scale animate-fade-in"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Quote mark */}
              <svg className="w-10 h-10 opacity-30" viewBox="0 0 40 40" fill="#2BB8A6">
                <path d="M18 10H8L4 22h7l-4 8h8l3-20zm18 0h-10l-4 12h7l-4 8h8l3-20z" />
              </svg>

              <StarRow />

              <p className="text-[18px] md:text-[20px] leading-relaxed font-medium text-white/90">
                &ldquo;{TESTIMONIALS[activeTestimonial].text}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-[16px] shrink-0"
                  style={{ background: TESTIMONIALS[activeTestimonial].color }}
                >
                  {TESTIMONIALS[activeTestimonial].initials}
                </div>
                <div>
                  <p className="font-bold text-white text-[15px]">{TESTIMONIALS[activeTestimonial].name}</p>
                  <p className="text-[13px]" style={{ color: "#2BB8A6" }}>{TESTIMONIALS[activeTestimonial].type}</p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: i === activeTestimonial ? "28px" : "8px",
                    height: "8px",
                    background: i === activeTestimonial ? "#2BB8A6" : "rgba(255,255,255,0.3)",
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          GALLERY — Masonry
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ background: "#FAFBFD" }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-5 reveal-on-scroll">
            <SectionBadge>Our Facility</SectionBadge>
            <h2
              className="text-[32px] md:text-[44px] font-bold tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F172A" }}
            >
              World-Class Clinical Environment
            </h2>
          </div>

          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className="break-inside-avoid overflow-hidden rounded-2xl group cursor-pointer reveal-on-scroll reveal-scale"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ height: img.tall ? "320px" : "220px" }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          INSURANCE MARQUEE
      ═══════════════════════════════════════════════ */}
      <section className="py-8 overflow-hidden border-y" style={{ background: "#FFFFFF", borderColor: "rgba(15,23,42,0.06)" }}>
        <p className="text-center text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: "#64748B" }}>
          Accepted Insurance Providers
        </p>
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-2">
            {[...INSURERS, ...INSURERS].map((ins, i) => (
              <span key={i} className="text-[13px] font-semibold" style={{ color: "#64748B" }}>
                {ins}
              </span>
            ))}
            <span style={{ color: "#2BB8A6" }}>•</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ background: "#FAFBFD" }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 space-y-12">
          <div className="text-center space-y-5 reveal-on-scroll">
            <SectionBadge>FAQ</SectionBadge>
            <h2
              className="text-[32px] md:text-[44px] font-bold tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F172A" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden reveal-on-scroll"
                style={{
                  border: `1px solid ${openFaq === i ? "rgba(11,59,110,0.2)" : "rgba(15,23,42,0.08)"}`,
                  background: openFaq === i ? "#FFFFFF" : "#FFFFFF",
                  boxShadow: openFaq === i ? "0 4px 24px rgba(11,59,110,0.07)" : "none",
                  transitionDelay: `${i * 40}ms`,
                  transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
                >
                  <span
                    className="font-semibold text-[16px]"
                    style={{ color: openFaq === i ? "#0B3B6E" : "#0F172A" }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="material-symbols-outlined shrink-0 transition-transform duration-300 text-[20px]"
                    style={{
                      color: "#0B3B6E",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    add
                  </span>
                </button>

                {openFaq === i && (
                  <div className="px-6 pb-6 animate-accordion">
                    <p className="text-[15px] leading-relaxed" style={{ color: "#64748B" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CONTACT / BOOKING
      ═══════════════════════════════════════════════ */}
      <section id="contact" className="py-24 md:py-32" style={{ background: "#FFFFFF" }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-5 reveal-on-scroll">
            <SectionBadge>Contact Us</SectionBadge>
            <h2
              className="text-[32px] md:text-[44px] font-bold tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F172A" }}
            >
              Ready to Prioritize Your Health?
            </h2>
            <p className="text-[17px] leading-relaxed" style={{ color: "#64748B" }}>
              Book a same-day appointment or reach out to our patient care team directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact info */}
            <div className="space-y-8 reveal-on-scroll reveal-left">
              {[
                { icon: "location_on", label: "Address", val: "730 Fifth Avenue, Floor 14, New York, NY 10019" },
                { icon: "call", label: "Phone", val: phone, href: `tel:${phone}` },
                { icon: "mail", label: "Email", val: "care@auraclinic.com", href: "mailto:care@auraclinic.com" },
                { icon: "schedule", label: "Hours", val: "Mon–Fri 8AM–8PM · Sat 9AM–5PM · Sun 10AM–3PM" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: "#E8F0FB" }}
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ color: "#0B3B6E" }}>{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-wide mb-1" style={{ color: "#64748B" }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="text-[16px] font-semibold hover:underline" style={{ color: "#0B3B6E" }}>
                        {item.val}
                      </a>
                    ) : (
                      <p className="text-[16px] font-semibold" style={{ color: "#0F172A" }}>{item.val}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map embed */}
              <div className="w-full h-64 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(15,23,42,0.08)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1757547040784!2d-73.97648352412826!3d40.763074971395476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f98da12049%3A0x89c4572a9d70ddd3!2s730%205th%20Ave%2C%20New%20York%2C%20NY%2010019!5e0!3m2!1sen!2sus!4v1685000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AuraClinic Location"
                />
              </div>
            </div>

            {/* Booking form */}
            <div
              className="rounded-[28px] p-8 space-y-6 reveal-on-scroll reveal-right"
              style={{
                background: "#FAFBFD",
                border: "1px solid rgba(15,23,42,0.08)",
                boxShadow: "0 12px 40px rgba(11,59,110,0.07)",
              }}
            >
              <h3
                className="text-[22px] font-bold"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0F172A" }}
              >
                Book an Appointment
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "First Name",   type: "text",  placeholder: "John" },
                  { label: "Last Name",    type: "text",  placeholder: "Smith" },
                  { label: "Email",        type: "email", placeholder: "john@example.com" },
                  { label: "Phone",        type: "tel",   placeholder: "+1 (212) 555-0000" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-[13px] font-semibold mb-1.5" style={{ color: "#0F172A" }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full h-12 px-4 rounded-xl text-[14px] font-medium outline-none transition-all focus:ring-2"
                      style={{
                        background: "#FFFFFF",
                        border: "1.5px solid rgba(15,23,42,0.12)",
                        color: "#0F172A",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-[13px] font-semibold mb-1.5" style={{ color: "#0F172A" }}>
                  Service Needed
                </label>
                <select
                  className="w-full h-12 px-4 rounded-xl text-[14px] font-medium outline-none"
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid rgba(15,23,42,0.12)",
                    color: "#0F172A",
                  }}
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map((s) => (
                    <option key={s.title} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold mb-1.5" style={{ color: "#0F172A" }}>
                  Message (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your symptoms or any special requirements..."
                  className="w-full p-4 rounded-xl text-[14px] font-medium outline-none resize-none"
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid rgba(15,23,42,0.12)",
                    color: "#0F172A",
                  }}
                />
              </div>

              <Link href="/book" className="btn-primary w-full justify-center text-[15px] py-4">
                Confirm Appointment
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/12125550199"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-[14px] transition-all hover:opacity-90"
                style={{ background: "#25D366", color: "#FFFFFF" }}
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════ */}
      <footer style={{ background: "#071B34", color: "rgba(255,255,255,0.7)" }}>
        {/* Main footer */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#0B3B6E" }}>
                  <span className="material-symbols-outlined text-white text-[22px] icon-fill" style={{ fontVariationSettings:"'FILL' 1" }}>health_and_safety</span>
                </div>
                <div>
                  <p className="font-bold text-white text-[17px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>AuraClinic</p>
                  <p className="text-[10px] tracking-wider" style={{ color: "#2BB8A6" }}>MEDICAL EXCELLENCE</p>
                </div>
              </div>
              <p className="text-[14px] leading-relaxed">
                Delivering world-class healthcare with compassion, precision, and unwavering commitment to every patient.
              </p>
              {/* Social */}
              <div className="flex gap-3">
                {["facebook", "twitter", "linkedin", "instagram"].map((soc) => (
                  <a
                    key={soc}
                    href="#"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[#0B3B6E]"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                    aria-label={soc}
                  >
                    <span className="text-white text-[13px] font-bold uppercase">{soc[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-5">
              <h4 className="font-bold text-white text-[14px] uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "Services", "Find a Doctor", "Book Appointment", "Patient Portal", "About Us"].map((l) => (
                  <li key={l}>
                    <Link href="/" className="text-[14px] hover:text-white transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-5">
              <h4 className="font-bold text-white text-[14px] uppercase tracking-wider">Services</h4>
              <ul className="space-y-3">
                {SERVICES.map((s) => (
                  <li key={s.title}>
                    <a href="/#services" className="text-[14px] hover:text-white transition-colors">{s.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-5">
              <h4 className="font-bold text-white text-[14px] uppercase tracking-wider">Health Newsletter</h4>
              <p className="text-[14px] leading-relaxed">
                Get monthly health tips, clinic updates, and preventive care reminders.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full h-12 px-4 rounded-xl text-[14px] font-medium outline-none"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "white",
                  }}
                />
                <button className="btn-accent w-full justify-center text-[14px] py-3 cursor-pointer">
                  Subscribe
                  <span className="material-symbols-outlined text-[15px]">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t px-5 md:px-8 py-6"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[13px]">
              © {new Date().getFullYear()} AuraClinic. All rights reserved.
            </p>
            <div className="flex gap-6 text-[13px]">
              {["Privacy Policy", "Terms of Service", "HIPAA Notice"].map((l) => (
                <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
