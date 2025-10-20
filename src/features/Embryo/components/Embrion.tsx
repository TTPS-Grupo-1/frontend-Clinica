import { useState, useEffect } from "react";
import type { Embryo } from "../../../types/Embryo";

interface EmbrionFormProps {
  onSubmit: (data: Partial<Embryo>) => void;
  onCancel: () => void;
  isEdit?: boolean;
  initialData?: Partial<Embryo>;
}

export default function EmbrionForm({ 
  onSubmit, 
  onCancel, 
  isEdit = false,
  initialData 
}: EmbrionFormProps) {
  const [formData, setFormData] = useState<Partial<Embryo>>({
    calidad: "",
    pgt: "",
    estado: "fresco",
    fecha_baja: "",
    causa_descarte: "",
    observaciones: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cargar datos iniciales cuando se está editando
  useEffect(() => {
    if (initialData) {
      setFormData({
        calidad: initialData.calidad || "",
        pgt: initialData.pgt || "",
        estado: initialData.estado || "fresco",
        fecha_baja: initialData.fecha_baja || "",
        causa_descarte: initialData.causa_descarte || "",
        observaciones: initialData.observaciones || "",
      });
    }
  }, [initialData]);

  // Actualizar cuando cambia el estado a "descartado"
  useEffect(() => {
    if (formData.estado !== "descartado") {
      setFormData(prev => ({
        ...prev,
        fecha_baja: "",
        causa_descarte: "",
      }));
    }
  }, [formData.estado]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.calidad?.trim()) {
      newErrors.calidad = "La calidad es requerida";
    }

    if (!formData.estado) {
      newErrors.estado = "El estado es requerido";
    }

    // Validaciones condicionales para estado "descartado"
    if (formData.estado === "descartado") {
      if (!formData.fecha_baja) {
        newErrors.fecha_baja = "La fecha de baja es requerida cuando el embrión está descartado";
      }
      if (!formData.causa_descarte?.trim()) {
        newErrors.causa_descarte = "La causa del descarte es requerida cuando el embrión está descartado";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Limpiar campos opcionales vacíos
      const dataToSubmit = { ...formData };
      if (!dataToSubmit.pgt?.trim()) delete dataToSubmit.pgt;
      if (!dataToSubmit.fecha_baja) delete dataToSubmit.fecha_baja;
      if (!dataToSubmit.causa_descarte?.trim()) delete dataToSubmit.causa_descarte;
      if (!dataToSubmit.observaciones?.trim()) delete dataToSubmit.observaciones;
      
      onSubmit(dataToSubmit);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {isEdit ? "Editar Embrión" : "Registrar Datos del Embrión"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Calidad */}
        <div>
          <label htmlFor="calidad" className="block text-sm font-semibold text-gray-700 mb-2">
            Calidad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="calidad"
            name="calidad"
            value={formData.calidad}
            onChange={handleChange}
            placeholder="Ej: A, B, C, Excelente, Buena, Regular"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.calidad ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.calidad && (
            <p className="text-red-500 text-sm mt-1">{errors.calidad}</p>
          )}
        </div>

        {/* PGT (opcional) */}
        <div>
          <label htmlFor="pgt" className="block text-sm font-semibold text-gray-700 mb-2">
            PGT (Prueba Genética Preimplantacional) <span className="text-gray-400 text-xs">(opcional)</span>
          </label>
          <input
            type="text"
            id="pgt"
            name="pgt"
            value={formData.pgt}
            onChange={handleChange}
            placeholder="Ej: Normal, Anormal, No realizado"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="estado" className="block text-sm font-semibold text-gray-700 mb-2">
            Estado <span className="text-red-500">*</span>
          </label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.estado ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="fresco">Fresco</option>
            <option value="criopreservado">Criopreservado</option>
            <option value="transferido">Transferido</option>
            <option value="descartado">Descartado</option>
          </select>
          {errors.estado && (
            <p className="text-red-500 text-sm mt-1">{errors.estado}</p>
          )}
        </div>

        {/* Fecha de baja - solo si está descartado */}
        {formData.estado === "descartado" && (
          <div>
            <label htmlFor="fecha_baja" className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha de Baja <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="fecha_baja"
              name="fecha_baja"
              value={formData.fecha_baja}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.fecha_baja ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fecha_baja && (
              <p className="text-red-500 text-sm mt-1">{errors.fecha_baja}</p>
            )}
          </div>
        )}

        {/* Causa del descarte - solo si está descartado */}
        {formData.estado === "descartado" && (
          <div>
            <label htmlFor="causa_descarte" className="block text-sm font-semibold text-gray-700 mb-2">
              Causa del Descarte <span className="text-red-500">*</span>
            </label>
            <textarea
              id="causa_descarte"
              name="causa_descarte"
              value={formData.causa_descarte}
              onChange={handleChange}
              placeholder="Describa la razón del descarte"
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.causa_descarte ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.causa_descarte && (
              <p className="text-red-500 text-sm mt-1">{errors.causa_descarte}</p>
            )}
          </div>
        )}

        {/* Observaciones */}
        <div>
          <label htmlFor="observaciones" className="block text-sm font-semibold text-gray-700 mb-2">
            Observaciones <span className="text-gray-400 text-xs">(opcional)</span>
          </label>
          <textarea
            id="observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            placeholder="Observaciones adicionales sobre el embrión"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            {isEdit ? "Actualizar Embrión" : "Registrar Embrión"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 shadow-md"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
