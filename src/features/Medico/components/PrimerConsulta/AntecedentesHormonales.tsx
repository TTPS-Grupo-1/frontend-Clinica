import React, { useEffect, useState } from 'react';

interface Campo {
  id: number;
  nombre: string;
}

interface AntecedentesHormonalesProps {
  onSeleccionChange?: (seleccionados: string[]) => void;
}

const AntecedentesHormonales: React.FC<AntecedentesHormonalesProps> = ({ onSeleccionChange }) => {
  const [campos, setCampos] = useState<Campo[]>([]);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  // Datos simulados (pueden venir de una API)
  const camposBase: Campo[] = [
    { id: 1, nombre: 'Tiroxina' },
    { id: 2, nombre: 'Corticoides' },
    { id: 3, nombre: 'Insulina' },
    { id: 4, nombre: 'Terapia hormonal' },
    { id: 5, nombre: 'Anticonceptivos' },
    { id: 6, nombre: 'Otros' },
  ];

  useEffect(() => {
    const fetchSimulado = async () => {
      await new Promise((res) => setTimeout(res, 200));
      setCampos(camposBase);
    };
    fetchSimulado();
  }, []);

  const handleCheckbox = (nombre: string) => {
    setSeleccionados((prev) => {
      const nuevos = prev.includes(nombre) ? prev.filter((n) => n !== nombre) : [...prev, nombre];
      onSeleccionChange?.(nuevos);
      return nuevos;
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-6 rounded shadow p-6 border-2 border-black bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Antecedentes Hormonales</h2>
      {campos.length === 0 ? (
        <p className="text-center text-gray-600">Cargando antecedentes...</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {campos.map((c) => (
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
      )}
    </div>
  );
};

export default AntecedentesHormonales;