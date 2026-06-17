"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";

const CANDIDATE_SLOTS = ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "01:30 PM", "02:00 PM", "03:45 PM", "04:15 PM"];

export default function AdminDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Dashboard Data States
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    approvedAppointments: 0,
    rejectedAppointments: 0
  });
  const [appointments, setAppointments] = useState<any[]>([]);
  const [uniquePatients, setUniquePatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Availability States (Specific to Doctors)
  const [onDuty, setOnDuty] = useState(true);
  const [activeSlots, setActiveSlots] = useState<string[]>([]);
  const [savingAvailability, setSavingAvailability] = useState(false);
  const [availabilitySuccess, setAvailabilitySuccess] = useState(false);

  // Selected Patient for Edit Vitals Modal
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [patientVitals, setPatientVitals] = useState({
    bloodPressure: "",
    heartRate: "",
    weight: "",
    medicalReport: ""
  });
  const [savingVitals, setSavingVitals] = useState(false);
  const [vitalsError, setVitalsError] = useState<string | null>(null);

  // Fetch all dashboard data
  const fetchDashboardData = async (token: string) => {
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch /me profile details
      const meRes = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const meJson = await meRes.json();

      if (!meJson.success || (meJson.data.role !== "DOCTOR" && meJson.data.role !== "ADMIN")) {
        localStorage.removeItem("aura_doctor_token");
        localStorage.removeItem("aura_doctor_user");
        setIsAuthenticated(false);
        throw new Error("Access denied. Insufficient permissions.");
      }

      setUserProfile(meJson.data);
      setIsAuthenticated(true);

      // Initialize doctor availability if doctor info is present
      if (meJson.data.doctor) {
        setOnDuty(meJson.data.doctor.onDuty);
        setActiveSlots(meJson.data.doctor.activeSlots || []);
      }

      // 2. Fetch appointments
      const appRes = await fetch("http://localhost:5000/api/appointments", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const appJson = await appRes.json();

      if (appJson.success) {
        const apps = appJson.data;
        setAppointments(apps);

        // Calculate statistics
        const total = apps.length;
        const pending = apps.filter((a: any) => a.status === "PENDING").length;
        const approved = apps.filter((a: any) => a.status === "APPROVED").length;
        const rejected = apps.filter((a: any) => a.status === "REJECTED").length;

        setStats({
          totalAppointments: total,
          pendingAppointments: pending,
          approvedAppointments: approved,
          rejectedAppointments: rejected
        });

        // Collect unique patient details from appointments list
        const patientMap = new Map();
        apps.forEach((a: any) => {
          if (!patientMap.has(a.patientEmail)) {
            patientMap.set(a.patientEmail, {
              name: a.patientName,
              email: a.patientEmail,
              phone: a.patientPhone
            });
          }
        });
        
        // Fetch full vitals info for each unique patient (via matching users in backend /me or patient endpoints if needed, 
        // or just let the doctor update them. We will fetch each patient vitals dynamically when needed or store it)
        const patientList = Array.from(patientMap.values());
        setUniquePatients(patientList);
      } else {
        throw new Error(appJson.message || "Failed to load appointments roster");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("aura_doctor_token");
    if (token) {
      fetchDashboardData(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Handle Login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const json = await res.json();

      if (json.success) {
        const { token, user } = json.data;
        if (user.role !== "DOCTOR" && user.role !== "ADMIN") {
          throw new Error("Access denied. Physician credentials required.");
        }
        localStorage.setItem("aura_doctor_token", token);
        localStorage.setItem("aura_doctor_user", JSON.stringify(user));
        
        // Dispatch custom event to notify components
        window.dispatchEvent(new Event("aura_doctor_auth_change"));
        
        await fetchDashboardData(token);
      } else {
        setLoginError(json.message || "Invalid email or password");
      }
    } catch (err: any) {
      setLoginError(err.message || "Connection failure to authorization servers");
    } finally {
      setLoginLoading(false);
    }
  };

  // Approve or Reject Appointment Status
  const handleUpdateStatus = async (appId: string, nextStatus: string) => {
    try {
      const token = localStorage.getItem("aura_doctor_token");
      if (!token) return;

      const res = await fetch(`http://localhost:5000/api/appointments/${appId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      const json = await res.json();

      if (json.success) {
        fetchDashboardData(token);
      } else {
        alert(json.message || "Failed to update appointment status");
      }
    } catch (err: any) {
      alert(err.message || "Failed to contact database to update status");
    }
  };

  // Handle Availability slots configuration
  const handleSlotToggle = (slot: string) => {
    if (activeSlots.includes(slot)) {
      setActiveSlots(activeSlots.filter((s) => s !== slot));
    } else {
      setActiveSlots([...activeSlots, slot]);
    }
  };

  const handleSaveAvailability = async () => {
    if (!userProfile?.doctor?.id) return;
    setSavingAvailability(true);
    setAvailabilitySuccess(false);

    try {
      const token = localStorage.getItem("aura_doctor_token");
      const res = await fetch(`http://localhost:5000/api/doctors/${userProfile.doctor.id}/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ onDuty, activeSlots })
      });
      const json = await res.json();

      if (json.success) {
        setAvailabilitySuccess(true);
        setTimeout(() => setAvailabilitySuccess(false), 3000);
        // Refresh local user Profile data to keep in sync
        fetchDashboardData(token!);
      } else {
        alert(json.message || "Failed to save availability settings");
      }
    } catch (err: any) {
      alert(err.message || "Network error saving availability");
    } finally {
      setSavingAvailability(false);
    }
  };

  // Open Edit Vitals Modal for Patient
  const handleOpenVitalsModal = async (patient: any) => {
    setSelectedPatient(patient);
    setVitalsError(null);
    try {
      const token = localStorage.getItem("aura_doctor_token");
      const res = await fetch(`http://localhost:5000/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Look up patient current values by hitting patient-specific profile or querying database
      const patientRes = await fetch(`http://localhost:5000/api/patients/${encodeURIComponent(patient.email)}/vitals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const patientJson = await patientRes.json();
      if (patientJson.success) {
        setPatientVitals({
          bloodPressure: patientJson.data.bloodPressure || "",
          heartRate: patientJson.data.heartRate || "",
          weight: patientJson.data.weight || "",
          medicalReport: patientJson.data.medicalReport || ""
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveVitals = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;
    setSavingVitals(true);
    setVitalsError(null);

    try {
      const token = localStorage.getItem("aura_doctor_token");
      const res = await fetch(`http://localhost:5000/api/patients/${encodeURIComponent(selectedPatient.email)}/vitals`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(patientVitals)
      });
      const json = await res.json();

      if (json.success) {
        setSelectedPatient(null);
        fetchDashboardData(token!);
      } else {
        setVitalsError(json.message || "Failed to save vitals values");
      }
    } catch (err: any) {
      setVitalsError(err.message || "Network error updating vitals");
    } finally {
      setSavingVitals(false);
    }
  };

  const filteredAppointments = appointments.filter((app) =>
    app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 1. Unauthenticated Login Screen Overlay
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center relative px-margin-mobile">
        {/* Background decorative Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-primary-fixed/20 to-transparent blur-3xl rounded-full -z-10" />

        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-8 shadow-level-3 animate-pop-in relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-headline-lg font-headline-lg font-bold text-primary mb-2">AuraClinic</h1>
            <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Physician &amp; Staff Portal</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-primary font-bold">Email Coordinate</label>
              <input
                type="email"
                required
                className="h-14 px-4 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-body-md text-body-md"
                placeholder="physician@auraclinic.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-primary font-bold">Access Password</label>
              <input
                type="password"
                required
                className="h-14 px-4 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-body-md text-body-md"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>

            {loginError && (
              <div className="p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl text-sm font-semibold animate-shake">
                {loginError}
              </div>
            )}

            <button
              disabled={loginLoading}
              type="submit"
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-md text-label-md font-bold hover:scale-[1.02] hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {loginLoading ? "Authorizing access..." : "Sign In to Lounge"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Loading State
  if (loading) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center">
        <span className="animate-spin material-symbols-outlined text-4xl text-primary">sync</span>
      </main>
    );
  }

  // 3. Authenticated Dashboard Screen
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-surface text-on-surface antialiased w-full relative">
      <div className="absolute top-10 left-64 w-96 h-96 bg-gradient-to-tr from-tertiary/5 to-transparent blur-3xl rounded-full -z-10" />

      {/* Sidebar navigation */}
      <AdminSidebar />

      {/* Top Navbar (Mobile only) */}
      <header className="md:hidden flex justify-between items-center w-full px-margin-mobile bg-surface-container-lowest shadow-sm h-20 sticky top-0 z-50">
        <span className="text-headline-md font-headline-md font-bold text-primary">AuraClinic</span>
        <button
          className="text-primary p-2 focus:outline-none cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-b border-outline-variant fixed top-20 left-0 right-0 z-40 p-6 space-y-4 animate-pop-in shadow-md">
          <nav className="flex flex-col gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-container-low text-primary font-label-md text-label-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined font-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                dashboard
              </span>
              Dashboard
            </Link>
            <a
              href="#appointments"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined">calendar_today</span>
              Appointments
            </a>
            <a
              href="#patients"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined">group</span>
              Patients
            </a>
          </nav>
        </div>
      )}

      {/* Main Canvas */}
      <main className="flex-grow md:ml-64 p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full space-y-8 relative z-10">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-outline-variant/30">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold">
              Good morning, {userProfile?.name}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant font-medium">
              {userProfile?.role === "ADMIN" ? "Clinic Administrator Console" : `${userProfile?.doctor?.specialty} Care Dashboard`}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            {userProfile?.role === "DOCTOR" && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${onDuty ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                <span className={`w-2 h-2 rounded-full ${onDuty ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                {onDuty ? "On Duty" : "Off Duty"}
              </span>
            )}
          </div>
        </section>

        {/* Stats Summary Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest/80 backdrop-blur-md p-6 rounded-2xl border border-outline-variant/50 shadow-sm">
            <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-2">Total Managed</p>
            <h3 className="text-3xl font-bold text-primary">{stats.totalAppointments}</h3>
          </div>
          <div className="bg-surface-container-lowest/80 backdrop-blur-md p-6 rounded-2xl border border-outline-variant/50 shadow-sm">
            <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-2">Pending Review</p>
            <h3 className="text-3xl font-bold text-yellow-600">{stats.pendingAppointments}</h3>
          </div>
          <div className="bg-surface-container-lowest/80 backdrop-blur-md p-6 rounded-2xl border border-outline-variant/50 shadow-sm">
            <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-2">Approved Sessions</p>
            <h3 className="text-3xl font-bold text-emerald-600">{stats.approvedAppointments}</h3>
          </div>
          <div className="bg-surface-container-lowest/80 backdrop-blur-md p-6 rounded-2xl border border-outline-variant/50 shadow-sm">
            <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-2">Rejected Sessions</p>
            <h3 className="text-3xl font-bold text-red-600">{stats.rejectedAppointments}</h3>
          </div>
        </section>

        {/* Doctor Availability Customizer Panel (Visible to DOCTOR users only) */}
        {userProfile?.role === "DOCTOR" && (
          <section className="bg-surface-container-lowest/80 backdrop-blur-md p-6 rounded-3xl border border-outline-variant/60 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
              <h2 className="font-headline-md text-headline-md text-primary font-bold">Duty Status &amp; Time Slot Configurations</h2>
              <button
                disabled={savingAvailability}
                onClick={handleSaveAvailability}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                {savingAvailability ? "Saving..." : "Save Availability Settings"}
              </button>
            </div>

            {availabilitySuccess && (
              <div className="p-4 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold">
                Availability coordinates successfully saved to booking systems.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* On Duty Status Check */}
              <div className="flex flex-col gap-3">
                <span className="font-label-md text-label-md text-primary font-bold">Lounge Check-In Status</span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setOnDuty(!onDuty)}
                    className={`w-14 h-8 rounded-full transition-colors relative cursor-pointer ${onDuty ? "bg-primary" : "bg-outline-variant"}`}
                  >
                    <span className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all shadow-md ${onDuty ? "right-1" : "left-1"}`} />
                  </button>
                  <span className="font-body-md text-body-md font-semibold text-primary">
                    {onDuty ? "Active (Accepting Appointments)" : "Offline (Out of Office / Off Duty)"}
                  </span>
                </div>
              </div>

              {/* Time Slots Selector */}
              <div className="md:col-span-2 flex flex-col gap-3">
                <span className="font-label-md text-label-md text-primary font-bold">Active Availability Time Slots</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CANDIDATE_SLOTS.map((slot) => {
                    const isSelected = activeSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={!onDuty}
                        onClick={() => handleSlotToggle(slot)}
                        className={`py-2 px-3 border rounded-xl font-label-md text-xs font-semibold text-center transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                          isSelected
                            ? "bg-primary border-primary text-on-primary font-bold"
                            : "border-outline-variant text-on-surface hover:border-primary/50 cursor-pointer"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bento Grid: Appointments Table & Vitals Management */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1. Appointment Management (8 Columns) */}
          <section id="appointments" className="lg:col-span-8 bg-surface-container-lowest/80 backdrop-blur-md rounded-3xl border border-outline-variant/60 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-6 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="font-headline-md text-headline-md text-primary font-bold">Upcoming Appointments</h2>
                <div className="relative w-full sm:w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-xl bg-surface focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md focus:outline-none"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                {filteredAppointments.length > 0 ? (
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-surface-container-low/50 border-b border-outline-variant/30">
                        <th className="p-4 font-label-md text-xs text-on-surface-variant font-bold">Patient</th>
                        <th className="p-4 font-label-md text-xs text-on-surface-variant font-bold">Schedule</th>
                        <th className="p-4 font-label-md text-xs text-on-surface-variant font-bold">Format</th>
                        <th className="p-4 font-label-md text-xs text-on-surface-variant font-bold">Status</th>
                        <th className="p-4 font-label-md text-xs text-on-surface-variant font-bold text-right">Review Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {filteredAppointments.map((app) => {
                        const dateObj = new Date(app.appointmentDate);
                        const initials = app.patientName.split(" ").map((n: string) => n[0]).join("").toUpperCase();

                        return (
                          <tr key={app.id} className="hover:bg-surface-container-low/20 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary-fixed flex justify-center items-center font-bold text-xs text-on-primary-fixed shadow-sm">
                                  {initials || "PT"}
                                </div>
                                <div>
                                  <p className="font-label-md text-sm text-primary font-bold">{app.patientName}</p>
                                  <p className="font-caption text-[11px] text-on-surface-variant font-semibold">{app.patientEmail}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <p className="font-label-md text-sm text-primary font-bold">
                                {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                              <p className="font-caption text-[11px] text-on-surface-variant font-semibold">
                                {dateObj.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                            </td>
                            <td className="p-4">
                              <span className="font-label-md text-xs font-semibold text-primary">{app.consultationType}</span>
                            </td>
                            <td className="p-4">
                              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold font-label-md ${
                                app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                                app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-1.5">
                              {app.status !== 'APPROVED' && (
                                <button
                                  onClick={() => handleUpdateStatus(app.id, 'APPROVED')}
                                  className="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer border border-emerald-200"
                                  title="Approve Booking"
                                >
                                  <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                                </button>
                              )}
                              {app.status !== 'REJECTED' && (
                                <button
                                  onClick={() => handleUpdateStatus(app.id, 'REJECTED')}
                                  className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer border border-red-200"
                                  title="Reject Booking"
                                >
                                  <span className="material-symbols-outlined text-[18px] font-bold">close</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl mb-2 text-outline">calendar_today</span>
                    <p className="font-body-md text-body-md font-semibold">No appointments scheduled</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 2. Patient Vitals Management List (4 Columns) */}
          <section id="patients" className="lg:col-span-4 bg-surface-container-lowest/80 backdrop-blur-md rounded-3xl border border-outline-variant/60 shadow-sm p-6 space-y-6 flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-outline-variant/20 mb-4">
                <h2 className="font-headline-md text-headline-md text-primary font-bold">Patients Record Vitals</h2>
                <p className="text-xs text-on-surface-variant font-medium mt-1">Manage clinical reports, heart rate, BP, and weight.</p>
              </div>

              <div className="space-y-4 overflow-y-auto max-h-[400px] pr-1">
                {uniquePatients.length > 0 ? (
                  uniquePatients.map((patient) => {
                    const initials = patient.name.split(" ").map((n: string) => n[0]).join("").toUpperCase();
                    return (
                      <div
                        key={patient.email}
                        className="flex items-center justify-between p-3.5 bg-surface-container-low/40 rounded-2xl border border-outline-variant/20 hover:border-primary/20 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-sm text-on-secondary-fixed shadow-sm">
                            {initials}
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="font-label-md text-sm text-primary font-bold truncate">{patient.name}</h4>
                            <p className="font-caption text-[11px] text-on-surface-variant truncate font-semibold">{patient.email}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleOpenVitalsModal(patient)}
                          className="p-2 text-primary hover:bg-surface-container rounded-xl transition-colors cursor-pointer border border-outline-variant/50 flex items-center gap-1 font-bold text-xs"
                        >
                          <span className="material-symbols-outlined text-sm">edit_note</span>
                          <span>Vitals</span>
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl mb-2 text-outline">group</span>
                    <p className="font-body-md text-body-md font-semibold">No registered patients yet</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Selected Patient Vitals Modifiers Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-8 shadow-level-3 animate-pop-in space-y-6">
            <div className="flex justify-between items-start pb-4 border-b border-outline-variant/20">
              <div>
                <h3 className="font-headline-md text-primary font-bold">Edit Clinical Vitals</h3>
                <p className="text-xs text-on-surface-variant font-semibold mt-1">Patient: {selectedPatient.name} ({selectedPatient.email})</p>
              </div>
              <button
                onClick={() => setSelectedPatient(null)}
                className="text-on-surface-variant hover:text-primary p-1 rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveVitals} className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-xs text-primary font-bold">BP (mmHg)</label>
                  <input
                    type="text"
                    className="h-12 px-3 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors text-sm font-semibold"
                    placeholder="e.g. 120/80"
                    value={patientVitals.bloodPressure}
                    onChange={(e) => setPatientVitals({ ...patientVitals, bloodPressure: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-xs text-primary font-bold">HR (bpm)</label>
                  <input
                    type="text"
                    className="h-12 px-3 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors text-sm font-semibold"
                    placeholder="e.g. 72"
                    value={patientVitals.heartRate}
                    onChange={(e) => setPatientVitals({ ...patientVitals, heartRate: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-xs text-primary font-bold">Weight (lbs)</label>
                  <input
                    type="text"
                    className="h-12 px-3 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors text-sm font-semibold"
                    placeholder="e.g. 150"
                    value={patientVitals.weight}
                    onChange={(e) => setPatientVitals({ ...patientVitals, weight: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-xs text-primary font-bold">Medical Report &amp; Clinical Summary</label>
                <textarea
                  className="min-h-[140px] p-4 bg-surface-container-low/40 border border-outline-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-body-md text-sm resize-none font-semibold"
                  placeholder="Describe patient status, cardiograms, dermatology scans, or therapeutic prescriptions..."
                  value={patientVitals.medicalReport}
                  onChange={(e) => setPatientVitals({ ...patientVitals, medicalReport: e.target.value })}
                />
              </div>

              {vitalsError && (
                <div className="p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl text-sm font-semibold">
                  {vitalsError}
                </div>
              )}

              <div className="flex gap-3 justify-end pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setSelectedPatient(null)}
                  className="px-6 py-3 border border-outline-variant text-primary rounded-xl font-label-md text-label-md hover:bg-surface-container transition-colors cursor-pointer font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingVitals}
                  className="px-6 py-3 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-bold hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                >
                  {savingVitals ? "Saving..." : "Save Vitals Coordinates"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
