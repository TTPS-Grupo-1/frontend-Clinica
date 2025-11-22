import { useState } from 'react';
import { useTransferenciaForm } from '../hooks/useTransferenciaForm';
import { useApi } from '../hooks/useApi';
import { usePacientesFetch } from '@/shared/hooks/usePacientesFetch';
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

  // Cargar pacientes
  const { pacientes, loading: pacientesLoading, error: pacientesError } = usePacientesFetch();

  // Cargar tratamientos y embriones del paciente seleccionado
  const {
    tratamientos,
    embriones,
    loading: dataLoading,
    error: dataError,
    submitTransferencia,
  } = useApi(selectedPacienteId);

  const { formData, updateField, toggleEmbrion, resetForm } = useTransferenciaForm();
  console.log('formData', embriones);
  const availableEmbriones = (embriones || []).filter((e) => {
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
      };

      await submitTransferencia(payload);
      setMessage('Transferencia registrada correctamente.');
      setMessageType('success');
      resetForm();
    } catch (err: any) {
      console.error(err);
      setMessage(err?.response?.data?.message || 'Error registrando la transferencia');
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
                      onChange={(e) => setIncludeMultiple(e.target.checked)}
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
                embriones={availableEmbriones}
                selectedTratamiento={formData.tratamiento}
                selectedEmbriones={formData.embriones}
                onTratamientoChange={(tratamiento) => updateField('tratamiento', tratamiento)}
                onEmbrionToggle={handleEmbrionToggle}
                isLoading={isLoading}
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
