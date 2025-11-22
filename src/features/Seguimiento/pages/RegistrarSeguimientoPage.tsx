import React, { useState } from 'react';
import SeguimientoForm, { type SeguimientoData } from '../components/SeguimientoComponente';
import { toast, Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const API_URL = "http://127.0.0.1:8000/api/seguimiento/registrar/";

export default function RegistrarSeguimientoPage() {
    const { pacienteId } = useParams<{ pacienteId: string }>();

    // 💡 Usamos el ID del paciente directamente (sin buscar el ID del tratamiento)
    const idPaciente = parseInt(pacienteId || '0'); 
    
    // Simplificamos los estados de carga
    const [loading, setLoading] = useState(false);

    // ❌ ELIMINAMOS EL useEffect y los estados de búsqueda de tratamiento

    const handleSaveSeguimiento = async (data: SeguimientoData) => {
        // Validación: Solo necesitamos verificar que el ID del paciente sea válido.
        if (idPaciente === 0) {
            toast.error("Error: ID de paciente inválido en la URL.");
            return;
        }
        
        setLoading(true);

        try {
            // ✅ AÑADIR EL ID DEL PACIENTE AL OBJETO ANTES DE ENVIAR
            const dataToSend = {
                ...data,
                paciente_id: idPaciente, // 👈 Nuevo campo que el backend esperará
            };

            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Fallo el registro de seguimiento.");
            }

            toast.success("Seguimiento registrado exitosamente.");

        } catch (err) {
            console.error("Error al registrar seguimiento:", err);
            toast.error("Error al guardar el seguimiento.");
        } finally {
            setLoading(false);
        }
    };

    // --- Renderizado ---
    
    // 💡 Renderizamos el formulario inmediatamente si tenemos un ID de paciente
    const showForm = idPaciente !== 0;

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center pt-[80px]">
            <Toaster position="top-center" />
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Registrar Seguimiento de Tratamiento</h1>
            
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                {showForm ? (
                    <SeguimientoForm
                        // Ya no pasamos tratamientoId, el formulario debe ser ajustado
                        onSave={handleSaveSeguimiento}
                        loading={loading}
                    />
                ) : (
                    <p className="text-red-500 text-center">
                        No se encontró un ID de paciente válido.
                    </p>
                )}
            </div>
        </div>
    );
}