import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { usePacientesFetch } from '@/shared/hooks/usePacientesFetch';
import OvocitosNoUsadosTable from '../components/OvocitosNoUsadosTable';
import type { Ovocito } from '@/types/Ovocito';

export default function GestionOvoPage() {
  const navigate = useNavigate();
  const { pacientes, loading: loadingPacientes, error } = usePacientesFetch();
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(null);
  const [ovocitos, setOvocitos] = useState<Ovocito[]>([]);
  const [loadingOvocitos, setLoadingOvocitos] = useState(false);

  const fetchOvocitos = useCallback(async () => {
    if (!selectedPacienteId) {
      setOvocitos([]);
      return;
    }

    setLoadingOvocitos(true);
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Token ${token}` } : {};

      const response = await axios.get(
        `/api/ovocitos/por-paciente/${selectedPacienteId}/`,
        { headers }
      );
      setOvocitos(response.data.ovocitos || []);
    } catch (err) {
      console.error('Error fetching ovocitos:', err);
      setOvocitos([]);
    } finally {
      setLoadingOvocitos(false);
    }
  }, [selectedPacienteId]);

  useEffect(() => {
    fetchOvocitos();
  }, [fetchOvocitos]);

  const refetch = fetchOvocitos;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 pt-20 pb-8`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col rounded-2xl bg-white p-8 shadow-xl">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 text-center text-xl font-bold text-rose-400 sm:text-2xl"
          >
            Gestión de Ovocitos por paciente
          </motion.h1>

          <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => navigate('/operador/punciones')}
              className="rounded bg-rose-500 px-4 py-2 text-white shadow hover:bg-rose-600"
            >
              Registrar Punción
            </button>
            <button
              onClick={() => navigate('/operador')}
              className="rounded border border-rose-300 px-4 py-2 text-rose-600 hover:bg-rose-50"
            >
              Volver al Panel
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-4 flex flex-col items-center gap-2 sm:flex-row"
          >
            <label className="block text-sm font-medium text-gray-700">Seleccionar paciente</label>
            <select
              value={selectedPacienteId ?? ''}
              onChange={(e) => setSelectedPacienteId(Number(e.target.value))}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:ring-2 focus:ring-rose-300 sm:w-80"
            >
              <option className="text-black" value="">
                -- Selecciona un paciente --
              </option>
              {loadingPacientes && <option disabled>Cargando pacientes...</option>}
              {pacientes && pacientes.length === 0 && !loadingPacientes && (
                <option disabled>No hay pacientes elegibles</option>
              )}
              {pacientes?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.last_name}, {p.first_name}
                </option>
              ))}
            </select>
          </motion.div>

          {selectedPacienteId ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.06 }}
            >
              {loadingOvocitos ? (
                <div className="py-8 text-center text-gray-500">Cargando ovocitos...</div>
              ) : ovocitos.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No hay ovocitos no usados para este paciente
                </div>
              ) : (
                <div className="bg-white">
                  <OvocitosNoUsadosTable ovocitos={ovocitos} onUpdate={refetch} />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="py-8 text-center text-gray-500"
            >
              {error
                ? 'Error al cargar pacientes'
                : loadingPacientes
                  ? 'Cargando pacientes disponibles...'
                  : 'Selecciona un paciente para ver los ovocitos no usados'}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}