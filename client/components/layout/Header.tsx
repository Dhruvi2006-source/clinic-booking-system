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
      <div
        className="w-full bg-[#071B34] text-white/80 text-xs py-5.5"
        style={{
          paddingLeft: "clamp(16px, 4vw, 32px)",
          paddingRight: "clamp(16px, 4vw, 32px)",
          paddingTop: "clamp(4px, 1vw, 8px)",
          paddingBottom: "clamp(4px, 1vw, 8px)",
        }}
      >
        <div className="max-w-[1280px] mx-auto flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors font-medium"
            >
              <span
                className="material-symbols-outlined text-[13px] icon-fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                call
              </span>
              {phone}
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[13px]">
                location_on
              </span>
              730 Fifth Avenue, Floor 14, New York, NY 10019
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff0000] animate-dot-pulse"></span>
            <span className="font-semibold tracking-wide text-[11px] text-white/70 uppercase">
              Walk-ins welcome · Same-day
            </span>
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
      >
        <div
          className="max-w-[1280px] mx-auto flex justify-between gap-3"
          style={{
            height: "clamp(56px, 8vw, 80px)",
            paddingLeft: "clamp(16px, 4vw, 32px)",
            paddingRight: "clamp(16px, 4vw, 32px)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div
              className="rounded-xl bg-[#0B3B6E] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
              style={{
                width: "clamp(30px, 4vw, 36px)",
                height: "clamp(30px, 4vw, 36px)",
              }}
            >
              <span
                className="material-symbols-outlined text-white icon-fill"
                style={{
                  fontSize: "clamp(16px, 2.5vw, 20px)",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                health_and_safety
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-[#0B3B6E] tracking-tight"
                style={{
                  fontFamily: "'Plus Jakarta Sans', Manrope, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(13px, 2vw, 17px)",
                }}
              >
                AuraClinic
              </span>
              <span
                className="text-[#64748B] font-medium tracking-wide hidden sm:block"
                style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
              >
                Medical Excellence
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10 h-full">
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
                      className={`flex items-center gap-1 px-3 xl:px-4 h-full text-[14px] font-semibold transition-colors cursor-pointer
                        ${isActive ? "text-[#0B3B6E]" : "text-[#64748B] hover:text-[#0B3B6E]"}`}
                    >
                      Services
                      <span
                        className="material-symbols-outlined text-[15px] transition-transform duration-200"
                        style={{
                          transform: servicesOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        keyboard_arrow_down
                      </span>
                    </button>

                    {servicesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[420px] bg-white rounded-2xl p-5 shadow-[0_20px_60px_rgba(11,59,110,0.15)] border border-[rgba(15,23,42,0.08)] animate-pop-in z-50">
                        <div className="grid grid-cols-2 gap-2">
                          {serviceItems.map((s) => (
                            <Link
                              key={s.label}
                              href="/#services"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F1F5F9] transition-colors group"
                            >
                              <span className="w-8 h-8 rounded-lg bg-[#E8F0FB] flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[#0B3B6E] text-[16px]">
                                  {s.icon}
                                </span>
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
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
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
                  className={`px-3 xl:px-4 h-full flex items-center text-[14px] font-semibold transition-colors
                    ${isActive ? "text-[#0B3B6E]" : "text-[#64748B] hover:text-[#0B3B6E]"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            {isLoggedIn ? (
              <>
                <Link
                  href="/portal"
                  className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold text-[#64748B] hover:text-[#0B3B6E] transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    person
                  </span>
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
                className="hidden md:flex btn-secondary cursor-pointer"
                style={{
                  fontSize: "clamp(12px, 1.3vw, 13px)",
                  padding: "8px 16px",
                }}
              >
                <span className="material-symbols-outlined text-[14px]">
                  call
                </span>
                <span className="hidden xl:inline">Call Clinic</span>
              </button>
            )}

            <Link
              href="/book"
              className="btn-primary whitespace-nowrap"
              style={{
                fontSize: "clamp(11px, 1.3vw, 13px)",
                padding: "8px clamp(10px, 2vw, 20px)",
              }}
            >
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
              <span className="material-symbols-outlined text-[14px]">
                arrow_forward
              </span>
            </Link>

            {/* Mobile/tablet hamburger */}
            <button
              className="lg:hidden rounded-xl flex items-center justify-center hover:bg-[#F1F5F9] transition-colors cursor-pointer"
              style={{
                width: "clamp(34px, 5vw, 40px)",
                height: "clamp(34px, 5vw, 40px)",
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="material-symbols-outlined text-[#0B3B6E]"
                style={{ fontSize: "clamp(18px, 3vw, 22px)" }}
              >
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile/tablet drawer — full viewport width */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden absolute top-full left-0 right-0 w-full bg-white border-t border-[rgba(15,23,42,0.08)] shadow-xl animate-pop-in z-50"
            style={{ maxHeight: "calc(100dvh - 56px)", overflowY: "auto" }}
          >
            <div
              className="p-4 space-y-1"
              style={{
                paddingLeft: "clamp(16px, 4vw, 24px)",
                paddingRight: "clamp(16px, 4vw, 24px)",
              }}
            >
              {navLinks.map((link) => {
                if (link.label === "Services") {
                  return (
                    <div key="mob-services">
                      <button
                        onClick={() =>
                          setMobileServicesOpen(!mobileServicesOpen)
                        }
                        className="w-full flex justify-between items-center px-4 py-3 rounded-xl font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                        style={{ fontSize: "clamp(13px, 2vw, 15px)" }}
                      >
                        Services
                        <span className="material-symbols-outlined text-[16px]">
                          {mobileServicesOpen
                            ? "keyboard_arrow_up"
                            : "keyboard_arrow_down"}
                        </span>
                      </button>
                      {mobileServicesOpen && (
                        <div className="ml-4 mt-1 border-l-2 border-[#E8F0FB] pl-4 space-y-1 animate-accordion">
                          {serviceItems.map((s) => (
                            <Link
                              key={s.label}
                              href="/#services"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2 py-2 font-medium hover:text-[#0B3B6E]"
                              style={{
                                fontSize: "clamp(12px, 1.8vw, 14px)",
                                color: "#64748B",
                              }}
                            >
                              <span className="material-symbols-outlined text-[15px]">
                                {s.icon}
                              </span>
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
                    className="block px-4 py-3 rounded-xl font-semibold text-[#0F172A] hover:bg-[#F1F5F9] hover:text-[#0B3B6E] transition-colors"
                    style={{ fontSize: "clamp(13px, 2vw, 15px)" }}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-[rgba(15,23,42,0.06)] space-y-3">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/portal"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center font-semibold text-[#0B3B6E] py-2"
                      style={{ fontSize: "clamp(13px, 2vw, 15px)" }}
                    >
                      Patient Portal
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center font-semibold text-red-500 py-2 cursor-pointer"
                      style={{ fontSize: "clamp(13px, 2vw, 15px)" }}
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
                    className="w-full btn-secondary cursor-pointer"
                    style={{ fontSize: "clamp(13px, 2vw, 15px)" }}
                  >
                    Patient Login
                  </button>
                )}
                <Link
                  href="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block btn-primary text-center"
                  style={{ fontSize: "clamp(13px, 2vw, 15px)" }}
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
