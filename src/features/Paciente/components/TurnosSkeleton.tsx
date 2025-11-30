export default function TurnosSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="flex min-h-[260px] animate-pulse flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
        >
          {/* Icono circular */}
          <div className="mb-4 flex flex-col items-center">
            <div className="mb-3 h-16 w-16 rounded-full bg-gray-200"></div>
            {/* Nombre del médico */}
            <div className="mb-1 h-6 w-32 rounded bg-gray-200"></div>
            {/* Especialidad */}
            <div className="h-4 w-24 rounded bg-gray-100"></div>
          </div>

          {/* Fecha y Hora */}
          <div className="mb-4 space-y-2 text-center">
            <div className="mx-auto h-4 w-40 rounded bg-gray-200"></div>
            <div className="mx-auto h-4 w-36 rounded bg-gray-200"></div>
          </div>

          {/* Botones */}
          <div className="mt-auto flex flex-row justify-center gap-3">
            <div className="h-10 w-24 rounded-md bg-gray-200"></div>
            <div className="h-10 w-24 rounded-md bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
