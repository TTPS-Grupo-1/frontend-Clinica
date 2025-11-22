import React from 'react';

export default function TurnosSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex animate-pulse flex-col gap-4 rounded-xl bg-gray-100 p-6 shadow"
        >
          <div className="mb-2 h-6 w-2/3 rounded bg-gray-300" />
          <div className="mb-2 h-4 w-1/2 rounded bg-gray-200" />
          <div className="mb-2 h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
