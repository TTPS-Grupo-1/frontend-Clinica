import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePacientesPorEstado } from '../../../shared/hooks/usePacientesPorEstado';
import { motion } from 'framer-motion';
import { useOvocitosFetch } from '../../../shared/hooks/useOvocitosFetch';
import Pagination from '../../../components/Pagination';
import OvocitosTableSkeleton from '../../../components/OvocitosTableSkeleton';
import OvocitosTableSimple from '../components/OvocitosTableSimple';
import PuncionModal from '../components/PuncionModal';

const ITEMS_PER_PAGE = 6;

export default function HomePuncion() {
  const navigate = useNavigate();
  const { pacientes, loading: loadingPacientes } = usePacientesPorEstado([
    'Monitoreos finalizados',
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    selectedPacienteId: null as number | null,
    quirofano: '',
    fecha: '',
  });
  const {
    ovocitos,
    loading: loadingOvocitos,
    error: errorOvocitos,
  } = useOvocitosFetch(formData.selectedPacienteId);

  // Paginación
  const totalPages = Math.ceil(ovocitos.length / ITEMS_PER_PAGE);
  const paginatedOvocitos = ovocitos
    .filter((o) => o && o.identificador)
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const selectedPaciente = pacientes.find((p) => p.id === formData.selectedPacienteId);

  // Filtering handled by `usePacientesFiltrados` hook

  return (
    <div className={`min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 pt-20 pb-8`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <motion.h1
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-2xl font-bold tracking-tight text-pink-700 drop-shadow-lg sm:text-3xl"
            >
              Punciones
            </motion.h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/operador/gestion-ovocitos')}
                className="rounded border border-rose-300 px-3 py-2 text-rose-700 hover:bg-rose-50"
              >
                Volver a Gestión de Ovocitos
              </button>
            </div>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-6"
          >
            <label className="mb-2 block font-medium text-pink-800" htmlFor="paciente-select">
              Seleccionar paciente
            </label>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              {loadingPacientes ? (
                <div className="h-10 w-full animate-pulse rounded bg-pink-100" />
              ) : pacientes.length === 0 ? (
                <div className="w-full rounded border border-pink-300 bg-white px-3 py-2 text-center text-pink-700 sm:w-80">
                  No hay pacientes que cumplen los requisitos para realizar una punción.
                </div>
              ) : (
                <select
                  id="paciente-select"
                  value={formData.selectedPacienteId ?? ''}
                  onChange={(e) =>
                    setFormData((fd) => ({ ...fd, selectedPacienteId: Number(e.target.value) }))
                  }
                  className="w-full rounded border border-pink-300 bg-white px-3 py-2 text-pink-900 shadow-sm focus:ring-2 focus:ring-pink-300 sm:w-80"
                >
                  <option value="">-- Selecciona un paciente --</option>
                  {pacientes.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.last_name}, {p.first_name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </motion.section>

          {formData.selectedPacienteId && (
            <>
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="mb-4 flex flex-col items-center justify-between gap-2 sm:flex-row"
              >
                <h2 className="text-center text-lg font-semibold text-pink-800 sm:text-left sm:text-xl">
                  Ovocitos de{' '}
                  <span className="font-bold">
                    {selectedPaciente?.last_name} {selectedPaciente?.first_name}
                  </span>
                </h2>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setModalOpen(true)}
                  className="rounded bg-gradient-to-r from-pink-500 to-pink-700 px-4 py-2 text-white shadow transition-all duration-150 hover:from-pink-600 hover:to-pink-800 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                >
                  <span className="hidden sm:inline">Registrar punción</span>
                  <span className="sm:hidden">+</span>
                </motion.button>
              </motion.section>

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="overflow-x-auto rounded-lg bg-white/80 shadow"
              >
                {loadingOvocitos ? (
                  <OvocitosTableSkeleton rows={ITEMS_PER_PAGE} />
                ) : errorOvocitos ? (
                  <div className="animate-pulse p-4 text-red-700">{errorOvocitos}</div>
                ) : (
                  <>
                    <OvocitosTableSimple ovocitos={paginatedOvocitos} />
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      itemsPerPage={ITEMS_PER_PAGE}
                      totalItems={ovocitos.length}
                    />
                  </>
                )}
              </motion.section>
              <PuncionModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                paciente={selectedPaciente}
                ovocitos={[]}
                onAddOvocito={() => {}}
                setFormData={setFormData}
                formData={formData}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
