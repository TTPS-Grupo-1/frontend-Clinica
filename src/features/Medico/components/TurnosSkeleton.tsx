import React from "react";

export default function TurnosSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-xl shadow p-6 flex flex-col gap-4 animate-pulse">
          <div className="h-6 w-2/3 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
