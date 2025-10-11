import { useEffect, useState } from "react";
import axios from "axios";
import type { Paciente } from "../../../types/Paciente";
import type { OvocitoModalRow } from "../../../types/Ovocito";
import Pagination from "../../../components/Pagination";
import OvocitosTableSkeleton from "../../../components/OvocitosTableSkeleton";
import OvocitosTable from "../../../components/OvocitosTable";
import PuncionModal from "../components/PuncionModal";



const ITEMS_PER_PAGE = 6;

export default function HomePuncion() {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [loadingPacientes, setLoadingPacientes] = useState(true);
    const [ovocitos, setOvocitos] = useState<OvocitoModalRow[]>([]);
    const [loadingOvocitos, setLoadingOvocitos] = useState(false);
    const [errorOvocitos, setErrorOvocitos] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    // Form data para los campos principales
    const [formData, setFormData] = useState({
        selectedPacienteId: null as number | null,
        quirófano: "",
        fecha: "",
    });

    // Fetch pacientes al montar
    useEffect(() => {
        setLoadingPacientes(true);
        axios.get("/api/pacientes/")
            .then(({ data }) => {
                setPacientes(Array.isArray(data) ? data : (data.results ?? []));
            })
            .catch(() => setPacientes([]))
            .finally(() => setLoadingPacientes(false));
    }, []);

    // Fetch ovocitos al seleccionar paciente
    useEffect(() => {
        if (!formData.selectedPacienteId) return;
        setLoadingOvocitos(true);
        setErrorOvocitos(null);
        axios.get(`/api/ovocitos/?paciente=${formData.selectedPacienteId}`)
            .then(({ data }) => {
                const items = Array.isArray(data) ? data : (data.results ?? []);
                setOvocitos(items.map((o: any) => ({
                    identificador: o.identificador,
                    estado: (o.estado || "").replace(/_/g, " "),
                    cripreservar: !!o.cripreservar,
                    descartado: !!o.descartado,
                })));
                setCurrentPage(1);
            })
            .catch((err) => {
                setErrorOvocitos(err?.response?.data?.detail || err?.message || "Error al cargar ovocitos");
                setOvocitos([]);
            })
            .finally(() => setLoadingOvocitos(false));
    }, [formData.selectedPacienteId]);

    // Paginación
    const totalPages = Math.ceil(ovocitos.length / ITEMS_PER_PAGE);
    const paginatedOvocitos = ovocitos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const selectedPaciente = pacientes.find(p => p.id === formData.selectedPacienteId);

    return (
        <main className="w-full max-w-4xl mx-auto mt-16 md:mt-22 px-4 sm:px-6 py-6 mb-10 min-h-screen flex flex-col rounded-lg shadow" style={{ background: "linear-gradient(135deg, #ffe4ec 0%, #f8bbd0 100%)" }}>
            <h1 className="text-xl sm:text-2xl font-bold text-pink-700 mb-4 text-center drop-shadow">Página de Punciones</h1>
            <section className="mb-6">
                <label className="block mb-2 text-pink-800 font-medium" htmlFor="paciente-select">Seleccionar paciente</label>
                {loadingPacientes ? (
                    <div className="h-10 w-full bg-pink-100 animate-pulse rounded" />
                ) : (
                    <select
                        id="paciente-select"
                        value={formData.selectedPacienteId ?? ""}
                        onChange={e => setFormData(fd => ({ ...fd, selectedPacienteId: Number(e.target.value) }))}
                        className="border border-pink-300 text-pink-900 rounded px-3 py-2 w-full bg-white focus:ring-2 focus:ring-pink-300"
                    >
                        <option value="">-- Selecciona un paciente --</option>
                        {pacientes.map(p => (
                            <option key={p.id} value={p.id}>{p.apellido}, {p.nombre}</option>
                        ))}
                    </select>
                )}
            </section>
            {formData.selectedPacienteId && (
                <>
                    <section className="mb-4 flex justify-between items-center">
                        <h2 className="text-lg text-pink-800 font-semibold">Ovocitos de {selectedPaciente?.nombre} {selectedPaciente?.apellido}</h2>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="px-4 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600 transition"
                        >
                            Registrar punción
                        </button>
                    </section>
                    <section className="overflow-x-auto rounded-lg shadow min-h-[220px] bg-white/80">
                        {loadingOvocitos ? (
                            <OvocitosTableSkeleton rows={ITEMS_PER_PAGE} />
                        ) : errorOvocitos ? (
                            <div className="p-4 text-red-700">{errorOvocitos}</div>
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
                    </section>
                    <PuncionModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        quirófano={formData.quirófano}
                        fecha={formData.fecha}
                        paciente={selectedPaciente}
                        ovocitos={[]}
                        onAddOvocito={() => {}}
                        setFormData={setFormData}
                        formData={formData}
                    />
                </>
            )}
        </main>
    );
}