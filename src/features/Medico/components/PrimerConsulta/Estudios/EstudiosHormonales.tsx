import React, { useEffect, useState } from 'react';
import Paginador from '../Paginador'; // ✅ Asegurate de tenerlo importado

interface Campo {
  id: number;
  nombre: string;
}

interface AntecedentesHormonalesProps {
  onSeleccionChange?: (seleccionados: string[]) => void;
  onDataChange?: (data: any) => void;
}

const ANTECEDENTES_POR_PAGINA = 4;

const EstudiosHormonales: React.FC<AntecedentesHormonalesProps> = ({
  onSeleccionChange,
  onDataChange
}) => {
  const [campos, setCampos] = useState<Campo[]>([]);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [pagina, setPagina] = useState(1);

  // ✅ Datos simulados (futuro: obtener de API)
  const camposBase: Campo[] = [
    { id: 1, nombre: 'Tiroxina' },
    { id: 2, nombre: 'Corticoides' },
    { id: 3, nombre: 'Insulina' },
    { id: 4, nombre: 'Terapia hormonal' },
    { id: 5, nombre: 'Anticonceptivos' },
    { id: 6, nombre: 'Hormona de crecimiento' },
    { id: 7, nombre: 'Prolactina' },
    { id: 8, nombre: 'Andrógenos' },
  ];

  // Simula carga asincrónica
  useEffect(() => {
    const fetchSimulado = async () => {
      await new Promise((res) => setTimeout(res, 200));
      setCampos(camposBase);
    };
    fetchSimulado();
  }, []);

  const totalPaginas = Math.ceil(campos.length / ANTECEDENTES_POR_PAGINA);
  const inicio = (pagina - 1) * ANTECEDENTES_POR_PAGINA;
  const camposPagina = campos.slice(inicio, inicio + ANTECEDENTES_POR_PAGINA);

  // ✅ Manejo de selección
  const handleCheckbox = (nombre: string) => {
    setSeleccionados((prev) =>
      prev.includes(nombre)
        ? prev.filter((n) => n !== nombre)
        : [...prev, nombre]
    );
  };

  // ✅ Notificar al padre cuando cambien los seleccionados
  useEffect(() => {
    onSeleccionChange?.(seleccionados);
    onDataChange?.({ seleccionados });
  }, [seleccionados]);

  return (
    <div className="max-w-xl mx-auto mt-6 rounded shadow p-6 border-2 border-black bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Antecedentes Hormonales
      </h2>

      {campos.length === 0 ? (
        <p className="text-center text-gray-600">Cargando antecedentes...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3">
            {camposPagina.map((c) => (
              <label key={c.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={seleccionados.includes(c.nombre)}
                  onChange={() => handleCheckbox(c.nombre)}
                  className="h-4 w-4 border-black accent-black"
                />
                <span className="text-black">{c.nombre}</span>
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
        </>
      )}
    </div>
  );
};

export default EstudiosHormonales;
