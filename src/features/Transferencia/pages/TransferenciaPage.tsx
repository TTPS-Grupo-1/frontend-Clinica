import { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmModal from '@/features/Paciente/components/ModalConfirmacionComponente';
import { toast } from 'sonner';
import type { Embryo } from '@/types/Embryo';
import { useTransferenciaForm } from '../hooks/useTransferenciaForm';
import { useApi } from '../hooks/useApi';
import { usePacientesPorEstado } from '@/shared/hooks/usePacientesPorEstado';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import {
  PacienteSelector,
  TransferenciaSelector,
  TransferenciaForm,
  TransferenciaSkeleton,
  NoTratamientosState,
  NoPacienteSelectedState,
  NoEmbrionesState,
} from '../components';
import RoleHomeButton from '../../../shared/components/RoleHomeButton';
import type { MessageType } from '../../../types/Transferencia';

export default function TransferenciaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>('info');
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(null);
  const [includeMultiple, setIncludeMultiple] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Cargar pacientes que están en estado "Fertilización" (UN SOLO FETCH)
  const {
    pacientes,
    loading: pacientesLoading,
    error: pacientesError,
  } = usePacientesPorEstado(['Fertilización']);

  // Cargar tratamientos y embriones del paciente seleccionado
  const {
    tratamientos,
    embriones,
    loading: dataLoading,
    error: dataError,
    submitTransferencia,
    refetchEmbriones,
  } = useApi(selectedPacienteId);
  const { formData, updateField, toggleEmbrion, resetForm } = useTransferenciaForm();
  const currentUser = useSelector((state: RootState) => (state.auth as any)?.user);
  const operadorId = currentUser?.id ?? null;

  // Normalizar embriones para cumplir el tipo esperado por TransferenciaSelector
  const normalizedEmbriones = (embriones || []).map((e) => ({
    ...e,
    calidad:
      e.calidad !== undefined && e.calidad !== null
        ? String((e as { calidad?: number | string }).calidad)
        : 'N/A',
    estado: (e.estado || '').toString(),
  }));

  const availableEmbriones = (normalizedEmbriones || []).filter((e) => {
    if (!e) return false;
    const estado = String(e.estado || '').toLowerCase();
    if (estado === 'transferido') return false;
    return true;
  });
  const handleEmbrionToggle = (embrionId: number) => {
    if (includeMultiple) {
      // allow the hook to toggle as usual for multi-select
      toggleEmbrion(embrionId);
      return;
    }

    // single-select mode: replace the selection with this embrion, or clear if already selected
    const current = formData.embriones || [];
    if (current.includes(embrionId)) {
      updateField('embriones', []);
    } else {
      updateField('embriones', [embrionId]);
    }
  };

  // Preseleccionar el último tratamiento no finalizado cuando cambien los tratamientos
  useEffect(() => {
    if (!selectedPacienteId) return;
    if (!tratamientos || tratamientos.length === 0) return;

    // Buscar el primer tratamiento cuyo estado no sea "finalizado"
    const notFinalized = tratamientos.find((t) => {
      const tt = t as Record<string, unknown>;
      const estado = String(tt?.['estado'] ?? tt?.['status'] ?? '').toLowerCase();
      return estado !== 'cancelado' && estado !== 'finished' && estado !== 'finalizado';
    });

    if (notFinalized && notFinalized.id) {
      updateField('tratamiento', notFinalized.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tratamientos, selectedPacienteId]);

  const handlePacienteChange = (pacienteId: number | null) => {
    setSelectedPacienteId(pacienteId);
    // Resetear el formulario cuando cambie el paciente
    resetForm();
    setMessage(null);
  };

  const validateForm = () => {
    if (!selectedPacienteId) {
      return 'Seleccioná un paciente.';
    }
    if (!formData.tratamiento) {
      return 'Seleccioná un tratamiento.';
    }
    if (formData.embriones.length === 0) {
      return 'Seleccioná al menos un embrión.';
    }

    // Validar PGT de los embriones seleccionados
    const embrionesSeleccionados = availableEmbriones.filter((e) =>
      formData.embriones.includes(e.id)
    );

    const embrionesConPgtFallido = embrionesSeleccionados.filter((e) => {
      // Verificar si el PGT es "no exitoso"
      const pgtValue = String(e.pgt || '').toLowerCase();
      return pgtValue === 'no_exitoso';
    });

    if (embrionesConPgtFallido.length > 0) {
      const ids = embrionesConPgtFallido.map(e => `#${e.id}`).join(', ');
      return `No se puede realizar la transferencia. Los siguientes embriones tienen PGT no exitoso: ${ids}`;
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      setMessageType('warning');
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const payload = {
        tratamiento: formData.tratamiento!,
        embriones: formData.embriones,
        test_positivo: formData.testPositivo,
        observaciones: '',
        quirofano: formData.quirofano ?? null,
        fecha: new Date().toISOString(),
        realizado_por: operadorId,
      };

      await submitTransferencia(payload);

      // Marcar embriones como transferidos en el backend (historial + estado)
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Token ${token}` } : {};

        await Promise.all(
          formData.embriones.map(async (embId: number) => {
            try {
              // Crear registro en historial
              await axios.post(
                `http://localhost:8000/api/historial-embrion/`,
                {
                  embrion: embId,
                  paciente: selectedPacienteId,
                  estado: 'transferido',
                  nota: 'Transferido vía interfaz de Transferencia',
                  usuario: operadorId,
                },
                { headers }
              );

              // Actualizar estado del embrion
              await axios.patch(
                `http://localhost:8000/api/embriones/${embId}/`,
                { estado: 'transferido' },
                { headers }
              );
            } catch (err) {
              console.error('Error marcando embrión como transferido', embId, err);
            }
          })
        );
      } catch (err) {
        console.error('Error al marcar embriones transferidos:', err);
      }

      // Refrescar embriones para quitar los transferidos y notificar con toast
      try {
        await refetchEmbriones();
      } catch {
        // si falla el refetch no interrumpe el flujo
      }

      toast.success('Transferencia registrada correctamente.');
      setMessage(null);
      setMessageType('success');
      resetForm();
    } catch (err: unknown) {
      console.error(err);
      let text = 'Error registrando la transferencia';
      if (axios.isAxiosError(err)) {
        type Resp = { message?: string } | undefined;
        text = (err.response?.data as Resp)?.message ?? text;
      }
      toast.error(text);
      setMessage(null);
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || pacientesLoading || dataLoading;
  const error = pacientesError || dataError;

  // Mostrar skeleton durante la carga inicial
  if (pacientesLoading) {
    return <TransferenciaSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-[80px]">
      <div className="relative mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-lg">
        <RoleHomeButton />

        <h2 className="mt-12 mb-6 text-2xl font-semibold text-gray-800">
          Registrar Transferencia Embrionaria
        </h2>

        {error && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-red-800">
            {error}
          </div>
        )}

        <div className="space-y-8">
          <PacienteSelector
            pacientes={pacientes}
            selectedPaciente={selectedPacienteId}
            onPacienteChange={handlePacienteChange}
            isLoading={pacientesLoading}
          />

          {!selectedPacienteId ? (
            <NoPacienteSelectedState />
          ) : dataLoading && tratamientos.length === 0 ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <span className="text-gray-600">Cargando tratamientos y embriones...</span>
            </div>
          ) : tratamientos.length === 0 ? (
            <NoTratamientosState />
          ) : !dataLoading && embriones.length === 0 ? (
            <NoEmbrionesState />
          ) : (
            <>
              {/* Toggle para habilitar selección múltiple de embriones - Solo aparece cuando hay MÁS DE 1 embrión */}
              {embriones.length > 1 && (
                <div className="flex items-center gap-3">
                  <label className="flex cursor-pointer items-center select-none">
                    <input
                      type="checkbox"
                      checked={includeMultiple}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        if (checked) {
                          setConfirmModalOpen(true);
                        } else {
                          setIncludeMultiple(false);
                          // Limpiar todos los embriones seleccionados al desmarcar
                          updateField('embriones', []);
                        }
                      }}
                      className="mr-2 h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">Incluir más de un embrión</span>
                  </label>
                  <span className="text-xs text-gray-400">
                    {includeMultiple ? 'Modo múltiple' : 'Modo único'}
                  </span>
                </div>
              )}

              <TransferenciaSelector
                tratamientos={tratamientos}
                embriones={availableEmbriones as unknown as Embryo[]}
                selectedTratamiento={formData.tratamiento}
                selectedEmbriones={formData.embriones}
                onTratamientoChange={(tratamiento) => updateField('tratamiento', tratamiento)}
                readOnlyTratamiento={true}
                onEmbrionToggle={handleEmbrionToggle}
                isLoading={isLoading}
              />

              <ConfirmModal
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={() => {
                  setIncludeMultiple(true);
                  setConfirmModalOpen(false);
                }}
                title="Confirmar selección múltiple"
                message="Estás seguro que querés incluir más de un embrión en la transferencia?"
              />

              <TransferenciaForm
                formData={formData}
                onFormChange={updateField}
                onSubmit={handleSubmit}
                onReset={resetForm}
                isLoading={isLoading}
                message={message}
                messageType={messageType}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
