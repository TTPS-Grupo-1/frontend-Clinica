import { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import FenotipoForm from "../components/FenotipoFormNew";


export default function DonacionPage() {
  const navigate = useNavigate();
  const { tipo } = useParams<{ tipo: 'semen' | 'ovocitos' }>();

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

  // Confirmar donación: POST a la API con el payload solicitado
  const handleConfirmDonation = async () => {
    const fenotipo = formData.fenotipo || {};
    const payload = {
      group_number: 1,
      type: tipo === 'semen' ? 'esperma' : 'ovocito',
      phenotype: {
        eye_color: fenotipo.color_ojos,
        hair_color: fenotipo.color_pelo,
        hair_type: fenotipo.tipo_pelo,
        height: fenotipo.altura,
        complexion: fenotipo.complexion,
        ethnicity: fenotipo.rasgos_etnicos,
      },
    };
    setLastPayload(payload);
    setApiError(null);
    setShowTankButton(false);
    try {
      const res = await axios.post('https://omtalaimckjolwtkgqjw.supabase.co/functions/v1/gametos-donacion', payload);
      console.log(res.data);
      if (res.data?.success === false && res.data?.error?.includes('No hay espacio disponible para almacenar el gameto')) {
        setApiError(res.data.error);
        setShowTankButton(true);
        return;
      }
      alert('Donación registrada correctamente');
      navigate('/operador/donaciones');
    } catch (err: any) {
      if (err.response?.data?.error?.includes('No hay espacio disponible para almacenar el gameto')) {
        setApiError(err.response.data.error);
        setShowTankButton(true);
        return;
      }
      console.log(err)
      setApiError('Error al registrar donación');
      alert('Error al registrar donación');
    }
  };

  // Registrar tanque: POST a la API de tanques
  const handleRegisterTank = async () => {
    setApiError(null);
    setShowTankButton(false);
    try {
      const tankPayload = {
        group_number: 1,
        type: tipo === 'semen' ? 'esperma' : 'ovocito',
        rack_count: 10,
      };
      const res = await axios.post('https://omtalaimckjolwtkgqjw.supabase.co/functions/v1/tanques', tankPayload);
      if (res.data?.success === false) {
        setApiError(res.data.error || 'Error al registrar tanque');
        setShowTankButton(true);
        return;
      }
      setTankCreated(true);
      alert('Tanque registrado correctamente. Ahora puedes registrar la donación.');
    } catch (err: any) {
      setApiError('Error al registrar tanque');
      setShowTankButton(true);
    }
  };

  // Reintentar donación tras crear tanque
  const handleRetryDonation = async () => {
    if (!lastPayload) return;
    setApiError(null);
    setShowTankButton(false);
    try {
      const res = await axios.post('https://omtalaimckjolwtkgqjw.supabase.co/functions/v1/gametos-donacion', lastPayload);
      if (res.data?.success === false && res.data?.error?.includes('No hay espacio disponible para almacenar el gameto')) {
        setApiError(res.data.error);
        setShowTankButton(true);
        return;
      }
      alert('Donación registrada correctamente');
      navigate('/operador/donaciones');
    } catch (err: any) {
      setApiError('Error al registrar donación');
      alert('Error al registrar donación');
    }
  };

  return (
    <div className={`min-h-screen pt-20 pb-8 ${tipo === 'semen' ? 'bg-gradient-to-br from-blue-50 to-indigo-100' : 'bg-gradient-to-br from-pink-50 to-rose-100'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <button
              onClick={() => navigate("/operador/donaciones")}
              className={`flex items-center mb-4 ${tipo === 'semen' ? 'text-blue-600 hover:text-blue-800' : 'text-pink-600 hover:text-pink-800'}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a Donaciones
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {tipo === 'semen' ? 'Registro de Donación de Semen' : 'Registro de Donación de Ovocitos'}
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
            {showTankButton && !tankCreated && (
              <button
                type="button"
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                onClick={handleRegisterTank}
              >
                Registrar nuevo tanque
              </button>
            )}
            {tankCreated && (
              <button
                type="button"
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                onClick={handleRetryDonation}
              >
                Registrar donación ahora
              </button>
            )}
            {/* Confirmar donación solo si todos los campos están completos */}
            {isFenotipoValid(formData.fenotipo) && !showTankButton && !tankCreated && (
              <button
                type="button"
                className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 text-lg font-semibold"
                onClick={handleConfirmDonation}
              >
                Confirmar donación
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
