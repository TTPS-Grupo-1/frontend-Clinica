import { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import FenotipoForm from "../components/FenotipoFormNew";
import { Dialog } from '@headlessui/react';
import Modal from '../components/Modal';

export default function DonacionPage() {
  // Modal para registrar tanque
  const [showTankModal, setShowTankModal] = useState(false);
  const [tankLoading, setTankLoading] = useState(false);
  // Modal para éxito
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // Registrar tanque: POST a la API de tanques
  const handleRegisterTank = async () => {
    setTankLoading(true);
    setApiError(null);
    try {
      // Llama al backend propio para registrar tanque
      const tankPayload = {
        group_number: 1,
        type: tipo,
        rack_count: 10,
      };
      const resBackend = await axios.post('/api/tanques/registrar/', tankPayload);
      if (!resBackend.data?.success && resBackend.data?.success !== undefined) {
        setApiError(resBackend.data?.error || 'Error en el backend');
        setTankLoading(false);
        return;
      }
      setTankLoading(false);
      setShowTankModal(false);
      setTankCreated(true);
      // Intentar donación inmediatamente después de crear tanque
      if (lastPayload) {
        await handleDonation(lastPayload);
      }
    } catch (err: any) {
      setApiError('Error al registrar tanque');
      setTankLoading(false);
    }
  }

  const navigate = useNavigate();
  const { tipo } = useParams<{ tipo: 'esperma' | 'ovocitos' }>();

  // Estado único para todo el formulario
  const [formData, setFormData] = useState<any>({
    datosDonante: {},
    fenotipo: {},
    datosMedicos: {},
    resultadosGeneticos: {},
    aptoParaUso: true,
    estado: 'Disponible',
    // Solo ovocitos
    datosObtencion: {},
    destino: 'Asignado a paciente',
    numOvocitos: 0,
  });


  // Estado para guardar el último payload y mostrar UI especial si falta tanque
  const [lastPayload, setLastPayload] = useState<any | null>(null);
  const [showTankButton, setShowTankButton] = useState(false);
  const [tankCreated, setTankCreated] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Validación de fenotipo
  function isFenotipoValid(fenotipo: any) {
    return (
      fenotipo.color_ojos &&
      fenotipo.color_pelo &&
      fenotipo.tipo_pelo &&
      fenotipo.altura &&
      fenotipo.complexion &&
      fenotipo.rasgos_etnicos
    );
  }

  // Confirmar donación o reintentar: POST a la API con el payload solicitado
  const handleDonation = async (payload?: any) => {
    const fenotipo = formData.fenotipo || {};
    const finalPayload = payload || {
      group_number: 1,
      type: tipo,
      phenotype: {
        eye_color: fenotipo.color_ojos,
        hair_color: fenotipo.color_pelo,
        hair_type: fenotipo.tipo_pelo,
        height: fenotipo.altura,
        complexion: fenotipo.complexion,
        ethnicity: fenotipo.rasgos_etnicos,
      },
    };
    console.log(finalPayload)
    setLastPayload(finalPayload);
    setApiError(null);
    setShowTankButton(false);
    try {
      const res = await axios.post('/api/donacion/', finalPayload);
      const errorMsg = res.data?.error || "";
      if (
        errorMsg.includes('No hay espacio disponible para almacenar el gameto') ||
        errorMsg.includes('No hay tanques de tipo ovocito en el grupo 1') ||
        errorMsg.includes('No hay tanques de tipo esperma en el grupo 1')
      ) {
        setApiError(errorMsg);
        setShowTankModal(true);
        return;
      }
      setShowSuccessModal(true);
      // navigate('/operador/donaciones'); // Navega solo cuando el usuario cierre el modal
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "";
      if (
        errorMsg.includes('No hay espacio disponible para almacenar el gameto') ||
        errorMsg.includes('No hay tanques de tipo ovocito en el grupo 1') ||
        errorMsg.includes('No hay tanques de tipo esperma en el grupo 1')
      ) {
        setApiError(errorMsg);
        setShowTankModal(true);
        return;
      }
      console.log(err)
      setApiError('Error al registrar donación');
      alert('Error al registrar donación');
    }
  };

  return (
    <div className={`min-h-screen pt-20 pb-8 ${tipo === 'esperma' ? 'bg-gradient-to-br from-blue-50 to-indigo-100' : 'bg-gradient-to-br from-pink-50 to-rose-100'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <button
              onClick={() => navigate("/operador/donaciones")}
              className={`flex items-center mb-4 ${tipo === 'esperma' ? 'text-blue-600 hover:text-blue-800' : 'text-pink-600 hover:text-pink-800'}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a Donaciones
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {tipo === 'esperma' ? 'Registro de Donación de Semen' : 'Registro de Donación de Ovocitos'}
            </h1>
            <p className="text-gray-600">
              Complete todos los campos requeridos para registrar una nueva donación
            </p>
          </div>
          <form className="space-y-8" onSubmit={e => e.preventDefault()}>
            <FenotipoForm
              fenotipo={formData.fenotipo}
              onChange={fenotipo => setFormData((f: any) => ({ ...f, fenotipo }))}
            />
            {apiError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
                <strong>Error:</strong> {apiError}
              </div>
            )}
            {/* Modal propio para registrar tanque */}
            <Modal open={showTankModal} onClose={() => setShowTankModal(false)}>
              <div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto z-10">
                <h2 className="text-lg font-bold mb-2">No hay tanques disponibles</h2>
                <p className="mb-4 text-gray-700">{apiError || 'No hay espacio disponible para almacenar el gameto. ¿Desea registrar un nuevo tanque?'}</p>
                <button
                  type="button"
                  className={`w-full py-2 rounded-lg font-semibold ${tankLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white mb-2`}
                  disabled={tankLoading}
                  onClick={handleRegisterTank}
                >
                  Registrar nuevo tanque
                </button>
                <button
                  type="button"
                  className="w-full py-2 rounded-lg font-semibold bg-gray-200 text-gray-700"
                  onClick={() => setShowTankModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </Modal>
            {/* Modal de éxito */}
            <Modal open={showSuccessModal} onClose={() => { setShowSuccessModal(false); navigate('/operador/donaciones'); }}>
              <div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto z-10 text-center">
                <h2 className="text-lg font-bold mb-2 text-green-700">¡Donación registrada correctamente!</h2>
                <p className="mb-4 text-gray-700">La donación fue registrada con éxito.</p>
                <button
                  type="button"
                  className="w-full py-2 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700"
                  onClick={() => { setShowSuccessModal(false); navigate('/operador/donaciones'); }}
                >
                  Ir a Donaciones
                </button>
              </div>
            </Modal>
            {/* El botón para "Registrar donación ahora" ya no es necesario porque la donación se intenta automáticamente después de crear el tanque. Puedes eliminar este bloque completamente. */}
            {/* Confirmar donación solo si todos los campos están completos */}
            {isFenotipoValid(formData.fenotipo) && !showTankButton && !tankCreated && (
              <button
                type="button"
                className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 text-lg font-semibold"
                onClick={() => handleDonation()}
              >
                Confirmar donación
              </button>
            )}
            {tankCreated && (
              <button
                type="button"
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                onClick={() => lastPayload && handleDonation(lastPayload)}
              >
                Reintentar donación
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
