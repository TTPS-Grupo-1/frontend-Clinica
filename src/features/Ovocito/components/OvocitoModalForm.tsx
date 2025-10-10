import React, { useState } from "react";
import axios from "axios";
import type { EstadoOvocito } from "../../../types/Ovocito";
import { generarIdentificador } from "../static/helpers";
import type { OvocitoModalFormProps } from "../../../interfaces/Ovocitos";
import { toast } from "sonner";


export default function OvocitoModalForm({ open, onClose, onAdd, nombreDonante, apellidoDonante }: OvocitoModalFormProps) {
  const [estado, setEstado] = useState<EstadoOvocito>("maduro");
  const [criopreservar, setCriopreservar] = useState(false);
  const [descartado, setDescartado] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const identificador = generarIdentificador(nombreDonante, apellidoDonante);
      // Mapear al payload esperado por el backend
      const payload = {
        identificador,
        estado: (estado as string).replace(/\s+/g, "_"), // "muy inmaduro" -> "muy_inmaduro"
        cripreservar: criopreservar, // Nota: el backend usa "cripreservar" sin la "o"
        descartado,
      };

      await axios.post("/api/ovocitos/", payload);

      // Actualizar UI con el ovocito agregado
      onAdd({ identificador_ovocito: identificador, estado, criopreservar, descartado });
      toast.success("Ovocito agregado exitosamente");
      // Reset y cerrar
      setEstado("maduro");
      setCriopreservar(false);
      setDescartado(false);
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.detail || err?.message || "Error desconocido";
      toast.error(`No se pudo registrar el ovocito: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl text-black font-bold mb-4">Agregar Ovocito</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <>
            <label htmlFor="identificador" className="text-black">Identificador</label>
            <input
              type="text"
              id="identificador"
              value={generarIdentificador(nombreDonante, apellidoDonante)}
              readOnly
              className="w-full border rounded text-black px-2 py-1"
            />
          </>
          <>
            <label className="block text-sm font-medium mb-2">Estado</label>
            <select
              value={estado}
              onChange={e => setEstado(e.target.value as EstadoOvocito)}
              className="w-full border rounded text-black px-2 py-1"
            >
              <option value="muy inmaduro">Muy inmaduro</option>
              <option value="maduro">Maduro</option>
              <option value="inmaduro">Inmaduro</option>
            </select>
          </>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={criopreservar}
              onChange={e => setCriopreservar(e.target.checked)}
              id="criopreservar"
            />
            <label htmlFor="criopreservar" className="text-black">Criopreservar</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={descartado}
              onChange={e => setDescartado(e.target.checked)}
              id="descartado"
            />
            <label htmlFor="descartado" className="text-black">Descartado</label>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Guardando..." : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
