import { useState } from "react";
import type { Embryo } from "../../../types/Embryo";
import type { EmbryoModalProps } from "../../../interfaces/Embryo";
import { generateEmbryoId } from "../static/utils";

export default function EmbryoModal({ isOpen, onClose, onSubmit, pacienteNombre = "" }: EmbryoModalProps) {
  const [formData, setFormData] = useState({
    calidad: "3",
    pot: "OK",
    estado: "maduro",
    causaDescarte: "",
    ovocito: "OV001",
    observaciones: ""
  });

  // Ovocitos hardcodeados disponibles
  const ovocitosDisponibles = [
    "OV001",
    "OV002", 
    "OV003",
    "OV004",
    "OV005",
    "OV006",
    "OV007",
    "OV008",
    "OV009",
    "OV010"
  ];


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const embryoId = generateEmbryoId(pacienteNombre);
    
    onSubmit({
      ...formData,
      id: embryoId
    });
    
    // Reset form
    setFormData({
      calidad: "3",
      pot: "OK", 
      estado: "maduro",
      causaDescarte: "",
      ovocito: "OV001",
      observaciones: ""
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Registrar Nuevo Embrión</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* ID Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Identificador (autogenerado)
            </label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-600">
              {generateEmbryoId(pacienteNombre)}
            </div>
          </div>

          {/* Calidad */}
          <div>
            <label htmlFor="calidad" className="block text-sm font-medium text-gray-700 mb-1">
              Calidad (1-5)
            </label>
            <select
              id="calidad"
              value={formData.calidad}
              onChange={(e) => setFormData({ ...formData, calidad: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 font-medium"
              required
            >
              <option value="1">1 - Muy baja</option>
              <option value="2">2 - Baja</option>
              <option value="3">3 - Media</option>
              <option value="4">4 - Alta</option>
              <option value="5">5 - Excelente</option>
            </select>
          </div>

          {/* PGT */}
          <div>
            <label htmlFor="pot" className="block text-sm font-medium text-gray-700 mb-1">
              PGT
            </label>
            <select
              id="pot"
              value={formData.pot}
              onChange={(e) => setFormData({ ...formData, pot: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 font-medium"
              required
            >
              <option value="OK">OK</option>
              <option value="NOT OK">NOT OK</option>
            </select>
          </div>

          {/* Estado del embrión */}
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
              Estado del embrión
            </label>
            <select
              id="estado"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 font-medium"
              required
            >
              <option value="maduro">Maduro</option>
              <option value="inmaduro">Inmaduro</option>
              <option value="muy inmaduro">Muy inmaduro</option>
            </select>
          </div>

          {/* Causa de descarte */}
          <div>
            <label htmlFor="causaDescarte" className="block text-sm font-medium text-gray-700 mb-1">
              Causa de descarte
            </label>
            <input
              type="text"
              id="causaDescarte"
              value={formData.causaDescarte}
              onChange={(e) => setFormData({ ...formData, causaDescarte: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Opcional - especifica la causa si aplica"
            />
          </div>

          {/* Ovocito */}
          <div>
            <label htmlFor="ovocito" className="block text-sm font-medium text-gray-700 mb-1">
              Ovocito relacionado
            </label>
            <select
              id="ovocito"
              value={formData.ovocito}
              onChange={(e) => setFormData({ ...formData, ovocito: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 font-medium"
              required
            >
              {ovocitosDisponibles.map((ovocito) => (
                <option key={ovocito} value={ovocito}>
                  {ovocito}
                </option>
              ))}
            </select>
          </div>

          {/* Observaciones */}
          <div>
            <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones
            </label>
            <textarea
              id="observaciones"
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Notas adicionales sobre el embrión"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Registrar Embrión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}