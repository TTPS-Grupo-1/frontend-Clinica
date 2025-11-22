import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import LoadingView from './modal/FertilizacionLoadingView';
import EvaluationView from './modal/FertilizacionEvaluationView';
import ConfirmationView from './modal/FertilizacionConfirmationView';
import ExecutingView from './modal/FertilizacionExecutingView';
import CompletedView from './modal/FertilizacionCompletedView';
import { BancoSemenSelector } from './BancoSemenSelector';
import { useOvocitosFetch } from '../../../shared/hooks/useOvocitosFetch';
import { useTratamientoInfo } from '../hooks/useTratamientoInfo';
import type { FertilizacionModalProps } from '../../../interfaces/Fertilizacion';
import { useBancoSemen } from '../hooks';
import { useBancoOvocitos } from '../hooks/useBancoOvocitos';
import { useFertilizacionProceso } from '../hooks/useFertilizacionForm';
import type { PasoFertilizacion } from '../../../types/Fertilizacion';
import { useNavigate } from 'react-router-dom';

export default function FertilizacionModal({
  isOpen,
  onClose,
  selectedPacienteId,
  selectedPacienteNombre = null,
  currentUserId,
}: FertilizacionModalProps) {
  const navigate = useNavigate(); // ✅ Agregar useNavigate
  const [paso, setPaso] = useState<PasoFertilizacion>('evaluacion');
  const [tecnica, setTecnica] = useState<'ICSI' | 'FIV'>('ICSI');
  const [ovocitoSeleccionado, setOvocitoSeleccionado] = useState<number | null>(null);
  const [resultado, setResultado] = useState<'exitosa' | 'fallida'>('exitosa');
  const [observaciones, setObservaciones] = useState('');

  // Usar los hooks existentes
  const { ovocitos, loading: ovocitosLoading } = useOvocitosFetch(selectedPacienteId);

  const { tratamientoInfo, loading: tratamientoLoading } = useTratamientoInfo(
    selectedPacienteId?.toString() || null,
    isOpen
  );
  const [ovocitosCriopreservados, setOvocitosCriopreservados] = useState<any[]>([]);

  // Hooks para banco de semen y ovocitos
  const { bancoSemenSeleccionado, loadingBanco, razonBanco } = useBancoSemen(tratamientoInfo);
  const {
    bancoOvocitos,
    loadingBancoOvocitos,
    ovocitoDonadoSeleccionado,
    setOvocitoDonadoSeleccionado,
  } = useBancoOvocitos(tratamientoInfo);

  // Hook para el proceso de fertilización
  const { ejecutarProceso } = useFertilizacionProceso();

  const loading = ovocitosLoading || tratamientoLoading;

  const semenViable = tratamientoInfo?.segunda_consulta?.semen_viable || false;
  const ovocitosViables = tratamientoInfo?.segunda_consulta?.ovocito_viable || false;
  const ovocitosFrescos = ovocitos.filter((o) => o.tipo_estado === 'fresco');

  const tieneBancoSeleccionado = Boolean(bancoSemenSeleccionado);
  const tieneOvocitosDonados = bancoOvocitos.length > 0;

  const puedeRealizar =
    (ovocitosFrescos.length > 0 || ovocitosCriopreservados.length > 0 || tieneOvocitosDonados) &&
    (semenViable || tieneBancoSeleccionado);
  // Permitir continuar si hay ovocitos disponibles (propios o donados) y existe
  // Simplificar: identificar ovocitos criopreservados directamente por su estado
  useEffect(() => {
    if (!ovocitos || ovocitos.length === 0) {
      setOvocitosCriopreservados([]);
      return;
    }

    const crios = ovocitos.filter(
      (o: any) => (o.tipo_estado || '').toString().toLowerCase() === 'criopreservado'
    );
    setOvocitosCriopreservados(crios);
  }, [ovocitos]);

  // Reset cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setPaso('evaluacion');
      setOvocitoSeleccionado(null);
      setResultado('exitosa');
      setObservaciones('');
      setOvocitoDonadoSeleccionado(null);
    }
  }, [isOpen]);

  // (Variables ya declaradas arriba)

  const handleEjecutarProceso = async () => {
    if (!selectedPacienteId || !currentUserId) return;

    setPaso('ejecutando');

    const result = await ejecutarProceso({
      selectedPacienteId,
      currentUserId,
      tecnica,
      resultado,
      observaciones,
      semenViable,
      ovocitoSeleccionado,
      ovocitoDonadoSeleccionado,
      bancoSemenSeleccionado,
      razonBanco,
      ovocitosFrescos,
      ovocitosCriopreservados,
    });

    if (result.success) {
      setPaso('completado');

      // ✅ Si se creó un embrión, redirigir después de cerrar el modal
      if (result.embrionId) {
        setTimeout(() => {
          onClose();
          navigate(`/embriones/${result.embrionId}`); // ✅ Redirigir al embrión
        }, 2000);
      } else {
        setTimeout(() => onClose(), 2000);
      }
    } else {
      setPaso('confirmacion');
    }
  };

  // presentational components are imported from separate files

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white text-gray-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b p-6">
              <h2 className="text-xl font-bold text-gray-900">
                Fertilización -{' '}
                {selectedPacienteNombre
                  ? `${selectedPacienteNombre}`
                  : selectedPacienteId
                    ? `Paciente ${selectedPacienteId}`
                    : 'Sin paciente'}
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="max-h-[calc(90vh-120px)] overflow-y-auto p-6">
              {paso === 'evaluacion' &&
                (loading ? (
                  <LoadingView />
                ) : (
                  <div className="space-y-4">
                    <EvaluationView
                      semenViable={semenViable}
                      ovocitosViables={ovocitosViables}
                      ovocitosFrescosCount={ovocitosFrescos.length}
                      ovocitosCriopreservadosCount={ovocitosCriopreservados.length}
                      puedeRealizar={puedeRealizar}
                      onContinue={() => {
                        // Si no hay ovocito seleccionado, pre-seleccionar el primero disponible
                        if (ovocitoSeleccionado === null) {
                          if (ovocitosFrescos.length > 0) {
                            setOvocitoSeleccionado(
                              (ovocitosFrescos[0] as any).id_ovocito ??
                                (ovocitosFrescos[0] as any).id ??
                                null
                            );
                          } else if (ovocitosCriopreservados.length > 0) {
                            setOvocitoSeleccionado(
                              (ovocitosCriopreservados[0] as any).id ??
                                (ovocitosCriopreservados[0] as any).id_ovocito ??
                                null
                            );
                          } else if (bancoOvocitos.length > 0) {
                            // Seleccionar primer ovocito donado disponible
                            setOvocitoDonadoSeleccionado(bancoOvocitos[0]);
                          }
                        }
                        setPaso('confirmacion');
                      }}
                    />

                    {/* Mostrar el selector del banco de semen cuando el semen NO es viable */}
                    {!semenViable && (
                      <BancoSemenSelector
                        semenSeleccionado={bancoSemenSeleccionado}
                        loading={loadingBanco}
                        razon={razonBanco}
                        tratamientoInfo={tratamientoInfo}
                      />
                    )}

                    {/* Mostrar el selector del banco de ovocitos cuando los ovocitos NO son viables */}
                    {!ovocitosViables && (
                      <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                        <h4 className="mb-3 font-medium text-yellow-800">
                          Banco de Ovocitos Donados
                        </h4>

                        {loadingBancoOvocitos ? (
                          <div className="py-4 text-center">
                            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-yellow-600"></div>
                            <p className="mt-2 text-sm text-yellow-600">
                              Buscando ovocitos compatibles...
                            </p>
                          </div>
                        ) : bancoOvocitos.length > 0 ? (
                          <div className="space-y-2">
                            <p className="mb-2 text-sm text-yellow-700">
                              Se encontraron {bancoOvocitos.length} ovocitos donados compatibles:
                            </p>
                            {bancoOvocitos.map((ovocito, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between rounded border border-yellow-200 bg-white p-3"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-gray-800">
                                    {ovocito.identificador}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    Compatibilidad: {ovocito.compatibilidad}% | Donante:{' '}
                                    {ovocito.edad_donante} años | Disponibles:{' '}
                                    {ovocito.cantidad_disponible}
                                  </p>
                                </div>
                                <button
                                  onClick={() => setOvocitoDonadoSeleccionado(ovocito)}
                                  className={`rounded px-3 py-1 text-xs ${
                                    ovocitoDonadoSeleccionado?.id === ovocito.id
                                      ? 'bg-yellow-600 text-white'
                                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                  }`}
                                >
                                  {ovocitoDonadoSeleccionado?.id === ovocito.id
                                    ? 'Seleccionado'
                                    : 'Seleccionar'}
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-yellow-700">
                            No se encontraron ovocitos donados compatibles con el fenotipo de la
                            paciente.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}

              {paso === 'confirmacion' && (
                <ConfirmationView
                  tecnica={tecnica}
                  setTecnica={setTecnica}
                  ovocitosFrescos={ovocitosFrescos}
                  ovocitosCriopreservados={ovocitosCriopreservados}
                  ovocitoSeleccionado={ovocitoSeleccionado}
                  setOvocitoSeleccionado={setOvocitoSeleccionado}
                  ovocitoDonadoSeleccionado={ovocitoDonadoSeleccionado}
                  resultado={resultado}
                  setResultado={setResultado}
                  observaciones={observaciones}
                  setObservaciones={setObservaciones}
                  onBack={() => setPaso('evaluacion')}
                  onSubmit={handleEjecutarProceso}
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
