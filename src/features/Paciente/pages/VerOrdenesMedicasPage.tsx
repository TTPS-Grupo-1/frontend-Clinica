import OrdenCard from "../components/OrdenesMedicasComponente";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

// 💡 Interfaz para los datos que vienen del backend
interface OrdenAPI {
    id: number;
    fecha_creacion: string; // YYYY-MM-DD
    tipo_estudio: string;
    pdf_url: string; // URL para descargar el archivo
}

// Interfaz del estado de Redux (asumido)
interface UserState {
    auth: { user: { id: number; } | null; };
}


export default function OrdenesMedicas() {
    const [ordenes, setOrdenes] = useState<OrdenAPI[]>([]);
    const [loading, setLoading] = useState(true);
    
    const userId = useSelector((state: UserState) => state.auth.user?.id); // ID del paciente logueado
    
    // URL de la API de Django (debe ser creada para filtrar órdenes)
    const API_URL = "http://127.0.0.1:8000/api/mis_ordenes/"; 


    const fetchOrdenes = useCallback(async () => {
        if (!userId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            // Llama a la API de Django con el ID del usuario logueado
            const url = `${API_URL}?paciente_id=${userId}`; 
            
            const res = await fetch(url);
            if (!res.ok) throw new Error("Error al cargar las órdenes.");

            const data = await res.json();
            setOrdenes(data || []); 

        } catch (err) {
            console.error("Error cargando órdenes:", err);
            toast.error("No se pudieron cargar tus órdenes médicas.");
        } finally {
            setLoading(false);
        }
    }, [userId]);


    useEffect(() => {
        fetchOrdenes();
    }, [fetchOrdenes]);
    
    // 💡 Lógica para descargar: Redirige al PDF
    const handleDescargar = (pdfUrl: string) => {
        if (pdfUrl) {
            // Abre el archivo en una nueva pestaña
            window.open(pdfUrl, '_blank');
        } else {
            toast.error("URL del archivo no disponible.");
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-blue-700">Cargando órdenes médicas...</div>;
    }

    // --- Mapeo y Renderizado ---
    
    // ⚠️ Mapeo de OrdenAPI a la interfaz que OrdenCard espera
    const ordenesParaCard = ordenes.map(orden => ({
        id: orden.id,
        fecha: new Date(orden.fecha_creacion).toLocaleDateString('es-AR'), // Formato legible
        tipo: orden.tipo_estudio,
        archivo: orden.pdf_url, // 👈 Pasamos la URL real
    }));


    return (
        <div className="relative w-full max-w-7xl mx-auto mt-16 md:mt-20 px-4 sm:px-6 py-6 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 overflow-x-hidden">
            {/* ... (Fondo y Header) ... */}
            
            <div className="relative z-10">
                <motion.div /* ... (Animación del header) */ className="mb-6">
                    <h1 className="text-3xl font-bold text-center mb-2 text-blue-700 drop-shadow-lg">Órdenes Médicas</h1>
                    <p className="text-gray-700 text-center text-lg">
                        Descargá tus órdenes médicas <span className="font-semibold">({ordenes.length})</span>
                    </p>
                </motion.div>

                {/* Grid */}
                {ordenes.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">No hay órdenes médicas disponibles para descargar.</p>
                ) : (
                    <motion.div /* ... (Animación del grid) */ className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                        {ordenesParaCard.map((orden) => (
                            <OrdenCard key={orden.id} orden={orden} onDescargar={handleDescargar} />
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}