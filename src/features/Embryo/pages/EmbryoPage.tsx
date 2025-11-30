import { useState } from 'react';
import { motion } from 'framer-motion';
import EmbryoList from '../components/EmbryoList';
import { useEmbryoFetch } from '../../../shared/hooks/useEmbryoFetch';
// import { usePacientesPorEstado } from '../../../shared/hooks/usePacientesPorEstado';
import type { Embryo as EmbryoType } from '../../../types/Embryo';
import { usePacientesFetch } from '@/shared/hooks/usePacientesFetch';
export default function EmbryoPage() {
  // Un solo fetch que trae directamente los pacientes filtrados
  // const { pacientes, loading: loadingPacientes, error } = usePacientesPorEstado(['Fertilización', 'Punción', 'Transferencia', 'Finalizado']);
  const { pacientes, loading: loadingPacientes, error } = usePacientesFetch();
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(null);
  const { embriones } = useEmbryoFetch(selectedPacienteId);
  return (
    <div className={`min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 pt-20 pb-8`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col rounded-2xl bg-white p-8 shadow-xl">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 text-center text-xl font-bold text-rose-300 sm:text-2xl"
          >
            Gestión de Embriones
          </motion.h1>

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
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:ring-2 focus:ring-blue-300 sm:w-80"
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
              <EmbryoList
                key={selectedPacienteId} // ✅ AGREGAR esta línea
                embryos={embriones as unknown as EmbryoType[]}
                selectedPacienteId={selectedPacienteId}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="py-8 text-center text-gray-500"
            >
              {error
                ? 'Error al filtrar pacientes'
                : loadingPacientes
                  ? 'Cargando pacientes disponibles...'
                  : 'Selecciona un paciente para ver los embriones'}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
