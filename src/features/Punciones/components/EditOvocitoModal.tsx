import { useState, useEffect } from 'react';
import type { Ovocito, MadurezOvocito, TipoEstadoOvocito } from '@/types/Ovocito';
import axios from 'axios';

interface EditOvocitoModalProps {
  open: boolean;
  onClose: () => void;
  ovocito: Ovocito | null;
  onUpdate: () => void;
}

export default function EditOvocitoModal({
  open,
  onClose,
  ovocito,
  onUpdate,
}: EditOvocitoModalProps) {
  const [madurez, setMadurez] = useState<MadurezOvocito>('maduro');
  const [tipoEstado, setTipoEstado] = useState<TipoEstadoOvocito>('fresco');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ovocito) {
      setMadurez(ovocito.madurez || 'maduro');
      setTipoEstado(ovocito.tipo_estado || 'fresco');
      setError(null);
    }
  }, [ovocito]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ovocito) return;

    // Detectar si hay cambio de estado
    const estadoCambio = ovocito.tipo_estado !== tipoEstado;
    const esCongelacion = ovocito.tipo_estado === 'fresco' && tipoEstado === 'criopreservado';
    const esDescongelacion = ovocito.tipo_estado === 'criopreservado' && tipoEstado === 'fresco';

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Token ${token}` } : {};

      const response = await axios.patch(
        `/api/ovocitos/${ovocito.id_ovocito}/`,
        {
          madurez,
          tipo_estado: tipoEstado,
        },
        { headers }
      );

      // Log de respuesta del backend (incluye info de API de criopreservación)
      if (response.data.api_result) {
        console.log('Resultado de API de criopreservación:', response.data.api_result);
        
        if (esCongelacion && response.data.api_result.tanque_id) {
          console.log(`Ovocito asignado a Tanque ${response.data.api_result.tanque_id}, Rack ${response.data.api_result.rack_id}`);
        } else if (esDescongelacion) {
          console.log('Ovocito descongelado y liberado del almacenamiento');
        }
      }

      onUpdate();
      onClose();
    } catch (err) {
      console.error('Error actualizando ovocito:', err);
      
      let mensajeError = 'Error al actualizar el ovocito';
      
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          mensajeError = err.response.data.message;
        } else if (err.response?.data?.api_result?.error) {
          mensajeError = `Error en criopreservación: ${err.response.data.api_result.error}`;
        }
      }
      
      setError(mensajeError);
    } finally {
      setLoading(false);
    }
  };

  // Determinar opciones de estado permitidas según el estado actual
  const getEstadosPermitidos = (): TipoEstadoOvocito[] => {
    if (!ovocito?.tipo_estado) return ['fresco', 'criopreservado', 'descartado'];
    
    switch (ovocito.tipo_estado) {
      case 'criopreservado':
        return ['criopreservado', 'fresco'];
      case 'fresco':
        // Si ya fue criopreservado anteriormente, no puede volver a criopreservarse
        if (ovocito.fue_criopreservado) {
          return ['fresco', 'descartado'];
        }
        return ['fresco', 'criopreservado', 'descartado'];
      case 'descartado':
        return ['descartado'];
      default:
        return ['fresco', 'criopreservado', 'descartado'];
    }
  };

  const estadosPermitidos = getEstadosPermitidos();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-black">
            Editar Ovocito {ovocito?.identificador}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Madurez
            </label>
            <select
              value={madurez}
              onChange={(e) => setMadurez(e.target.value as MadurezOvocito)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            >
              <option value="muy inmaduro">Muy Inmaduro</option>
              <option value="inmaduro">Inmaduro</option>
              <option value="maduro">Maduro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Estado
            </label>
            <select
              value={tipoEstado}
              onChange={(e) => setTipoEstado(e.target.value as TipoEstadoOvocito)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            >
              {estadosPermitidos.includes('fresco') && <option value="fresco">Fresco</option>}
              {estadosPermitidos.includes('criopreservado') && (
                <option value="criopreservado">Criopreservado</option>
              )}
              {estadosPermitidos.includes('descartado') && (
                <option value="descartado">Descartado</option>
              )}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
