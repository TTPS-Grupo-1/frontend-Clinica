import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export const useTratamientoInfo = (selectedPacienteId: string | null, isOpen: boolean) => {
  const [tratamientoInfo, setTratamientoInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchTratamientoInfo = async () => {
    if (!selectedPacienteId) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/fertilizacion/tratamiento-info/${selectedPacienteId}/`
      );
      setTratamientoInfo(response.data);
    } catch (error) {
      console.error('Error obteniendo info del tratamiento:', error);
      toast.error('Error obteniendo información del tratamiento');
      setTratamientoInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && selectedPacienteId) {
      fetchTratamientoInfo();
    }
  }, [isOpen, selectedPacienteId]);

  return {
    tratamientoInfo,
    loading,
    refetch: fetchTratamientoInfo,
  };
};
