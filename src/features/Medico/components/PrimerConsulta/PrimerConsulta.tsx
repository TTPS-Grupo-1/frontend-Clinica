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
    const datos = { objetivo: objetivoSeleccionado, form: formData };

    try {
      console.log('🧾 Datos listos para enviar:', datos);
      await axios.post('/api/primer-consulta/', datos, { withCredentials: true });
      toast.success('Datos enviados correctamente');
    } catch (err: any) {
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
    <div className="min-h-screen py-10 px-2 bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="flex justify-center mt-8 mb-2">
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-black text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-lg hover:bg-gray-800 transition"
        >
          Seleccionar objetivo
        </button>
      </div>
      {objetivoSeleccionado && (
  <div className="flex justify-center mb-6">
    <div className="bg-white px-6 py-3 rounded-lg shadow-md text-center">
      <p className="text-lg font-semibold text-gray-800">
        Objetivo seleccionado:{" "}
        <span className="text-blue-600 capitalize">
          {mapObjetivo(objetivoSeleccionado)}
        </span>
      </p>
    </div>
  </div>
)}
      <ObjetivoModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSelect={(opcion) => setObjetivoSeleccionado(opcion)}
      />

      {renderObjetivo()}

      {objetivoSeleccionado && (
        <div className="flex justify-center fixed bottom-0 left-0 w-full pb-6 z-30 pointer-events-none">
          <button
            className="pointer-events-auto bg-black text-white px-10 py-4 rounded-full shadow-xl font-bold text-lg border-2 border-white hover:bg-white hover:text-black transition duration-200"
            onClick={handleConfirmar}
          >
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
};

export default PrimerConsulta;
