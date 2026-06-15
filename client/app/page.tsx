"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Premium Dummy Doctors for General Walk-In & Primary Care (Distinct from walkinclinicnyc data)
const dummyWalkInDoctors = [
  {
    id: "julian-mercer",
    name: "Dr. Julian Mercer",
    specialty: "Internal Medicine",
    degree: "MD, Board-Certified",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    experience: "14+ Years",
    rating: "4.9",
    languages: "English, Spanish",
    bio: "Dr. Mercer specializes in primary care and acute adult illness management. He is dedicated to helping patients resolve sudden sicknesses and manage long-term health coordinates."
  },
  {
    id: "clara-vance",
    name: "Dr. Clara Vance",
    specialty: "Family Medicine",
    degree: "MD, Board-Certified",
    avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=400&q=80",
    experience: "10+ Years",
    rating: "4.9",
    languages: "English, French",
    bio: "Dr. Vance is focused on comprehensive family health, preventive checkups, and quick-response urgent care treatments. Her empathetic patient care is highly rated."
  }
];

// Premium Dummy Reviews (Entirely different data)
const dummyReviews = [
  {
    author: "Robert H.",
    letter: "R",
    rating: 5,
    text: "Superb treatment. I walked in with severe seasonal allergy symptoms and was seen within 15 minutes. The physician was thorough, knowledgeable, and put me on a path to recovery immediately. The office is beautiful and spotless.",
    type: "Allergy Care"
  },
  {
    author: "Elena M.",
    letter: "E",
    rating: 5,
    text: "I booked a same-day annual physical exam. The clinical team was exceptionally friendly and professional. They explained everything clearly and completed all the tests efficiently. Definitely my new go-to clinic.",
    type: "Preventive Exam"
  },
  {
    author: "Thomas L.",
    letter: "T",
    rating: 5,
    text: "Extremely professional experience. They performed a rapid strep throat test and got my prescription ready quickly. Much faster and cheaper than an emergency room visit.",
    type: "Acute Treatment"
  }
];

// Dummy Blogs (Distinct data)
const dummyBlogs = [
  {
    title: "Understanding Sore Throat vs. Strep Throat: When to Seek Care",
    desc: "A sore throat can be caused by viruses or bacteria. Learn how to recognize key symptoms, the importance of rapid diagnostic tests, and when an in-person clinical assessment is recommended.",
    date: "June 10, 2026",
    readTime: "4 min read"
  },
  {
    title: "The Importance of Preventive Health Screenings: A Checklist",
    desc: "Staying ahead of your health coordinates starts with screenings. Learn why monitoring your cholesterol levels, blood pressure, and blood glucose can prevent long-term cardiovascular risks.",
    date: "May 28, 2026",
    readTime: "5 min read"
  }
];

// All Walk-In Services divided by Categories
const serviceCategories = {
  illnesses: [
    { name: "Sore Throat & Strep Throat", desc: "Rapid throat swabs, clinical evaluations, and quick treatment prescriptions." },
    { name: "Sinus & Nasal Infections", desc: "Evaluation of sinus pressure, congestion, headache, and targeted therapy." },
    { name: "Cough, Fever & Flu Care", desc: "Treatment of respiratory virus symptoms, influenza testing, and recovery plans." },
    { name: "Urinary Tract Infections (UTI)", desc: "Quick urinalysis screening and prescription of antibiotic relief." },
    { name: "Ear Ache & Earwax Blockage", desc: "Gentle ear flushing, blockage removal, and infection treatment." },
    { name: "Seasonal Allergies Relief", desc: "Therapy plans for pollen, dander, dust, and sinus allergic reactions." },
    { name: "Asthma Flare-up Management", desc: "Nebulizer breathing therapy, lung checks, and rescue medication refills." },
    { name: "Skin Rashes & Irritation", desc: "Urgent evaluation of hives, eczema, dermatitis, and soothing remedies." },
    { name: "Nausea & Diarrhea Recovery", desc: "Dehydration checks, nausea relief, and gastrointestinal symptom care." },
    { name: "Joint & Muscle Pain", desc: "Assessments for sudden neck, back, or shoulder pain without fractures." },
    { name: "Pink Eye & Eye Styes", desc: "Soothe conjunctivitis, eyelid irritation, and prescribe antibiotic drops." },
    { name: "Minor Skin Burns", desc: "First-aid, cleaning, dressing, and prescription creams for minor heat burns." },
    { name: "Wart & Cyst Care", desc: "Cryotherapy freeze options, diagnostic checks, and clinical guidance." },
    { name: "Foreign Body Removal", desc: "Safe removal of splinters, glass, or debris from skin, ears, or nose." },
    { name: "Abscess & Boil Drainage", desc: "Disinfected local anesthesia, incision drainage, and sterile packing." },
    { name: "Laceration & Cuts Care", desc: "Proper cleansing, antiseptic dressing, and skin glue for minor cuts." }
  ],
  preventive: [
    { name: "Annual Health Physicals", desc: "Full systemic checkup, lifestyle consultation, and general vitals overview." },
    { name: "Employment Physicals", desc: "Basic pre-employment certificates, physical capability checks, and documentation." },
    { name: "Pre-Operative Clearance", desc: "Surgical evaluation clearances, ECG, blood panels, and clinical sign-off." },
    { name: "Cholesterol & Lipid Checks", desc: "Fasting lipid profile screenings to evaluate cardiovascular conditions." },
    { name: "Diabetes & Glucose Screenings", desc: "A1C blood screening and glucose checks to diagnose early diabetes risks." },
    { name: "Blood Pressure Checks", desc: "Regular monitoring, hypertension advice, and prescription maintenance." },
    { name: "STD Screening & Testing", desc: "Confidential blood and urine screenings for common sexually transmitted diseases." }
  ],
  notTreated: [
    { name: "Life-Threatening Emergency", desc: "Severe chest pain, sudden paralysis, loss of consciousness, or massive bleeding." },
    { name: "Compound & Broken Bones", desc: "Open fractures, severe skeletal deformities, or injuries requiring orthopedics." },
    { name: "Major Head Trauma", desc: "Concussions with loss of memory, vomiting, or skull bone fractures." },
    { name: "Severe Respiratory Distress", desc: "Complete inability to breathe, requiring immediate emergency intubation." }
  ]
};

export default function WalkInClinicHomepage() {
  const router = useRouter();
  
  // Hero slide states
  const [heroSlide, setHeroSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const heroSlidesData = [
    {
      title: "Walk-In Clinic for Medical Check-Ups in NYC",
      subtitle: "BOARD-CERTIFIED DOCTORS • SAME-DAY APPOINTMENTS",
      desc: "Get prompt, premium medical care at our Midtown Manhattan clinical suites. We offer same-day appointments to prevent long emergency room wait times.",
      image: "/images/hero-doctor-1.png"
    },
    {
      title: "Comprehensive Preventive Health Screenings",
      subtitle: "ANNUAL EXAMS • DISCRETION assured",
      desc: "Take charge of your health. Access annual exams, cholesterol checks, diabetes screenings, pre-op clearance, and confidential STD testing.",
      image: "/images/hero-doctor-2.png"
    },
    {
      title: "Prompt Care for Non-Emergency Illnesses",
      subtitle: "SHORT WAITING TIMES • EXTENDED HOURS",
      desc: "Experiencing a sore throat, sinus infection, ear ache, or minor laceration? Walk in or schedule online to get evaluated in under 20 minutes.",
      image: "/images/hero-doctor-3.png"
    }
  ];

  const handleSlideChange = (nextIndex: number) => {
    if (nextIndex === heroSlide) return;
    const isNext = nextIndex > heroSlide || (heroSlide === heroSlidesData.length - 1 && nextIndex === 0);
    setSlideDirection(isNext ? "next" : "prev");
    setHeroSlide(nextIndex);
  };

  // Auto-play hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((heroSlide + 1) % heroSlidesData.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlide]);

  // Track mouse position on Hero section for parallax effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width) * 2 - 1; // from -1 to 1
    const y = ((clientY - top) / height) * 2 - 1; // from -1 to 1
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Services tab state
  const [activeTab, setActiveTab] = useState<"illnesses" | "preventive" | "notTreated">("illnesses");
  
  // Search query for services
  const [searchQuery, setSearchQuery] = useState("");

  // Testimonials slide state
  const [currentReview, setCurrentReview] = useState(0);

  // Filter services based on search
  const getFilteredServices = () => {
    const services = serviceCategories[activeTab];
    if (!searchQuery) return services;
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Intersection Observer hook to implement scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          observer.unobserve(entry.target); // Trigger once
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [activeTab, searchQuery]); // Re-run when tab or search changes to observe newly rendered cards

  const dummyPhone = "(212) 555-0199";

  return (
    <main className="w-full relative overflow-hidden bg-[#FAFBFC] text-on-background">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[300px] left-10 w-[450px] h-[450px] bg-gradient-to-tr from-secondary/15 to-transparent blur-3xl rounded-full -z-10 animate-pulse-glow" />
      <div className="absolute top-[1200px] right-10 w-[500px] h-[500px] bg-gradient-to-bl from-tertiary/10 to-transparent blur-3xl rounded-full -z-10" />

      {/* ================= HERO SECTION (Interactive Slider) ================= */}
      <section 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-[75vh] md:min-h-[80vh] flex flex-col justify-center text-[#0B1F3A] overflow-hidden py-16 px-margin-mobile md:px-margin-desktop transition-all duration-700 bg-[#FAFBFC]"
      >
        {/* Dynamic Background Image Suitable with Clinic with sliding left/right entry animations and mouse parallax */}
        <div 
          key={`bg-${heroSlide}`}
          className={`absolute inset-0 pointer-events-none opacity-90 md:opacity-100 ${
            slideDirection === "next" ? "animate-slide-img-right" : "animate-slide-img-left"
          }`} 
        >
          <div 
            className="w-full h-full bg-cover bg-right bg-no-repeat transition-transform duration-700 ease-out"
            style={{ 
              backgroundImage: `url('${heroSlidesData[heroSlide].image}')`,
              transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -15}px) scale(1.03)`
            }}
          />
        </div>
        {/* White fading overlay to keep left side text completely clear and high-contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBFC] via-[#FAFBFC]/90 to-transparent md:from-[#FAFBFC] md:via-[#FAFBFC]/75 md:to-transparent pointer-events-none" />
        {/* Overlay mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,142,247,0.05),transparent)] pointer-events-none" />

        <div className="max-w-container-max mx-auto w-full relative z-10">
          <div key={`text-container-${heroSlide}`} className="max-w-3xl space-y-6 text-left">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-bold text-xs uppercase tracking-widest animate-slide-up-fade">
              {heroSlidesData[heroSlide].subtitle}
            </span>
            <h1 className="font-display-lg text-[36px] sm:text-[48px] md:text-[56px] leading-[1.1] font-bold tracking-tight text-balance text-[#0B1F3A] animate-slide-up-fade animation-delay-200">
              {heroSlidesData[heroSlide].title}
            </h1>
            <p className="font-body-lg text-body-lg text-slate-600 max-w-2xl leading-relaxed animate-slide-up-fade animation-delay-400">
              {heroSlidesData[heroSlide].desc}
            </p>
            <div className="flex flex-wrap gap-4 pt-4 animate-slide-up-fade animation-delay-600">
              <Link
                href="/book"
                className="bg-[#ce3636] hover:bg-[#b02c2c] text-white px-8 py-4 rounded-full font-label-md hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all font-bold cursor-pointer"
              >
                Book Appointment
              </Link>
              <a
                href={`tel:${dummyPhone}`}
                className="border border-[#0B1F3A]/20 text-[#0B1F3A] hover:bg-[#0B1F3A]/5 px-8 py-4 rounded-full font-label-md hover:scale-[1.02] transition-all font-bold cursor-pointer flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call: {dummyPhone}
              </a>
            </div>
          </div>
        </div>

        {/* Prev / Next Slider Arrows (Hidden on mobile, flex on desktop) */}
        <button
          onClick={() => handleSlideChange((heroSlide - 1 + heroSlidesData.length) % heroSlidesData.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 hover:bg-white border border-[#0B1F3A]/10 text-[#0B1F3A] flex items-center justify-center transition-all cursor-pointer hover:scale-110 shadow-sm z-20 hidden md:flex"
          title="Previous slide"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <button
          onClick={() => handleSlideChange((heroSlide + 1) % heroSlidesData.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 hover:bg-white border border-[#0B1F3A]/10 text-[#0B1F3A] flex items-center justify-center transition-all cursor-pointer hover:scale-110 shadow-sm z-20 hidden md:flex"
          title="Next slide"
        >
          <span className="material-symbols-outlined font-bold">arrow_forward</span>
        </button>

        {/* Carousel Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-25">
          {heroSlidesData.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSlideChange(i)}
              className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                heroSlide === i ? "bg-secondary w-8" : "bg-white/40 hover:bg-white/70"
              }`}
              title={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ================= ABOUT WALK-IN CLINIC SECTION ================= */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-container-max mx-auto grid md:grid-cols-12 gap-gutter items-center">
          {/* About Copy */}
          <div className="md:col-span-7 space-y-6 reveal-on-scroll reveal-left">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest font-label-md">
              About Our Practice
            </span>
            <h2 className="font-headline-lg text-primary font-bold">
              Prompt, High-Quality Medical Care When You Need It
            </h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              At AuraClinic, we provide same-day medical appointments for acute, non-life-threatening conditions. We help you avoid the long waiting times and high expenses commonly associated with emergency room visits when your symptoms require prompt, professional clinical attention.
            </p>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Located in the heart of Midtown Manhattan, our clean, private clinical spaces are designed to respect your comfort and time. Whether you require treatment for an infection, a minor injury, or seek a routine preventive screening, our certified medical staff is here to deliver compassionate care.
            </p>
            <div className="pt-2 flex gap-4">
              <Link
                href="/book"
                className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md font-bold hover:scale-[1.02] transition-transform shadow-sm"
              >
                Schedule Same-Day Visit
              </Link>
              <Link
                href="/in-clinic"
                className="border border-outline-variant text-primary hover:bg-surface-container-low px-6 py-3 rounded-full font-label-md font-bold transition-all"
              >
                Our Experience
              </Link>
            </div>
          </div>

          {/* Side Illustration/Image */}
          <div className="md:col-span-5 relative mt-12 md:mt-0 reveal-on-scroll reveal-right">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-surface-container shadow-level-2 border border-outline-variant/35 group">
              <img
                alt="Modern clinical examination room"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6s]"
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/20 to-transparent"></div>
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-3xl">medical_information</span>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Midtown Manhattan Clinic</h4>
                  <p className="text-[11px] text-on-surface-variant font-medium">Same-Day Walk-Ins &amp; Checkups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TABBED SERVICES SECTION ================= */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low/40 border-y border-outline-variant/20">
        <div className="max-w-container-max mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 reveal-on-scroll">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest font-label-md">
              Medical Services
            </span>
            <h2 className="font-headline-lg text-primary font-bold">
              Comprehensive Care Offerings
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Select a category to view the illnesses we treat, preventive screening services, and guidelines on emergency conditions.
            </p>
          </div>

          {/* Search Bar for Services */}
          <div className="max-w-md mx-auto relative reveal-on-scroll reveal-scale">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full h-[52px] pl-12 pr-4 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors placeholder:text-outline focus:outline-none"
              placeholder="Search services (e.g. Cough, Physical...)"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tabs Navigation */}
          <div className="flex justify-center border-b border-outline-variant/30 max-w-xl mx-auto reveal-on-scroll reveal-scale">
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setActiveTab("illnesses");
                  setSearchQuery("");
                }}
                className={`pb-3 text-sm font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === "illnesses"
                    ? "border-primary text-primary"
                    : "border-transparent text-on-surface-variant hover:text-primary"
                }`}
              >
                Illnesses We Treat
              </button>
              <button
                onClick={() => {
                  setActiveTab("preventive");
                  setSearchQuery("");
                }}
                className={`pb-3 text-sm font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === "preventive"
                    ? "border-primary text-primary"
                    : "border-transparent text-on-surface-variant hover:text-primary"
                }`}
              >
                Preventive Care
              </button>
              <button
                onClick={() => {
                  setActiveTab("notTreated");
                  setSearchQuery("");
                }}
                className={`pb-3 text-sm font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === "notTreated"
                    ? "border-error text-error font-semibold"
                    : "border-transparent text-on-surface-variant hover:text-error"
                }`}
              >
                Conditions We Don&apos;t Treat
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getFilteredServices().length > 0 ? (
              getFilteredServices().map((service, idx) => (
                <div
                  key={idx}
                  className={`bg-surface-container-lowest border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 group reveal-on-scroll reveal-scale ${
                    activeTab === "notTreated" ? "border-error-container/40" : "border-outline-variant/30"
                  }`}
                >
                  <div className="space-y-3">
                    <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform text-secondary">
                      {activeTab === "illnesses"
                        ? "medical_services"
                        : activeTab === "preventive"
                        ? "health_metrics"
                        : "warning"}
                    </span>
                    <h3 className={`font-headline-md text-[16px] font-bold ${
                      activeTab === "notTreated" ? "text-error" : "text-primary"
                    }`}>
                      {service.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                      {service.desc}
                    </p>
                  </div>
                  {activeTab !== "notTreated" ? (
                    <div className="pt-4 mt-4 border-t border-outline-variant/20 flex justify-between items-center text-xs text-secondary font-bold">
                      <Link href="/book" className="hover:underline flex items-center gap-1">
                        Book Care
                        <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                      </Link>
                    </div>
                  ) : (
                    <div className="pt-4 mt-4 border-t border-outline-variant/20 text-[10px] text-error font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">info</span>
                      Requires Emergency Room
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-on-surface-variant text-sm font-semibold">
                No matching services found for &quot;{searchQuery}&quot;. Please check another category or try a different search.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= CLINIC VALUE PROPOSITIONS ================= */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-container-max mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4 reveal-on-scroll">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest font-label-md">
              Why Choose Us
            </span>
            <h2 className="font-headline-lg text-primary font-bold">
              Designed Around Your Convenience
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Every detail of our practice is customized to deliver efficient, compassionate clinical check-ups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "clinical_notes",
                title: "Same-Day Appointments",
                desc: "Schedule online or walk straight in. We manage queues effectively to guarantee swift medical examinations."
              },
              {
                icon: "shield_person",
                title: "Certified Practitioners",
                desc: "Receive care exclusively from board-certified family medicine and internal medicine specialists."
              },
              {
                icon: "hourglass_empty",
                title: "Minimal Wait Time",
                desc: "Our optimized intake process ensures you spend less time in waiting areas and more time speaking with a doctor."
              },
              {
                icon: "calendar_today",
                title: "Extended Operating Hours",
                desc: "Get clinical care outside standard business hours to accommodate busy work and travel coordinates."
              },
              {
                icon: "payments",
                title: "Transparent Billing & Discount",
                desc: "We participate in network with major health plans and provide affordable, flat-rate pricing for self-pay patients."
              },
              {
                icon: "favorite",
                title: "Discreet & Professional",
                desc: "Your records, diagnoses, and medical consults are handled with absolute confidentiality and clinical care."
              }
            ].map((prop, idx) => (
              <div
                key={idx}
                className="bg-surface-container-low/50 border border-outline-variant/30 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-all duration-300 reveal-on-scroll reveal-scale"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">{prop.icon}</span>
                </div>
                <h3 className="font-headline-md text-[18px] text-primary font-bold">
                  {prop.title}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-semibold">
                  {prop.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLINICAL TEAM SECTION ================= */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low/40 border-y border-outline-variant/20">
        <div className="max-w-container-max mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4 reveal-on-scroll">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest font-label-md">
              Clinical Team
            </span>
            <h2 className="font-headline-lg text-primary font-bold">
              Board-Certified Care Physicians
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Meet our general care practitioners dedicated to providing timely checks and acute treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {dummyWalkInDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-300 reveal-on-scroll reveal-scale"
              >
                <div className="flex flex-col sm:flex-row gap-5 items-center">
                  <img
                    alt={doc.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-outline-variant"
                    src={doc.avatar}
                  />
                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className="text-xs font-bold text-secondary">{doc.degree}</span>
                    <h3 className="font-headline-md text-[18px] text-primary font-bold group-hover:text-secondary transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">{doc.specialty}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-on-surface-variant font-semibold">
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-yellow-500 font-fill text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        {doc.rating} Rating
                      </span>
                      <span>•</span>
                      <span>{doc.experience} Experience</span>
                    </div>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-outline-variant/20 text-xs text-on-surface-variant leading-relaxed">
                  <p className="font-medium mb-4">{doc.bio}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-500">LANGUAGES: {doc.languages}</span>
                    <Link
                      href={`/book?doctor=${doc.id}`}
                      className="bg-primary text-on-primary px-4 py-2 rounded-full font-bold hover:bg-secondary transition-all"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION (Carousel) ================= */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4 reveal-on-scroll">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest font-label-md">
              Testimonials
            </span>
            <h2 className="font-headline-lg text-primary font-bold">
              What Our Patients Say
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Read verified reviews from individuals who received same-day clinical treatment at AuraClinic.
            </p>
          </div>

          {/* Testimonial card */}
          <div className="relative bg-surface-container-low border border-outline-variant/30 p-8 rounded-3xl shadow-sm min-h-[240px] flex flex-col justify-between transition-all duration-300 reveal-on-scroll reveal-scale">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {dummyReviews[currentReview].letter}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary">{dummyReviews[currentReview].author}</h4>
                    <span className="text-xs text-on-surface-variant font-bold">{dummyReviews[currentReview].type}</span>
                  </div>
                </div>
                <div className="flex text-yellow-500">
                  {Array.from({ length: dummyReviews[currentReview].rating }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px] font-fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
              </div>
              <p className="text-body-md font-body-md text-primary italic leading-relaxed pt-2">
                &quot;{dummyReviews[currentReview].text}&quot;
              </p>
            </div>

            {/* Testimonials navigation */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-outline-variant/20 text-xs">
              <span className="font-bold text-on-surface-variant">
                {currentReview + 1} of {dummyReviews.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentReview((prev) => (prev - 1 + dummyReviews.length) % dummyReviews.length)}
                  className="w-8 h-8 rounded-full border border-outline-variant hover:bg-surface-container transition-colors flex items-center justify-center cursor-pointer text-primary"
                  title="Previous testimonial"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                </button>
                <button
                  onClick={() => setCurrentReview((prev) => (prev + 1) % dummyReviews.length)}
                  className="w-8 h-8 rounded-full border border-outline-variant hover:bg-surface-container transition-colors flex items-center justify-center cursor-pointer text-primary"
                  title="Next testimonial"
                >
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACCEPTED INSURANCE PARTNERS ================= */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-low/40 border-y border-outline-variant/20 text-center">
        <div className="max-w-container-max mx-auto space-y-6 reveal-on-scroll reveal-scale">
          <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Health Insurance Coverage We Accept
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {["Blue Cross Blue Shield", "Aetna Health Network", "Cigna Health Care", "United Healthcare", "Medicare Programs", "Oxford Insurance"].map((insurance) => (
              <span
                key={insurance}
                className="px-4 py-2 border border-outline-variant/35 rounded-full bg-surface-container-lowest text-primary font-bold text-xs shadow-sm"
              >
                {insurance}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-on-surface-variant font-medium pt-2">
            *We strongly recommend checking with your specific insurance carrier to verify coverage and co-pay parameters.
          </p>
        </div>
      </section>

      {/* ================= LATEST CLINICAL ARTICLES ================= */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-container-max mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4 reveal-on-scroll">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest font-label-md">
              Patient Library
            </span>
            <h2 className="font-headline-lg text-primary font-bold">
              Latest Health &amp; Care Articles
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Stay informed with medical tips and advice compiled by certified physicians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {dummyBlogs.map((blog, idx) => (
              <div
                key={idx}
                className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-8 flex flex-col justify-between shadow-sm group hover:shadow-md transition-all duration-300 reveal-on-scroll reveal-scale"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
                    <span>{blog.date}</span>
                    <span className="text-secondary">{blog.readTime}</span>
                  </div>
                  <h3 className="font-headline-md text-[18px] text-primary font-bold group-hover:text-secondary transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                    {blog.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-outline-variant/20 flex justify-between items-center text-xs text-primary font-bold">
                  <button className="hover:underline flex items-center gap-1 cursor-pointer">
                    Continue reading
                    <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CONVERSION CTA ================= */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-[#0B1F3A] text-white my-8 mx-4 rounded-[40px] shadow-level-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(79,142,247,0.15),transparent)] pointer-events-none" />
        <div className="max-w-container-max mx-auto text-center space-y-6 relative z-10 py-6 reveal-on-scroll reveal-scale">
          <h2 className="text-headline-lg-mobile md:text-headline-lg font-bold">
            Get Evaluated Promptly Today
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Ready to visit our Midtown clinic? Book an appointment online or contact our reception staff directly. Walk-ins are handled promptly based on check-in arrival.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              href="/book"
              className="w-full sm:w-auto bg-secondary text-white px-8 py-3.5 rounded-full font-label-md font-bold hover:scale-[1.02] transition-transform shadow-md text-center"
            >
              Book Online
            </Link>
            <a
              href={`tel:${dummyPhone}`}
              className="w-full sm:w-auto border border-slate-500 hover:bg-slate-800 text-white px-8 py-3.5 rounded-full font-label-md font-bold transition-all text-center flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              Call: {dummyPhone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
