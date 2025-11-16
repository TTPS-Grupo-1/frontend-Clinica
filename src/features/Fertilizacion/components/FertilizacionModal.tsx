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
  console.log("Ovocitos obtenidos:", ovocitos);
  const { historial, loading: historialLoading } = useHistorialOvocitoFetch(selectedPacienteId);
  const { tratamientoInfo, loading: tratamientoLoading } = useTratamientoInfo(selectedPacienteId?.toString() || null, isOpen);
  const [ovocitosCriopreservados, setOvocitosCriopreservados] = useState<any[]>([]);

  const loading = ovocitosLoading || tratamientoLoading;

  // Simplificar: identificar ovocitos criopreservados directamente por su estado
  useEffect(() => {
    if (!ovocitos || ovocitos.length === 0) {
      setOvocitosCriopreservados([]);
      return;
    }

    const crios = ovocitos.filter((o: any) => (o.tipo_estado || '').toString().toLowerCase() === 'criopreservado');
    setOvocitosCriopreservados(crios);
  }, [ovocitos]);

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


  const puedeRealizar = semenViable && ovocitosViables && (ovocitosFrescos.length > 0 || ovocitosCriopreservados.length > 0);

  const ejecutarProceso = async () => {
    if (!selectedPacienteId || !currentUserId) return;

    setPaso('ejecutando');
    try {
      // Preparar ids seleccionados (ahora sólo uno) y, si está criopreservado, descriopreservarlo primero
      const selectedIds = ovocitoSeleccionado ? [ovocitoSeleccionado] : [];
      const ovocitosParaDescripreservar = selectedIds.filter(id => 
        ovocitosCriopreservados.some(o => o.id === id)
    
      );

      if (ovocitosParaDescripreservar.length > 0) {
        const res = await ejecutarDescriPreservacion(ovocitosParaDescripreservar, currentUserId);
        console.log('Ovocitos descriopreservados:', res);
      }

      const fechaHoy = new Date().toISOString().slice(0, 10);

      const basePayload: any = {
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

      const todosOvocitos = [...ovocitosFrescos, ...ovocitosCriopreservados];
      if (todosOvocitos.length === 0) throw new Error('No hay ovocitos disponibles para fertilizar');

      const resultados: boolean[] = [];
      for (const ov of todosOvocitos) {
        const ovId = (ov as any).id_ovocito ?? (ov as any).id;
        const esCrio = (ov as any).tipo_estado && (ov as any).tipo_estado.toString().toLowerCase() === 'criopreservado';
        if (esCrio) {
          await ejecutarDescriPreservacion([ovId], currentUserId);
        }

        const fertilizacionData: any = {
          ...basePayload,
          ovocitos_utilizados: ovId,
          ovocito: ovId,
        };

        const exitoIndividual = await ejecutarFertilizacion(fertilizacionData, [ov]);
        resultados.push(Boolean(exitoIndividual));
      }

      const todosExitos = resultados.length > 0 && resultados.every(r => r === true);
      if (todosExitos) {
        setPaso('completado');
        setTimeout(() => onClose(), 2000);
      } else {
        throw new Error('Algunas fertilizaciones fallaron');
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