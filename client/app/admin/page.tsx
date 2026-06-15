"use client";

import { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  mockAdminStats,
  mockAdminRoster,
  mockAdminAppointments
} from "@/lib/mockData";

export default function AdminDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = mockAdminAppointments.filter((app) =>
    app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-surface text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed w-full relative">
      {/* Decorative Orbs */}
      <div className="absolute top-10 left-64 w-96 h-96 bg-gradient-to-tr from-tertiary/5 to-transparent blur-3xl rounded-full -z-10" />

      {/* Admin Sidebar navigation (Desktop) */}
      <AdminSidebar />

      {/* TopNavBar (Mobile only) */}
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

      {/* Mobile Drawer */}
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
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined">calendar_today</span>
              Appointments
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined">group</span>
              Patients
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined">stethoscope</span>
              Doctors
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined">bar_chart</span>
              Analytics
            </a>
          </nav>
        </div>
      )}

      {/* Main Content Canvas */}
      <main className="flex-grow md:ml-64 p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full space-y-section-gap relative z-10">
        {/* Header & Quick Stats */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold">
                Overview
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant font-medium">
                Here&apos;s what&apos;s happening at the clinic today.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-surface-container-low border border-outline-variant/30 text-primary rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors cursor-pointer font-bold">
                Download Report
              </button>
              <Link
                href="/book"
                className="px-6 py-3 bg-primary-container text-on-primary-container rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity font-bold flex items-center gap-1"
              >
                + New Appointment
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Today's Appointments */}
            <div className="bg-surface-container-lowest/80 backdrop-blur-md p-6 rounded-xl border border-outline-variant card-shadow hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary-fixed rounded-lg text-on-primary-fixed shadow-sm">
                  <span className="material-symbols-outlined">calendar_month</span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-green-700 bg-green-100 px-2 py-1 rounded font-label-md text-label-md font-semibold">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> 12%
                </span>
              </div>
              <div className="font-label-md text-label-md text-on-surface-variant mb-1 font-medium">
                Today&apos;s Appointments
              </div>
              <div className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold">
                {mockAdminStats.appointmentsToday}
              </div>
            </div>

            {/* New Patients */}
            <div className="bg-surface-container-lowest/80 backdrop-blur-md p-6 rounded-xl border border-outline-variant card-shadow hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-surface-variant rounded-lg text-on-surface shadow-sm">
                  <span className="material-symbols-outlined">group_add</span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-green-700 bg-green-100 px-2 py-1 rounded font-label-md text-label-md font-semibold">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> 8%
                </span>
              </div>
              <div className="font-label-md text-label-md text-on-surface-variant mb-1 font-medium">
                New Patients
              </div>
              <div className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold">
                {mockAdminStats.newPatients}
              </div>
            </div>

            {/* Daily Revenue */}
            <div className="bg-surface-container-lowest/80 backdrop-blur-md p-6 rounded-xl border border-outline-variant card-shadow hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-secondary-container rounded-lg text-on-secondary-container shadow-sm">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-green-700 bg-green-100 px-2 py-1 rounded font-label-md text-label-md font-semibold">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> 24%
                </span>
              </div>
              <div className="font-label-md text-label-md text-on-surface-variant mb-1 font-medium">
                Daily Revenue
              </div>
              <div className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold">
                ${mockAdminStats.dailyRevenue.toLocaleString()}
              </div>
            </div>

            {/* Cancellations */}
            <div className="bg-surface-container-lowest/80 backdrop-blur-md p-6 rounded-xl border border-outline-variant card-shadow hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-error-container rounded-lg text-on-error-container shadow-sm">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-error bg-error-container px-2 py-1 rounded font-label-md text-label-md font-semibold">
                  <span className="material-symbols-outlined text-[16px]">trending_down</span> 2%
                </span>
              </div>
              <div className="font-label-md text-label-md text-on-surface-variant mb-1 font-medium">
                Cancellations
              </div>
              <div className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold">
                {mockAdminStats.cancellations}
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Charts & Schedules */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart with Gradients */}
          <div className="lg:col-span-2 bg-surface-container-lowest/80 backdrop-blur-md p-8 rounded-2xl border border-outline-variant card-shadow">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                Revenue Overview
              </h2>
              <select className="bg-surface border-none rounded-lg text-on-surface font-label-md text-label-md focus:ring-0 cursor-pointer focus:outline-none">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            {/* CSS Bar Chart */}
            <div className="h-64 flex items-end justify-between gap-2 md:gap-4 relative">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-t border-outline-variant/30 w-full"></div>
                <div className="border-t border-outline-variant/30 w-full"></div>
                <div className="border-t border-outline-variant/30 w-full"></div>
                <div className="border-t border-outline-variant/30 w-full"></div>
              </div>
              {/* Bars with gradients */}
              {[
                { day: "Mon", height: "40%", current: false },
                { day: "Tue", height: "65%", current: false },
                { day: "Wed", height: "55%", current: false },
                { day: "Thu", height: "85%", current: true },
                { day: "Fri", height: "70%", current: false },
                { day: "Sat", height: "30%", current: false },
                { day: "Sun", height: "20%", current: false }
              ].map((item) => (
                <div
                  key={item.day}
                  className="w-full flex flex-col justify-end group cursor-pointer z-10"
                  style={{ height: item.height }}
                >
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      item.current
                        ? "bg-gradient-to-t from-primary via-tertiary to-tertiary shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                        : "bg-gradient-to-t from-primary-fixed/60 to-primary-fixed group-hover:from-primary-fixed group-hover:to-primary-container"
                    }`}
                    style={{ height: "100%" }}
                  ></div>
                  <span
                    className={`text-caption font-caption text-on-surface-variant text-center mt-2 ${
                      item.current ? "font-bold text-primary" : "font-semibold"
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Schedules (1 Column) */}
          <div className="bg-surface-container-low/80 backdrop-blur-md p-8 rounded-2xl border border-outline-variant card-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Available Doctors
                </h2>
                <button className="text-primary hover:bg-surface-container p-1 rounded transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
              <div className="space-y-4 overflow-y-auto pr-2 max-h-[280px]">
                {mockAdminRoster.map((doc) => (
                  <div
                    key={doc.name}
                    className={`flex items-center justify-between p-3 bg-surface-container-lowest/90 backdrop-blur-md rounded-xl border border-outline-variant/30 ${
                      doc.status === "Off" ? "opacity-75" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-label-md text-label-md shrink-0 ${doc.bg} shadow-sm`}
                      >
                        {doc.initials}
                      </div>
                      <div>
                        <div className="font-label-md text-label-md text-on-surface font-bold">
                          {doc.name}
                        </div>
                        <div className="font-caption text-caption text-on-surface-variant font-medium">
                          {doc.specialty}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded font-label-md font-semibold ${
                        doc.status === "Off"
                          ? "bg-surface-variant text-on-surface-variant"
                          : "bg-surface-container text-primary"
                      }`}
                    >
                      {doc.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <button className="mt-6 w-full py-3 border border-outline-variant text-primary rounded-lg font-label-md text-label-md hover:bg-surface-container-lowest transition-colors cursor-pointer font-bold">
              View Full Roster
            </button>
          </div>
        </section>

        {/* Appointment Management List Table */}
        <section className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl border border-outline-variant card-shadow overflow-hidden">
          <div className="p-6 border-b border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Upcoming Appointments
            </h2>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-lg bg-surface focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md focus:outline-none"
                  placeholder="Search patients..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors text-on-surface cursor-pointer">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            {filteredAppointments.length > 0 ? (
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-surface-container-low/50 border-b border-outline-variant">
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant font-bold">
                      Patient Info
                    </th>
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant font-bold">
                      Doctor
                    </th>
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant font-bold">
                      Time
                    </th>
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant font-bold">
                      Status
                    </th>
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant font-bold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {filteredAppointments.map((app) => (
                    <tr key={app.id} className="hover:bg-surface transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded flex justify-center items-center font-bold text-xs shrink-0 ${app.bg} shadow-sm`}
                          >
                            {app.initials}
                          </div>
                          <div>
                            <div className="font-label-md text-label-md text-on-surface font-bold">
                              {app.patientName}
                            </div>
                            <div className="font-caption text-caption text-on-surface-variant font-semibold">
                              ID: #{app.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-body-md text-body-md text-on-surface font-bold">
                        {app.doctorName}
                      </td>
                      <td className="p-4">
                        <div className="font-label-md text-label-md text-on-surface font-bold">
                          {app.time}
                        </div>
                        <div className="font-caption text-caption text-on-surface-variant font-semibold">
                          {app.date}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-label-md ${
                            app.status === "Confirmed"
                              ? "bg-surface-container text-primary"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <button className="text-primary hover:bg-surface-container p-2 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button className="text-error hover:bg-error-container p-2 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer">
                          <span className="material-symbols-outlined text-[20px]">cancel</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl mb-2">person_search</span>
                <p className="font-body-md text-body-md">No appointments matched your search.</p>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-outline-variant/30 flex justify-between items-center bg-surface-container-low/30">
            <span className="font-caption text-caption text-on-surface-variant font-bold">
              Showing {filteredAppointments.length} of {mockAdminAppointments.length} appointments
            </span>
            <div className="flex gap-2">
              <button className="p-1 border border-outline-variant rounded disabled:opacity-50 text-on-surface bg-surface-container-lowest cursor-pointer">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-1 border border-outline-variant rounded text-on-surface bg-surface-container-lowest cursor-pointer">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
