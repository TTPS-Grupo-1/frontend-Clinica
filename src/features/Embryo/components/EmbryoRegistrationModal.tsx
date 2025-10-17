import React, { useState, useEffect } from 'react';
import type { EmbryoNewModalProps } from '../../../interfaces/Embryo';

export default function EmbryoRegistrationModal({ isOpen, onClose, onSubmit, initialValues }: EmbryoNewModalProps) {
  const [form, setForm] = useState({
    calidad: '3',
    pot: 'OK',
    fecha_baja: '',
    causaDescarte: '',
    observaciones: '',
    estado: 'transferido',
  });

  useEffect(()=>{
    if(initialValues) setForm({...form, ...initialValues});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  if(!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Registro de Embrión</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Calidad</label>
            <select value={form.calidad} onChange={e=>setForm({...form, calidad: e.target.value})} className="w-full border px-3 py-2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">PGT (opcional)</label>
            <select value={form.pot} onChange={e=>setForm({...form, pot: e.target.value})} className="w-full border px-3 py-2">
              <option value="-">No aplica</option>
              <option value="OK">OK</option>
              <option value="NOT OK">NOT OK</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Fecha de baja (opcional)</label>
            <input type="date" value={form.fecha_baja} onChange={e=>setForm({...form, fecha_baja: e.target.value})} className="w-full border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Causa de descarte (opcional)</label>
            <input type="text" value={form.causaDescarte} onChange={e=>setForm({...form, causaDescarte: e.target.value})} className="w-full border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Observaciones</label>
            <textarea value={form.observaciones} onChange={e=>setForm({...form, observaciones: e.target.value})} className="w-full border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Estado</label>
            <select value={form.estado} onChange={e=>setForm({...form, estado: e.target.value})} className="w-full border px-3 py-2">
              <option value="transferido">Transferido</option>
              <option value="no_transferido">No transferido</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-2 border rounded">Cancelar</button>
            <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Registrar embrión</button>
          </div>
        </form>
      </div>
    </div>
  );
}
