import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import MedicoList from "../components/MedicoList";
import type { Medico } from "../../../types/Medico";

export default function ListadoMedicosPage() {
    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/medicos/");
                // Filtrar solo los médicos no eliminados
                const medicosActivos = response.data.filter((m: Medico) => !m.eliminado);
                setMedicos(medicosActivos);
            } catch (error) {
                console.error("Error al cargar médicos:", error);
                toast.error("Error al cargar la lista de médicos");
            } finally {
                setLoading(false);
            }
        };

        fetchMedicos();
    }, []);

    // 🔴 HARDCODEADO: Simula médicos con turnos/tratamientos activos
    // TODO: En el futuro, esta validación vendrá del backend
    const medicosConActividad = [
        12345678, // DNI de ejemplo con turnos
        87654321, // DNI de ejemplo con tratamientos
        1241241  // DNI de ejemplo con ambos
    ];

    const verificarSiPuedeEliminar = (medico: Medico): { puedeEliminar: boolean; razon?: string } => {
        // 🔴 HARDCODEADO: Verifica si el médico tiene actividad
        if (medicosConActividad.includes(medico.dni)) {
            return {
                puedeEliminar: false,
                razon: "El médico tiene turnos asignados o tratamientos activos con pacientes"
            };
        }

        return { puedeEliminar: true };
    };

    const handleEliminar = async (medico: Medico) => {
        // Verificar si puede eliminar (lógica hardcodeada)
        const { puedeEliminar, razon } = verificarSiPuedeEliminar(medico);
        
        if (!puedeEliminar) {
            toast.error(razon || "No se puede eliminar el médico");
            return;
        }

      

        try {
            console.log("🗑️ Eliminando médico con DNI:", medico.dni);
            
            // Realizar soft delete (actualizar eliminado = true)
            await axios.patch(`http://localhost:8000/api/medicos/${medico.dni}/`, {
                eliminado: true
            });

            // Actualizar el estado local
            setMedicos((prev) => prev.filter((m) => m.dni !== medico.dni));
            
            toast.success("Médico eliminado correctamente");
            console.log("✅ Médico eliminado exitosamente");
        } catch (error: any) {
            console.error("❌ Error al eliminar médico:", error);
            console.error("Detalles:", error.response?.data);
            
            const errorMessage = error.response?.data?.message || 
                               "Error al eliminar el médico";
            toast.error(errorMessage);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen pt-20 pb-8 bg-gradient-to-br from-blue-50 to-indigo-100`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="text-xl">Cargando médicos...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-20 pb-8 bg-gradient-to-br from-blue-50 to-indigo-100`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <Toaster position="top-center" />
                    <h1 className="text-2xl font-bold text-black mb-4">Listado de Médicos</h1>
                    {medicos.length === 0 ? (
                        <p className="text-gray-500">No hay médicos registrados</p>
                    ) : (
                        <MedicoList
                            medicos={medicos}
                            onEliminar={handleEliminar}
                            canEliminar={(m) => verificarSiPuedeEliminar(m).puedeEliminar}
                            razonNoEliminar={(m) => verificarSiPuedeEliminar(m).razon}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}