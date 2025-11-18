import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useOvocitosFetch } from '../../../shared/hooks/useOvocitosFetch';
import { useEmbryoFetch } from '../../../shared/hooks/useEmbryoFetch';
import { useFertilizacionesFetch } from '../../../shared/hooks/useFertilizacionesFetch';
import HistoriaClinicaDetails from '../components/History/HistoriaClinicaDetails';


export default function HistoriaClinicaPage() {
  const { pacienteId: pacienteIdParam } = useParams<{ pacienteId?: string }>();
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(pacienteIdParam ? Number(pacienteIdParam) : null);
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
    <div className="min-h-screen pt-20 pb-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-blue-700 mb-4">
            Historia Clínica
          </motion.h1>

          { !selectedPacienteId ? (
            <div className="py-8 text-gray-500">No se recibió un <strong>pacienteId</strong> en la ruta. Verifica que la URL sea <code>/pacientes/&lt;id&gt;/historia</code>.</div>
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
                userType={userType}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
