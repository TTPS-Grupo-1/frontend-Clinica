import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import FormularioMedico from '../components/FormularioMedico';
import type { Medico } from '../../../types/Medico';

export default function EditMedicoPage() {
  const { dni } = useParams<{ dni: string }>();
  const navigate = useNavigate();
  const [medico, setMedico] = useState<Medico | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedico = async () => {
      if (!dni) return;

      try {
        console.log('🔍 Buscando médico con DNI:', dni);
        const response = await axios.get(`http://localhost:8000/api/medicos/${dni}/`);
        console.log('✅ Médico encontrado:', response.data);
        setMedico(response.data);
      } catch (error) {
        console.error('❌ Error al cargar médico:', error);
        toast.error('Error al cargar los datos del médico');
      } finally {
        setLoading(false);
      }
    };

    fetchMedico();
  }, [dni]);

  const handleUpdate = async (formData: FormData) => {
    if (!dni) return;

    try {
      console.log('📤 Enviando actualización:', formData);

      const response = await axios.put(`http://localhost:8000/api/medicos/${dni}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ Respuesta del servidor:', response.data);
      toast.success('Médico actualizado correctamente');

      setTimeout(() => {
        navigate('/medicos/listado');
      }, 2000);
    } catch (error: any) {
      console.error('❌ Error completo:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error data:', error.response?.data);

      // Mostrar el error específico del backend
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        JSON.stringify(error.response?.data) ||
        'Error al actualizar el médico';

      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate('/medicos/listado');
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center pt-28">
        <div className="text-xl">Cargando datos del médico...</div>
      </main>
    );
  }

  if (!medico) {
    return (
      <main className="flex min-h-screen flex-col items-center pt-28">
        <div className="text-xl text-red-500">No se encontró el médico</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-28">
      <Toaster position="top-center" />
      <div className="w-full max-w-4xl">
        <FormularioMedico
          medico={medico}
          onSubmit={handleUpdate}
          onCancel={handleCancel}
          isEdit={true}
        />
      </div>
    </main>
  );
}
