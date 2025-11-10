import React, { useEffect, useState } from "react";
import type { FenotipoFormProps } from "../../../interfaces/DonacionesForms";
import axios from "axios";

export default function FenotipoForm({ fenotipo, onChange }: FenotipoFormProps) {
  const [enums, setEnums] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchEnums = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://omtalaimckjolwtkgqjw.supabase.co/functions/v1/fenotipos');
        const data = res.data;
        console.log(data)
        if (mounted && data?.enums) setEnums(data.enums);
      } catch (err) {
        console.error('Error fetching enums:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchEnums();
    return () => { mounted = false };
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    onChange({
      ...fenotipo,
      [field]: value,
    });
  };


  const eyeOptions = enums?.eye_color?.values || [];
  const hairOptions = enums?.hair_color?.values || [];
  const hairTypeOptions = enums?.hair_type?.values || [];
  const complexionOptions = enums?.complexion?.values || [];
  const ethnicityOptions = enums?.ethnicity?.values || [];
  return (
    <section className="bg-gray-50 p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Datos Fenotípicos</h2>
      {loading && <p className="text-sm text-gray-500">Cargando opciones...</p>}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color de Ojos *</label>
          <select
            name="color_ojos"
            required
            value={fenotipo.color_ojos || ''}
            onChange={(e) => handleInputChange('color_ojos', e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar...</option>
            {eyeOptions.map((v: string) => (
              <option key={v} value={v}>{v.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color de Pelo *</label>
          <select
            name="color_pelo"
            required
            value={fenotipo.color_pelo || ''}
            onChange={(e) => handleInputChange('color_pelo', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar...</option>
            {hairOptions.map((v: string) => (
              <option key={v} value={v}>{v.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Pelo *</label>
          <select
            name="tipo_pelo"
            required
            value={fenotipo.tipo_pelo || ''}
            onChange={(e) => handleInputChange('tipo_pelo', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar...</option>
            {hairTypeOptions.map((v: string) => (
              <option key={v} value={v}>{v.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm) *</label>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              name="altura-slider"
              min={140}
              max={220}
              step={1}
              value={fenotipo.altura ?? 170}
              onChange={e => handleInputChange('altura', Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="altura"
                required
                min={140}
                max={220}
                step={1}
                value={fenotipo.altura ?? ''}
                onChange={e => {
                  const val = e.target.value;
                  if (!val || isNaN(Number(val))) {
                    handleInputChange('altura', '');
                    return;
                  }
                  const num = Number(val);
                  if (num < 140 || num > 220) return;
                  handleInputChange('altura', num);
                }}
                className="w-24 px-2 py-1 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 170"
                aria-describedby="altura-help"
              />
              <span className="text-sm text-gray-600">cm</span>
              <span className="ml-2 text-xs text-blue-700 font-semibold">{fenotipo.altura ? fenotipo.altura + ' cm' : ''}</span>
            </div>
            <small id="altura-help" className="text-xs text-gray-500 block mt-1">
              Puede ajustar con el slider o escribir el valor. Rango permitido: 140 a 220 cm.
            </small>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Complexión *</label>
          <select
            name="complexion"
            required
            value={fenotipo.complexion || ''}
            onChange={(e) => handleInputChange('complexion', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar...</option>
            {complexionOptions.map((v: string) => (
              <option key={v} value={v}>{v.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Origen étnico</label>
          <select
            name="rasgos_etnicos"
            value={fenotipo.rasgos_etnicos || ''}
            onChange={(e) => handleInputChange('rasgos_etnicos', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar...</option>
            {ethnicityOptions.map((v: string) => (
              <option key={v} value={v}>{v.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}