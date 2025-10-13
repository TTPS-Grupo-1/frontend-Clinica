import React, { useState } from 'react';
import AntecedenteItem from './AntecedenteItem';
import Paginador from './Paginador';

// Lista hardcodeada de antecedentes quirúrgicos (puedes reemplazar por fetch en el futuro)
const ANTECEDENTES_QUIRURGICOS = [
  'Apendicectomía',
  'Colecistectomía',
  'Cesárea',
  'Miomectomía',
  'Laparoscopía diagnóstica',
  'Resección de endometriosis',
  'Cirugía bariátrica',
  'Histerectomía',
  'Cirugía de ovario',
  'Cirugía de trompas',
  'Cirugía de mama',
  'Cirugía cardíaca',
  'Cirugía renal',
  'Cirugía hepática',
  'Cirugía pulmonar',
  'Cirugía traumatológica',
  'Cirugía oncológica',
  'Otra cirugía',
];

const ANTECEDENTES_POR_PAGINA = 7;

const AntecedentesQuirurgicos: React.FC<{ titulo?: string; onDataChange?: (data: any) => void }> = ({ titulo, onDataChange }) => {
  const [pagina, setPagina] = useState(1);
  const [valores, setValores] = useState<{ [key: string]: boolean }>({});

  const totalPaginas = Math.ceil(ANTECEDENTES_QUIRURGICOS.length / ANTECEDENTES_POR_PAGINA);
  const inicio = (pagina - 1) * ANTECEDENTES_POR_PAGINA;
  const antecedentesPagina = ANTECEDENTES_QUIRURGICOS.slice(inicio, inicio + ANTECEDENTES_POR_PAGINA);

  const handleChange = (antecedente: string, value: boolean) => {
    setValores((prev) => {
      const next = { ...prev, [antecedente]: value };
      onDataChange?.(next);
      return next;
    });
  };

  return (
    <div className="max-w-xl mx-auto rounded shadow p-6 border-2 border-black bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">{titulo || 'Antecedentes Quirúrgicos'}</h2>
      <div>
        {antecedentesPagina.map((ant) => (
          <AntecedenteItem
            key={ant}
            antecedente={ant}
            value={!!valores[ant]}
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

export default AntecedentesQuirurgicos;
