import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { usePacientesFiltrados } from '../../../shared/hooks/usePacientesFiltrados';
import PacienteSelector from '../../Transferencia/components/PacienteSelector';
import FertilizacionModal from '../components/FertilizacionModal';
import RoleHomeButton from '../../../shared/components/RoleHomeButton';
import { usePacientesFetch } from '../../../shared/hooks/usePacientesFetch';
import { useFertilizacionesFetch } from '../../../shared/hooks/useFertilizacionesFetch';
import FertilizacionesTable from '../components/Fertilizaciones';
import { AnimatePresence, motion } from 'framer-motion';
import FertilizacionesTableSkeleton from '../components/FertilizacionesTableSkeleton';
import { Suspense } from 'react';

export default function FertilizacionPage() {
  const { pacientes, loading: loadingPacientes } = usePacientesFetch();
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(null);
  const { filteredPacientes, loading: filterLoading } = usePacientesFiltrados(pacientes, 'Monitoreos finalizados');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fertilizaciones, loading } = useFertilizacionesFetch(selectedPacienteId);

  // Obtener usuario actual desde el store persistido (localStorage)
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const effectivePacientes = filteredPacientes !== null ? filteredPacientes : pacientes;
  const selectedPaciente = (effectivePacientes || []).find((p) => p.id === selectedPacienteId) ?? null;
  const selectedPacienteNombre = selectedPaciente
    ? `${selectedPaciente.last_name}, ${selectedPaciente.first_name}`
    : null;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 pt-24 pb-10">
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-2xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-300 opacity-30 blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-4xl rounded-lg bg-white px-6 py-8 shadow">
        <div className="mb-6">
          <div className="mb-4 flex items-start justify-between">
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
            className="flex flex-col items-center justify-center gap-2 sm:flex-row"
          >
            <PacienteSelector
              pacientes={effectivePacientes || []}
              selectedPaciente={selectedPacienteId}
              onPacienteChange={(id) => setSelectedPacienteId(id)}
              isLoading={loadingPacientes || filterLoading}
            />
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
            className="mt-8 self-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-blue-600 hover:to-blue-800"
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
