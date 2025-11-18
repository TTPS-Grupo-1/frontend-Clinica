export default function NoPacienteSelectedState() {
  return (
    <div className="text-center py-12">
      <div className="mb-4">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Selecciona un paciente
      </h3>
      <p className="text-gray-600">
        Elige un paciente para ver sus tratamientos y embriones disponibles para transferencia.
      </p>
    </div>
  );
}