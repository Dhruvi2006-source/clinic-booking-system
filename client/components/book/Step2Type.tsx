"use client";

interface Step2TypeProps {
  consultationType: "Virtual" | "In-Clinic" | null;
  onBack: () => void;
  onSelect: (type: "Virtual" | "In-Clinic") => void;
}

export default function Step2Type({ consultationType, onBack, onSelect }: Step2TypeProps) {
  return (
    <div className="animate-pop-in space-y-6">
      <div
        className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary transition-colors w-fit font-bold text-sm"
        onClick={onBack}
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span>Back to Specialist</span>
      </div>

      <h2 className="text-headline-md font-headline-md text-primary font-bold">Choose Consultation Type</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            key: "Virtual" as const,
            icon: "videocam",
            emoji: "🖥️",
            title: "Virtual Consultation",
            points: [
              "Meet with your doctor via secure video call",
              "Attend from home, office, or while traveling",
              "Receive instant digital prescriptions & clinical logs",
              "Ideal for follow-ups, results review, and non-urgent care",
            ],
          },
          {
            key: "In-Clinic" as const,
            icon: "home_clinic",
            emoji: "🏥",
            title: "In-Clinic Consultation",
            points: [
              "Meet your doctor in person in our premium lounge suites",
              "Comprehensive physical assessment & checkup",
              "Access on-site diagnostic laboratory & imaging services",
              "Ideal for detailed physical examinations and diagnostic treatment",
            ],
          },
        ].map((opt) => (
          <button
            key={opt.key}
            onClick={() => onSelect(opt.key)}
            className={`flex flex-col items-start p-8 rounded-3xl shadow-sm border transition-all duration-300 text-left cursor-pointer group hover:shadow-md ${
              consultationType === opt.key
                ? "border-primary bg-surface-container-low"
                : "bg-surface-container-lowest border-outline-variant/60 hover:border-primary/40"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                consultationType === opt.key
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary"
              }`}
            >
              <span className="material-symbols-outlined text-2xl">{opt.icon}</span>
            </div>
            <h3 className="font-headline-md text-xl text-primary mb-3 font-bold flex items-center gap-2">
              <span>{opt.emoji}</span> {opt.title}
            </h3>
            <ul className="space-y-2 text-sm text-on-surface-variant font-medium leading-relaxed">
              {opt.points.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </div>
  );
}
