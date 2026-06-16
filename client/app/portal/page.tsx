"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { mockVitals } from "@/lib/mockData";

export default function PatientPortal() {
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        let token = localStorage.getItem("aura_patient_token");
        if (!token) {
          // Silent login as default patient
          const loginRes = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "patient@example.com", password: "patient123" })
          });
          const loginJson = await loginRes.json();
          if (loginJson.success) {
            token = loginJson.data.token;
            localStorage.setItem("aura_patient_token", token!);
          } else {
            throw new Error(loginJson.message || "Failed to authenticate patient session");
          }
        }

        // Fetch patient appointments
        const appRes = await fetch("http://localhost:5000/api/appointments", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const appJson = await appRes.json();

        if (appJson.success) {
          // Get the most recent upcoming appointment (based on date)
          const upcoming = appJson.data.find((app: any) => new Date(app.appointmentDate) >= new Date());
          setAppointment(upcoming || appJson.data[0] || null);
        } else {
          throw new Error("Failed to load appointments");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
        localStorage.removeItem("aura_patient_token");
      } finally {
        setLoading(false);
      }
    };
    fetchPatientData();
  }, []);

  return (
    <main className="flex-grow px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto w-full relative">
      {/* Background Decorative Glowing Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-tertiary/10 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-primary-fixed/20 to-transparent blur-3xl rounded-full -z-10" />

      {/* Welcome Header */}
      <header className="mb-12 relative z-10">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-2 font-bold leading-tight">
          Good morning, Patient.
        </h1>
        <p className="font-body-lg text-body-lg text-secondary">
          Here is your health overview for today.
        </p>
      </header>

      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter relative z-10">
        {/* Upcoming Appointment (Large Featured) */}
        <div className="md:col-span-8 bg-surface-container-lowest/80 backdrop-blur-md rounded-xl border border-outline-variant/30 p-5 sm:p-8 shadow-level-2 hover:shadow-level-3 transition-all duration-300 flex flex-col justify-between">
          {loading ? (
            <div className="flex justify-center items-center py-12 w-full h-full min-h-[200px]">
              <span className="animate-spin material-symbols-outlined text-4xl text-primary">sync</span>
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center py-12 text-center w-full h-full min-h-[200px] gap-2">
              <span className="material-symbols-outlined text-red-500 text-3xl">error</span>
              <p className="text-sm font-semibold text-red-500">Error loading upcoming appointment</p>
            </div>
          ) : appointment ? (
            <>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="inline-flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed px-3 py-1.5 rounded-full font-label-md text-label-md font-semibold border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[16px]">event</span>
                    Upcoming Appointment
                  </div>
                  <button className="text-primary hover:bg-surface-container-low p-2 rounded-full transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
                <div className="flex items-start gap-6 flex-col sm:flex-row">
                  <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-surface-container-low bg-surface-container-low relative shadow-sm">
                    <img
                      alt="Doctor Profile"
                      className="w-full h-full object-cover"
                      src={appointment.doctor?.image || "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=256&q=80"}
                    />
                  </div>
                  <div>
                    <h2 className="font-headline-md text-headline-md text-on-surface mb-1 font-bold">
                      {appointment.doctor?.name}
                    </h2>
                    <p className="font-body-md text-body-md text-secondary mb-4 font-medium">
                      {appointment.doctor?.specialty} Consultation
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 text-secondary">
                      <div className="flex items-center gap-2 font-body-md text-body-md font-medium">
                        <span className="material-symbols-outlined text-outline">calendar_today</span>
                        {new Date(appointment.appointmentDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                      </div>
                      <div className="flex items-center gap-2 font-body-md text-body-md font-medium">
                        <span className="material-symbols-outlined text-outline">location_on</span>
                        {appointment.consultationType === "VIRTUAL" ? "Virtual Secure Video" : "Suite 402, North Wing"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex gap-4 flex-col sm:flex-row">
                <Link
                  href="/book"
                  className="flex-1 bg-surface-container/50 border border-outline-variant/50 text-primary font-label-md text-label-md py-4 rounded-lg hover:bg-surface-container-low transition-colors text-center font-bold"
                >
                  Reschedule
                </Link>
                <Link
                  href="/portal/telehealth"
                  className="flex-1 bg-primary text-on-primary font-label-md text-label-md py-4 rounded-lg hover:scale-[1.01] hover:shadow-md active:scale-[0.99] transition-all text-center font-bold"
                >
                  Prepare for Visit
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center py-12 text-center w-full h-full min-h-[200px] gap-4">
              <span className="material-symbols-outlined text-outline text-5xl">event_busy</span>
              <div>
                <p className="font-headline-md text-on-surface font-semibold">No Scheduled Visits</p>
                <p className="text-sm text-on-surface-variant font-medium">You don't have any upcoming appointments at the moment.</p>
              </div>
              <Link
                href="/book"
                className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md hover:scale-[1.02] transition-transform font-bold"
              >
                Book Your First Session
              </Link>
            </div>
          )}
        </div>

        {/* Vitals Snippet with Sparklines */}
        <div className="md:col-span-4 bg-surface-container-low/80 backdrop-blur-md rounded-xl border border-outline-variant/30 p-5 sm:p-8 shadow-level-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              Recent Vitals
            </h3>
            <span className="material-symbols-outlined text-secondary">monitor_heart</span>
          </div>
          <div className="space-y-6">
            {mockVitals.map((vital, index) => (
              <div
                key={vital.name}
                className="border-b border-outline-variant/20 pb-4 last:border-b-0 last:pb-0 flex items-center justify-between"
              >
                <div>
                  <div className="text-secondary font-label-md text-label-md mb-1 font-medium">
                    {vital.name}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                      {vital.value}
                    </span>
                    <span className="font-caption text-caption text-secondary font-semibold">
                      {vital.unit}
                    </span>
                  </div>
                  {vital.status && (
                    <div className="text-[12px] text-secondary mt-1 flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined text-[14px] text-green-600 font-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>{" "}
                      {vital.status}
                    </div>
                  )}
                </div>

                {/* SaaS Sparkline Graphic */}
                <div className="h-8 w-20 flex items-end gap-[3px] opacity-70">
                  <div className="bg-tertiary w-full rounded-t-sm" style={{ height: index === 0 ? "40%" : index === 1 ? "65%" : "30%" }} />
                  <div className="bg-tertiary w-full rounded-t-sm" style={{ height: index === 0 ? "55%" : index === 1 ? "48%" : "50%" }} />
                  <div className="bg-tertiary w-full rounded-t-sm" style={{ height: index === 0 ? "48%" : index === 1 ? "75%" : "40%" }} />
                  <div className="bg-tertiary w-full rounded-t-sm" style={{ height: index === 0 ? "70%" : index === 1 ? "60%" : "68%" }} />
                  <div className="bg-tertiary w-full rounded-t-sm" style={{ height: index === 0 ? "65%" : index === 1 ? "80%" : "72%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Records & Results */}
        <div className="md:col-span-4 bg-surface-container-lowest/80 backdrop-blur-md rounded-xl border border-outline-variant/30 p-5 sm:p-8 shadow-level-2 hover:shadow-level-3 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
          <div className="bg-surface-container w-12 h-12 rounded-full flex items-center justify-center mb-6 text-on-surface group-hover:bg-primary-fixed transition-colors">
            <span className="material-symbols-outlined">folder_shared</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">
            Medical Records
          </h3>
          <p className="font-body-md text-body-md text-secondary mb-6 leading-relaxed">
            View your complete medical history, lab results, and visit summaries.
          </p>
          <div className="flex items-center text-primary font-label-md text-label-md group-hover:translate-x-1 transition-transform font-bold">
            Access Records{" "}
            <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
          </div>
        </div>

        {/* Prescriptions */}
        <div className="md:col-span-4 bg-surface-container-lowest/80 backdrop-blur-md rounded-xl border border-outline-variant/30 p-5 sm:p-8 shadow-level-2 hover:shadow-level-3 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
          <div className="bg-surface-container w-12 h-12 rounded-full flex items-center justify-center mb-6 text-on-surface group-hover:bg-primary-fixed transition-colors">
            <span className="material-symbols-outlined">prescriptions</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">
            Prescriptions
          </h3>
          <p className="font-body-md text-body-md text-secondary mb-6 leading-relaxed">
            Manage active medications, request refills, and view pharmacy info.
          </p>
          <div className="flex items-center text-primary font-label-md text-label-md group-hover:translate-x-1 transition-transform font-bold">
            View Medications{" "}
            <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
          </div>
        </div>

        {/* Billing & Secure Messaging */}
        <div className="md:col-span-4 flex flex-col gap-gutter justify-between">
          <div className="bg-surface-container-lowest/80 backdrop-blur-md rounded-xl border border-outline-variant/30 p-4 sm:p-6 shadow-level-2 hover:shadow-level-3 transition-all duration-300 flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="bg-surface-container w-10 h-10 rounded-full flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined">receipt_long</span>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-on-surface text-[16px] font-bold">
                  Billing Summary
                </h4>
                <p className="font-caption text-caption text-secondary font-medium">No balance due</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              chevron_right
            </span>
          </div>

          <Link
            href="/portal/telehealth?tab=chat"
            className="bg-surface-container-lowest/80 backdrop-blur-md rounded-xl border border-outline-variant/30 p-4 sm:p-6 shadow-level-2 hover:shadow-level-3 transition-all duration-300 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-surface-container w-10 h-10 rounded-full flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-surface-container-lowest animate-pulse"></div>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-on-surface text-[16px] font-bold">
                  Secure Messages
                </h4>
                <p className="font-caption text-caption text-secondary font-medium">1 unread message</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              chevron_right
            </span>
          </Link>

          <div className="bg-surface-container-lowest/80 backdrop-blur-md rounded-xl border border-outline-variant/30 p-4 sm:p-6 shadow-level-2 hover:shadow-level-3 transition-all duration-300 flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="bg-surface-container w-10 h-10 rounded-full flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined">settings</span>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-on-surface text-[16px] font-bold">
                  Profile Settings
                </h4>
                <p className="font-caption text-caption text-secondary font-medium">
                  Update personal info
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              chevron_right
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
