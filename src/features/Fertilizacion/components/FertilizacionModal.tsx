import React, { useState, useEffect } from 'react';
import type { fertilizacionModalProps as Props } from '../../../interfaces/Fertilizacion';


export default function FertilizacionModal({ isOpen, onClose, onFertilize, ovocitos, semenes = [], selectedPacienteId, currentUser }: Props) {
  const [form, setForm] = useState({
    ovocito: '',
    semen: '',
    fecha_fertilizacion: new Date().toISOString().slice(0,10),
    tecnico_laboratorio: currentUser ? currentUser.nombre : '',
    tecnica: '',
    resultado: 'no_exitosa',
  });

  useEffect(()=>{
    setForm((f)=>({ ...f, tecnico_laboratorio: currentUser ? currentUser.nombre : '' }));
  }, [currentUser]);

  if(!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ovocito: form.ovocito ? Number(form.ovocito) : null,
      semen: form.semen || null,
      fecha_fertilizacion: form.fecha_fertilizacion,
      tecnico_laboratorio: form.tecnico_laboratorio,
      tecnica: form.tecnica,
      resultado: form.resultado,
    };

    onFertilize(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6 border border-gray-200">
        <h3 className="text-lg text-gray-900 font-semibold mb-4">Registrar Fertilización</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-900 font-medium">Ovocito</label>
            <select value={form.ovocito} onChange={e=>setForm({...form, ovocito: e.target.value})} className="w-full border border-gray-700 bg-gray-100 text-gray-900 px-3 py-2">
              <option className="text-gray-500" value="">-- Selecciona ovocito --</option>
              {ovocitos.map(o=> (
                <option key={o.id_ovocito} value={o.id_ovocito} className="text-gray-900">{o.identificador}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-900 font-medium">Semen (opcional)</label>
            <select value={form.semen} onChange={e=>setForm({...form, semen: e.target.value})} className="w-full border border-gray-700 bg-gray-100 text-gray-900 px-3 py-2">
              <option className="text-gray-500" value="">-- Selecciona semen --</option>
              {semenes.map((s:any,i)=> <option key={i} value={s.id ?? s} className="text-gray-900">{s.nombre ?? s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-900 text-sm font-medium">Fecha de fertilización</label>
            <input type="date" value={form.fecha_fertilizacion} onChange={e=>setForm({...form, fecha_fertilizacion: e.target.value})} className="w-full border border-gray-700 bg-gray-100 text-gray-900 px-3 py-2" />
          </div>

          <div>
            <label className="block text-gray-900 text-sm font-medium">Técnico de laboratorio</label>
            <input type="text" value={form.tecnico_laboratorio} onChange={e=>setForm({...form, tecnico_laboratorio: e.target.value})} className="w-full border border-gray-700 bg-gray-100 text-gray-900 px-3 py-2" readOnly />
          </div>

          <div>
            <label className="block text-gray-900 text-sm font-medium">Técnica</label>
            <select value={form.tecnica} onChange={e=>setForm({...form, tecnica: e.target.value})} className="w-full border border-gray-700 bg-gray-100 text-gray-900 px-3 py-2">
              <option className="text-gray-500" value="">-- Selecciona técnica --</option>
              <option className="text-gray-900" value="icsi">ICSI</option>
              <option className="text-gray-900" value="fiv">FIV</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-900 text-sm font-medium">Resultado</label>
            <select value={form.resultado} onChange={e=>setForm({...form, resultado: e.target.value})} className="w-full border border-gray-700 bg-gray-100 text-gray-900 px-3 py-2">
              <option className="text-gray-900" value="exitosa">Exitosa</option>
              <option className="text-gray-900" value="no_exitosa">No exitosa</option>
            </select>
          </div>

          <div className="flex text-gray-900 justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-2 border border-gray-700 bg-gray-100 text-gray-900 rounded">Cancelar</button>
            <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Registrar fertilización</button>
          </div>
        </form>
      </div>
    </div>
  );
}
