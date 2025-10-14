import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import FormularioMedico from "../components/FormularioMedico";
import type { Medico } from "../../../types/Medico";

export default function EditMedicoPage() {
    const navigate = useNavigate();
    const { dni } = useParams<{ dni: string }>();
    const [medico, setMedico] = useState<Medico | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedico = async () => {
            try {
                
                
                // Llamar directamente al endpoint con el DNI
                const response = await axios.get(`http://localhost:8000/api/medicos/${dni}/`);            
                setMedico(response.data);
            } catch (error: any) {
                toast.error("Error al cargar los datos del médico");
                setMedico(null);
            } finally {
                setLoading(false);
            }
        };

        if (dni) {
            fetchMedico();
        } else {
            console.error("❌ No se proporcionó DNI en la URL");
            setLoading(false);
        }
    }, [dni]);

    const handleSubmit = async (data: Partial<Medico>) => {
        try {
            console.log("📤 Enviando actualización:", data);
            
            const response = await axios.put(
                `http://localhost:8000/api/medicos/${dni}/`,
                data
            );
            
            toast.success("Médico actualizado exitosamente");
            
            setTimeout(() => {
                navigate("/medicos/listado");
            }, 2000);
        } catch (error: any) {
        
            const errorMessage = error.response?.data?.message || 
                               "Error al actualizar el médico";
            toast.error(errorMessage);
        }
    };

    const handleCancel = () => {
        navigate("/medicos/listado");
    };

    if (loading) {
        return (
            <main className="pt-28 flex flex-col items-center min-h-screen">
                <div className="text-xl">Cargando datos del médico...</div>
                <div className="text-sm text-gray-500 mt-2">DNI: {dni}</div>
            </main>
        );
    }

    if (!medico) {
        return (
            <main className="pt-28 flex flex-col items-center min-h-screen">
                <div className="text-xl text-red-500">No se encontró el médico</div>
                <div className="text-sm text-gray-500 mt-2">DNI buscado: {dni}</div>
                <button 
                    onClick={() => navigate("/medicos/listado")}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Volver al listado
                </button>
            </main>
        );
    }

    return (
        <main className="pt-28 flex flex-col items-center min-h-screen">
            <Toaster position="top-center" />
            <div className="w-full max-w-6xl px-6">
                <FormularioMedico 
                    medico={medico}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isEdit={true}
                />
            </div>
        </main>
    );
}
