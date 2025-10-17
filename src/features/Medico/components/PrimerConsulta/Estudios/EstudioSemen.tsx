import React, { useState, useEffect } from 'react';
import type { AntecedentesGenitalesProps } from '../../../../../interfaces/Medico';
import Paginador from '../Paginador'; // ✅ Asegurate de tener este componente

const ESTUDIOS_SEMEN = [
  'Espermograma básico',
  'Espermograma avanzado',
  'Test de capacitación espermática',
  'Fragmentación de ADN espermático',
  'Cultivo seminal',
  'Anticuerpos antiespermatozoides',
  'Evaluación morfológica Kruger',
  'Test postcoital',
  'Test de viabilidad espermática',
  'Capacitación espermática HBA',
];

const ESTUDIOS_POR_PAGINA = 5;

const EstudioSemen: React.FC<AntecedentesGenitalesProps> = ({ visible, onDataChange }) => {
  const [pagina, setPagina] = useState(1);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  // 🔄 Actualiza al padre cuando cambian los seleccionados
  useEffect(() => {
    onDataChange?.({ estudiosSeleccionados: seleccionados });
  }, [seleccionados]);

  if (!visible) return null;

  const totalPaginas = Math.ceil(ESTUDIOS_SEMEN.length / ESTUDIOS_POR_PAGINA);
  const inicio = (pagina - 1) * ESTUDIOS_POR_PAGINA;
  const estudiosPagina = ESTUDIOS_SEMEN.slice(inicio, inicio + ESTUDIOS_POR_PAGINA);

  const toggleSeleccion = (estudio: string) => {
    setSeleccionados((prev) =>
      prev.includes(estudio)
        ? prev.filter((e) => e !== estudio)
        : [...prev, estudio]
    );
  };

  return (
    <div className="max-w-xl mx-auto rounded shadow p-6 border-2 border-black bg-white text-black mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Estudios de semen
      </h2>

      <div className="space-y-2">
        {estudiosPagina.map((estudio) => (
          <label key={estudio} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={seleccionados.includes(estudio)}
              onChange={() => toggleSeleccion(estudio)}
              className="h-4 w-4 accent-black"
            />
            <span>{estudio}</span>
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

export default EstudioSemen;
