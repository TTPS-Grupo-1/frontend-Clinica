import OvocitosTable from '../../Punciones/components/OvocitosTable';
import EmbryoList from '../../Embryo/components/EmbryoList';
import FertilizacionesTable from '../../Fertilizacion/components/Fertilizaciones';
import type { Props } from '../../../interfaces/HistoriaClinica';
import { useHistorialOvocitosFetch } from '../../../shared/hooks/useHistorialOvocitosFetch';

export default function HistoriaClinicaDetails({
  selectedPacienteId,
  paciente,
  loadingPaciente,
  ovocitos,
  loadingOvocitos,
  embriones,
  loadingEmbriones,
  fertilizaciones,
  loadingFert,
}: Props) {
  const { historial, loading: loadingHistorial } = useHistorialOvocitosFetch(selectedPacienteId);
  // Fallback de ovocitos para pruebas en frontend si no hay ovocitos cargados desde la API
  const sampleOvocitos = [
    { id_ovocito: 1001, identificador: 'SAMPLE-1', madurez: 'maduro' as any, tipo_estado: 'fresco' as any },
    { id_ovocito: 1002, identificador: 'SAMPLE-2', madurez: 'inmaduro' as any, tipo_estado: 'fresco' as any },
    { id_ovocito: 1003, identificador: 'SAMPLE-3', madurez: 'muy inmaduro' as any, tipo_estado: 'criopreservado' as any },
  ];
  const displayOvocitos = (ovocitos && ovocitos.length > 0) ? ovocitos : sampleOvocitos;
  return (
    <>
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Datos personales</h2>
        {loadingPaciente ? (
          <div className="text-gray-500">Cargando paciente...</div>
        ) : paciente ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            <div><strong>Nombre:</strong> {paciente.first_name} {paciente.last_name}</div>
            <div><strong>DNI:</strong> {paciente.dni}</div>
            <div><strong>Email:</strong> {paciente.email || '-'}</div>
            <div><strong>Teléfono:</strong> {paciente.telefono || '-'}</div>
            <div><strong>Fecha de nacimiento:</strong> {paciente.fecha_nacimiento || '-'}</div>
            <div><strong>Obra social:</strong> {paciente.obra_social || '-'}</div>
          </div>
        ) : (
          <div className="text-red-500">Paciente no encontrado.</div>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Ovocitos</h2>
        {loadingOvocitos ? (
          <div className="text-gray-500">Cargando ovocitos...</div>
        ) : (
          <div className="bg-white">
            <OvocitosTable ovocitos={displayOvocitos} />
          </div>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Historial de Ovocitos</h2>
        {loadingHistorial ? (
          <div className="text-gray-500">Cargando historial...</div>
        ) : historial && historial.length > 0 ? (
          <div className="bg-white rounded p-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2">Ovocito</th>
                  <th className="py-2">Estado</th>
                  <th className="py-2">Fecha</th>
                  <th className="py-2">Nota</th>
                  <th className="py-2">Registrado por</th>
                </tr>
              </thead>
              <tbody>
                {historial.map(item => (
                  <tr key={item.id} className="border-b last:border-b-0">
                    <td className="py-2">{item.ovocito_identificador ?? item.ovocito}</td>
                    <td className="py-2">{item.estado}</td>
                    <td className="py-2">{new Date(item.fecha).toLocaleString()}</td>
                    <td className="py-2">{item.nota || '-'}</td>
                    <td className="py-2">{item.usuario_rep || item.usuario || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-500">No hay registros de historial para este paciente.</div>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Embriones</h2>
        {loadingEmbriones ? (
          <div className="text-gray-500">Cargando embriones...</div>
        ) : (
          <EmbryoList embryos={embriones} selectedPacienteId={selectedPacienteId} />
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Fertilizaciones</h2>
        {loadingFert ? (
          <div className="text-gray-500">Cargando fertilizaciones...</div>
        ) : (
          <FertilizacionesTable fertilizaciones={fertilizaciones} />
        )}
      </section>
    </>
  );
}
