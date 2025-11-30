import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import MedicoList from '../components/MedicoList';
import type { Medico } from '../../../types/Medico';
import { tieneTurnosPendientes, tieneTratamientosActivos } from '../utils/medicoHelpers';

export default function ListadoMedicosPage() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/medicos/');
        // Filtrar solo los médicos no eliminados
        const medicosActivos = response.data.filter((m: Medico) => m.eliminado === false);
        setMedicos(medicosActivos);
      } catch (error) {
        console.error('Error al cargar médicos:', error);
        toast.error('Error al cargar la lista de médicos');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicos();
  }, []);

  const verificarSiPuedeEliminar = async (
    medico: Medico
  ): Promise<{ puedeEliminar: boolean; razon?: string }> => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };

    const [tieneTratamientos, tieneTurnos] = await Promise.all([
      tieneTratamientosActivos(medico.id, headers),
      tieneTurnosPendientes(medico.id, headers),
    ]);

    if (tieneTratamientos || tieneTurnos) {
      return { puedeEliminar: false, razon: 'El médico tiene turnos o tratamientos activos' };
    }

    return { puedeEliminar: true };
  };

  const handleEliminar = async (medico: Medico) => {
    // ✅ Ahora usa await correctamente
    const { puedeEliminar, razon } = await verificarSiPuedeEliminar(medico);

    if (!puedeEliminar) {
      toast.error(razon || 'No se puede eliminar el médico');
      return;
    }

    try {
      console.log('🗑️ Eliminando médico con DNI:', medico.dni);

      await axios.patch(`http://localhost:8000/api/medicos/${medico.dni}/`, {
        eliminado: true,
      });

      setMedicos((prev) => prev.filter((m) => m.dni !== medico.dni));
      toast.success('Médico eliminado correctamente');
    } catch (error: any) {
      console.error('❌ Error al eliminar médico:', error);
      const errorMessage = error.response?.data?.message || 'Error al eliminar el médico';
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8`}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
            <div className="text-xl">Cargando médicos...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <Toaster position="top-center" />
          <h1 className="mb-4 text-2xl font-bold text-black">Listado de Médicos</h1>
          {medicos.length === 0 ? (
            <p className="text-gray-500">No hay médicos registrados</p>
          ) : (
            <MedicoList medicos={medicos} onEliminar={handleEliminar} />
          )}
        </div>
      </div>
    </div>
  );
}
