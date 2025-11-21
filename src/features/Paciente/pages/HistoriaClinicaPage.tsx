import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useOvocitosFetch } from '../../../shared/hooks/useOvocitosFetch';
import { useEmbryoFetch } from '../../../shared/hooks/useEmbryoFetch';
import { useFertilizacionesFetch } from '../../../shared/hooks/useFertilizacionesFetch';
import HistoriaClinicaDetails from '../components/History/HistoriaClinicaDetails';
import RoleHomeButton from '../../../shared/components/RoleHomeButton';
import { useMonitoreosAtendidosPorPaciente } from '../../../shared/hooks/useMonitoreoFetch'; 

export default function HistoriaClinicaPage() {
  const { pacienteId: pacienteIdParam } = useParams<{ pacienteId?: string }>();
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(
    pacienteIdParam ? Number(pacienteIdParam) : null
  );
  const [paciente, setPaciente] = useState<any | null>(null);
  const [loadingPaciente, setLoadingPaciente] = useState(false);
  const navigate = useNavigate();

  // Obtener el rol del usuario desde Redux
  const userRole = useSelector((state: any) => state.auth.user?.rol);

  // Mapear el rol a los tipos esperados por el componente (roles en mayúsculas)
  const userType: 'paciente' | 'medico' = userRole === 'MEDICO' ? 'medico' : 'paciente';

  const { ovocitos, loading: loadingOvocitos } = useOvocitosFetch(selectedPacienteId);
  const { embriones, loading: loadingEmbriones } = useEmbryoFetch(selectedPacienteId);
  const { fertilizaciones, loading: loadingFert } = useFertilizacionesFetch(selectedPacienteId);
  const { monitoreos, loading: loadingMonitoreos } = useMonitoreosAtendidosPorPaciente(selectedPacienteId);
 
  useEffect(() => {
    if (pacienteIdParam) setSelectedPacienteId(Number(pacienteIdParam));
  }, [pacienteIdParam]);

  useEffect(() => {
    async function fetchPaciente(id: number) {
      setLoadingPaciente(true);
      try {
        const res = await axios.get(`/api/pacientes/${id}/`);
        setPaciente(res.data);
      } catch (err) {
        // Si falla la petición, no hay fallback local: dejar null
        setPaciente(null);
      } finally {
        setLoadingPaciente(false);
      }
    }

    if (selectedPacienteId) {
      fetchPaciente(selectedPacienteId);
    } else {
      setPaciente(null);
    }
  }, [selectedPacienteId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-4 flex items-center gap-3">
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-blue-700"
            >
              Historia Clínica
            </motion.h1>
            <RoleHomeButton className="static flex items-center rounded-md border border-transparent bg-transparent px-3 py-2 text-blue-500 hover:bg-blue-50/40" />
          </div>
          {!selectedPacienteId ? (
            <div className="py-8 text-gray-500">
              No se recibió un <strong>pacienteId</strong> en la ruta. Verifica que la URL sea{' '}
              <code>/pacientes/&lt;id&gt;/historia</code>.
            </div>
          ) : (
            <>
              <HistoriaClinicaDetails
                selectedPacienteId={selectedPacienteId}
                paciente={paciente}
                loadingPaciente={loadingPaciente}
                ovocitos={ovocitos}
                loadingOvocitos={loadingOvocitos}
                embriones={embriones}
                loadingEmbriones={loadingEmbriones}
                fertilizaciones={fertilizaciones}
                
                loadingFert={loadingFert}
                monitoreos={monitoreos}
                loadingMonitoreos={loadingMonitoreos}
                userType={userType}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
