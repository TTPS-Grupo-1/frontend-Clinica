import OvocitosTable from '../../../Punciones/components/OvocitosTable';
import EmbrionesTable from '../EmbrionesTable'; // ✅ Cambiar import
import FertilizacionesTable from '../../../Fertilizacion/components/Fertilizaciones';
import type { Props } from '../../../../interfaces/HistoriaClinica';
import TreatmentsList from '../../../Tratamiento/components/TreatmentsList';
import { useNavigate } from 'react-router-dom';
import PatientDetails from './PatientDetails';

interface ExtendedProps extends Props {
  userType?: 'paciente' | 'medico';
}

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
  userType = 'paciente',
}: ExtendedProps) {
  const navigate = useNavigate();

  // Vista para pacientes
  if (userType === 'paciente') {
    return (
      <>
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-black mb-2">Datos personales</h2>
          <PatientDetails paciente={paciente} loading={loadingPaciente} />
        </section>

       

        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Ovocitos</h2>
          {loadingOvocitos ? (
            <div className="text-gray-500">Cargando ovocitos...</div>
          ) : (
            <div className="bg-white">
              <OvocitosTable ovocitos={ovocitos || []} />
            </div>
          )}
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Embriones</h2>
          {loadingEmbriones ? (
            <div className="text-gray-500">Cargando embriones...</div>
          ) : (
            <EmbrionesTable embriones={embriones || []} /> 
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

  // Vista para médicos
  return (
    <>
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-black mb-2">Datos del paciente</h2>
        <PatientDetails paciente={paciente} loading={loadingPaciente} />
      </section>

       <section className="mb-6">
          <h2 className="text-lg font-semibold text-black mb-2">Tratamientos</h2>
          <TreatmentsList 
            pacienteId={selectedPacienteId} 
            onSelect={(id) => {
              navigate(`/tratamiento/${id}`, {
                state: {
                  tratamientoId: id,
                  pacienteId: selectedPacienteId,
                  paciente,
                }
              });
            }} 
          />
        </section>
      
    </>
  );
}
