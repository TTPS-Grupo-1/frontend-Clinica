import { useState } from 'react';
import { useTransferenciaForm } from '../hooks/useTransferenciaForm';
import { useApi } from '../hooks/useApi';
import { usePacientesFetch } from '../../../shared/hooks/usePacientesFetch';
import { 
  PacienteSelector,
  TransferenciaSelector, 
  TransferenciaForm,
  TransferenciaSkeleton,
  NoTratamientosState,
  NoPacienteSelectedState
} from '../components';
import type { MessageType } from '../../../types/Transferencia';

export default function TransferenciaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>('info');
  const [selectedPacienteId, setSelectedPacienteId] = useState<number | null>(null);

  // Cargar pacientes
  const { pacientes, loading: pacientesLoading, error: pacientesError } = usePacientesFetch();
  
  // Cargar tratamientos y embriones del paciente seleccionado
  const { tratamientos, embriones, loading: dataLoading, error: dataError, submitTransferencia } = useApi(selectedPacienteId);
  
  const { formData, updateField, toggleEmbrion, resetForm } = useTransferenciaForm();

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
        observaciones: ''
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
    <div className="p-6 bg-gray-50 min-h-screen pt-[80px]">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Registrar Transferencia Embrionaria
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg border bg-red-50 border-red-300 text-red-800">
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
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
              <span className="text-gray-600">Cargando tratamientos y embriones...</span>
            </div>
          ) : tratamientos.length === 0 ? (
            <NoTratamientosState />
          ) : (
            <>
              <TransferenciaSelector
                tratamientos={tratamientos}
                embriones={embriones}
                selectedTratamiento={formData.tratamiento}
                selectedEmbriones={formData.embriones}
                onTratamientoChange={(tratamiento) => updateField('tratamiento', tratamiento)}
                onEmbrionToggle={toggleEmbrion}
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
