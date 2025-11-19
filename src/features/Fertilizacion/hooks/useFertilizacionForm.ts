import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeaders, ejecutarFertilizacion, ejecutarDescriPreservacion } from '../utils/fertilizacionHelpers';
import { toast } from 'sonner';
import { generateUniqueId } from '../../../shared/utils/generateUniqueId';
import type { FertilizacionParams, FertilizacionForm } from '../../../interfaces/Fertilizacion';
export const useFertilizacionForm = (
  currentUser: any,
  ovocitos: any[],
  onClose: () => void
) => {
  const [form, setForm] = useState<FertilizacionForm>({
    ovocito: '',
    semen_info: '',
    fecha_fertilizacion: new Date().toISOString().slice(0, 10),
    tecnico_laboratorio: currentUser ? currentUser.nombre : '',
    tecnica: '',
    resultado: 'no_exitosa',
    banco_semen_id: '',
    razon_banco_semen: 'no_aplica',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm(f => ({
      ...f,
      tecnico_laboratorio: currentUser ? currentUser.nombre : f.tecnico_laboratorio
    }));
  }, [currentUser]);

  const updateForm = (updates: Partial<FertilizacionForm>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ovocito: form.ovocito ? Number(form.ovocito) : null,
      semen_info: form.semen_info || null,
      fecha_fertilizacion: form.fecha_fertilizacion,
      tecnico_laboratorio: form.tecnico_laboratorio,
      tecnica_icsi: form.tecnica === "icsi",
      tecnica_fiv: form.tecnica === "fiv",
      resultado: form.resultado,
      banco_semen_id: form.banco_semen_id ? Number(form.banco_semen_id) : null,
      razon_banco_semen: form.razon_banco_semen,
    };

    try {
      // Crear fertilización (añadir headers de auth)
      const headers = getAuthHeaders();
      const fertilizacionResponse = await axios.post('http://localhost:8000/api/fertilizacion/', payload, { headers });
      const fertilizacionId = fertilizacionResponse.data.id_fertilizacion || fertilizacionResponse.data.id;
      
      toast.success('Fertilización registrada exitosamente');

      // Crear embrión si la fertilización fue exitosa
      if (form.resultado === 'exitosa' && form.ovocito) {
        const ovocitoSeleccionado = ovocitos.find(o => o.id_ovocito === Number(form.ovocito));
        const identificadorEmbrion = generateUniqueId({
          prefix: "EMB",
          nombre: ovocitoSeleccionado?.identificador || "UNK",
          apellido: "",
        });

        const embrionPayload = {
          identificador: identificadorEmbrion,
          fertilizacion: fertilizacionId,
          estado: "no transferido",
        };

        await axios.post('http://localhost:8000/api/embriones/', embrionPayload, { headers });
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
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    updateForm,
    handleSubmit,
    submitting
  };
};


export const useFertilizacionProceso = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ejecutarProceso = async (params: FertilizacionParams): Promise<boolean> => {
    const {
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
      ovocitosCriopreservados
    } = params;

    if (!selectedPacienteId || !currentUserId) {
      setError('Faltan datos del paciente o usuario');
      return false;
    }

    setIsExecuting(true);
    setError(null);

    try {
      const fechaHoy = new Date().toISOString().slice(0, 10);
      const tieneBancoSeleccionado = Boolean(bancoSemenSeleccionado);

      const basePayload: any = {
        fecha_fertilizacion: fechaHoy,
        tecnico_laboratorio: String(currentUserId),
        tecnica_icsi: tecnica === 'ICSI',
        tecnica_fiv: tecnica === 'FIV',
        resultado: resultado === 'exitosa' ? 'exitosa' : 'no_exitosa',
        notas: `Técnica: ${tecnica}. TecnicoId: ${currentUserId}. ${observaciones}`,
        // Definir origen del semen: 'pareja' cuando semenViable, 'banco' cuando se usó banco
        semen_info: semenViable ? 'pareja' : (tieneBancoSeleccionado ? 'banco' : null),
        banco_semen_id: tieneBancoSeleccionado ? (bancoSemenSeleccionado.id ?? bancoSemenSeleccionado.identificador ?? null) : null,
        razon_banco_semen: tieneBancoSeleccionado ? (razonBanco || 'no_aplica') : 'no_aplica',
      };

      // Si hay un ovocito donado seleccionado, usarlo directamente
      if (ovocitoDonadoSeleccionado) {
        const fertilizacionData: any = {
          ...basePayload,
          ovocitos_utilizados: ovocitoDonadoSeleccionado.id,
          ovocito: ovocitoDonadoSeleccionado.id,
          // Agregar información del ovocito donado
          ovocito_donado_id: ovocitoDonadoSeleccionado.id,
          ovocito_info: 'donado',
        };

        const exitoIndividual = await ejecutarFertilizacion(fertilizacionData, [ovocitoDonadoSeleccionado]);
        const todosExitos = Boolean(exitoIndividual);
        
        if (todosExitos) {
          setIsExecuting(false);
          return true;
        } else {
          throw new Error('La fertilización con ovocito donado falló');
        }
      }

      // Si no hay ovocito donado, usar la lógica original con ovocitos propios
      const todosOvocitos = [...ovocitosFrescos, ...ovocitosCriopreservados];
      if (todosOvocitos.length === 0) {
        throw new Error('No hay ovocitos disponibles para fertilizar');
      }

      // Si el usuario seleccionó un ovocito en la confirmación, sólo procesar ese ovocito.
      // Esto evita ejecutar la misma fertilización múltiples veces cuando sólo se quiso
      // confirmar un ovocito específico.
      const targetOvocitos = ovocitoSeleccionado !== null
        ? todosOvocitos.filter(o => {
            const idOv = (o as any).id_ovocito ?? (o as any).id;
            return idOv === ovocitoSeleccionado;
          })
        : todosOvocitos;

      if (ovocitoSeleccionado !== null && targetOvocitos.length === 0) {
        throw new Error('El ovocito seleccionado no fue encontrado');
      }

      const resultados: boolean[] = [];
      for (const ov of targetOvocitos) {
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
        setIsExecuting(false);
        return true;
      } else {
        throw new Error('Algunas fertilizaciones fallaron');
      }

    } catch (error) {
      console.error('Error ejecutando fertilización:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      setIsExecuting(false);
      return false;
    }
  };

  return {
    ejecutarProceso,
    isExecuting,
    error,
    clearError: () => setError(null)
  };
};