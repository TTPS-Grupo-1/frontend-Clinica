import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePacientesFetch } from '../../../shared/hooks/usePacientesFetch';
import { useOvocitosFetch } from '../../../shared/hooks/useOvocitosFetch';
import { useEmbryoFetch } from '../../../shared/hooks/useEmbryoFetch';
import { useFertilizacionesFetch } from '../../../shared/hooks/useFertilizacionesFetch';
import HistoriaClinicaDetails from '../components/HistoriaClinicaDetails';

export default function HistoriaClinicaPage() {
  const { pacienteId: pacienteIdParam } = useParams<{ pacienteId?: string }>();
  const navigate = useNavigate();
  const { pacientes } = usePacientesFetch();
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(pacienteIdParam ? Number(pacienteIdParam) : null);
  const [paciente, setPaciente] = useState<any | null>(null);
  const [loadingPaciente, setLoadingPaciente] = useState(false);
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
        // fallback: try to find it in pacientes list
        const found = pacientes.find(p => p.id === id);
        setPaciente(found ?? null);
      } finally {
        setLoadingPaciente(false);
      }
    }

    if (selectedPacienteId) {
      fetchPaciente(selectedPacienteId);
    } else {
      setPaciente(null);
    }
  }, [selectedPacienteId, pacientes]);

  return (
    <div className="min-h-screen pt-20 pb-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-blue-700 mb-4">
            Historia Clínica
          </motion.h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar paciente</label>
            <div className="flex gap-2 items-center">
              <select
                value={selectedPacienteId ?? ''}
                onChange={e => {
                  const id = e.target.value ? Number(e.target.value) : null;
                  setSelectedPacienteId(id);
                  if (id) navigate(`/pacientes/${id}/historia`);
                }}
                className="border border-gray-300 rounded text-black px-3 py-2 w-full sm:w-80 bg-white focus:ring-2 focus:ring-blue-200"
              >
                <option value="">-- Selecciona un paciente --</option>
                {pacientes.map(p => (
                  <option key={p.id} value={p.id}>{p.last_name}, {p.first_name} (ID: {p.id})</option>
                ))}
              </select>
            </div>
          </div>

          {!selectedPacienteId ? (
            <div className="py-8 text-gray-500">Selecciona un paciente para ver su historia clínica.</div>
          ) : (
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
            />
          )}
        </div>
      </div>
    </div>
  );
}
