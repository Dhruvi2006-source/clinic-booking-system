import Link from "next/link";
import { Doctor } from "@/types";

interface DoctorCardProps {
  doc: Doctor;
}

export default function DoctorCard({ doc }: DoctorCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl soft-border p-6 ambient-shadow ambient-shadow-hover transition-all duration-300 flex flex-col h-full cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <div className="relative">
          <img
            alt={doc.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-surface-container-low"
            src={doc.avatar}
          />
          <span
            className={`absolute bottom-0 right-0 w-4 h-4 border-2 border-surface-container-lowest rounded-full ${
              doc.availableToday ? "bg-green-500" : "bg-yellow-500"
            }`}
            title={doc.availableToday ? "Available" : "Busy"}
          />
        </div>
        <button className="text-outline hover:text-primary hover:bg-surface-container p-2 rounded-full transition-colors">
          <span className="material-symbols-outlined">favorite_border</span>
        </button>
      </div>

      <div className="mb-4 flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-headline-md font-headline-md text-on-surface font-semibold group-hover:text-primary transition-colors">
            {doc.name}
          </h3>
          {doc.verified && (
            <span
              className="material-symbols-outlined text-primary text-sm font-fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          )}
        </div>
        <p className="text-label-md font-label-md text-on-tertiary-container mb-2 font-medium">
          {doc.specialty}
        </p>
        <div className="flex items-center gap-1 text-caption font-caption text-on-surface-variant mb-4">
          <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span className="font-medium text-on-surface">{doc.rating}</span>
          <span>({doc.reviewsCount} reviews)</span>
        </div>

        <div className="flex flex-col gap-2 text-caption font-caption text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>{doc.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">event_available</span>
            <span className={doc.availableToday ? "text-green-600 font-semibold" : "text-on-surface-variant"}>
              Next available: {doc.nextAvailable}
            </span>
          </div>
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
  );
}
