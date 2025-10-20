import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { generateUniqueId } from '../../../shared/utils/generateUniqueId';
import type { fertilizacionModalProps as Props } from '../../../interfaces/Fertilizacion';
import { NotebookPen } from 'lucide-react';


export default function FertilizacionModal({ isOpen, onClose, onFertilize, ovocitos, semenes = [], selectedPacienteId, currentUser }: Props) {
  const [form, setForm] = useState({
    ovocito: '',
    semen_info: '',
    fecha_fertilizacion: new Date().toISOString().slice(0,10),
    tecnico_laboratorio: currentUser ? currentUser.nombre : '',
    tecnica: '',
    resultado: 'no_exitosa',
  });

  useEffect(()=>{
    setForm((f)=>({ ...f, tecnico_laboratorio: currentUser ? currentUser.nombre : f.tecnico_laboratorio }));
  }, [currentUser]);

  if(!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Adaptar técnica a los booleanos que espera el modelo
    const tecnica_icsi = form.tecnica === "icsi";
    const tecnica_fiv = form.tecnica === "fiv";

    // Solo enviar los campos requeridos por el modelo
    const payload: any = {
      ovocito: form.ovocito ? Number(form.ovocito) : null,
      semen_info: form.semen_info || null,
      fecha_fertilizacion: form.fecha_fertilizacion,
      tecnico_laboratorio: form.tecnico_laboratorio,
      tecnica_icsi,
      tecnica_fiv,
      resultado: form.resultado,
    };

    try {
      // Primero registrar la fertilización directamente para obtener el ID
      const fertilizacionResponse = await axios.post('http://localhost:8000/api/fertilizacion/', payload);
      const fertilizacionId = fertilizacionResponse.data.id_fertilizacion || fertilizacionResponse.data.id;
      
      toast.success('Fertilización registrada exitosamente');

      // Si es exitosa, crear embrión automáticamente
      if (form.resultado === 'exitosa' && form.ovocito) {
        const ovocitoSeleccionado = ovocitos.find(o => o.id_ovocito === Number(form.ovocito));
        
        const identificadorEmbrion = generateUniqueId({
          prefix: "EMB",
          nombre: ovocitoSeleccionado?.identificador || "UNK",
          apellido: "",
        });

        const embrionPayload = {
          identificador: identificadorEmbrion,
          fertilizacion: fertilizacionId,  // ID de la fertilización recién creada
          estado: "no transferido",
        };

        await axios.post('http://localhost:8000/api/embriones/', embrionPayload);
        toast.success(`Embrión ${identificadorEmbrion} creado exitosamente`);
      }

      onClose();
    } catch (error: any) {
      console.error('Error completo:', error);
      const errorMsg = error?.response?.data?.detail || 
                       error?.response?.data?.message || 
                       error?.message || 
                       'Error al registrar';
      toast.error(errorMsg);
    }
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
            <input
              type="text"
              value={form.semen_info}
              onChange={e=>setForm({...form, semen_info: e.target.value})}
              className="w-full border border-gray-700 bg-gray-100 text-gray-900 px-3 py-2"
              placeholder="Identificador, notas, etc."
            />
          </div>

          <div>
            <label className="block text-gray-900 text-sm font-medium">Fecha de fertilización</label>
            <input type="date" value={form.fecha_fertilizacion} onChange={e=>setForm({...form, fecha_fertilizacion: e.target.value})} className="w-full border border-gray-700 bg-gray-100 text-gray-900 px-3 py-2" />
          </div>

          <div>
            <label className="block text-gray-900 text-sm font-medium">Técnico de laboratorio</label>
            <input type="text" value={form.tecnico_laboratorio} onChange={e=>setForm({...form, tecnico_laboratorio: e.target.value})} className="w-full border border-gray-700 bg-gray-100 text-gray-900 px-3 py-2" placeholder="Nombre del operador" />
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
