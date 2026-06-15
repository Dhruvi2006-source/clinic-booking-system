"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  // Fully dummy coordinates (different from original website to ensure complete separation of data)
  const dummyPhone = "(212) 555-0199";
  const dummyAddress = "730 Fifth Avenue, Floor 14, New York, NY 10019";
  const dummyEmail = "care@auraclinic.example.com";

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant w-full mt-auto transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-section-gap px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        {/* Column 1: Find Us / Contact */}
        <div className="space-y-4">
          <Link
            href="/"
            className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-primary text-[28px]">
              health_and_safety
            </span>
            <span>AuraClinic</span>
          </Link>
          <div className="space-y-2 text-sm text-on-surface-variant font-medium leading-relaxed">
            <p className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">location_on</span>
              <span>
                <strong>Find Us:</strong><br />
                {dummyAddress}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">call</span>
              <span>
                <strong>Call Us:</strong> {dummyPhone}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">mail</span>
              <span>
                <strong>Email:</strong> {dummyEmail}
              </span>
            </p>
          </div>
        </div>

        {/* Column 2: Useful Links */}
        <div className="space-y-4">
          <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest font-semibold">
            Useful Links
          </h4>
          <nav className="flex flex-col gap-2.5">
            <Link
              href="/"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              Home
            </Link>
            <Link
              href="/doctors"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              Find a Doctor
            </Link>
            <Link
              href="/in-clinic"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              Lounge Experience
            </Link>
            <Link
              href="/portal"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              Patient Portal
            </Link>
          </nav>
        </div>

        {/* Column 3: Medical Services Info */}
        <div className="space-y-4">
          <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest font-semibold">
            Care Services
          </h4>
          <ul className="flex flex-col gap-2.5 text-body-md text-on-surface-variant opacity-80">
            <li>Sore Throat &amp; Coughs</li>
            <li>Sinus &amp; Urinary Care</li>
            <li>Annual Health Screenings</li>
            <li>Pre-Employment Physicals</li>
            <li>STD Testing &amp; Clearances</li>
          </ul>
        </div>

        {/* Column 4: Stay Connected */}
        <div className="space-y-4">
          <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest font-semibold">
            Stay Connected
          </h4>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            Register your email to receive periodic medical advisories and community health wellness updates.
          </p>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="w-full h-[48px] px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors placeholder:text-outline focus:outline-none"
              placeholder="Email address"
              type="email"
              required
            />
            <button
              className="w-full bg-primary text-on-primary font-label-md text-label-md h-[48px] rounded-xl hover:scale-[1.02] hover:shadow-md transition-all cursor-pointer font-bold"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-outline-variant/30 px-margin-mobile md:px-margin-desktop py-6 flex justify-between items-center max-w-container-max mx-auto flex-col sm:flex-row gap-4">
        <span className="text-caption font-caption text-on-surface-variant text-center sm:text-left">
          &copy; {new Date().getFullYear()} AuraClinic Medical Excellence. All rights reserved.
        </span>
        <div className="flex gap-4 items-center">
          <span className="text-xs text-on-surface-variant mr-2">Follow Us:</span>
          {/* Custom mock social link items */}
          <span className="material-symbols-outlined text-on-surface-variant hover:text-secondary cursor-pointer text-[20px] transition-colors" title="Facebook">
            public
          </span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-secondary cursor-pointer text-[20px] transition-colors" title="Twitter">
            forum
          </span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-secondary cursor-pointer text-[20px] transition-colors" title="Email Us">
            mail
          </span>
        </div>
      </div>
    </footer>
  );
}
