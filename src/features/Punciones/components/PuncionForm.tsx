import React from "react";
import type { Paciente } from "../../../types/Paciente";

interface PuncionFormProps {
  formData: {
    quirofano: string;
    fecha: string;
    selectedPacienteId: number | null;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    quirofano: string;
    fecha: string;
    selectedPacienteId: number | null;
  }>>;
  paciente?: Paciente;
}

export default function PuncionForm({ formData, setFormData, paciente }: PuncionFormProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-black mb-2">Quirófano</label>
        <input
          type="text"
          value={formData.quirofano}
          onChange={e => setFormData(fd => ({ ...fd, quirofano: e.target.value }))}
          className="w-full border border-pink-300 rounded text-black px-2 py-1 focus:ring-2 focus:ring-pink-200"
          placeholder="Ej: Q1"
          autoFocus
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm text-black font-medium mb-2">Fecha</label>
        <input
          type="date"
          value={formData.fecha}
          onChange={e => setFormData(fd => ({ ...fd, fecha: e.target.value }))}
          className="w-full border border-pink-300 rounded text-black px-2 py-1 focus:ring-2 focus:ring-pink-200"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">Paciente</label>
        <input
          type="text"
          value={paciente ? `${paciente.last_name}, ${paciente.first_name}` : ""}
          readOnly
          className="w-full border border-pink-200 rounded text-black px-2 py-1 bg-gray-100"
        />
      </div>
    </div>
  );
}
