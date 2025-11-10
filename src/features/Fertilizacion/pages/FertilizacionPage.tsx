import { useState } from "react";
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import FertilizacionModal from "../components/FertilizacionModal";
import RoleHomeButton from '../../../shared/components/RoleHomeButton';
import { usePacientesFetch } from "../../../shared/hooks/usePacientesFetch";
import { useFertilizacionesFetch } from "../../../shared/hooks/useFertilizacionesFetch";
import FertilizacionesTable from "../components/Fertilizaciones";
import { AnimatePresence, motion } from "framer-motion";
import FertilizacionesTableSkeleton from "../components/FertilizacionesTableSkeleton";
import { Suspense } from "react";

export default function FertilizacionPage() {
  const { pacientes } = usePacientesFetch();
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fertilizaciones, loading } = useFertilizacionesFetch(selectedPacienteId);

  // Obtener usuario actual desde el store persistido (localStorage)
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const selectedPaciente = pacientes.find(p => p.id === selectedPacienteId) ?? null;
  const selectedPacienteNombre = selectedPaciente ? `${selectedPaciente.last_name}, ${selectedPaciente.first_name}` : null;

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 pt-24 pb-10 px-4 overflow-x-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-2xl" />
      </div>

      <div className="max-w-4xl w-full bg-white rounded-lg shadow px-6 py-8 z-10 relative">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              {/* Place the RoleHomeButton as part of the header: override internal absolute with !static */}
              <RoleHomeButton className="!static mr-4" />
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-blue-700 drop-shadow-lg"
              >
                Gestión de Fertilizaciones y Embriones
              </motion.h1>
            </div>
            {/* right-side controls could go here in future */}
            <div />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-2 items-center justify-center"
          >
          <label className="block text-sm font-medium text-gray-700">Seleccionar paciente</label>
          <select
            value={selectedPacienteId ?? ""}
            onChange={e => setSelectedPacienteId(e.target.value ? Number(e.target.value) : null)}
            className="border border-gray-300 rounded px-3 py-2 w-full sm:w-80 bg-white focus:ring-2 text-black focus:ring-blue-300 shadow-sm"
          >
            <option value="">-- Selecciona un paciente --</option>
            {pacientes.map(p => (
              <option key={p.id} value={p.id}>{p.last_name}, {p.first_name}</option>
            ))}
          </select>
        </motion.div>

        </div>
        <Suspense fallback={<FertilizacionesTableSkeleton />}>
          <AnimatePresence>
            {loading ? (
              <FertilizacionesTableSkeleton />
            ) : (
              selectedPacienteId && (
                <motion.div
                  key="fertilizaciones"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full"
                >
                  <FertilizacionesTable fertilizaciones={fertilizaciones} />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </Suspense>
        {selectedPacienteId && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-lg hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all font-semibold self-center"
            onClick={() => setIsModalOpen(true)}
          >
            Registrar nueva fertilización
          </motion.button>
        )}
        <FertilizacionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedPacienteId={selectedPacienteId}
          selectedPacienteNombre={selectedPacienteNombre}
          currentUserId={currentUser?.id ?? null} // sólo pasamos el id del usuario
        />
      </div>
    </div>
  );
}
