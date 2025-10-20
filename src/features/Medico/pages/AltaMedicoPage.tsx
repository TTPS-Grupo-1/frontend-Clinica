import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import FormularioMedico from "../components/FormularioMedico";
import type { Medico } from "../../../types/Medico";

export default function AltaMedicoPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: Partial<Medico>) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:8000/api/medicos/",
                data
            );
            console.log("Médico registrado:", response);
            if (response.status === 201 || response.status === 200) {
                toast.success("Médico registrado exitosamente");
                setTimeout(() => {
                    navigate("/medicos/listado");
                }, 1000);
            }
        } catch (error: any) {
            console.error("Error al registrar médico:", error);
            const errorMessage = error.response?.data?.message || 
                               error.response?.data?.errors?.password?.[0] ||
                               "Error al registrar el médico";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/medicos/listado");
    };

    return (
        <main className="pt-28 flex flex-col items-center min-h-screen">
            <Toaster position="top-center" />
            <div className="w-full max-w-6xl px-6">
                <FormularioMedico 
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isEdit={false}
                />
                {loading && (
                    <div className="mt-4 text-center text-gray-600">
                        Registrando médico...
                    </div>
                )}
            </div>
        </main>
    );
}