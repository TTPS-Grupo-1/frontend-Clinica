export default function NoEmbrionesState() {
  return (
    <div className="rounded-lg border border-yellow-200 bg-yellow-50 py-12 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-yellow-800">Sin embriones disponibles</h3>
        <p className="mb-4 text-yellow-700">
          El paciente seleccionado no tiene embriones disponibles para transferencia.
        </p>
        <div className="rounded-lg bg-yellow-100 p-4 text-sm text-yellow-800">
          <p className="mb-1 font-medium">Para continuar, el paciente necesita:</p>
          <ul className="list-inside list-disc space-y-1 text-left">
            <li>Tener un tratamiento activo</li>
            <li>Embriones disponibles en el sistema</li>
            <li>Embriones aptos para transferencia</li>
          </ul>
        </div>
        <p className="mt-3 text-xs text-yellow-600">
          Contactá con el laboratorio para verificar el estado de los embriones.
        </p>
      </div>
    </div>
  );
}
