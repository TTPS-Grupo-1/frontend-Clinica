import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Embryo } from '../../../types/Embryo';

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
  initialData,
}: EmbrionFormProps) {
  const [formData, setFormData] = useState<Partial<Embryo>>({
    calidad: '',
    pgt: '',
    estado: 'fresco',
    fecha_baja: '',
    causa_descarte: '',
    observaciones: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [fueCriopreservado, setFueCriopreservado] = useState(false);

  // Deshabilitar edición si el estado es "descartado" o "transferido"
  const isEditable =
    !isEdit || (initialData?.estado !== 'descartado' && initialData?.estado !== 'transferido');

  // ✅ Determinar opciones de estado permitidas
  const getOpcionesEstado = () => {
    const estadoActual = initialData?.estado?.toLowerCase();

    // ✅ Si ya fue criopreservado y el estado actual es fresco, solo transferido o descartado
    if (fueCriopreservado && estadoActual === 'fresco') {
      return ['descartado', 'fresco'];
    }

    // Si actualmente es criopreservado, solo puede pasar a fresco
    if (estadoActual === 'criopreservado') {
      return ['criopreservado', 'fresco'];
    }

    // Si es modo edición y el estado actual es fresco (y nunca fue criopreservado)
    if (isEdit && estadoActual === 'fresco') {
      return ['fresco', 'criopreservado', 'descartado'];
    }

    // Por defecto, todas las opciones (solo para crear nuevo)
    return ['fresco', 'criopreservado', 'descartado'];
  };

  const opcionesEstado = getOpcionesEstado();

  // ✅ Verificar si el embrión ya fue criopreservado
  useEffect(() => {
    const verificarHistorial = async () => {
      if (isEdit && initialData?.id) {
        try {
          const response = await axios.get(
            `/api/historial-embrion/verificar-criopreservacion/${initialData.id}/`
          );
          setFueCriopreservado(response.data.fue_criopreservado);
        } catch (error) {
          console.error('Error al verificar historial:', error);
        }
      }
    };

    verificarHistorial();
  }, [isEdit, initialData?.id]);

  // Cargar datos iniciales cuando se está editando - SOLO UNA VEZ
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0 && !isInitialized) {
      setFormData({
        calidad: initialData.calidad ? String(initialData.calidad) : '',
        pgt: initialData.pgt ? String(initialData.pgt) : '',
        estado: initialData.estado || 'fresco',
        fecha_baja: initialData.fecha_baja ? String(initialData.fecha_baja) : '',
        causa_descarte: initialData.causa_descarte ? String(initialData.causa_descarte) : '',
        observaciones: initialData.observaciones ? String(initialData.observaciones) : '',
      });
      setIsInitialized(true);
    }
  }, [initialData, isInitialized]);

  // Actualizar cuando cambia el estado a "descartado"
  useEffect(() => {
    if (formData.estado !== 'descartado') {
      setFormData((prev) => ({
        ...prev,
        fecha_baja: '',
        causa_descarte: '',
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
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.calidad?.trim()) {
      newErrors.calidad = 'La calidad es requerida';
    }

    if (!formData.estado) {
      newErrors.estado = 'El estado es requerido';
    }

    // Validaciones condicionales para estado "descartado"
    if (formData.estado === 'descartado') {
      if (!formData.fecha_baja) {
        newErrors.fecha_baja = 'La fecha de baja es requerida cuando el embrión está descartado';
      }
      if (!formData.causa_descarte?.trim()) {
        newErrors.causa_descarte =
          'La causa del descarte es requerida cuando el embrión está descartado';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSubmit =
        isEdit && initialData ? { ...initialData, ...formData } : { ...formData };

      if (!dataToSubmit.pgt?.trim()) delete dataToSubmit.pgt;
      if (!dataToSubmit.fecha_baja) delete dataToSubmit.fecha_baja;
      if (!dataToSubmit.causa_descarte?.trim()) delete dataToSubmit.causa_descarte;
      if (!dataToSubmit.observaciones?.trim()) delete dataToSubmit.observaciones;

      onSubmit(dataToSubmit);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">
        {isEdit ? 'Editar Embrión' : 'Registrar Datos del Embrión'}
      </h2>

      {/* Mensaje si no se puede editar */}
      {!isEditable && (
        <div className="mb-4 rounded-lg bg-red-100 p-3 text-center font-semibold text-red-700">
          No se puede editar un embrión{' '}
          {formData.estado === 'descartado' ? 'descartado' : 'transferido'}.
        </div>
      )}

      {/* ✅ Mensaje si actualmente es criopreservado */}
      {initialData?.estado === 'criopreservado' && (
        <div className="mb-4 rounded-lg bg-blue-100 p-3 text-center font-semibold text-blue-700">
          Este embrión está criopreservado. Solo puede cambiar a estado fresco.
        </div>
      )}

      {/* ✅ Mensaje si ya fue criopreservado y ahora es fresco */}
      {fueCriopreservado &&
        formData.estado === 'fresco' &&
        initialData?.estado !== 'criopreservado' && (
          <div className="mb-4 rounded-lg bg-yellow-100 p-3 text-center font-semibold text-yellow-700">
            Este embrión ya fue criopreservado anteriormente. Solo puede ser transferido o
            descartado.
          </div>
        )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Calidad */}
        <div>
          <label htmlFor="calidad" className="mb-2 block text-sm font-semibold text-gray-700">
            Calidad <span className="text-red-500">*</span>
          </label>
          <select
            id="calidad"
            name="calidad"
            value={formData.calidad || ''}
            onChange={handleChange}
            disabled={!isEditable}
            className={`w-full rounded-lg border bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.calidad ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">-- Seleccionar --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors.calidad && <p className="mt-1 text-sm text-red-500">{errors.calidad}</p>}
        </div>

        {/* PGT (opcional) */}
        <div>
          <label htmlFor="pgt" className="mb-2 block text-sm font-semibold text-gray-700">
            PGT (Prueba Genética Preimplantacional){' '}
            <span className="text-xs text-gray-400">(opcional)</span>
          </label>
          <select
            id="pgt"
            name="pgt"
            value={formData.pgt || ''}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">-- Seleccionar --</option>
            <option value="exitoso">Exitoso</option>
            <option value="no_exitoso">No Exitoso</option>
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Estado <span className="text-red-500">*</span>
          </label>

          {/* ✅ Mostrar el estado actual */}
          {isEdit && initialData?.estado && (
            <div className="mb-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
              <p className="text-sm font-semibold text-blue-800">
                Estado actual: <span className="capitalize">{initialData.estado}</span>
              </p>
              <p className="mt-1 text-xs text-blue-600">
                Puedes mantener este estado o cambiarlo usando el selector de abajo
              </p>
            </div>
          )}

          <select
            id="estado"
            name="estado"
            value={formData.estado || 'fresco'}
            onChange={handleChange}
            disabled={!isEditable}
            className={`w-full rounded-lg border bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.estado ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {/* ✅ Renderizar opciones permitidas */}
            {opcionesEstado.includes('fresco') && <option value="fresco">Fresco</option>}
            {opcionesEstado.includes('criopreservado') && (
              <option value="criopreservado">Criopreservado</option>
            )}
            {opcionesEstado.includes('transferido') && (
              <option value="transferido">Transferido</option>
            )}
            {opcionesEstado.includes('descartado') && (
              <option value="descartado">Descartado</option>
            )}
          </select>
          {errors.estado && <p className="mt-1 text-sm text-red-500">{errors.estado}</p>}
        </div>

        {/* Fecha de baja - solo si está descartado */}
        {formData.estado === 'descartado' && (
          <div>
            <label htmlFor="fecha_baja" className="mb-2 block text-sm font-semibold text-gray-700">
              Fecha de Baja <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="fecha_baja"
              name="fecha_baja"
              value={formData.fecha_baja || ''}
              onChange={handleChange}
              disabled={!isEditable}
              className={`w-full rounded-lg border bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.fecha_baja ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fecha_baja && <p className="mt-1 text-sm text-red-500">{errors.fecha_baja}</p>}
          </div>
        )}

        {/* Causa del descarte - solo si está descartado */}
        {formData.estado === 'descartado' && (
          <div>
            <label
              htmlFor="causa_descarte"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Causa del Descarte <span className="text-red-500">*</span>
            </label>
            <textarea
              id="causa_descarte"
              name="causa_descarte"
              value={formData.causa_descarte || ''}
              onChange={handleChange}
              disabled={!isEditable}
              placeholder="Describa la razón del descarte"
              rows={3}
              className={`w-full rounded-lg border bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.causa_descarte ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.causa_descarte && (
              <p className="mt-1 text-sm text-red-500">{errors.causa_descarte}</p>
            )}
          </div>
        )}

        {/* Observaciones */}
        <div>
          <label htmlFor="observaciones" className="mb-2 block text-sm font-semibold text-gray-700">
            Observaciones <span className="text-xs text-gray-400">(opcional)</span>
          </label>
          <textarea
            id="observaciones"
            name="observaciones"
            value={formData.observaciones || ''}
            onChange={handleChange}
            disabled={!isEditable}
            placeholder="Observaciones adicionales sobre el embrión"
            rows={4}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={!isEditable}
            className={`flex-1 ${isEditable ? 'bg-blue-600' : 'bg-gray-400'} rounded-lg px-6 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-blue-700`}
          >
            {isEdit ? 'Actualizar Embrión' : 'Registrar Embrión'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg bg-gray-500 px-6 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
