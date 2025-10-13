import React, { useState, useEffect } from 'react';
import AntecedenteItem from './AntecedenteItemClinico';
import Paginador from './Paginador';

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

const AntecedentesClinicos: React.FC<{ titulo?: string; onDataChange?: (data: any) => void }> = ({ titulo, onDataChange }) => {
  const [pagina, setPagina] = useState(1);
  const [valores, setValores] = useState<{ [key: string]: string }>({});

  const totalPaginas = Math.ceil(ANTECEDENTES.length / ANTECEDENTES_POR_PAGINA);
  const inicio = (pagina - 1) * ANTECEDENTES_POR_PAGINA;
  const antecedentesPagina = ANTECEDENTES.slice(inicio, inicio + ANTECEDENTES_POR_PAGINA);

  const handleChange = (antecedente: string, value: string) => {
    setValores((prev) => ({ ...prev, [antecedente]: value }));
  };

  // ✅ Este efecto se ejecuta después de cada render en que cambian los valores
  useEffect(() => {
    onDataChange?.(valores);
  }, [valores]);

  return (
    <div className="max-w-xl mx-auto rounded shadow p-6 border-2 border-black bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">{titulo || 'Antecedentes Clínicos'}</h2>
      <div>
        {antecedentesPagina.map((ant) => (
          <AntecedenteItem
            key={ant}
            antecedente={ant}
            value={valores[ant] || ''}
            onChange={(v) => handleChange(ant, v)}
          />
        ))}
      </div>
      <Paginador
        paginaActual={pagina}
        totalPaginas={totalPaginas}
        onPageChange={setPagina}
      />
    </div>
  );
};

export default AntecedentesClinicos;
