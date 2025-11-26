import React from 'react';
import type { AntecedentesGinecologicosProps } from '../../../../../interfaces/Medico';

const campos = [
  {
    label: 'Menarca (edad de primera menstruación)',
    name: 'menarca',
    type: 'number',
    placeholder: 'Edad en años',
  },
  { label: 'Ciclos menstruales', name: 'ciclos', type: 'text', placeholder: 'Ej: 28 días' },
  {
    label: 'Regular o irregular',
    name: 'regularidad',
    type: 'text',
    placeholder: 'Regular/Irregular',
  },
  { label: 'Duración en días', name: 'duracion', type: 'number', placeholder: 'Cantidad de días' },
  {
    label: 'Características del sangrado',
    name: 'sangrado',
    type: 'text',
    placeholder: 'Descripción',
  },
  { label: 'G (cantidad de embarazos)', name: 'g', type: 'number', placeholder: 'Ej: 2' },
  { label: 'P (número de partos)', name: 'p', type: 'number', placeholder: 'Ej: 1' },
  { label: 'AB (cantidad de abortos)', name: 'ab', type: 'number', placeholder: 'Ej: 0' },
  { label: 'ST (embarazos ectópicos)', name: 'st', type: 'number', placeholder: 'Ej: 0' },
];

const inicial = Object.fromEntries(campos.map((c) => [c.name, '']));

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
    <div className="mx-auto flex min-h-[400px] max-w-2xl flex-col justify-between rounded-xl border border-gray-300 bg-white p-8 text-black shadow-lg">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-blue-800">
        Antecedentes Ginecológicos
      </h2>

      <div className={`grid ${doble ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8`}>
        <div className="rounded-lg bg-blue-50 p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-blue-700">{doble ? titulo1 : 'Datos'}</h3>
          {campos.map((c) => (
            <div className="mb-5" key={c.name}>
              <label className="mb-2 block font-medium text-gray-700">{c.label}</label>
              <input
                type={c.type}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-black transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                placeholder={c.placeholder}
                value={value.datos1[c.name] || ''}
                onChange={(e) => handleChange(1, c.name, e.target.value)}
              />
            </div>
          ))}
        </div>

        {doble && (
          <div className="rounded-lg bg-blue-50 p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-blue-700">{titulo2}</h3>
            {campos.map((c) => (
              <div className="mb-5" key={c.name}>
                <label className="mb-2 block font-medium text-gray-700">{c.label}</label>
                <input
                  type={c.type}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-black transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                  placeholder={c.placeholder}
                  value={value.datos2?.[c.name] || ''}
                  onChange={(e) => handleChange(2, c.name, e.target.value)}
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
