import axios from 'axios';
import type { FertilizacionData } from '../../../types/Fertilizacion';
import { generateUniqueId } from '../../../shared/utils/generateUniqueId';
import toast from 'react-hot-toast';

/**
 * Obtiene headers de autenticación desde localStorage
 */
export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Token ${token}` } : {};
}

/**
 * Verifica viabilidad del semen usando el endpoint de tratamiento-info
 * que ya incluye la información de la segunda consulta
 */
export async function verificarViabilidadSemen(pacienteId: number): Promise<boolean> {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/fertilizacion/tratamiento-info/${pacienteId}/`
    );
    const tratamientoInfo = response.data;

    // Usar la información de segunda consulta que ya viene en el tratamiento
    return tratamientoInfo?.segunda_consulta?.semen_viable || false;
  } catch (error) {
    console.error('Error verificando viabilidad de semen:', error);
    return false;
  }
}

/**
 * Verifica viabilidad de ovocitos usando el endpoint de tratamiento-info
 * que ya incluye la información de la segunda consulta
 */
export async function verificarViabilidadOvocitos(pacienteId: number): Promise<boolean> {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/fertilizacion/tratamiento-info/${pacienteId}/`
    );
    const tratamientoInfo = response.data;

    // Usar la información de segunda consulta que ya viene en el tratamiento
    return tratamientoInfo?.segunda_consulta?.ovocito_viable || false;
  } catch (error) {
    console.error('Error verificando viabilidad de ovocitos:', error);
    return false;
  }
}

/**
 * Ejecuta el registro de fertilización usando el endpoint existente
 * y crea el embrión si la fertilización fue exitosa
 */
export async function ejecutarFertilizacion(
  datos: FertilizacionData,
  ovocitos: any[] = []
): Promise<{ success: boolean; embrionId?: number }> {
  // ✅ Cambiar tipo de retorno
  try {
    const headers = getAuthHeaders();

    // Crear fertilización
    const response = await axios.post('http://localhost:8000/api/fertilizacion/', datos, {
      headers,
    });
    const fertilizacionId = response.data.id_fertilizacion || response.data.id;

    // ✅ Crear embrión si la fertilización fue exitosa
    if (datos.resultado === 'exitosa') {
      const ovocitoSeleccionado = ovocitos.find(
        (o) =>
          o.id_ovocito === Number(datos.ovocitos_utilizados) ||
          o.id === Number(datos.ovocitos_utilizados)
      );

      const identificadorEmbrion = generateUniqueId({
        prefix: 'EMB',
        nombre: ovocitoSeleccionado?.identificador || 'UNK',
        apellido: '',
      });

      const embrionPayload = {
        identificador: identificadorEmbrion,
        fertilizacion: fertilizacionId,
        estado: 'Fresco',
      };

      const embrionResponse = await axios.post(
        'http://localhost:8000/api/embriones/',
        embrionPayload,
        { headers }
      );
      const embrionId = embrionResponse.data.id; // ✅ Capturar el ID del embrión

      console.log(`✅ Embrión ${identificadorEmbrion} creado con ID: ${embrionId}`);

      return { success: true, embrionId }; // ✅ Devolver el ID del embrión
    }

    return { success: true };
  } catch (error) {
    console.error('Error ejecutando fertilización:', error);
    return { success: false };
  }
}

/**
 * Ejecuta la descriopreservación de un ovocito usando el endpoint de historial
 */
export async function descriopreservarOvocito(
  ovocitoId: number,
  usuarioId: number
): Promise<boolean> {
  try {
    const headers = getAuthHeaders();
    const res = await axios.get(`/api/ovocitos/${ovocitoId}/`, { headers });
    const ovocito = res.data;
    const response = await axios.post(
      '/api/historial_ovocitos/',
      {
        ovocito: ovocitoId,
        paciente: ovocito.paciente,
        estado: 'fresco',
        nota: `Preservado por usuario ${usuarioId}`,
      },
      { headers }
    );
    console.log('Historial de ovocito creado:', response.data);

    const id_rack = ovocito.rack_id;
    const id_tanque = ovocito.tanque_id;
    const nro_grupo = 1;

    if (id_rack == null || id_tanque == null) {
      console.error('El ovocito no tiene rack o tanque asignado en la BD.');
      return false;
    }

    const ovocitoPresente = await buscarOvocito(ovocito.identificador, nro_grupo);
    if (!ovocitoPresente) {
      console.error('El ovocito ya se encuentra utilizado en otra fertilización.');
      toast.error('El ovocito ya se encuentra utilizado en otra fertilización.');
      return false;
    }
    const usado = await usarOvocitoTanque(ovocito.identificador, nro_grupo, id_tanque, id_rack);
    if (!usado) {
      console.error('No se pudo usar el ovocito en tanque y rack.');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error en descriopreservación:', error);
    return false;
  }
}

/**
 * Ejecuta la descriopreservación de múltiples ovocitos
 */
export async function ejecutarDescriPreservacion(
  ovocitosIds: number[],
  usuarioId: number
): Promise<boolean> {
  try {
    const promesas = ovocitosIds.map((id) => descriopreservarOvocito(id, usuarioId));
    const resultados = await Promise.all(promesas);

    return resultados.every((resultado) => resultado === true);
  } catch (error) {
    console.error('Error en descriopreservación múltiple:', error);
    return false;
  }
}

/**
 * Construye un "plan" de fertilización: semen disponible, ovocitos (frescos/criopreservados),
 * y sugerencias sobre si usar donantes. Usado por el componente FertilizacionPlan.
 */
export async function procesarFertilizacion(pacienteId: number, usuarioId: number) {
  const plan = {
    semen: null as any,
    ovocitos: [] as any[],
    descripPreservados: [] as number[],
    usandoDonantes: { semen: false, ovocitos: false },
    solicitado_por: usuarioId,
    errores: [] as string[],
  };

  try {
    const headers = getAuthHeaders();

    // Obtener info de tratamiento (incluye segunda consulta con semen/ovocito viable)
    const tResp = await axios.get(`/api/fertilizacion/tratamiento-info/${pacienteId}/`, {
      headers,
    });
    const tratamientoInfo = tResp.data;
    // Usar la info de segunda consulta para decidir viabilidad
    plan.semen = tratamientoInfo?.segunda_consulta?.semen_viable
      ? { origen: 'PAREJA', viable: true }
      : null;
    // marcar si sugiere uso de donantes (simplificado)
    plan.usandoDonantes.semen = !plan.semen;

    // Obtener ovocitos propios
    const oResp = await axios.get(`/api/ovocitos/?paciente=${pacienteId}`, { headers });
    const ovocitosRaw = oResp.data || [];

    // Mapear a formato simple que espera FertilizacionPlan
    plan.ovocitos = ovocitosRaw.map((o: any) => ({
      id: o.id_ovocito ?? o.id,
      puncion_id: o.puncion ?? o.puncion_id ?? null,
      estado:
        (o.tipo_estado || '').toLowerCase() === 'criopreservado'
          ? 'CRIOPRESERVADO'
          : (o.tipo_estado || '').toLowerCase() === 'fresco'
            ? 'FRESCO'
            : (o.tipo_estado || '').toString().toUpperCase(),
    }));

    // Si no hay ovocitos propios viables, intentar ver si hay donados (placeholder: endpoint de donantes no implementado aquí)
    if (plan.ovocitos.length === 0) {
      plan.usandoDonantes.ovocitos = true;
    }

    return plan;
  } catch (error) {
    console.error('Error procesando fertilización:', error);
    plan.errores.push('No se pudo construir el plan de fertilización');
    return plan;
  }
}

export async function buscarOvocito(ovocitoId: Number, numeroGrupo: Number) {
  try {
    const response = await axios.post(
      `https://ssewaxrnlmnyizqsbzxe.supabase.co/functions/v1/get-ovocito-posicion`,
      { ovocito_id: ovocitoId.toString(), nro_grupo: numeroGrupo },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error al buscar ovocito:', error);
    return false;
  }
}

export async function usarOvocitoTanque(
  ovocitoId: number,
  numeroGrupo: number,
  tanqueId: number,
  rackId: number
) {
  try {
    const resp = await axios.post(
      'https://ssewaxrnlmnyizqsbzxe.supabase.co/functions/v1/deallocate-ovocyte',
      {
        ovocito_id: ovocitoId.toString(),
        nro_grupo: numeroGrupo.toString(),
        id_rack: rackId,
        id_tanque: tanqueId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return true;
  } catch (error) {
    console.error('Error al usar ovocito en tanque:', error);
    return false;
  }
}
