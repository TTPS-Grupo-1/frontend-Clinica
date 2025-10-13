import React, { useState } from 'react';
import type { AntecedentesGinecologicosProps } from '../../../../interfaces/Medico';

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

const AntecedentesGinecologicos: React.FC<AntecedentesGinecologicosProps> = ({ doble = false, titulo1 = 'Datos', titulo2 = 'Mujer 2', onDataChange }) => {
  const [datos1, setDatos1] = useState({ ...inicial });
  const [datos2, setDatos2] = useState({ ...inicial });

  React.useEffect(() => {
    onDataChange?.({ datos1, datos2: doble ? datos2 : undefined });
  }, [datos1, datos2, doble]);

  const handleChange = (idx: 1 | 2, name: string, value: string) => {
    if (idx === 1) setDatos1(prev => ({ ...prev, [name]: value }));
    else setDatos2(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-xl mx-auto rounded shadow p-6 border-2 border-black bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Antecedentes Ginecológicos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2 text-black">{doble ? titulo1 : 'Datos'}</h3>
          {campos.map(c => (
            <div className="mb-3" key={c.name}>
              <label className="block font-medium mb-1 text-black">{c.label}</label>
              <input
                type={c.type}
                className="w-full border border-black rounded px-2 py-1 bg-white text-black"
                placeholder={c.placeholder}
                value={datos1[c.name]}
                onChange={e => handleChange(1, c.name, e.target.value)}
              />
            </div>
          ))}
        </div>
        {doble && (
          <div>
            <h3 className="font-semibold mb-2 text-black">{titulo2}</h3>
            {campos.map(c => (
              <div className="mb-3" key={c.name}>
                <label className="block font-medium mb-1 text-black">{c.label}</label>
                <input
                  type={c.type}
                  className="w-full border border-black rounded px-2 py-1 bg-white text-black"
                  placeholder={c.placeholder}
                  value={datos2[c.name]}
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
