"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("aura_doctor_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aura_doctor_token");
    localStorage.removeItem("aura_doctor_user");
    window.dispatchEvent(new Event("aura_doctor_auth_change"));
    window.location.reload();
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "DR";

  return (
    <nav className="hidden md:flex flex-col w-64 bg-surface-container-lowest border-r border-outline-variant h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Brand Header */}
      <div className="p-6">
        <Link href="/" className="text-headline-md font-headline-md font-bold text-primary block">
          AuraClinic
        </Link>
        <span className="block text-caption font-caption text-on-surface-variant mt-1">
          {user?.role === "ADMIN" ? "Clinic Administrator" : "Physician Portal"}
        </span>
      </div>

      {/* Nav Items */}
      <div className="flex-1 px-4 py-4 space-y-2">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-md text-label-md transition-colors ${
            pathname === "/admin"
              ? "bg-surface-container-low text-primary"
              : "text-on-surface-variant hover:bg-surface-container-low"
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === "/admin" ? "'FILL' 1" : "'FILL' 0" }}>
            dashboard
          </span>
          Dashboard
        </Link>
        <a
          href="#appointments"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md"
        >
          <span className="material-symbols-outlined">calendar_today</span>
          Appointments
        </a>
        <a
          href="#patients"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md"
        >
          <span className="material-symbols-outlined">group</span>
          Patients
        </a>
        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50/15 transition-colors font-label-md text-label-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-red-500">logout</span>
          Sign Out
        </button>
      </div>

      {/* Admin Profile Footer */}
      <div className="p-6 border-t border-outline-variant">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold font-label-md text-label-md shrink-0">
            {initials}
          </div>
          <div className="overflow-hidden">
            <div className="font-label-md text-label-md text-on-surface truncate">{user?.name || "Loading..."}</div>
            <div className="font-caption text-caption text-on-surface-variant truncate">
              {user?.email || "..."}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
