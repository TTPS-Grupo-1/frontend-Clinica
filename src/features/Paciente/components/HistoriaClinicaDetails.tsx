import OvocitosTable from '../../Punciones/components/OvocitosTable';
import EmbryoList from '../../Embryo/components/EmbryoList';
import FertilizacionesTable from '../../Fertilizacion/components/Fertilizaciones';
import type { Props } from '../../../interfaces/HistoriaClinica';

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
            <OvocitosTable ovocitos={ovocitos} />
          </div>
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
