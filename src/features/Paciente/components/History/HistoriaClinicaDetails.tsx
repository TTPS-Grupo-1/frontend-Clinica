import OvocitosTable from '../../../Punciones/components/OvocitosTable';
import { useState } from 'react';
import EmbryoList from '../../../Embryo/components/EmbryoList';
import FertilizacionesTable from '../../../Fertilizacion/components/Fertilizaciones';
import type { Props } from '../../../../interfaces/HistoriaClinica';
import TreatmentsList from './TreatmentsList';
import TreatmentDetails from './TreatmentDetails';
import Modal from './Modal';
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
  const [selectedTratamientoId, setSelectedTratamientoId] = useState<number | null>(null);

  // Vista para pacientes: datos personales + tratamientos + resumen general
  if (userType === 'paciente') {
    return (
      <>
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-black mb-2">Datos personales</h2>
          <PatientDetails paciente={paciente} loading={loadingPaciente} />
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold text-black mb-2">Tratamientos</h2>
          <TreatmentsList pacienteId={selectedPacienteId} onSelect={(id) => setSelectedTratamientoId(id)} />
        </section>

        {selectedTratamientoId && (
          <Modal onClose={() => setSelectedTratamientoId(null)}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Detalles del tratamiento</h3>
                <button onClick={() => setSelectedTratamientoId(null)} className="text-gray-500 hover:text-gray-700">
                  Cerrar
                </button>
              </div>
              <TreatmentDetails 
                tratamientoId={selectedTratamientoId} 
                pacienteId={selectedPacienteId} 
                paciente={paciente} 
              />
            </div>
          </Modal>
        )}

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

  // Vista para médicos: solo lista de tratamientos y detalles específicos por tratamiento
  return (
    <>
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-black mb-2">Datos del paciente</h2>
        <PatientDetails paciente={paciente} loading={loadingPaciente} />
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-black mb-2">Tratamientos</h2>
        <TreatmentsList pacienteId={selectedPacienteId} onSelect={(id) => setSelectedTratamientoId(id)} />
      </section>

      {selectedTratamientoId && (
        <Modal onClose={() => setSelectedTratamientoId(null)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Detalles del tratamiento</h3>
              <button onClick={() => setSelectedTratamientoId(null)} className="text-gray-500 hover:text-gray-700">
                Cerrar
              </button>
            </div>
            <TreatmentDetails 
              tratamientoId={selectedTratamientoId} 
              pacienteId={selectedPacienteId} 
              paciente={paciente} 
            />
          </div>
        </Modal>
      )}

      {!selectedTratamientoId && (
        <div className="text-center text-gray-500 py-8">
          Selecciona un tratamiento para ver sus detalles específicos (ovocitos, embriones, fertilizaciones)
        </div>
      )}
    </>
  );
}
