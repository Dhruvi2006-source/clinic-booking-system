const INSURERS = [
  "Blue Cross Blue Shield", "Aetna Health",  "Cigna Healthcare",
  "United Healthcare",      "Medicare",      "Oxford Insurance",
  "EmblemHealth",           "Humana Plans",  "Medicaid",
];

export default function InsuranceMarquee() {
  return (
    <section
      className="py-8 overflow-hidden border-y"
      style={{ background: "#FFFFFF", borderColor: "rgba(15,23,42,0.06)" }}
    >
      <p
        className="text-center text-[25px] font-bold uppercase tracking-widest"
        style={{ color: "#64748B" , padding: "clamp(12px, 1.5vw, 16px)"}}
      >
        Accepted Insurance Providers
      </p>
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 p-12 h-16">
          {[...INSURERS, ...INSURERS].map((ins, i) => (
            <span key={i} className="text-[20px] font-semibold" style={{ color: "#64748B" }}>
              {ins}
            </span>
          ))}
          <span style={{ color: "#2BB8A6" }}>•</span>
        </div>
      </div>
    </section>
  );
}
