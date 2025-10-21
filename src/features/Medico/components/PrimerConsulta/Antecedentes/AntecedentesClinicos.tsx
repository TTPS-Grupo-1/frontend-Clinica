import React, { useState, useEffect } from 'react';
import Paginador from '../Paginador';
import type { AntecedenteClinicosProps } from '../../../../../interfaces/Medico';
const ANTECEDENTES = [
  'Diabetes',
  'Hipertensión arterial',
  'Enfermedad tiroidea',
  'Trombofilia',
  'Obesidad',
  'Endometriosis',
  'Miomatosis uterina',
  'Cirugías previas',
  'Abortos espontáneos',
  'Embarazos previos',
  'Enfermedad autoinmune',
  'Alergias',
  'Consumo de tabaco',
  'Consumo de alcohol',
  'Consumo de drogas',
  'Antecedentes oncológicos',
  'Enfermedad renal',
  'Enfermedad hepática',
  'Enfermedad pulmonar',
  'Enfermedad cardíaca',
  'Otros',
];

const ANTECEDENTES_POR_PAGINA = 7;



const AntecedentesClinicos: React.FC<AntecedenteClinicosProps> = ({ titulo, onDataChange }) => {
  const [pagina, setPagina] = useState(1);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  const totalPaginas = Math.ceil(ANTECEDENTES.length / ANTECEDENTES_POR_PAGINA);
  const inicio = (pagina - 1) * ANTECEDENTES_POR_PAGINA;
  const antecedentesPagina = ANTECEDENTES.slice(inicio, inicio + ANTECEDENTES_POR_PAGINA);

  const handleToggle = (antecedente: string) => {
    setSeleccionados((prev) =>
      prev.includes(antecedente)
        ? prev.filter((a) => a !== antecedente)
        : [...prev, antecedente]
    );
  };

  // 🔄 Notifica cambios al padre
  useEffect(() => {
    onDataChange?.(seleccionados);
  }, [seleccionados]);

  return (
  <div className="max-w-2xl mx-auto rounded-xl shadow-lg p-8 border border-gray-300 bg-white text-black flex flex-col justify-between min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        {titulo || 'Antecedentes Clínicos'}
      </h2>

      <div className="space-y-2">
        {antecedentesPagina.map((ant) => (
          <label key={ant} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={seleccionados.includes(ant)}
              onChange={() => handleToggle(ant)}
              className="w-4 h-4 accent-blue-600"
            />
            <span>{ant}</span>
          </label>
        ))}
      </div>

      <div className="mt-4">
        <Paginador
          paginaActual={pagina}
          totalPaginas={totalPaginas}
          onPageChange={setPagina}
        />
      </div>
    </div>
  );
};

export default AntecedentesClinicos;
