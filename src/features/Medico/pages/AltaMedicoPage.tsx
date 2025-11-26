import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import FormularioMedico from '../components/FormularioMedico';

export default function AltaMedicoPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    console.log('📤 Enviando FormData a backend...');

    // Ver qué contiene el FormData
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: [File] ${value.name}`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    try {
      const response = await axios.post('http://localhost:8000/api/medicos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ Médico registrado:', response.data);

      if (response.status === 201 || response.status === 200) {
        toast.success('Médico registrado exitosamente');
        setTimeout(() => {
          navigate('/medicos/listado');
        }, 1500);
      }
    } catch (error: any) {
      console.error('❌ Error completo:', error);
      console.error('❌ Error response completo:', error.response);
      console.error('❌ Status:', error.response?.status);
      console.error('❌ Data del error:', error.response?.data);
      console.error('❌ Headers:', error.response?.headers);

      // Mostrar el error exacto del backend
      if (error.response?.data) {
        const errorData = error.response.data;
        console.log('🔍 Tipo de error:', typeof errorData);
        console.log('🔍 Contenido completo:', JSON.stringify(errorData, null, 2));

        // Manejar diferentes formatos de error
        if (typeof errorData === 'string') {
          toast.error(errorData);
        } else if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([campo, mensajes]: [string, any]) => {
            const mensaje = Array.isArray(mensajes) ? mensajes.join(', ') : mensajes;
            toast.error(`${campo}: ${mensaje}`);
          });
        } else if (errorData.error) {
          toast.error(errorData.error);
        } else if (errorData.message) {
          toast.error(errorData.message);
        } else if (errorData.detail) {
          toast.error(errorData.detail);
        } else {
          // Mostrar todos los campos con error
          Object.entries(errorData).forEach(([campo, mensajes]: [string, any]) => {
            const mensaje = Array.isArray(mensajes) ? mensajes[0] : mensajes;
            toast.error(`${campo}: ${mensaje}`);
          });
        }
      } else {
        toast.error('Error al registrar el médico');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/medicos/listado');
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 pt-28">
      <Toaster position="top-center" />
      <div className="w-full max-w-6xl px-6">
        <FormularioMedico onSubmit={handleSubmit} onCancel={handleCancel} isEdit={false} />
        {loading && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="rounded-lg bg-white p-6 shadow-xl">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Registrando médico...</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
