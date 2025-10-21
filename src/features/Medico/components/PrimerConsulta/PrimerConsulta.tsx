import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import ObjetivoModal from './ObjetivoModal';
import {
  ObjetivoMujerSola,
  ObjetivoParejaHeterosexual,
  ObjetivoParejaFemeninaDonacion,
  ObjetivoParejaFemeninaRopa,
} from './Objetivos';

const PrimerConsulta: React.FC = () => {
  const [objetivoSeleccionado, setObjetivoSeleccionado] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const updateSection = (key: string, data: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: data }));
  };

  const handleConfirmar = async () => {
    const datos = { objetivo: objetivoSeleccionado, form: formData, paciente_id: 1, medico_id: 1 }; // Reemplazar con IDs reales

    try {
      console.log('🧾 Datos listos para enviar:', datos);
      await axios.post('/api/primeras-consultas/', datos, { withCredentials: true });
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
    case "mujer_sola_donacion":
      return "Mujer sola con donación";
    case "pareja_heterosexual":
      return "Pareja heterosexual";
    case "pareja_femenina_donacion":
      return "Pareja femenina (donación)";
    case "pareja_femenina_ropa":
      return "Pareja femenina (ROPA)";
    default:
      return key;
  }
};


  return (
    <main className="fixed inset-0 min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-blue-300 px-2 py-10 overflow-x-hidden">
      {/* Fondo decorativo */}
      <section className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-2xl" />
      </section>
      <section className="relative z-10 max-w-3xl mx-auto">
        <header className="flex justify-center mt-8 mb-2">
          <button
            onClick={() => setModalAbierto(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl shadow-lg font-semibold text-lg hover:scale-105 hover:from-blue-700 hover:to-blue-900 transition-all"
          >
            Seleccionar objetivo
          </button>
        </header>
        {objetivoSeleccionado && (
          <section className="flex justify-center mb-6">
            <article className="bg-white px-8 py-4 rounded-xl shadow-md text-center border border-gray-100">
              <p className="text-lg font-semibold text-gray-800">
                Objetivo seleccionado:{" "}
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
          onSelect={(opcion) => setObjetivoSeleccionado(opcion)}
        />
        <section className="mt-8 px-2 md:px-10 xl:px-24">
          {renderObjetivo()}
        </section>
        {objetivoSeleccionado && (
          <footer className="flex justify-center fixed bottom-0 left-0 w-full pb-6 z-30 pointer-events-none">
            <button
              className="pointer-events-auto bg-gradient-to-r from-blue-700 to-blue-900 text-white px-12 py-5 rounded-full shadow-2xl font-bold text-xl border-2 border-white hover:bg-white hover:text-blue-900 hover:border-blue-700 transition-all duration-200"
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
