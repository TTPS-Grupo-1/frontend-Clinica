import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import EmbrionForm from "../components/Embrion";
import type { Embryo } from "../../../types/Embryo";

export default function EmbrionPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<Partial<Embryo> | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(!!id);

  // Cargar datos del embrión si existe un ID
  useEffect(() => {
    if (id) {
      const fetchEmbrion = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/embriones/${id}/`);
          setInitialData(response.data);
        } catch (error) {
          console.error("Error al cargar embrión:", error);
          toast.error("Error al cargar los datos del embrión");
        } finally {
          setLoadingData(false);
        }
      };
      fetchEmbrion();
    }
  }, [id]);

  const handleSubmit = async (data: Partial<Embryo>) => {
    setLoading(true);
    try {
      let response;
      if (id) {
        // Actualizar embrión existente
        response = await axios.put(
          `http://localhost:8000/api/embriones/${id}/`,
          data
        );
        toast.success("Embrión actualizado exitosamente");
      } else {
        // Crear nuevo embrión
        response = await axios.post(
          "http://localhost:8000/api/embriones/",
          data
        );
        toast.success("Datos del embrión registrados exitosamente");
      }
      
      console.log("Embrión guardado:", response);
      
      if (response.status === 201 || response.status === 200) {
        setTimeout(() => {
          navigate("/embriones");
        }, 1500);
      }
    } catch (error: any) {
      console.error("Error al guardar embrión:", error);
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.detail ||
        "Error al guardar los datos del embrión";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/embriones");
  };

  if (loadingData) {
    return (
      <main className="pt-28 flex flex-col items-center min-h-screen bg-gray-50">
        <div className="mt-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Cargando datos del embrión...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 flex flex-col items-center min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <div className="w-full max-w-4xl px-6 py-8">
        <EmbrionForm 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEdit={!!id}
          initialData={initialData}
        />
        {loading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-2">
              {id ? "Actualizando embrión..." : "Registrando datos del embrión..."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
