import { useState } from 'react';
import type { TransferenciaFormData } from '../../../types/Transferencia';

export function useTransferenciaForm() {
  const [formData, setFormData] = useState<TransferenciaFormData>({
    tratamiento: null,
    embriones: [],
    testPositivo: false,
    quirofano: null,
  });

  const updateField = (field: keyof TransferenciaFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEmbrion = (embrionId: number) => {
    setFormData((prev) => ({
      ...prev,
      embriones: prev.embriones.includes(embrionId)
        ? prev.embriones.filter((id) => id !== embrionId)
        : [...prev.embriones, embrionId],
    }));
  };

  const resetForm = () => {
    setFormData({
      tratamiento: null,
      embriones: [],
      testPositivo: false,
      quirofano: null,
    });
  };

  return {
    formData,
    updateField,
    toggleEmbrion,
    resetForm,
  };
}
