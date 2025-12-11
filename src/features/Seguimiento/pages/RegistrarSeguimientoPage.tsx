import React, { useState, useEffect } from 'react';
import SeguimientoForm, { type SeguimientoData } from '../components/SeguimientoComponente';
import { toast, Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/api/seguimiento/registrar/';
const GET_URL = "http://127.0.0.1:8000/api/seguimiento/obtener/";

export default function RegistrarSeguimientoPage() {
  const { pacienteId } = useParams<{ pacienteId: string }>();

  // 💡 Usamos el ID del paciente directamente (sin buscar el ID del tratamiento)
  const idPaciente = parseInt(pacienteId || '0');

  // Simplificamos los estados de carga
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<Partial<SeguimientoData> | null>(null);
  
  const navigate = useNavigate();

  // 💡 Paso 1: Función para cargar los datos existentes
  const fetchExistingData = async () => {
        if (idPaciente === 0) return;

        setLoading(true);
        try {
            const res = await fetch(`${GET_URL}?paciente_id=${idPaciente}`);

            if (res.status === 200) {
                const data = await res.json();
                
                // ⚠️ Ojo: la API devuelve el objeto con campos nulos o con la estructura de la DB.
                // Usamos el estado para precargar.
                setInitialData(data); 
                //toast.success("Datos de seguimiento existentes cargados.");
            } else if (res.status === 404) {
                // Es normal: significa que es el primer registro.
                setInitialData({} as Partial<SeguimientoData>);
                console.log("No existe registro previo de seguimiento.");
            } else {
                throw new Error("Error al consultar datos existentes.");
            }
        } catch (err) {
            console.error("Error al cargar datos de seguimiento:", err);
            toast.error("Error al precargar datos de seguimiento.");
        } finally {
            setLoading(false);
        }
  };

    // 💡 Paso 2: Ejecutar la carga al inicio
    useEffect(() => {
        fetchExistingData();
    }, [idPaciente]);

  const handleSaveSeguimiento = async (data: SeguimientoData) => {
    // Validación: Solo necesitamos verificar que el ID del paciente sea válido.
    if (idPaciente === 0) {
      toast.error('Error: ID de paciente inválido en la URL.');
      return;
    }

    setLoading(true);

    try {
      // ✅ AÑADIR EL ID DEL PACIENTE AL OBJETO ANTES DE ENVIAR
      const dataToSend = {
        ...data,
        paciente_id: idPaciente, // 👈 Nuevo campo que el backend esperará
      };
    
      console.log('DATOS ENVIADOS AL BACKEND:', dataToSend); 
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Fallo el registro de seguimiento.');
      }

      toast.success('Seguimiento registrado exitosamente.');
      navigate(-1);
    } catch (err) {
      console.error('Error al registrar seguimiento:', err);
      toast.error('Error al guardar el seguimiento.');
    } finally {
      setLoading(false);
    }
  };

  // --- Renderizado ---

  // 💡 Renderizamos el formulario inmediatamente si tenemos un ID de paciente
  //const showForm = idPaciente !== 0;
  const showForm = idPaciente !== 0 && initialData !== null;

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6 pt-[80px]">
      <Toaster position="top-center" />
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Registrar Seguimiento de Tratamiento
      </h1>

      {/* <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        {showForm ? (
          <SeguimientoForm
            // Ya no pasamos tratamientoId, el formulario debe ser ajustado
            onSave={handleSaveSeguimiento}
            loading={loading}
          />
        ) : (
          <p className="text-center text-red-500">No se encontró un ID de paciente válido.</p>
        )}
      </div> */}

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            {loading && initialData === null ? (
                 <p className="text-center">Cargando datos de seguimiento...</p>
            ) : showForm ? (
                 <SeguimientoForm
                    initialData={initialData} // ✅ PASAR LOS DATOS INICIALES AL FORM
                    onSave={handleSaveSeguimiento}
                    loading={loading}
                 />
            ) : (
                 <p className="text-red-500 text-center">
                     No se encontró un ID de paciente válido o error de carga.
                 </p>
            )}
        </div>
    </div>
  );
}

