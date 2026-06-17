"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import AuthModal from "../AuthModal";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen]       = useState(false);
  const [servicesOpen, setServicesOpen]           = useState(false);
  const [scrolled, setScrolled]                   = useState(false);
  const [isLoggedIn, setIsLoggedIn]               = useState(false);
  const [showAuthModal, setShowAuthModal]         = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Scroll-aware navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auth state
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

  const phone = "(212) 555-0199";

  const navLinks = [
    { label: "Services",      href: "/#services"     },
    { label: "Doctors",       href: "/doctors"        },
    { label: "Treatments",    href: "/#treatments"    },
    { label: "Testimonials",  href: "/#testimonials"  },
    { label: "About",         href: "/#about"         },
    { label: "Contact",       href: "/#contact"       },
  ];

  const serviceItems = [
    { icon: "vaccines",          label: "Preventive Screenings"  },
    { icon: "medical_services",  label: "Illness & Acute Care"   },
    { icon: "cardiology",        label: "Cardiology Services"     },
    { icon: "psychiatry",        label: "Mental Health"           },
    { icon: "biotech",           label: "Lab & Diagnostics"       },
    { icon: "healing",           label: "Physical Therapy"        },
  ];

  return (
    <>
      {/* ── Top utility bar ── */}
      <div className="w-full bg-[#071B34] text-white/80 text-xs py-2.5 px-5 hidden md:block">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors font-medium">
              <span className="material-symbols-outlined text-[13px] icon-fill" style={{ fontVariationSettings:"'FILL' 1" }}>call</span>
              {phone}
            </a>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[13px]">location_on</span>
              730 Fifth Avenue, Floor 14, New York, NY 10019
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-dot-pulse"></span>
            <span className="font-semibold tracking-wide text-[11px] text-white/70 uppercase">Walk-ins welcome · Same-day appointments</span>
          </div>
        </div>
      </div>

      {/* ── Main navigation ── */}
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-[20px] shadow-[0_1px_32px_rgba(15,23,42,0.08)] border-b border-[rgba(15,23,42,0.06)]"
            : "bg-white/80 backdrop-blur-[20px] border-b border-[rgba(15,23,42,0.06)]"
        }`}
        style={{ height: "88px" }}
      >
        <div className="max-w-[1280px] mx-auto h-full px-5 md:px-8 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-[#0B3B6E] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="material-symbols-outlined text-white text-[20px] icon-fill" style={{ fontVariationSettings:"'FILL' 1" }}>
                health_and_safety
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-[Plus_Jakarta_Sans,Manrope,sans-serif] font-800 text-[#0B3B6E] text-[17px] tracking-tight" style={{ fontWeight: 800 }}>
                AuraClinic
              </span>
              <span className="text-[10px] text-[#64748B] font-medium tracking-wide hidden sm:block">
                Medical Excellence
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 h-full">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.replace("/#", "/"));

              if (link.label === "Services") {
                return (
                  <div
                    key="services"
                    className="relative h-full flex items-center"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 h-full text-[14px] font-semibold transition-colors cursor-pointer
                        ${isActive ? "text-[#0B3B6E]" : "text-[#64748B] hover:text-[#0B3B6E]"}`}
                    >
                      Services
                      <span
                        className="material-symbols-outlined text-[15px] transition-transform duration-200"
                        style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        keyboard_arrow_down
                      </span>
                    </button>

                    {servicesOpen && (
                      <div className="absolute top-[88px] left-1/2 -translate-x-1/2 w-[420px] bg-white rounded-2xl p-5 shadow-[0_20px_60px_rgba(11,59,110,0.15)] border border-[rgba(15,23,42,0.08)] animate-pop-in z-50">
                        <div className="grid grid-cols-2 gap-2">
                          {serviceItems.map((s) => (
                            <Link
                              key={s.label}
                              href="/#services"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F1F5F9] transition-colors group"
                            >
                              <span className="w-8 h-8 rounded-lg bg-[#E8F0FB] flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[#0B3B6E] text-[16px]">{s.icon}</span>
                              </span>
                              <span className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#0B3B6E] transition-colors">
                                {s.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-[rgba(15,23,42,0.06)]">
                          <Link
                            href="/#services"
                            className="flex items-center justify-between text-[13px] font-semibold text-[#0B3B6E] hover:underline"
                          >
                            View all services
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 h-full flex items-center text-[14px] font-semibold transition-colors
                    ${isActive ? "text-[#0B3B6E]" : "text-[#64748B] hover:text-[#0B3B6E]"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            {isLoggedIn ? (
              <>
                <Link
                  href="/portal"
                  className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold text-[#64748B] hover:text-[#0B3B6E] transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">person</span>
                  Portal
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:block text-[13px] font-semibold text-[#64748B] hover:text-red-500 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="hidden md:flex btn-secondary text-[13px] py-2.5 px-5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">call</span>
                Call Clinic
              </button>
            )}

            <Link
              href="/book"
              className="btn-primary text-[13px] py-2.5 px-5"
            >
              Book Appointment
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#F1F5F9] transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[#0B3B6E] text-[22px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-[rgba(15,23,42,0.08)] shadow-xl animate-pop-in z-50">
            <div className="p-5 space-y-1">
              {navLinks.map((link) => {
                if (link.label === "Services") {
                  return (
                    <div key="mob-services">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex justify-between items-center px-4 py-3 rounded-xl text-[14px] font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                      >
                        Services
                        <span className="material-symbols-outlined text-[16px]">
                          {mobileServicesOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                        </span>
                      </button>
                      {mobileServicesOpen && (
                        <div className="ml-4 mt-1 border-l-2 border-[#E8F0FB] pl-4 space-y-1 animate-accordion">
                          {serviceItems.map((s) => (
                            <Link
                              key={s.label}
                              href="/#services"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2 py-2 text-[13px] text-[#64748B] font-medium hover:text-[#0B3B6E]"
                            >
                              <span className="material-symbols-outlined text-[15px]">{s.icon}</span>
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-[14px] font-semibold text-[#0F172A] hover:bg-[#F1F5F9] hover:text-[#0B3B6E] transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-[rgba(15,23,42,0.06)] space-y-3">
                {isLoggedIn ? (
                  <>
                    <Link href="/portal" onClick={() => setMobileMenuOpen(false)} className="block text-center text-[14px] font-semibold text-[#0B3B6E] py-2">
                      Patient Portal
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-center text-[14px] font-semibold text-red-500 py-2 cursor-pointer">
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setMobileMenuOpen(false); setShowAuthModal(true); }}
                    className="w-full btn-secondary text-[14px] cursor-pointer"
                  >
                    Patient Login
                  </button>
                )}
                <Link
                  href="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block btn-primary text-[14px] text-center"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {showAuthModal && (
        <AuthModal
          onSuccess={() => setShowAuthModal(false)}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}
