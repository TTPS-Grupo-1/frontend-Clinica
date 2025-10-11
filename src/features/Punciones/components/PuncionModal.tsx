import { useState } from "react";
import axios from "axios";
import OvocitoModal from "./OvocitoModal";
import type { Paciente } from "../../../types/Paciente";
import type { OvocitoModalRow } from "../../../types/Ovocito";


export default function PuncionModal({
    isOpen,
    onClose,
    paciente,
    ovocitos: ovocitosInitial = [],
    onAddOvocito,
    formData,
    setFormData,
    }: {
        isOpen: boolean;
        onClose: () => void;
        paciente?: Paciente;
        ovocitos?: OvocitoModalRow[];
        onAddOvocito?: (nuevo: OvocitoModalRow) => void;
        formData: {
            quirófano: string;
            fecha: string;
            selectedPacienteId: number | null;
        };
        setFormData: React.Dispatch<React.SetStateAction<{
            quirófano: string;
            fecha: string;
            selectedPacienteId: number | null;
        }>>;
    }) {
        const [ovocitos, setOvocitos] = useState<OvocitoModalRow[]>(ovocitosInitial);


    // Estado para mostrar el modal de ovocito
    const [ovocitoModalOpen, setOvocitoModalOpen] = useState(false);


        const [submitting, setSubmitting] = useState(false);
        const [error, setError] = useState<string | null>(null);

        if (!isOpen) return null;

    // Recibe el ovocito creado desde el OvocitoModal
    const handleAddOvocito = (nuevo: OvocitoModalRow) => {
        setOvocitos([...ovocitos, nuevo]);
        onAddOvocito?.(nuevo);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            if (!paciente) throw new Error("Paciente no seleccionado");
            if (!formData.quirófano || !formData.fecha) throw new Error("Completa quirófano y fecha");
            if (ovocitos.length === 0) throw new Error("Agrega al menos un ovocito");

            // Payload ejemplo, ajusta según tu backend
            const payload = {
                quirófano: formData.quirófano,
                fecha: formData.fecha,
                paciente: paciente.id,
                ovocitos: ovocitos.map(o => ({
                    identificador: o.identificador,
                    estado: o.estado.replace(/\s/g, "_"),
                    cripreservar: o.cripreservar,
                    descartado: o.descartado,
                }))
            };
            await axios.post("/api/punciones/", payload);
            onClose();
        } catch (err: any) {
            setError(err?.response?.data?.detail || err?.message || "Error al registrar punción");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
            <article className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                <h2 className="text-xl text-black font-bold mb-4 text-center">Registrar Punción</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                    <div className="text-red-600 text-sm mb-2" role="alert">{error}</div>
                )}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">Quirófano</label>
                        <input
                            type="text"
                            value={formData.quirófano}
                            onChange={e => setFormData(fd => ({ ...fd, quirófano: e.target.value }))}
                            className="w-full border rounded text-black px-2 py-1"
                            placeholder="Ej: Q1"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">Fecha</label>
                        <input
                            type="date"
                            value={formData.fecha}
                            onChange={e => setFormData(fd => ({ ...fd, fecha: e.target.value }))}
                            className="w-full border rounded text-black px-2 py-1"
                        />
                    </div>
                </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Paciente</label>
                        <input
                            type="text"
                            value={paciente ? `${paciente.apellido}, ${paciente.nombre}` : ""}
                            readOnly
                            className="w-full border rounded text-black px-2 py-1 bg-gray-100"
                        />
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Ovocitos agregados</h3>
                        <button
                            type="button"
                            onClick={() => setOvocitoModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-2"
                        >
                            Agregar ovocito
                        </button>
                        <OvocitoModal
                            open={ovocitoModalOpen}
                            onClose={() => setOvocitoModalOpen(false)}
                            onAdd={handleAddOvocito}
                            nombreDonante={paciente?.nombre || ""}
                            apellidoDonante={paciente?.apellido || ""}
                        />
                        <div className="mt-2">
                            <table className="min-w-full border rounded-lg overflow-hidden bg-gray-100">
                                <thead className="bg-blue-300">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Identificador</th>
                                        <th className="px-4 py-2 text-left">Estado</th>
                                        <th className="px-4 py-2 text-left">Cripreservado</th>
                                        <th className="px-4 py-2 text-left">Descartado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ovocitos.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="text-center py-4 text-gray-500">No hay ovocitos agregados.</td>
                                        </tr>
                                    ) : (
                                        ovocitos.map((o, idx) => (
                                            <tr key={o.identificador} className="border-b text-black">
                                                <td className="px-4 py-2">{o.identificador}</td>
                                                <td className="px-4 py-2">{o.estado}</td>
                                                <td className="px-4 py-2 text-center">{o.cripreservar ? "Sí" : "No"}</td>
                                                <td className="px-4 py-2 text-center">{o.descartado ? "Sí" : "No"}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? "Registrando..." : "Registrar punción"}
                                    </button>
                    </div>
                </form>
            </article>
        </section>
    );
}