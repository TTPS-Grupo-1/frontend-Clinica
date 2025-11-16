import { useState } from "react";
import axios from "axios";
import OvocitoModal from "./OvocitoModal";
import OvocitosTable from "./OvocitosTable";
import AgregarOvocitoButton from "./AgregarOvocitoButton";
import PuncionForm from "./PuncionForm";
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
            quirofano: string;
            fecha: string;
            selectedPacienteId: number | null;
        };
        setFormData: React.Dispatch<React.SetStateAction<{
            quirofano: string;
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
            if (!formData.quirofano || !formData.fecha) throw new Error("Completa quirófano y fecha");
            if (ovocitos.length === 0) throw new Error("Agrega al menos un ovocito");

            // Payload ejemplo, ajusta según tu backend
            const payload = {
                quirofano: formData.quirofano,
                fecha: formData.fecha,
                paciente: paciente.id,
                ovocitos: ovocitos.map(o => ({
                    identificador: o.identificador,
                    madurez: o.madurez.replace(/\s/g, "_"),
                    tipo_estado: o.tipo_estado,
                    paciente: paciente.id,
                }))
            };
            await axios.post("/api/punciones/", payload);

            console.log("Punción registrada:", payload);
            onClose();
            window.location.reload();
            alert("Punción y asignación de ovocitos registrada correctamente");
        } catch (err: any) {
            setError(err?.response?.data?.detail || err?.message || "Error al registrar punción");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm transition-all duration-200">
            <article className="bg-white rounded-xl shadow-2xl p-4 sm:p-8 w-full max-w-lg sm:max-w-2xl animate-fade-in">
                <h2 className="text-2xl text-pink-700 font-bold mb-6 text-center tracking-tight">Registrar Punción</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && (
                        <div className="text-red-600 text-sm mb-2 animate-pulse" role="alert">{error}</div>
                    )}
                    <PuncionForm formData={formData} setFormData={setFormData} paciente={paciente} />
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2 text-pink-700">Ovocitos agregados</h3>
                        <AgregarOvocitoButton onClick={() => setOvocitoModalOpen(true)} />
                        <OvocitoModal
                            open={ovocitoModalOpen}
                            onClose={() => setOvocitoModalOpen(false)}
                            onAdd={handleAddOvocito}
                            nombreDonante={paciente?.first_name || ""}
                            apellidoDonante={paciente?.last_name || ""}
                        />
                        <OvocitosTable ovocitos={ovocitos} />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-pink-300 rounded text-gray-700 hover:bg-gray-100 transition-all duration-150"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150"
                        >
                            {submitting ? "Registrando..." : "Registrar punción"}
                        </button>
                    </div>
                </form>
            </article>
        </section>
    );
}