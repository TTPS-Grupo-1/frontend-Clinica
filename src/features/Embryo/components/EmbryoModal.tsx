import { useState } from "react";
import type { EmbryoModalAdaptedProps } from "../../../interfaces/Embryo";
import { generateUniqueId } from "../../../shared/utils/generateUniqueId";


export default function EmbryoModal({ isOpen, onClose, onSubmit, pacientes, ovocitos, selectedPacienteId }: EmbryoModalAdaptedProps) {
  const [formData, setFormData] = useState({
    calidad: "3",
    pot: "OK",
    estado: "transferido", // Valor válido por defecto
    causaDescarte: "",
    ovocito: "",
    observaciones: "",
    fecha_fertilizacion: "",
    tecnica: "",
    tecnico_laboratorio: "",
    info_semen: "",
    fecha_baja: ""
  });

  const paciente = pacientes.find(p => p.id === selectedPacienteId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [apellido = "APE", nombre = "NOM"] = paciente ? [paciente.apellido, paciente.nombre] : ["APE", "NOM"];
    const embryoId = generateUniqueId({ prefix: "EMB", nombre, apellido });
    onSubmit({
      ...formData,
      id: embryoId
    });
    setFormData({
      calidad: "3",
      pot: "OK", 
      estado: "transferido",
      causaDescarte: "",
      ovocito: "",
      observaciones: "",
      fecha_fertilizacion: "",
      tecnica: "",
      tecnico_laboratorio: "",
      info_semen: "",
      fecha_baja: ""
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
      ></div>
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
          {/* Ovocito selector dinámico */}
          <div>
            <label htmlFor="ovocito" className="block text-sm font-medium text-gray-700 mb-1">Ovocito relacionado</label>
            <select
              id="ovocito"
              value={formData.ovocito}
              onChange={e => setFormData({ ...formData, ovocito: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black font-medium"
              required
              disabled={!selectedPacienteId}
            >
              <option value="" className="text-black">-- Selecciona un ovocito --</option>
              {ovocitos.map(o => (
                <option key={o.id_ovocito} value={o.id_ovocito}>{o.identificador}</option>
              ))}
            </select>
          </div>
          {/* ID Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Identificador (autogenerado)</label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-600">
              {generateUniqueId({ prefix: "EMB", nombre: paciente?.nombre || "NOM", apellido: paciente?.apellido || "APE" })}
            </div>
          </div>
          {/* Fecha de fertilización */}
          <div>
            <label htmlFor="fecha_fertilizacion" className="block text-sm font-medium text-gray-700 mb-1">Fecha de fertilización</label>
            <input
              type="date"
              id="fecha_fertilizacion"
              value={formData.fecha_fertilizacion}
              onChange={e => setFormData({ ...formData, fecha_fertilizacion: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          {/* Técnica */}
          <div>
            <label htmlFor="tecnica" className="block text-sm font-medium text-gray-700 mb-1">Técnica utilizada</label>
            <input
              type="text"
              id="tecnica"
              value={formData.tecnica}
              onChange={e => setFormData({ ...formData, tecnica: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          {/* Técnico de laboratorio */}
          <div>
            <label htmlFor="tecnico_laboratorio" className="block text-sm font-medium text-gray-700 mb-1">Técnico de laboratorio</label>
            <input
              type="text"
              id="tecnico_laboratorio"
              value={formData.tecnico_laboratorio}
              onChange={e => setFormData({ ...formData, tecnico_laboratorio: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          {/* Información del semen */}
          <div>
            <label htmlFor="info_semen" className="block text-sm font-medium text-gray-700 mb-1">Información del semen</label>
            <textarea
              id="info_semen"
              value={formData.info_semen}
              onChange={e => setFormData({ ...formData, info_semen: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          {/* Fecha de baja */}
          <div>
            <label htmlFor="fecha_baja" className="block text-sm font-medium text-gray-700 mb-1">Fecha de baja (opcional)</label>
            <input
              type="date"
              id="fecha_baja"
              value={formData.fecha_baja}
              onChange={e => setFormData({ ...formData, fecha_baja: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          {/* Calidad */}
          <div>
            <label htmlFor="calidad" className="block text-sm font-medium text-gray-700 mb-1">Calidad (1-5)</label>
            <select
              id="calidad"
              value={formData.calidad}
              onChange={e => setFormData({ ...formData, calidad: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black font-medium"
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
            <label htmlFor="pot" className="block text-sm font-medium text-gray-700 mb-1">PGT</label>
            <select
              id="pot"
              value={formData.pot}
              onChange={e => setFormData({ ...formData, pot: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black font-medium"
              required
            >
              <option value="OK">OK</option>
              <option value="NOT OK">NOT OK</option>
            </select>
          </div>
          {/* Estado del embrión */}
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">Estado del embrión</label>
            <select
              id="estado"
              value={formData.estado}
              onChange={e => setFormData({ ...formData, estado: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black font-medium"
              required
            >
              <option value="transferido">Transferido</option>
              <option value="no_transferido">No transferido</option>
            </select>
          </div>
          {/* Causa de descarte */}
          <div>
            <label htmlFor="causaDescarte" className="block text-sm font-medium text-gray-700 mb-1">Causa de descarte</label>
            <input
              type="text"
              id="causaDescarte"
              value={formData.causaDescarte}
              onChange={e => setFormData({ ...formData, causaDescarte: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Opcional - especifica la causa si aplica"
            />
          </div>
          {/* Observaciones */}
          <div>
            <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
            <textarea
              id="observaciones"
              value={formData.observaciones}
              onChange={e => setFormData({ ...formData, observaciones: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
