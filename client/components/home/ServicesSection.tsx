import Link from "next/link";

export const SERVICES = [
  {
    icon: "vaccines",
    title: "Preventive Screenings",
    desc: "Comprehensive wellness exams, cholesterol panels, diabetes screenings, and annual health assessments tailored to your unique health profile.",
    color: "#E8F0FB",
    iconColor: "#0B3B6E",
    tag: "Most Popular",
    featured: true,
  },
  {
    icon: "medical_services",
    title: "Illness & Acute Care",
    desc: "Same-day evaluation for sore throats, sinus infections, UTIs, allergies, skin conditions, and minor injuries.",
    color: "#E6F9F7",
    iconColor: "#2BB8A6",
    tag: "Same Day",
    featured: false,
  },
  {
    icon: "cardiology",
    title: "Cardiology & Heart",
    desc: "Advanced cardiovascular risk assessment, blood pressure management, EKG testing, and cardiac wellness plans.",
    color: "#EBF3FF",
    iconColor: "#0F5DAA",
    tag: "Specialist",
    featured: false,
  },
  {
    icon: "biotech",
    title: "Lab & Diagnostics",
    desc: "In-house rapid diagnostics, comprehensive blood panels, urinalysis, and pathology with same-day results.",
    color: "#F0FDF4",
    iconColor: "#16A34A",
    tag: "Rapid Results",
    featured: false,
  },
  {
    icon: "psychiatry",
    title: "Mental Health",
    desc: "Confidential assessments, counseling referrals, and integrated behavioral health support.",
    color: "#FFF7ED",
    iconColor: "#EA580C",
    tag: "Confidential",
    featured: false,
  },
  {
    icon: "healing",
    title: "Physical Therapy",
    desc: "Evidence-based rehabilitation, post-surgical recovery, sports medicine, and chronic pain management.",
    color: "#FDF4FF",
    iconColor: "#9333EA",
    tag: "Rehabilitation",
    featured: false,
  },
];

function SvcCard({ svc, featured }: { svc: (typeof SERVICES)[0]; featured?: boolean }) {
  return (
    <div
      className="editorial-card group cursor-pointer reveal-on-scroll reveal-scale h-full"
      style={{
        padding: featured ? "clamp(28px, 4vw, 48px)" : "clamp(24px, 3vw, 36px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: featured ? svc.color : "#FFFFFF",
        minHeight: featured ? "clamp(300px, 40vw, 480px)" : undefined,
      }}
    >
      <div>
        {/* Tag */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: svc.iconColor + "18", color: svc.iconColor }}
          >
            {svc.tag}
          </span>
          <div
            className="rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{
              width: featured ? "clamp(52px, 5vw, 64px)" : "clamp(40px, 4vw, 52px)",
              height: featured ? "clamp(52px, 5vw, 64px)" : "clamp(40px, 4vw, 52px)",
              background: svc.iconColor,
            }}
          >
            <span
              className="material-symbols-outlined text-white"
              style={{ fontSize: featured ? "clamp(24px, 3vw, 30px)" : "clamp(20px, 2.5vw, 26px)" }}
            >
              {svc.icon}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            color: "#0F172A",
            fontSize: featured ? "clamp(22px, 2.8vw, 32px)" : "clamp(16px, 1.8vw, 20px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "clamp(10px, 1.5vw, 16px)",
          }}
        >
          {svc.title}
        </h3>

        {/* Desc */}
        <p
          style={{
            color: "#64748B",
            fontSize: featured ? "clamp(14px, 1.5vw, 16px)" : "clamp(12px, 1.3vw, 14px)",
            lineHeight: 1.65,
          }}
        >
          {svc.desc}
        </p>
      </div>

      {/* CTA row */}
      <div className="flex items-center gap-2 mt-6">
        <span
          style={{
            fontWeight: 700,
            fontSize: "clamp(12px, 1.2vw, 13px)",
            color: svc.iconColor,
          }}
        >
          Learn More
        </span>
        <span
          className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1.5"
          style={{ fontSize: "14px", color: svc.iconColor }}
        >
          arrow_forward
        </span>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [featured, ...rest] = SERVICES;

  return (
    <section
      id="services"
      className="section-lg"
      style={{ background: "#FAFBFD" }}
    >
      <div className="section-container">
        {/* Header row */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-12 md:mb-16 reveal-on-scroll flex flex-col items-center">
          <span className="eyebrow mx-auto pb-3">Our Services</span>
          <h2 className="text-headline pb-3" style={{ color: "#0F172A" }}>
            Comprehensive Care
            <br />
            <span
              style={{
                color: "#2BB8A6",
                paddingBottom: "clamp(6px, 1vw, 32px)",
              }}
            >
              Every Stage of Life
            </span>
          </h2>
          <p
            className="leading-relaxed"
            style={{
              color: "#64748B",
              fontSize: "clamp(14px, 1.5vw, 16px)",
              maxWidth: "500px",
              paddingTop: "clamp(6px, 1vw, 32px)",
              paddingBottom: "clamp(6px, 1vw, 32px)",
            }}
          >
            Board-certified specialists delivering evidence-based care across
            every medical discipline — all under one roof.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 services-bento"
          style={{
            gap: "clamp(12px, 1.5vw, 20px)",
          }}
        >
          {/* Featured large card */}
          <div className="md:col-span-2 md:row-span-2 svc-featured">
            <SvcCard svc={featured} featured />
          </div>

          {/* Remaining 5 cards */}
          {rest.map((svc, i) => (
            <SvcCard key={svc.title} svc={svc} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center reveal-on-scroll">
          <Link
            href="/book"
            className="btn-primary"
            style={{
              fontSize: "clamp(13px, 1.4vw, 15px)",
              padding: "clamp(12px, 1.5vw, 16px) clamp(24px, 3vw, 40px)",
            }}
          >
            Book Any Service
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
