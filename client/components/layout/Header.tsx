"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme state on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.theme = "light";
      setIsDarkMode(false);
    } else {
      root.classList.add("dark");
      localStorage.theme = "dark";
      setIsDarkMode(true);
    }
  };

  // Determine context
  const isAdmin = pathname.startsWith("/admin");
  const isPortal = pathname.startsWith("/portal");
  const isBook = pathname.startsWith("/book");

  // Avoid rendering default header inside admin dashboard (which has its own side nav)
  if (isAdmin) return null;

  return (
    <header className="bg-surface-container-lowest/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-outline-variant/10 transition-colors duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2 tracking-tight group"
        >
          <span className="material-symbols-outlined text-tertiary text-[28px] transition-transform duration-300 group-hover:rotate-12">
            health_and_safety
          </span>
          AuraClinic
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-8 items-center h-full">
          <Link
            href="/doctors"
            className={`font-label-md text-label-md transition-all duration-200 h-full flex items-center border-b-2 pt-[2px] ${
              pathname === "/doctors" || pathname.startsWith("/doctors/")
                ? "text-primary border-primary font-semibold"
                : "text-on-surface-variant border-transparent hover:text-primary"
            }`}
          >
            Find a Doctor
          </Link>
          <Link
            href="#"
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all duration-200 h-full flex items-center border-b-2 border-transparent pt-[2px]"
          >
            Services
          </Link>
          <Link
            href="#"
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all duration-200 h-full flex items-center border-b-2 border-transparent pt-[2px]"
          >
            Pricing
          </Link>
          {isPortal && (
            <Link
              href="/portal"
              className={`font-label-md text-label-md transition-all duration-200 h-full flex items-center border-b-2 pt-[2px] ${
                pathname === "/portal"
                  ? "text-primary border-primary font-semibold"
                  : "text-on-surface-variant border-transparent hover:text-primary"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Sleek Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer text-primary"
            title="Toggle theme mode"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <div className="hidden md:flex items-center gap-4">
            {isPortal ? (
              <>
                <Link
                  href="/"
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  Sign Out
                </Link>
                <Link
                  href="/book"
                  className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-full hover:scale-[1.02] hover:shadow-md active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                >
                  Book Now
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    arrow_forward
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/portal"
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href={isBook ? "#" : "/book"}
                  className={`font-label-md text-label-md px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
                    isBook
                      ? "bg-primary text-on-primary opacity-50 cursor-not-allowed pointer-events-none"
                      : "bg-primary text-on-primary hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                  }`}
                >
                  Book Now
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    arrow_forward
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary p-2 focus:outline-none cursor-pointer"
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
        <div className="md:hidden bg-surface-container-lowest border-b border-outline-variant p-6 space-y-4 animate-pop-in">
          <nav className="flex flex-col gap-4">
            <Link
              href="/doctors"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-label-md text-label-md ${
                pathname.startsWith("/doctors") ? "text-primary font-semibold" : "text-on-surface-variant"
              }`}
            >
              Find a Doctor
            </Link>
            <Link
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-md text-label-md text-on-surface-variant"
            >
              Services
            </Link>
            <Link
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-md text-label-md text-on-surface-variant"
            >
              Pricing
            </Link>
            {isPortal && (
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-label-md text-label-md ${
                  pathname === "/portal" ? "text-primary font-semibold" : "text-on-surface-variant"
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>
          <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-3">
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-md text-label-md text-on-surface-variant text-center py-2"
            >
              {isPortal ? "Sign Out" : "Sign In"}
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-primary text-on-primary font-label-md text-label-md py-3 rounded-full text-center hover:scale-[1.01] transition-transform"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
