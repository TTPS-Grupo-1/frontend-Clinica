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
  const [fertilizacionData, setFertilizacionData] = useState<any>(null);
  const [ovocitoData, setOvocitoData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(!!id);

  // Cargar datos del embrión si existe un ID
  useEffect(() => {
    if (id) {
      const fetchEmbrion = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/embriones/${id}/`);
          setInitialData(response.data);
          
          // Si el embrión tiene fertilización asociada, cargar sus datos
          if (response.data.fertilizacion) {
            try {
              const fertResponse = await axios.get(
                `http://localhost:8000/api/fertilizacion/${response.data.fertilizacion}/`
              );
              setFertilizacionData(fertResponse.data);
              
              // Si la fertilización tiene ovocito, cargar sus datos para obtener el identificador
              if (fertResponse.data.ovocito) {
                try {
                  const ovocitoResponse = await axios.get(
                    `http://localhost:8000/api/ovocitos/${fertResponse.data.ovocito}/`
                  );
                  setOvocitoData(ovocitoResponse.data);
                } catch (ovocitoError) {
                  console.error("Error al cargar ovocito:", ovocitoError);
                }
              }
            } catch (fertError) {
              console.error("Error al cargar fertilización:", fertError);
            }
          }
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
      <div className="w-full max-w-6xl px-6 py-8 space-y-6">
        
        {/* Información de la Fertilización - Solo si existe y estamos viendo un embrión */}
        {id && fertilizacionData && (
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-blue-600">📋</span>
              Información de la Fertilización
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-600">Fecha de Fertilización</p>
                <p className="text-lg text-gray-900">{fertilizacionData.fecha_fertilizacion || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-600">Técnico de Laboratorio</p>
                <p className="text-lg text-gray-900">{fertilizacionData.tecnico_laboratorio || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-600">Técnica Utilizada</p>
                <p className="text-lg text-gray-900">
                  {fertilizacionData.tecnica_icsi ? 'ICSI' : fertilizacionData.tecnica_fiv ? 'FIV' : 'N/A'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-600">Resultado</p>
                <p className={`text-lg font-semibold ${
                  fertilizacionData.resultado === 'exitosa' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {fertilizacionData.resultado === 'exitosa' ? '✓ Exitosa' : '✗ No Exitosa'}
                </p>
              </div>
              {fertilizacionData.ovocito && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-600">Identificador del Ovocito</p>
                  <p className="text-lg text-gray-900">{ovocitoData?.identificador || fertilizacionData.ovocito}</p>
                </div>
              )}
              {fertilizacionData.semen_info && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-600">Información del Semen</p>
                  <p className="text-lg text-gray-900">{fertilizacionData.semen_info}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Formulario del Embrión */}
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
