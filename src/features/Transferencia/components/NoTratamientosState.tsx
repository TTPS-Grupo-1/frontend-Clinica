export default function NoTratamientosState() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen pt-[80px]">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay tratamientos disponibles
          </h3>
          <p className="text-gray-600 mb-4">
            No tienes tratamientos en curso para realizar transferencias embrionarias.
          </p>
          <p className="text-sm text-gray-500">
            Contacta con tu médico para iniciar un nuevo tratamiento.
          </p>
        </div>
      </div>
    </div>
  );
}