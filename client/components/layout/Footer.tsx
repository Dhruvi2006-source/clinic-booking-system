"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Avoid rendering footer inside admin dashboard
  if (isAdmin) return null;

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-section-gap px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        {/* Brand */}
        <div className="space-y-4">
          <Link
            href="/"
            className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-primary text-[28px]">
              health_and_safety
            </span>
            AuraClinic
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Redefining medical excellence with precision, empathy, and innovation. Setting a new standard for patient experience.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest font-semibold">
            Navigation
          </h4>
          <nav className="flex flex-col gap-3">
            <Link
              href="#"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              Locations
            </Link>
            <Link
              href="#"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              Insurance Partners
            </Link>
            <Link
              href="/portal"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              Patient Portal
            </Link>
          </nav>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest font-semibold">
            Resources
          </h4>
          <nav className="flex flex-col gap-3">
            <Link
              href="#"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              Legal & Privacy
            </Link>
            <Link
              href="#"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              Newsletter Sign Up
            </Link>
            <Link
              href="/admin"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>

        {/* Stay Updated */}
        <div className="space-y-4">
          <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest font-semibold">
            Stay Updated
          </h4>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="w-full h-[48px] px-4 rounded border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-tertiary focus:ring-0 transition-colors placeholder:text-outline focus:outline-none"
              placeholder="Email address"
              type="email"
              required
            />
            <button
              className="w-full bg-primary text-on-primary font-label-md text-label-md h-[48px] rounded hover:scale-[1.02] transition-transform cursor-pointer"
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
          © {new Date().getFullYear()} AuraClinic Excellence. All rights reserved.
        </span>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer text-[20px] transition-colors">
            public
          </span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer text-[20px] transition-colors">
            mail
          </span>
        </div>
      </div>
    </footer>
  );
}
