export default function PatientDetails({
  paciente,
  loading,
}: {
  paciente: any | null;
  loading: boolean;
}) {
  if (loading) return <div className="text-gray-500">Cargando paciente...</div>;

  if (!paciente) return <div className="text-red-500">Paciente no encontrado.</div>;

  return (
    <div className="grid grid-cols-1 gap-3 text-gray-700 sm:grid-cols-2">
      <div>
        <strong>Nombre:</strong> {paciente.first_name} {paciente.last_name}
      </div>
      <div>
        <strong>DNI:</strong> {paciente.dni}
      </div>
      <div>
        <strong>Email:</strong> {paciente.email || '-'}
      </div>
      <div>
        <strong>Teléfono:</strong> {paciente.telefono || '-'}
      </div>
      <div>
        <strong>Fecha de nacimiento:</strong> {paciente.fecha_nacimiento || '-'}
      </div>
      <div>
        <strong>Obra social:</strong> {paciente.obra_social || '-'}
      </div>
    </div>
  );
}
