"use client";

import Link from "next/link";
import { Doctor } from "@/types";
import { useState } from "react";

interface DoctorCardProps {
  doc: Doctor;
}

export default function DoctorCard({ doc }: DoctorCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="relative bg-surface-container-lowest overflow-hidden ambient-shadow ambient-shadow-hover transition-all duration-300 flex flex-col aspect-[3/4] cursor-pointer group"
      onMouseLeave={() => setShowDetails(false)}
    >
      {/* Background Image */}
      <img
        alt={doc.name}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        src={doc.avatar}
      />

      {/* Gradient Overlay so text at the bottom is readable even if details are closed */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Basic Info always visible when details are closed */}
      <div
        className={`absolute bottom-0 right-0 left-4 p-6 transition-all duration-300 ${showDetails ? "translate-y-4 opacity-0 pointer-events-none" : "translate-y-0 opacity-100 group-hover:translate-y-4 group-hover:opacity-0 group-hover:pointer-events-none"}`}
      >
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-white text-xl font-bold">{doc.name}</h3>
          {doc.verified && (
            <span
              className="material-symbols-outlined text-white text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          )}
        </div>
        <p className="text-white/90 text-sm font-medium">{doc.specialty}</p>
      </div>

      {/* Mobile Toggle Button (Up Arrow) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowDetails(!showDetails);
        }}
        className={`absolute bottom-6 right-6 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transition-transform duration-300 lg:hidden`}
        style={{ transform: showDetails ? "rotate(180deg)" : "rotate(0deg)" }}
        aria-label="Toggle Details"
      >
        <span className="material-symbols-outlined">keyboard_arrow_up</span>
      </button>

      {/* Sliding Details Panel */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-white p-6 transition-transform duration-300 ease-in-out flex flex-col h-[55%] z-10 ${
          showDetails
            ? "translate-y-0"
            : "translate-y-full group-hover:translate-y-0"
        }`}
      >
        <div className="absolute left-4 top-4 mb-4 flex flex-col gap-4">
          <div className="flex gap-4 items-start mb-4 ">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-headline-md font-headline-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                  {doc.name}
                </h3>
                {doc.verified && (
                  <span
                    className="material-symbols-outlined text-primary text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                )}
              </div>
              <p className="text-label-md font-label-md text-on-tertiary-container font-medium">
                {doc.specialty}
              </p>
            </div>
            <button className="text-outline hover:text-primary hover:bg-surface-container p-2 rounded-full transition-colors hidden lg:block">
              <span className="material-symbols-outlined">favorite_border</span>
            </button>
          </div>

          <div className="flex items-center gap-1 text-caption font-caption text-on-surface-variant mb-4">
            <span
              className="material-symbols-outlined text-yellow-500 text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-medium text-on-surface">{doc.rating}</span>
            <span>({doc.reviewsCount} reviews)</span>
          </div>

          <div className="flex flex-col gap-2 text-caption font-caption text-on-surface-variant flex-grow">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                location_on
              </span>
              <span>{doc.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                event_available
              </span>
              <span
                className={
                  doc.availableToday
                    ? "text-green-600 font-semibold"
                    : "text-on-surface-variant"
                }
              >
                Next available: {doc.nextAvailable}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-surface-container-highest mt-auto">
            <Link
              href={`/doctors/${doc.id}`}
              className="w-full py-2.5 rounded-lg border border-primary text-primary text-label-md font-label-md hover:bg-primary hover:text-on-primary transition-colors duration-200 text-center block"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
