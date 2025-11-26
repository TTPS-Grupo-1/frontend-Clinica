import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import ObjetivoModal from './ObjetivoModal';
import { useSelector } from 'react-redux';
import {
  ObjetivoMujerSola,
  ObjetivoParejaHeterosexual,
  ObjetivoParejaFemeninaDonacion,
  ObjetivoParejaFemeninaRopa,
} from './Objetivos';
import { useParams } from 'react-router-dom';

const PrimerConsulta: React.FC = () => {
  const { pacienteId } = useParams();
  const user = useSelector((state: any) => state.auth.user);
  const medicoId = user.id;
  const [objetivoSeleccionado, setObjetivoSeleccionado] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const updateSection = (key: string, data: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: data }));
  };

  const handleConfirmar = async () => {
    const datos = {
      objetivo: objetivoSeleccionado,
      form: formData,
      paciente_id: Number(pacienteId),
      medico_id: medicoId,
    };

    try {
      console.log('🧾 Datos listos para enviar:', datos);
      const res = await axios.post('/api/primeras-consultas/', datos, { withCredentials: true });
      console.log('✅ Respuesta del servidor:', res.data);
      toast.success('Datos enviados correctamente');
      setFormData({});
      setObjetivoSeleccionado(null);
    } catch (err: any) {
      setFormData({});
      setObjetivoSeleccionado(null);
      console.error('Error enviando datos', err);
      toast.error(err.response?.data?.message || 'Error al enviar datos');
    }
  };

  const renderObjetivo = () => {
    switch (objetivoSeleccionado) {
      case 'mujer_sola_donacion':
        return <ObjetivoMujerSola onDataChange={updateSection} />;
      case 'pareja_heterosexual':
        return <ObjetivoParejaHeterosexual onDataChange={updateSection} />;
      case 'pareja_femenina_donacion':
        return <ObjetivoParejaFemeninaDonacion onDataChange={updateSection} />;
      case 'pareja_femenina_ropa':
        return <ObjetivoParejaFemeninaRopa onDataChange={updateSection} />;
      default:
        return null;
    }
  };
  const mapObjetivo = (key: string) => {
    switch (key) {
      case 'mujer_sola_donacion':
        return 'Mujer sola con donación';
      case 'pareja_heterosexual':
        return 'Pareja heterosexual';
      case 'pareja_femenina_donacion':
        return 'Pareja femenina (donación)';
      case 'pareja_femenina_ropa':
        return 'Pareja femenina (ROPA)';
      default:
        return key;
    }
  };

  return (
    <main className="fixed inset-0 min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-white to-blue-300 px-2 py-10">
      {/* Fondo decorativo */}
      <section className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-2xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-300 opacity-30 blur-2xl" />
      </section>
      <section className="relative z-10 mx-auto max-w-3xl">
        <header className="mt-8 mb-2 flex justify-center">
          <button
            onClick={() => setModalAbierto(true)}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-blue-900"
          >
            Seleccionar objetivo
          </button>
        </header>
        {objetivoSeleccionado && (
          <section className="mb-6 flex justify-center">
            <article className="rounded-xl border border-gray-100 bg-white px-8 py-4 text-center shadow-md">
              <p className="text-lg font-semibold text-gray-800">
                Objetivo seleccionado:{' '}
                <span className="text-blue-600 capitalize">
                  {mapObjetivo(objetivoSeleccionado)}
                </span>
              </p>
            </article>
          </section>
        )}
        <ObjetivoModal
          isOpen={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onSelect={(opcion) => {
            setObjetivoSeleccionado(opcion);
            setFormData({});
          }}
        />
        <section className="mt-8 px-2 md:px-10 xl:px-24">{renderObjetivo()}</section>
        {objetivoSeleccionado && (
          <footer className="pointer-events-none fixed bottom-0 left-0 z-30 flex w-full justify-center pb-6">
            <button
              className="pointer-events-auto rounded-full border-2 border-white bg-gradient-to-r from-blue-700 to-blue-900 px-12 py-5 text-xl font-bold text-white shadow-2xl transition-all duration-200 hover:border-blue-700 hover:bg-white hover:text-blue-900"
              onClick={handleConfirmar}
            >
              Confirmar
            </button>
          </footer>
        )}
      </section>
    </main>
  );
};

export default PrimerConsulta;
