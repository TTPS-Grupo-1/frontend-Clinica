import useTratamientosPorPaciente from '../../../../shared/hooks/useTratamientosPorPaciente';

export default function TreatmentsList({ pacienteId, onSelect }: { pacienteId: number | null; onSelect: (id: number) => void }) {
  const { tratamientos, loading, error } = useTratamientosPorPaciente(pacienteId);
  
  // Debug logs
  console.log('TreatmentsList - Debug:', {
    pacienteId,
    tratamientos,
    loading,
    error
  });

  return (
    <>
      {!pacienteId && (
        <div className="text-gray-500">Seleccione un paciente para ver sus tratamientos.</div>
      )}

      {pacienteId && loading && (
        <div className="text-gray-500">Cargando tratamientos...</div>
      )}

      {pacienteId && !loading && (tratamientos.length === 0 || error) && (
        <div className="text-gray-500">No se encontraron tratamientos para este paciente.</div>
      )}

      {pacienteId && !loading && tratamientos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tratamientos.map((t: any) => (
            <button
              key={t.id ?? t.pk}
              onClick={() => onSelect(Number(t.id ?? t.pk))}
              className="text-left border rounded-lg p-4 bg-white hover:shadow cursor-pointer"
            >
              <div className="font-semibold text-gray-800">Tratamiento #{t.id ?? t.pk}</div>
              <div className="text-sm text-gray-600">Estado: {t.activo ? 'Activo' : 'Inactivo'}</div>
              <div className="text-sm text-gray-600">Inicio: {t.fecha_inicio || '-'}</div>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
