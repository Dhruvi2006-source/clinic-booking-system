"use client";

import Link from "next/link";

export default function InClinicExperience() {
  return (
    <main className="flex-grow w-full bg-background relative overflow-hidden">
      {/* Decorative Light Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-bl from-tertiary/10 to-transparent blur-3xl rounded-full -z-10" />

      {/* Hero section */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center md:text-left">
        <div className="grid md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="text-secondary font-label-md text-label-md uppercase tracking-widest font-bold">
              VIP Guidance
            </div>
            <h1 className="text-headline-lg-mobile md:text-display-lg font-headline-lg-mobile md:font-display-lg text-primary font-bold leading-tight">
              The Lounge &amp; Arrival Experience.
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed max-w-xl">
              Welcome to healthcare that respects your time and comfort. Our physical clinics are designed as quiet, luxury workspaces and lounges, rather than waiting rooms.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="/book?type=clinic"
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer font-bold"
              >
                Schedule In-Clinic Visit
              </Link>
              <Link
                href="/"
                className="text-primary border border-outline-variant px-6 py-4 rounded-full font-label-md text-label-md hover:bg-surface-container-low transition-colors cursor-pointer font-bold"
              >
                Return Home
              </Link>
            </div>
          </div>
          
          <div className="md:col-span-5 relative mt-12 md:mt-0">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-surface-container shadow-level-3 border border-outline-variant/30">
              <img
                alt="Luxury clinic reception lounge suite"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Arrival coordinates */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-low/30 border-y border-outline-variant/10">
        <div className="max-w-container-max mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary font-bold">
              Clinic Locations &amp; Coordinates
            </h2>
            <p className="text-body-md text-on-surface-variant font-medium">
              We operate exclusive clinic branches in major metropolitan zones:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 shadow-sm space-y-4">
              <h3 className="text-headline-md text-[20px] text-primary font-bold">
                New York Suite
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                730 Fifth Avenue, Floor 14<br />
                New York, NY 10019<br />
                United States
              </p>
              <div className="text-xs text-secondary font-bold pt-2">
                🚘 Dedicated valet check-in on 57th St.
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 shadow-sm space-y-4">
              <h3 className="text-headline-md text-[20px] text-primary font-bold">
                London West End
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                18 Harley Street, Mews Suite<br />
                London W1G 9PL<br />
                United Kingdom
              </p>
              <div className="text-xs text-secondary font-bold pt-2">
                🚘 Secure courtyard valet access.
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 shadow-sm space-y-4">
              <h3 className="text-headline-md text-[20px] text-primary font-bold">
                Singapore Downtown
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Marina Bay Financial Centre, Tower 3<br />
                12 Marina Boulevard<br />
                Singapore 018982
              </p>
              <div className="text-xs text-secondary font-bold pt-2">
                🚘 Tower 3 executive drop-off bay.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concierge Step Guide */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="text-secondary font-label-md text-label-md uppercase tracking-widest font-bold">
            Step-by-Step
          </div>
          <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary font-bold">
            Arrival Instructions &amp; Check-In
          </h2>
          <p className="text-body-md text-on-surface-variant">
            What to expect when you arrive for your scheduled private suite consultation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {[
            { step: "1", title: "Valet & Arrival", desc: "Present your booking voucher at the executive drop-off zone. Our complimentary valet coordinators will secure your vehicle and guide you to the private elevator lines." },
            { step: "2", title: "Private Lounge Check-In", desc: "Skip reception queues. A personal health coordinator will meet you at the elevator lobby and escort you to a secure private lounge suite. Enjoy refreshments, high-speed Wi-Fi, and quiet space." },
            { step: "3", title: "Biometrics & Diagnostic Review", desc: "Our specialists will join you in your private suite. If diagnostics are scheduled, blood biomarkers, body scans, or ECG telemetry checks are administered right there, with absolute discretion." },
            { step: "4", title: "Custom Longevity Briefing", desc: "Conclude your visit with a review of your preventative health plan. All diagnostics and digital prescriptions are compiled and synced to your secure patient portal immediately." }
          ].map((item) => (
            <div key={item.step} className="flex gap-6 items-start bg-surface-container-lowest border border-outline-variant/30 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-display-lg text-[20px] font-bold shrink-0">
                {item.step}
              </div>
              <div className="space-y-2">
                <h3 className="text-headline-md text-[18px] text-primary font-bold">
                  {item.title}
                </h3>
                <p className="text-body-md text-sm text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* On-site diagnostics */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-primary text-white rounded-[40px] my-8 mx-4 shadow-level-3">
        <div className="max-w-container-max mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-tertiary font-label-md text-label-md uppercase tracking-widest font-bold">
              Clinical Excellence
            </div>
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-bold leading-tight">
              On-Site Diagnostics &amp; Lab Technology.
            </h2>
            <p className="text-body-md text-slate-300 leading-relaxed">
              Our clinic locations feature private state-of-the-art laboratory testing suites, enabling rapid biomarkers diagnostics, preventative scans, and real-time review.
            </p>
            <ul className="space-y-3 text-slate-200 text-sm font-semibold">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                <span>Rapid panel biomarkers (results in under 45 minutes)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                <span>Advanced echocardiography &amp; vascular scans</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                <span>Biometric health span metrics &amp; VO2 testing suites</span>
              </li>
            </ul>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-slate-700 bg-slate-900/40 p-8 flex flex-col justify-between shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-slate-400">ON-SITE CLINICAL FLOW</span>
              <span className="text-xs font-bold text-emerald-400">READY</span>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                <span>Vitals Station</span>
                <span className="text-sm font-bold text-slate-400">Compliant</span>
              </div>
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                <span>Vascular Echography</span>
                <span className="text-sm font-bold text-slate-400">Online</span>
              </div>
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                <span>Rapid Lab Analysis</span>
                <span className="text-sm font-bold text-slate-400">Calibrated</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 text-center font-bold">
              ISO 9001 DIAGNOSTICS LAB SUITES // CLINICAL ACCREDITED
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
