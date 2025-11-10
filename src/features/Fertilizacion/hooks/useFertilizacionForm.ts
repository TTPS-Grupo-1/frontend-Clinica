import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../utils/fertilizacionHelpers';
import { toast } from 'sonner';
import { generateUniqueId } from '../../../shared/utils/generateUniqueId';

interface FertilizacionForm {
  ovocito: string;
  semen_info: string;
  fecha_fertilizacion: string;
  tecnico_laboratorio: string;
  tecnica: string;
  resultado: string;
  banco_semen_id: string;
  razon_banco_semen: string;
}

export const useFertilizacionForm = (
  currentUser: any,
  ovocitos: any[],
  onClose: () => void
) => {
  const [form, setForm] = useState<FertilizacionForm>({
    ovocito: '',
    semen_info: '',
    fecha_fertilizacion: new Date().toISOString().slice(0, 10),
    tecnico_laboratorio: currentUser ? currentUser.nombre : '',
    tecnica: '',
    resultado: 'no_exitosa',
    banco_semen_id: '',
    razon_banco_semen: 'no_aplica',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm(f => ({
      ...f,
      tecnico_laboratorio: currentUser ? currentUser.nombre : f.tecnico_laboratorio
    }));
  }, [currentUser]);

  const updateForm = (updates: Partial<FertilizacionForm>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ovocito: form.ovocito ? Number(form.ovocito) : null,
      semen_info: form.semen_info || null,
      fecha_fertilizacion: form.fecha_fertilizacion,
      tecnico_laboratorio: form.tecnico_laboratorio,
      tecnica_icsi: form.tecnica === "icsi",
      tecnica_fiv: form.tecnica === "fiv",
      resultado: form.resultado,
      banco_semen_id: form.banco_semen_id ? Number(form.banco_semen_id) : null,
      razon_banco_semen: form.razon_banco_semen,
    };

    try {
      // Crear fertilización (añadir headers de auth)
      const headers = getAuthHeaders();
      const fertilizacionResponse = await axios.post('http://localhost:8000/api/fertilizacion/', payload, { headers });
      const fertilizacionId = fertilizacionResponse.data.id_fertilizacion || fertilizacionResponse.data.id;
      
      toast.success('Fertilización registrada exitosamente');

      // Crear embrión si la fertilización fue exitosa
      if (form.resultado === 'exitosa' && form.ovocito) {
        const ovocitoSeleccionado = ovocitos.find(o => o.id_ovocito === Number(form.ovocito));
        const identificadorEmbrion = generateUniqueId({
          prefix: "EMB",
          nombre: ovocitoSeleccionado?.identificador || "UNK",
          apellido: "",
        });

        const embrionPayload = {
          identificador: identificadorEmbrion,
          fertilizacion: fertilizacionId,
          estado: "no transferido",
        };

        await axios.post('http://localhost:8000/api/embriones/', embrionPayload, { headers });
        toast.success(`Embrión ${identificadorEmbrion} creado exitosamente`);
      }

      onClose();
    } catch (error: any) {
      console.error('Error completo:', error);
      const errorMsg = error?.response?.data?.detail || 
                       error?.response?.data?.message || 
                       error?.message || 
                       'Error al registrar';
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    updateForm,
    handleSubmit,
    submitting
  };
};