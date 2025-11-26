import React from 'react';
import type { Paciente } from '../../../types/Paciente';

interface PuncionFormProps {
  formData: {
    quirofano: string;
    fecha: string;
    selectedPacienteId: number | null;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      quirofano: string;
      fecha: string;
      selectedPacienteId: number | null;
    }>
  >;
  paciente?: Paciente;
}

export default function PuncionForm({ formData, setFormData, paciente }: PuncionFormProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <label className="mb-2 block text-sm font-medium text-black">Quirófano</label>
        <input
          type="text"
          value={formData.quirofano}
          onChange={(e) => setFormData((fd) => ({ ...fd, quirofano: e.target.value }))}
          className="w-full rounded border border-pink-300 px-2 py-1 text-black focus:ring-2 focus:ring-pink-200"
          placeholder="Ej: Q1"
          autoFocus
        />
      </div>
      <div className="flex-1">
        <label className="mb-2 block text-sm font-medium text-black">Fecha</label>
        <input
          type="date"
          value={formData.fecha}
          onChange={(e) => setFormData((fd) => ({ ...fd, fecha: e.target.value }))}
          className="w-full rounded border border-pink-300 px-2 py-1 text-black focus:ring-2 focus:ring-pink-200"
        />
      </div>
      <div className="flex-1">
        <label className="mb-2 block text-sm font-medium">Paciente</label>
        <input
          type="text"
          value={paciente ? `${paciente.last_name}, ${paciente.first_name}` : ''}
          readOnly
          className="w-full rounded border border-pink-200 bg-gray-100 px-2 py-1 text-black"
        />
      </div>
    </div>
  );
}
