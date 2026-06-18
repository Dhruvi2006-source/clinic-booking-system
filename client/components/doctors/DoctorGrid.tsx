import { Doctor } from "@/types";
import DoctorCard from "./DoctorCard";

interface DoctorGridProps {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  onReset: () => void;
}

export default function DoctorGrid({ doctors, loading, error, onReset }: DoctorGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 w-full">
        <span className="animate-spin material-symbols-outlined text-4xl text-primary">sync</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-12 text-center soft-border w-full">
        <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
        <h3 className="font-headline-md text-headline-md text-red-500 mb-2 font-semibold">Error Loading Doctors</h3>
        <p className="text-on-surface-variant font-body-md text-body-md max-w-md mx-auto">{error}</p>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-12 text-center soft-border">
        <span className="material-symbols-outlined text-outline text-5xl mb-4">search_off</span>
        <h3 className="font-headline-md text-headline-md text-primary mb-2 font-semibold">No Specialists Found</h3>
        <p className="text-on-surface-variant font-body-md text-body-md max-w-md mx-auto">
          We couldn&apos;t find any doctors matching your current filters. Try resetting or adjusting your search parameters.
        </p>
        <button
          onClick={onReset}
          className="mt-6 bg-primary text-on-primary px-6 py-3 rounded-full text-label-md font-label-md hover:scale-[1.02] transition-transform"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doc={doc} />
        ))}
      </div>
      <div className="w-full flex justify-center mt-8">
        <button className="px-6 py-3 rounded-full border border-outline-variant text-label-md font-label-md text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer">
          Load More Specialists
        </button>
      </div>
    </>
  );
}
