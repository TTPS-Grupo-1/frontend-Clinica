import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import LoadingView from './modal/FertilizacionLoadingView';
import EvaluationView from './modal/FertilizacionEvaluationView';
import ConfirmationView from './modal/FertilizacionConfirmationView';
import ExecutingView from './modal/FertilizacionExecutingView';
import CompletedView from './modal/FertilizacionCompletedView';
import { 
  ejecutarFertilizacion,
  ejecutarDescriPreservacion
} from '../utils/fertilizacionHelpers';
import { useOvocitosFetch } from '../../../shared/hooks/useOvocitosFetch';
import { useHistorialOvocitoFetch } from '../../../shared/hooks/useHistorialOvocitoFetch';
import { useTratamientoInfo } from '../hooks/useTratamientoInfo';
import type { FertilizacionModalProps } from '../../../interfaces/Fertilizacion';

type PasoFertilizacion = 'evaluacion' | 'confirmacion' | 'ejecutando' | 'completado';

export default function FertilizacionModal({ 
  isOpen, 
  onClose, 
  selectedPacienteId, 
  selectedPacienteNombre = null,
  currentUserId
}: FertilizacionModalProps) {
  const [paso, setPaso] = useState<PasoFertilizacion>('evaluacion');
  const [tecnica, setTecnica] = useState<'ICSI' | 'FIV'>('ICSI');
  const [ovocitoSeleccionado, setOvocitoSeleccionado] = useState<number | null>(null);
  const [resultado, setResultado] = useState<'exitosa' | 'fallida'>('exitosa');
  const [observaciones, setObservaciones] = useState('');

  // Usar los hooks existentes
  const { ovocitos, loading: ovocitosLoading } = useOvocitosFetch(selectedPacienteId);
  const { historial, loading: historialLoading } = useHistorialOvocitoFetch(selectedPacienteId);
  const { tratamientoInfo, loading: tratamientoLoading } = useTratamientoInfo(selectedPacienteId?.toString() || null, isOpen);

  const loading = ovocitosLoading || historialLoading || tratamientoLoading;

  // Reset cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setPaso('evaluacion');
      setOvocitoSeleccionado(null);
      setResultado('exitosa');
      setObservaciones('');
    }
  }, [isOpen]);

  const semenViable = tratamientoInfo?.segunda_consulta?.semen_viable || false;
  const ovocitosViables = tratamientoInfo?.segunda_consulta?.ovocito_viable || false;
  const ovocitosFrescos = ovocitos.filter(o => o.tipo_estado === 'fresco');
  const ovocitosCriopreservados = historial.filter(h => h.estado === 'criopreservado');

  const puedeRealizar = semenViable && ovocitosViables && (ovocitosFrescos.length > 0 || ovocitosCriopreservados.length > 0);

  const ejecutarProceso = async () => {
    if (!selectedPacienteId || !currentUserId || ovocitoSeleccionado === null) {
      return;
    }

    setPaso('ejecutando');
    
    try {
      // Preparar ids seleccionados (ahora sólo uno) y, si está criopreservado, descriopreservarlo primero
      const selectedIds = ovocitoSeleccionado ? [ovocitoSeleccionado] : [];
      const ovocitosParaDescripreservar = selectedIds.filter(id => 
        ovocitosCriopreservados.some(o => o.id === id)
      );

      if (ovocitosParaDescripreservar.length > 0) {
        await ejecutarDescriPreservacion(ovocitosParaDescripreservar, currentUserId);
      }

      const fechaHoy = new Date().toISOString().slice(0, 10);

      const fertilizacionData: any = {
        ovocito: ovocitoSeleccionado as number,
        fecha_fertilizacion: fechaHoy,
        tecnico_laboratorio: String(currentUserId),
        tecnica_icsi: tecnica === 'ICSI',
        tecnica_fiv: tecnica === 'FIV',
        resultado: resultado === 'exitosa' ? 'exitosa' : 'no_exitosa',
        notas: `Técnica: ${tecnica}. TecnicoId: ${currentUserId}. ${observaciones}`,
        semen_info: semenViable ? 'pareja' : null,
        banco_semen_id: null,
        razon_banco_semen: 'no_aplica',
      };

      // ✅ Pasar todos los ovocitos (frescos + criopreservados) para la creación del embrión
      const todosOvocitos = [...ovocitosFrescos, ...ovocitosCriopreservados];
      const exito = await ejecutarFertilizacion(fertilizacionData, todosOvocitos);
      
      if (exito) {
        setPaso('completado');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error('Error al registrar fertilización');
      }
      
    } catch (error) {
      console.error('Error ejecutando fertilización:', error);
      setPaso('confirmacion');
    }
  };

  // presentational components are imported from separate files

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden text-gray-900"
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Fertilización - {selectedPacienteNombre ? `${selectedPacienteNombre}` : (selectedPacienteId ? `Paciente ${selectedPacienteId}` : 'Sin paciente')}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {paso === 'evaluacion' && (loading ? <LoadingView /> : <EvaluationView
                semenViable={semenViable}
                ovocitosViables={ovocitosViables}
                ovocitosFrescosCount={ovocitosFrescos.length}
                ovocitosCriopreservadosCount={ovocitosCriopreservados.length}
                puedeRealizar={puedeRealizar}
                onContinue={() => setPaso('confirmacion')}
              />)}

              {paso === 'confirmacion' && (
                <ConfirmationView
                  tecnica={tecnica}
                  setTecnica={setTecnica}
                  ovocitosFrescos={ovocitosFrescos}
                  ovocitosCriopreservados={ovocitosCriopreservados}
                  ovocitoSeleccionado={ovocitoSeleccionado}
                  setOvocitoSeleccionado={setOvocitoSeleccionado}
                  resultado={resultado}
                  setResultado={setResultado}
                  observaciones={observaciones}
                  setObservaciones={setObservaciones}
                  onBack={() => setPaso('evaluacion')}
                  onSubmit={ejecutarProceso}
                />
              )}

              {paso === 'ejecutando' && <ExecutingView />}
              {paso === 'completado' && <CompletedView />}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}