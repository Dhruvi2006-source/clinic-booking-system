"use client";

import { useState, useEffect } from "react";

// ── Home Section Components ──────────────────────────────────
import HeroCarousel       from "@/components/home/HeroCarousel";
import StatsSection       from "@/components/home/StatsSection";
import ServicesSection    from "@/components/home/ServicesSection";
import DoctorsSection     from "@/components/home/DoctorsSection";
import PatientJourneySection from "@/components/home/PatientJourneySection";
import WhyUsSection       from "@/components/home/WhyUsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GallerySection     from "@/components/home/GallerySection";
import InsuranceMarquee   from "@/components/home/InsuranceMarquee";
import FaqSection         from "@/components/home/FaqSection";
import ContactSection     from "@/components/home/ContactSection";
import HomeFooter         from "@/components/home/HomeFooter";

export default function HomePage() {
  const [doctors, setDoctors] = useState<any[]>([]);

  // Fetch doctors from API
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((r) => r.json())
      .then((j) => { if (j.success && j.data.length > 0) setDoctors(j.data); })
      .catch(() => {});
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-active");
            o.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07 }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [doctors]);

  return (
    <main className="p-2 overflow-x-hidden" style={{ background: "#FAFBFD", color: "#0F172A" }}>
      <HeroCarousel />
      <StatsSection />
      <ServicesSection />
      <DoctorsSection doctors={doctors} />
      <PatientJourneySection />
      <WhyUsSection />
      <TestimonialsSection />
      <GallerySection />
      <InsuranceMarquee />
      <FaqSection />
      <ContactSection />
      <HomeFooter />
    </main>
  );
}
