"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mockDoctors, mockReviews } from "@/lib/mockData";

export default function Homepage() {
  const router = useRouter();
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  
  // Testimonial slide state
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (specialty) params.append("specialty", specialty);
    if (location) params.append("location", location);
    router.push(`/doctors?${params.toString()}`);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mockReviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mockReviews.length) % mockReviews.length);
  };

  // Select doctors for featured section (Sarah, Marcus, Elena)
  const featuredDoctors = mockDoctors.filter((doc) =>
    ["sarah-jenkins", "marcus-thorne", "elena-rostova"].includes(doc.id)
  );

  return (
    <main className="w-full relative overflow-hidden bg-background">
      {/* Decorative Floating Background Light Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-tr from-tertiary/10 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10" />
      <div className="absolute top-[800px] right-20 w-[500px] h-[500px] bg-gradient-to-bl from-primary-fixed/20 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10" />
      <div className="absolute bottom-[400px] left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-secondary-container/10 to-transparent blur-3xl rounded-full -z-10" />

      {/* Hero Section */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-transparent relative">
        <div className="max-w-container-max mx-auto grid md:grid-cols-12 gap-gutter items-center relative z-10">
          <div className="md:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/50 text-on-surface-variant font-label-md text-label-md">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
              A New Era of Concierge Medicine
            </div>
            <h1 className="font-display-lg text-[44px] md:text-[68px] text-on-surface leading-[1.05] font-bold tracking-tight text-balance">
              Precision Care.
              <br />
              <span className="bg-gradient-to-r from-primary via-tertiary to-primary bg-clip-text text-transparent">
                Quiet Confidence.
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
              Experience healthcare redefined. AuraClinic fuses world-class medical specialists with frictionless, Stripe-level technology to keep you in peak performance.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                className="bg-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded-full hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer font-semibold"
                href="/book"
              >
                Schedule Consultation
              </Link>
              <Link
                className="text-on-surface font-label-md text-label-md px-6 py-4 rounded-full border border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer font-semibold"
                href="/doctors"
              >
                Explore Specialists
              </Link>
            </div>
          </div>
          
          <div className="md:col-span-5 relative mt-12 md:mt-0">
            {/* Visual Depth Layering: Doctor Image & Floating Card */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-surface-container-low shadow-level-3 border border-outline-variant/40 group">
              <img
                alt="Doctor consultation"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[8s]"
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Floating micro-UI card */}
              <div className="absolute bottom-6 left-6 right-6 bg-surface-container-lowest/80 backdrop-blur-md p-4 rounded-xl border border-outline-variant/20 flex items-center justify-between shadow-md animate-float">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-3xl font-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                    spa
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-primary">Aura Premium Club</h4>
                    <p className="text-xs text-on-surface-variant">Active Concierge Health</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary text-xs rounded-full font-bold">
                  98.6%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Appointment Search Widget */}
      <section className="px-margin-mobile md:px-margin-desktop relative z-20 -mt-8">
        <div className="max-w-4xl mx-auto bg-surface-container-lowest/80 backdrop-blur-md rounded-xl p-8 border border-outline-variant/40 shadow-level-3">
          <form onSubmit={handleSearchSubmit} className="grid md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-widest text-[11px] font-bold">
                Specialty
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  stethoscope
                </span>
                <input
                  className="w-full h-[56px] pl-12 pr-4 rounded border border-outline-variant bg-transparent text-on-surface font-body-md focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors placeholder:text-outline focus:outline-none"
                  placeholder="e.g. Cardiology"
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-widest text-[11px] font-bold">
                Location
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  location_on
                </span>
                <input
                  className="w-full h-[56px] pl-12 pr-4 rounded border border-outline-variant bg-transparent text-on-surface font-body-md focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors placeholder:text-outline focus:outline-none"
                  placeholder="City or ZIP code"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <button
              className="bg-primary text-on-primary font-label-md text-label-md h-[56px] rounded hover:scale-[1.02] transition-all flex items-center justify-center gap-2 w-full cursor-pointer hover:shadow-lg active:scale-[0.98] font-semibold"
              type="submit"
            >
              <span className="material-symbols-outlined">search</span>
              Find Doctors
            </button>
          </form>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop border-b border-outline-variant/30 bg-surface/30">
        <div className="max-w-container-max mx-auto text-center space-y-8">
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-[11px] font-bold">
            Trusted by leading clinical networks
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="material-symbols-outlined text-[42px] text-primary">spa</span>
            <span className="material-symbols-outlined text-[42px] text-primary">medical_services</span>
            <span className="material-symbols-outlined text-[42px] text-primary">ecg_heart</span>
            <span className="material-symbols-outlined text-[42px] text-primary">vaccines</span>
            <span className="material-symbols-outlined text-[42px] text-primary">psychiatry</span>
          </div>
        </div>
      </section>

      {/* Featured Specialists */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-transparent">
        <div className="max-w-container-max mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4">
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-semibold">
                Leading Specialists
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                Connect with our premium board-certified professionals, selected for their clinical pedigree and patient-first approach.
              </p>
            </div>
            <Link
              className="font-label-md text-label-md text-primary flex items-center gap-2 hover:opacity-80 transition-opacity font-bold"
              href="/doctors"
            >
              View All Doctors
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDoctors.map((doc) => (
              <Link
                key={doc.id}
                href={`/doctors/${doc.id}`}
                className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-level-2 hover:shadow-level-3 transition-all duration-500 group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-surface-container overflow-hidden">
                  <img
                    alt={doc.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    src={doc.avatar}
                  />
                  <div className="absolute top-4 left-4 bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1 rounded-full text-caption font-caption text-primary flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-yellow-500 text-[14px] font-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    {doc.rating}
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-1 group-hover:text-tertiary transition-colors">
                      {doc.name}
                    </h3>
                    <p className="font-label-md text-label-md text-tertiary mb-4 font-semibold">
                      {doc.specialty}
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 leading-relaxed">
                      {doc.bio}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-6 mt-6 border-t border-outline-variant/30 text-caption font-caption text-on-surface-variant font-medium">
                    <span>{doc.location}</span>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                      arrow_outward
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section (Asymmetrical Editorial Grid) */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface/30">
        <div className="max-w-container-max mx-auto space-y-12">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-semibold">
              Clinical Services
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We focus on premium, multi-disciplinary fields configured for longevity, acute checks, and digital accessibility.
            </p>
          </div>

          {/* Asymmetrical composition layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Box 1 (Large - Spans 7 cols) */}
            <div className="md:col-span-7 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 md:p-12 shadow-level-2 hover:-translate-y-1 hover:shadow-level-3 transition-all duration-300 flex flex-col justify-between min-h-[350px]">
              <div>
                <span className="material-symbols-outlined text-tertiary text-5xl mb-6 font-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                  videocam
                </span>
                <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface font-semibold mb-4">
                  High-Fidelity Telehealth Suite
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-md">
                  Consult with your specialists virtually. Access secure audio/video lines, prescriptions integrations, and records synchronization in real time.
                </p>
              </div>
              <Link href="/portal/telehealth" className="text-primary font-label-md text-label-md font-bold flex items-center gap-1 group mt-8">
                Open Telehealth Room
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            {/* Box 2 (Small - Spans 5 cols) */}
            <div className="md:col-span-5 bg-surface-container-low border border-outline-variant/30 rounded-xl p-8 md:p-12 shadow-level-2 hover:-translate-y-1 hover:shadow-level-3 transition-all duration-300 flex flex-col justify-between min-h-[350px]">
              <div>
                <span className="material-symbols-outlined text-primary text-5xl mb-6">
                  ecg_heart
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-4">
                  Concierge Cardiology
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Dedicated cardiovascular assessments, preventative heart checks, and customized wellness roadmaps.
                </p>
              </div>
              <Link href="/doctors" className="text-primary font-label-md text-label-md font-bold flex items-center gap-1 group mt-8">
                Explore Specialists
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            {/* Box 3 (Small - Spans 5 cols) */}
            <div className="md:col-span-5 bg-surface-container-low border border-outline-variant/30 rounded-xl p-8 md:p-12 shadow-level-2 hover:-translate-y-1 hover:shadow-level-3 transition-all duration-300 flex flex-col justify-between min-h-[350px]">
              <div>
                <span className="material-symbols-outlined text-primary text-5xl mb-6">
                  spa
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-4">
                  Executive Health Checks
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Thorough preventative health reports including vitals trends, lab testing, and diagnostic assessments.
                </p>
              </div>
              <Link href="/portal" className="text-primary font-label-md text-label-md font-bold flex items-center gap-1 group mt-8">
                Check Dashboard
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            {/* Box 4 (Large - Spans 7 cols) */}
            <div className="md:col-span-7 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 md:p-12 shadow-level-2 hover:-translate-y-1 hover:shadow-level-3 transition-all duration-300 flex flex-col justify-between min-h-[350px]">
              <div>
                <span className="material-symbols-outlined text-tertiary text-5xl mb-6">
                  psychiatry
                </span>
                <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface font-semibold mb-4">
                  Integrative Medicine &amp; Longevity
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-md">
                  Combining medical disciplines to optimize health span. We study wellness profiles to build customized daily guidelines for nutrition, rest, and conditioning.
                </p>
              </div>
              <Link href="/book" className="text-primary font-label-md text-label-md font-bold flex items-center gap-1 group mt-8">
                Book Initial Longevity Consultation
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Reviews Section (Stateful Testimonial Carousel) */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-transparent relative">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-semibold">
              Patient Experiences
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Hear from members who transitioned their healthcare to AuraClinic.
            </p>
          </div>

          {/* Testimonial card container with custom fade slide animations */}
          <div className="relative bg-surface-container-lowest border border-outline-variant/30 p-8 md:p-12 rounded-xl shadow-level-3 min-h-[250px] flex flex-col justify-between transition-all duration-500">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-headline-md ${mockReviews[currentSlide].avatarBg}`}>
                    {mockReviews[currentSlide].avatarLetter}
                  </div>
                  <div>
                    <h4 className="font-headline-md text-[16px] text-on-surface font-semibold">
                      {mockReviews[currentSlide].author}
                    </h4>
                    <p className="text-caption font-caption text-on-surface-variant font-medium">
                      Verified {mockReviews[currentSlide].type} visit
                    </p>
                  </div>
                </div>
                <div className="flex text-[#F59E0B]">
                  {[...Array(mockReviews[currentSlide].rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px] icon-fill">
                      star
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-body-lg font-body-lg text-on-surface leading-relaxed italic">
                &quot;{mockReviews[currentSlide].text}&quot;
              </p>
            </div>

            {/* Slider Navigation controls */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-outline-variant/20">
              <span className="text-caption font-caption text-on-surface-variant font-semibold">
                {currentSlide + 1} of {mockReviews.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer focus:outline-none"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer focus:outline-none"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
