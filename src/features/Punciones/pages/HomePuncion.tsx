import { useState } from "react";
import { motion } from 'framer-motion';
import { usePacientesFetch } from "../../../shared/hooks/usePacientesFetch";
import { useOvocitosFetch } from "../../../shared/hooks/useOvocitosFetch";;
import Pagination from "../../../components/Pagination";
import OvocitosTableSkeleton from "../../../components/OvocitosTableSkeleton";
import OvocitosTable from "../../../components/OvocitosTable";
import PuncionModal from "../components/PuncionModal";


const ITEMS_PER_PAGE = 6;

export default function HomePuncion() {
    const { pacientes, loading: loadingPacientes } = usePacientesFetch();
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        selectedPacienteId: null as number | null,
        quirofano: "",
        fecha: "",
    });
    const { ovocitos, loading: loadingOvocitos, error: errorOvocitos } = useOvocitosFetch(formData.selectedPacienteId);


    // Paginación
    const totalPages = Math.ceil(ovocitos.length / ITEMS_PER_PAGE);
        const paginatedOvocitos = ovocitos
            .filter(o => o && o.identificador)
            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const selectedPaciente = pacientes.find(p => p.id === formData.selectedPacienteId);

    return (
        <div className={`min-h-screen pt-20 pb-8 bg-gradient-to-br from-pink-50 to-rose-100`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="text-2xl sm:text-3xl font-bold text-pink-700 mb-6 text-center drop-shadow-lg tracking-tight"
                    >
                        Punciones
                    </motion.h1>

                    <motion.section
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="mb-6"
                    >
                        <label className="block mb-2 text-pink-800 font-medium" htmlFor="paciente-select">Seleccionar paciente</label>
                        <div className="flex flex-col sm:flex-row gap-2 items-center">
                            {loadingPacientes ? (
                                <div className="h-10 w-full bg-pink-100 animate-pulse rounded" />
                            ) : (
                                <select
                                    id="paciente-select"
                                    value={formData.selectedPacienteId ?? ""}
                                    onChange={e => setFormData(fd => ({ ...fd, selectedPacienteId: Number(e.target.value) }))}
                                    className="border border-pink-300 text-pink-900 rounded px-3 py-2 w-full sm:w-80 bg-white focus:ring-2 focus:ring-pink-300 shadow-sm"
                                >
                                    <option value="">-- Selecciona un paciente --</option>
                                    {pacientes.map(p => (
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
                                className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-2"
                            >
                                <h2 className="text-lg sm:text-xl text-pink-800 font-semibold text-center sm:text-left">Ovocitos de <span className="font-bold">{selectedPaciente?.last_name} {selectedPaciente?.first_name}</span></h2>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setModalOpen(true)}
                                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded shadow hover:from-pink-600 hover:to-pink-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                >
                                    <span className="hidden sm:inline">Registrar punción</span>
                                    <span className="sm:hidden">+</span>
                                </motion.button>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.45, delay: 0.08 }}
                                className="overflow-x-auto rounded-lg shadow bg-white/80"
                            >
                                {loadingOvocitos ? (
                                    <OvocitosTableSkeleton rows={ITEMS_PER_PAGE} />
                                ) : errorOvocitos ? (
                                    <div className="p-4 text-red-700 animate-pulse">{errorOvocitos}</div>
                                ) : (
                                    <>
                                        <OvocitosTable ovocitos={paginatedOvocitos} />
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