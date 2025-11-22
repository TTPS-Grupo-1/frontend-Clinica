import React from 'react';

interface AntecedentesPersonalesData {
  fuma: string;
  alcohol: string;
  drogas: string;
  observaciones: string;
}

interface AntecedentesPersonalesProps {
  titulo?: string;
  value?: AntecedentesPersonalesData;
  onDataChange?: (data: AntecedentesPersonalesData) => void;
}

const AntecedentesPersonales: React.FC<AntecedentesPersonalesProps> = ({
  titulo,
  value = { fuma: '', alcohol: '', drogas: '', observaciones: '' },
  onDataChange,
}) => {
  const handleChange = (field: keyof AntecedentesPersonalesData, newValue: string) => {
    onDataChange?.({ ...value, [field]: newValue });
  };

  return (
    <div className="mx-auto flex min-h-[400px] max-w-2xl flex-col justify-between rounded-xl border border-gray-300 bg-white p-8 text-black shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold text-black">
        {titulo || 'Antecedentes Personales'}
      </h2>

      <div className="mb-4">
        <label className="mb-1 block font-medium text-black">Fuma (pack-días):</label>
        <input
          type="text"
          className="w-full rounded border border-black bg-white px-2 py-1 text-black"
          placeholder="Ej: 10 cigarrillos/día * 5 años / 20 = 2.5"
          value={value.fuma}
          onChange={(e) => handleChange('fuma', e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block font-medium text-black">
          Consume alcohol (frecuencia y tipo):
        </label>
        <input
          type="text"
          className="w-full rounded border border-black bg-white px-2 py-1 text-black"
          placeholder="Ej: 2 veces por semana, cerveza"
          value={value.alcohol}
          onChange={(e) => handleChange('alcohol', e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block font-medium text-black">Drogas recreativas:</label>
        <input
          type="text"
          className="w-full rounded border border-black bg-white px-2 py-1 text-black"
          placeholder="Ej: marihuana ocasional"
          value={value.drogas}
          onChange={(e) => handleChange('drogas', e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block font-medium text-black">Observaciones sobre hábitos:</label>
        <textarea
          className="w-full rounded border border-black bg-white px-2 py-1 text-black"
          placeholder="Observaciones libres sobre hábitos"
          value={value.observaciones}
          onChange={(e) => handleChange('observaciones', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
};

export default AntecedentesPersonales;
