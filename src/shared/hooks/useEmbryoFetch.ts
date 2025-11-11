import { useEffect, useState } from "react";
import axios from "axios";
import type { Embryo } from "../../types/Embryo";
import type { UseEmbryoFetchResult } from "../../interfaces/Embryo";

export function useEmbryoFetch(pacienteId: number | null): UseEmbryoFetchResult {
    const [embriones, setEmbriones] = useState<Embryo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!pacienteId) {
            setEmbriones([]);
            setLoading(false);
            setError(null);
            return;
        }
        setLoading(true);
        setError(null);
        
        // ✅ CAMBIAR esta línea:
        axios.get(`http://localhost:8000/api/embriones/`, {
            params: { paciente: pacienteId }
        })
            .then(({ data }) => {
                const items = Array.isArray(data) ? data : (data.results ?? []);
                console.log('Embriones recibidos del backend:', items);
                setEmbriones(items);
            })
            .catch((err) => {
                console.error('Error fetching embriones:', err);
                setError(err?.response?.data?.detail || err?.message || "Error al cargar embriones");
                setEmbriones([]);
            })
            .finally(() => setLoading(false));
    }, [pacienteId]);

    return { embriones, loading, error, setEmbriones };
}
