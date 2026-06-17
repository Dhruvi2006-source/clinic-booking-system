"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import AuthModal from "../AuthModal";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  
  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("aura_patient_token");
      setIsLoggedIn(!!token);
    };
    checkAuth();
    window.addEventListener("aura_auth_change", checkAuth);
    return () => window.removeEventListener("aura_auth_change", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aura_patient_token");
    localStorage.removeItem("aura_patient_user");
    window.dispatchEvent(new Event("aura_auth_change"));
    window.location.href = "/";
  };

  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  // Dummy contact info, entirely distinct from walkinclinicnyc data
  const dummyPhone = "(212) 555-0199";
  const dummyAddress = "730 Fifth Avenue, Floor 14, New York, NY 10019";

  return (
    <div className="w-full flex flex-col z-50 sticky top-0 shadow-sm transition-colors duration-300">
      {/* 1. Top Utility Header Bar */}
      <div className="w-full bg-[#ff0000] text-white text-xs py-2.5 px-margin-mobile md:px-margin-desktop border-b border-slate-800">
        <div className="max-w-container-max mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Address & Phone */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center sm:text-left">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[14px]">
                location_on
              </span>
              <span className="hidden md:inline">{dummyAddress}</span>
              <span className="md:hidden">Midtown Manhattan, NYC</span>
            </span>
            <span className="hidden sm:inline text-white">|</span>
            <a
              href={`tel:${dummyPhone}`}
              className="flex items-center gap-1.5 text-white hover:text-secondary/80 transition-colors font-semibold"
            >
              <span
                className="material-symbols-outlined text-[14px] font-fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                call
              </span>
              Call Us: {dummyPhone}
            </a>
          </div>
          {/* Notice & Status */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-extrabold tracking-wide uppercase text-[11px] text-yellow-50">
              Walk-Ins &amp; Same-Day Checkups Welcomed
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header className="w-full bg-[#0B1F3A] text-white border-b border-slate-800">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-white flex items-center gap-2 tracking-tight group hover:font-bold hover:text-yellow-200"
          >
            <span className="material-symbols-outlined text-tertiary text-[28px] transition-transform duration-300 group-hover:rotate-12">
              health_and_safety
            </span>
            <span>AuraClinic</span>
          </Link>

          {/* Navigation Links (Desktop - White / Light text with no hover color change) */}
          <nav className="hidden md:flex gap-8 items-center h-full">
            <Link
              href="/"
              className={`font-label-md text-label-md transition-all duration-200 h-full flex items-center border-b-2 pt-[2px] text-white hover:text-yellow-200 hover:font-bold ${
                pathname === "/"
                  ? "border-white font-semibold"
                  : "border-transparent"
              }`}
            >
              Home
            </Link>
            <Link
              href="/doctors"
              className={`font-label-md text-label-md transition-all duration-200 h-full flex items-center border-b-2 pt-[2px] text-white hover:text-yellow-200 hover:font-bold ${
                pathname === "/doctors" || pathname.startsWith("/doctors/")
                  ? "border-white font-semibold"
                  : "border-transparent"
              }`}
            >
              Find a Doctor
            </Link>

            {/* Services Dropdown Trigger */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`font-label-md text-label-md transition-all duration-200 h-full flex items-center gap-1 border-b-2 pt-[2px] cursor-pointer text-white hover:text-yellow-200 hover:font-bold ${
                  servicesDropdownOpen
                    ? "border-white font-semibold"
                    : "border-transparent"
                }`}
              >
                Services
                <span className="material-symbols-outlined text-[16px]">
                  keyboard_arrow_down
                </span>
              </button>

              {/* Services Dropdown Panel (Styled with dark background to match the main bar style) */}
              {servicesDropdownOpen && (
                <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[600px] bg-[#071527] rounded-2xl p-6 shadow-2xl border border-slate-800 animate-pop-in grid grid-cols-3 gap-6 text-left">
                  {/* Column 1: Illnesses treated */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        medical_services
                      </span>
                      Illnesses We Treat
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                      <li>Sore Throat &amp; Cough</li>
                      <li>Sinus Infections</li>
                      <li>Urinary Infections (UTI)</li>
                      <li>Ear Aches &amp; Blockage</li>
                      <li>Seasonal Allergies</li>
                      <li>Skin Conditions &amp; Burns</li>
                      <li>Sprains &amp; Lacerations</li>
                    </ul>
                  </div>

                  {/* Column 2: Preventive care */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        health_metrics
                      </span>
                      Preventive Care
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                      <li>Annual Wellness Exams</li>
                      <li>Pre-Employment Exams</li>
                      <li>Pre-Operative Clearances</li>
                      <li>Cholesterol Screening</li>
                      <li>Diabetes Screenings</li>
                      <li>High Blood Pressure checks</li>
                      <li>STD Screening &amp; Testing</li>
                    </ul>
                  </div>

                  {/* Column 3: Not treated / Info */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-red-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        warning
                      </span>
                      Not Treated
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                      <li className="text-red-400/90">
                        Life-Threatening Emergencies
                      </li>
                      <li className="text-red-400/90">Severe Chest Pain</li>
                      <li className="text-red-400/90">Compound Fractures</li>
                      <li className="text-red-400/90">Major Head Trauma</li>
                    </ul>
                    <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                      *Please dial 911 or head to the nearest Emergency Room for
                      critical issues.
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/in-clinic"
              className={`font-label-md text-label-md transition-all duration-200 h-full flex items-center border-b-2 pt-[2px] text-white hover:text-yellow-200 hover:font-bold ${
                pathname === "/in-clinic"
                  ? "border-white font-semibold"
                  : "border-transparent"
              }`}
            >
              Lounge Experience
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/portal"
                    className="font-label-md text-label-md text-white/90 hover:text-yellow-200 hover:font-bold transition-colors duration-200 font-semibold"
                  >
                    Patient Portal
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="font-label-md text-label-md text-white/90 hover:text-[#ff4444] hover:font-bold transition-colors duration-200 font-semibold cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="font-label-md text-label-md text-white/90 hover:text-yellow-200 hover:font-bold transition-colors duration-200 font-semibold cursor-pointer bg-transparent border-none"
                >
                  Patient Login
                </button>
              )}
              <Link
                href="/book"
                className="bg-[#ce3636] hover:bg-[#b02c2c] text-white font-label-md text-label-md px-6 py-3 rounded-full hover:scale-[1.02] hover:shadow-md active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer font-bold"
              >
                Book Appointment
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px" }}
                >
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2 focus:outline-none cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#071527] border-b border-slate-800 p-6 space-y-4 animate-pop-in text-white">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-label-md text-label-md ${
                  pathname === "/" ? "text-secondary font-bold" : "text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="/doctors"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-label-md text-label-md ${
                  pathname.startsWith("/doctors")
                    ? "text-secondary font-bold"
                    : "text-white"
                }`}
              >
                Find a Doctor
              </Link>

              {/* Mobile Services Accordion */}
              <div className="space-y-2">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="font-label-md text-label-md text-white flex justify-between items-center w-full"
                >
                  <span>Services</span>
                  <span className="material-symbols-outlined text-[16px]">
                    {mobileServicesOpen
                      ? "keyboard_arrow_up"
                      : "keyboard_arrow_down"}
                  </span>
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 py-2 border-l border-slate-800 space-y-3 text-xs text-slate-300">
                    <div>
                      <h5 className="font-bold text-secondary uppercase tracking-wider mb-1">
                        Illnesses
                      </h5>
                      <p>
                        Sore Throat, Sinusitis, UTI, Coughs, Skin Issues,
                        Sprains, Lacerations
                      </p>
                    </div>
                    <div>
                      <h5 className="font-bold text-secondary uppercase tracking-wider mb-1">
                        Preventive
                      </h5>
                      <p>
                        Annual Exams, Pre-Employment, Clearances, Screenings
                        (Cholesterol, Diabetes, BP, STD)
                      </p>
                    </div>
                    <div>
                      <h5 className="font-bold text-red-400 uppercase tracking-wider mb-1">
                        Not Treated
                      </h5>
                      <p>
                        Life-Threatening Emergencies, Chest Pain, Compound
                        Fractures
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/in-clinic"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-label-md text-label-md ${
                  pathname === "/in-clinic"
                    ? "text-secondary font-bold"
                    : "text-white"
                }`}
              >
                Lounge Experience
              </Link>
            </nav>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/portal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-label-md text-label-md text-white text-center py-2 font-semibold hover:text-yellow-200"
                  >
                    Patient Portal
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="font-label-md text-label-md text-white text-center py-2 font-semibold hover:text-[#ff4444] cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="font-label-md text-label-md text-white text-center py-2 font-semibold hover:text-yellow-200 cursor-pointer bg-transparent border-none"
                >
                  Patient Login
                </button>
              )}
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#ce3636] hover:bg-[#b02c2c] text-white font-label-md text-label-md py-3 rounded-full text-center hover:scale-[1.01] transition-transform font-bold"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal Overlay */}
      {showAuthModal && (
        <AuthModal
          onSuccess={() => setShowAuthModal(false)}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}
