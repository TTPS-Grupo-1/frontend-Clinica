import React, { useEffect, useState } from 'react';

interface Campo {
  id: number;
  nombre: string;
}

interface AntecedentesGinecologicosAPIProps {
  onSeleccionChange?: (seleccionados: string[]) => void;
  onDataChange?: (data: any) => void;
}

const EstudioGinecologico: React.FC<AntecedentesGinecologicosAPIProps> = ({
  onSeleccionChange,
  onDataChange
}) => {
  const [campos, setCampos] = useState<Campo[]>([]);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  const camposBase: Campo[] = [
    { id: 1, nombre: 'Uso de anticonceptivos' },
    { id: 2, nombre: 'Endometriosis' },
    { id: 3, nombre: 'Menopausia' },
    { id: 4, nombre: 'Dismenorrea severa' },
    { id: 5, nombre: 'Quistes ováricos' },
    { id: 6, nombre: 'Miomas uterinos' },
    { id: 7, nombre: 'Síndrome de ovario poliquístico (SOP)' },
    { id: 8, nombre: 'Cirugías ginecológicas previas' },
    { id: 9, nombre: 'Infecciones ginecológicas recurrentes' },
  ];

  useEffect(() => {
    const fetchCamposSimulado = async () => {
      await new Promise(res => setTimeout(res, 300));
      setCampos(camposBase);
    };
    fetchCamposSimulado();
  }, []);

  const handleCheckbox = (nombre: string) => {
    setSeleccionados(prev =>
      prev.includes(nombre)
        ? prev.filter(item => item !== nombre)
        : [...prev, nombre]
    );
  };

  // ✅ Notificar al padre solo después de que se actualice el estado
  useEffect(() => {
    onSeleccionChange?.(seleccionados);
    onDataChange?.({ seleccionados });
  }, [seleccionados]);

  return (
    <div className="max-w-xl mx-auto mt-6 rounded shadow p-6 border-2 border-black bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Realizar Estudios Ginecológicos 
      </h2>
      {campos.length === 0 ? (
        <p className="text-center text-gray-600">Cargando antecedentes...</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {campos.map(c => (
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

export default EstudioGinecologico;
