import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { fertilizacionModalProps as Props } from '../../../interfaces/Fertilizacion';
import { NotebookPen } from 'lucide-react';
import { useTratamientoInfo } from '../hooks/useTratamientoInfo';
import { useBancoSemen } from '../hooks/useBancoSemen';
import { useFertilizacionForm } from '../hooks/useFertilizacionForm';
import { BancoSemenSelector } from './BancoSemenSelector';
import { NoOvocitosAlert } from './NoOvocitosAlert';


// Se espera que el modal reciba también la lista de fertilizaciones actuales
// Si no, puedes agregar la prop fertilizaciones: Fertilizacion[]
export default function FertilizacionModal({ 
  isOpen, 
  onClose, 
  onFertilize, 
  ovocitos, 
  semenes = [], 
  selectedPacienteId, 
  currentUser, 
  fertilizaciones = [] 
}: Props & { fertilizaciones?: any[] }) {
  
  // Custom hooks para separar lógica
  const { tratamientoInfo, loading: loadingTratamiento } = useTratamientoInfo(selectedPacienteId?.toString() || null, isOpen);
  const { bancoSemenSeleccionado, loadingBanco, razonBanco } = useBancoSemen(tratamientoInfo);
  const { form, updateForm, handleSubmit, submitting } = useFertilizacionForm(currentUser, ovocitos, onClose);

  // Filtrar ovocitos disponibles
  const fertilizadosIds = fertilizaciones.map(f => f.ovocito?.id_ovocito ?? f.ovocito).filter(Boolean);
  const ovocitosDisponibles = ovocitos.filter(o => !fertilizadosIds.includes(o.id_ovocito));

  // Sincronizar la razón del banco con el formulario
  useEffect(() => {
    updateForm({ razon_banco_semen: razonBanco });
  }, [razonBanco]);

  // Sincronizar el semen seleccionado automáticamente
  useEffect(() => {
    if (bancoSemenSeleccionado) {
      updateForm({ banco_semen_id: bancoSemenSeleccionado.id.toString() });
    } else if (razonBanco !== 'no_aplica') {
      updateForm({ banco_semen_id: '' });
    }
  }, [bancoSemenSeleccionado, razonBanco]);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-gray-100 flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center gap-2 mb-4">
                <NotebookPen className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg text-blue-700 font-bold">Registrar Fertilización</h3>
              </div>

              {/* Mostrar contenido según disponibilidad de ovocitos */}
              {tratamientoInfo && !tratamientoInfo.tiene_ovocitos ? (
                <NoOvocitosAlert 
                  pacienteNombre={`${tratamientoInfo.paciente.nombre} ${tratamientoInfo.paciente.apellido}`}
                  ovocitosCount={tratamientoInfo.ovocitos_count || 0}
                />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                {/* Selector de ovocito */}
                <div>
                  <label className="block text-sm text-gray-900 font-medium">Ovocito</label>
                  <select 
                    value={form.ovocito} 
                    onChange={e => updateForm({ ovocito: e.target.value })} 
                    className="w-full border border-gray-300 bg-gray-50 text-gray-900 px-3 py-2 rounded focus:ring-2 focus:ring-blue-300"
                    disabled={tratamientoInfo && !tratamientoInfo.tiene_ovocitos}
                  >
                    <option className="text-gray-500" value="">-- Selecciona ovocito --</option>
                    {ovocitosDisponibles.length === 0 ? (
                      <option disabled value="">No hay ovocitos disponibles</option>
                    ) : (
                      ovocitosDisponibles.map(o => (
                        <option key={o.id_ovocito} value={o.id_ovocito} className="text-gray-900">
                          {o.identificador}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* Selector de semen o banco */}
                {form.razon_banco_semen === 'no_aplica' ? (
                  <div>
                    <label className="block text-sm text-gray-900 font-medium">Semen (opcional)</label>
                    <input
                      type="text"
                      value={form.semen_info}
                      onChange={e => updateForm({ semen_info: e.target.value })}
                      className="w-full border border-gray-300 bg-gray-50 text-gray-900 px-3 py-2 rounded focus:ring-2 focus:ring-blue-300"
                      placeholder="Identificador, notas, etc."
                    />
                  </div>
                ) : (
                  <BancoSemenSelector
                    semenSeleccionado={bancoSemenSeleccionado}
                    loading={loadingBanco}
                    razon={form.razon_banco_semen}
                    tratamientoInfo={tratamientoInfo}
                  />
                )}

                {/* Fecha y técnico */}
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-gray-900 text-sm font-medium">Fecha de fertilización</label>
                    <input 
                      type="date" 
                      value={form.fecha_fertilizacion} 
                      onChange={e => updateForm({ fecha_fertilizacion: e.target.value })} 
                      className="w-full border border-gray-300 bg-gray-50 text-gray-900 px-3 py-2 rounded focus:ring-2 focus:ring-blue-300" 
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-900 text-sm font-medium">Técnico de laboratorio</label>
                    <input 
                      type="text" 
                      value={form.tecnico_laboratorio} 
                      onChange={e => updateForm({ tecnico_laboratorio: e.target.value })} 
                      className="w-full border border-gray-300 bg-gray-50 text-gray-900 px-3 py-2 rounded focus:ring-2 focus:ring-blue-300" 
                      placeholder="Nombre del operador" 
                    />
                  </div>
                </div>

                {/* Técnica y resultado */}
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-gray-900 text-sm font-medium">Técnica</label>
                    <select 
                      value={form.tecnica} 
                      onChange={e => updateForm({ tecnica: e.target.value })} 
                      className="w-full border border-gray-300 bg-gray-50 text-gray-900 px-3 py-2 rounded focus:ring-2 focus:ring-blue-300"
                    >
                      <option className="text-gray-500" value="">-- Selecciona técnica --</option>
                      <option className="text-gray-900" value="icsi">ICSI</option>
                      <option className="text-gray-900" value="fiv">FIV</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-900 text-sm font-medium">Resultado</label>
                    <select 
                      value={form.resultado} 
                      onChange={e => updateForm({ resultado: e.target.value })} 
                      className="w-full border border-gray-300 bg-gray-50 text-gray-900 px-3 py-2 rounded focus:ring-2 focus:ring-blue-300"
                    >
                      <option className="text-gray-900" value="exitosa">Exitosa</option>
                      <option className="text-gray-900" value="no_exitosa">No exitosa</option>
                    </select>
                  </div>
                </div>
                <div className="flex text-gray-900 justify-end gap-2 mt-4">
                  <button type="button" onClick={onClose} className="px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded hover:bg-gray-100 transition">Cancelar</button>
                  <button 
                    type="submit" 
                    disabled={submitting || (tratamientoInfo && !tratamientoInfo.tiene_ovocitos)} 
                    className={`px-3 py-2 rounded transition flex items-center gap-2 ${
                      (submitting || (tratamientoInfo && !tratamientoInfo.tiene_ovocitos))
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {submitting && <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full" />}
                    Registrar fertilización
                  </button>
                </div>
                </form>
              )}

              {/* Botones de acción siempre visibles */}
              {tratamientoInfo && !tratamientoInfo.tiene_ovocitos && (
                <div className="flex justify-end gap-2 mt-4">
                  <button 
                    type="button" 
                    onClick={onClose} 
                    className="px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded hover:bg-gray-100 transition"
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
}
