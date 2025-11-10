import React from 'react';
import type { AntecedentesGinecologicosProps } from '../../../../../interfaces/Medico';

const campos = [
  { label: 'Menarca (edad de primera menstruación)', name: 'menarca', type: 'number', placeholder: 'Edad en años' },
  { label: 'Ciclos menstruales', name: 'ciclos', type: 'text', placeholder: 'Ej: 28 días' },
  { label: 'Regular o irregular', name: 'regularidad', type: 'text', placeholder: 'Regular/Irregular' },
  { label: 'Duración en días', name: 'duracion', type: 'number', placeholder: 'Cantidad de días' },
  { label: 'Características del sangrado', name: 'sangrado', type: 'text', placeholder: 'Descripción' },
  { label: 'G (cantidad de embarazos)', name: 'g', type: 'number', placeholder: 'Ej: 2' },
  { label: 'P (número de partos)', name: 'p', type: 'number', placeholder: 'Ej: 1' },
  { label: 'AB (cantidad de abortos)', name: 'ab', type: 'number', placeholder: 'Ej: 0' },
  { label: 'ST (embarazos ectópicos)', name: 'st', type: 'number', placeholder: 'Ej: 0' },
];

const inicial = Object.fromEntries(campos.map(c => [c.name, '']));

const AntecedentesGinecologicos: React.FC<AntecedentesGinecologicosProps> = ({
  doble = false,
  titulo1 = 'Datos',
  titulo2 = 'Mujer 2',
  onDataChange,
  value = { datos1: { ...inicial }, datos2: { ...inicial } },
}) => {
  // 🧩 Función que actualiza directamente y notifica al padre
  const handleChange = (idx: 1 | 2, name: string, val: string) => {
    const newData = {
      ...value,
      datos1: idx === 1 ? { ...value.datos1, [name]: val } : value.datos1,
      datos2: idx === 2 ? { ...value.datos2, [name]: val } : value.datos2,
    };
    onDataChange?.(newData);
  };

  return (
    <div className="max-w-2xl mx-auto rounded-xl shadow-lg p-8 border border-gray-300 bg-white text-black flex flex-col justify-between min-h-[400px]">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-800 tracking-tight">
        Antecedentes Ginecológicos
      </h2>

      <div className={`grid ${doble ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8`}>
        <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4 text-blue-700 text-lg">
            {doble ? titulo1 : 'Datos'}
          </h3>
          {campos.map(c => (
            <div className="mb-5" key={c.name}>
              <label className="block font-medium mb-2 text-gray-700">
                {c.label}
              </label>
              <input
                type={c.type}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-black focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                placeholder={c.placeholder}
                value={value.datos1[c.name] || ''}
                onChange={e => handleChange(1, c.name, e.target.value)}
              />
            </div>
          ))}
        </div>

        {doble && (
          <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4 text-blue-700 text-lg">
              {titulo2}
            </h3>
            {campos.map(c => (
              <div className="mb-5" key={c.name}>
                <label className="block font-medium mb-2 text-gray-700">
                  {c.label}
                </label>
                <input
                  type={c.type}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-black focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                  placeholder={c.placeholder}
                  value={value.datos2?.[c.name] || ''}
                  onChange={e => handleChange(2, c.name, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AntecedentesGinecologicos;
