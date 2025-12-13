import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, Eye } from 'lucide-react';
import { formatDateShort } from '@/shared/utils/dateUtils';
import OvocitosTable from '../../Punciones/components/OvocitosTable';
import FertilizacionesTable from '../../Fertilizacion/components/Fertilizaciones';
import PatientDetails from '../../Paciente/components/History/PatientDetails';
import EmbrionesTable from '../../Paciente/components/EmbrionesTable';
import MonitoreoTable from '@/features/Paciente/components/MonitoreoTable';
import type { Props } from '../../../types/Tratamiento';
import type { TreatmentData } from '@/interfaces/Tratmiento';
import CancelarTratamiento from '@/shared/CancelarTratamiento';
import { id } from 'date-fns/locale';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { toast } from 'sonner';

const initialState: TreatmentData = {
  tratamiento: null,
  ovocitos: [],
  embriones: [],
  fertilizaciones: [],
  monitoreos: [],
  antecedentesGinecologicos: [],
  antecedentesPersonales: [],
  resultadosEstudios: [],
  ordenes: [],
  primeraConsulta: null,
  segundaConsulta: null,
  pacienteLocal: null,
  loading: true,
  transferencias: [],
  seguimiento: false,
  puncion: false,
};

export default function TreatmentDetails({ tratamientoId, paciente }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  // 🔥 NUEVO: Un solo estado unificado en lugar de 14 estados separados
  const [data, setData] = useState<TreatmentData>(initialState);

  // 🔥 Helper function para actualizar partes del estado
  const updateData = (updates: Partial<TreatmentData>) => {
    setData((prevData) => ({ ...prevData, ...updates }));
  };

  // Helper para mostrar el estado en texto amigable
  function getEstadoTexto(
    tratamiento: any,
    monitoreos: any[],
    fertilizaciones: any[],
    transferencias: any[],
    seguimiento: boolean,
    puncion: boolean
  ): string {
    console.log('🔍 DEBUG: Tratamiento para estado texto:', tratamiento);
    // Si no, puedes inferirlo por los datos presentes
    if (!tratamiento) return 'Desconocido';
    if (!tratamiento.activo) return 'Finalizado';
    if (tratamiento.seguimiento_finalizado) return 'Finalizado';
    if (seguimiento) return 'Seguimiento'; //
    if (transferencias.length > 0) return 'Transferencia'; //
    if (fertilizaciones.length > 0) return 'Fertilización';
    if (puncion) return 'Punción';
    if (monitoreos.length > 0) return 'Monitoreos';
    if (tratamiento.segunda_consulta) return 'Segunda consulta';
    if (tratamiento.primera_consulta) return 'Primera consulta';
    return 'En proceso';
  }

  useEffect(() => {
    async function fetchTreatmentData() {
      updateData({ loading: true });

      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers = token ? { Authorization: `Token ${token}` } : {};

        const response = await axios.get(`/api/tratamientos/${tratamientoId}/detalles-completos/`, {
          headers,
        });
        const responseData = response.data;
        console.log('🔍 DEBUG: Datos completos del tratamiento recibidos:', responseData);
        const id_paciente = responseData.tratamiento.paciente;
        

        updateData({
          tratamiento: responseData.tratamiento,
          ovocitos: responseData.ovocitos || [],
          fertilizaciones: responseData.fertilizaciones || [],
          embriones: responseData.embriones || [],
          monitoreos: responseData.monitoreos || [],
          antecedentesGinecologicos: responseData.antecedentes_ginecologicos || [],
          antecedentesPersonales: responseData.antecedentes_personales || [],
          resultadosEstudios: responseData.resultados_estudios || [],
          ordenes: responseData.ordenes || [],
          primeraConsulta: responseData.primera_consulta || null,
          segundaConsulta: responseData.segunda_consulta || null,
          transferencias: responseData.transferencias || [],
          seguimiento: responseData.tiene_seguimiento || false,
          puncion: responseData.existe_puncion || false,
          loading: false,
        });

        console.log('🔍 DEBUG: Datos de primera_consulta:', responseData.primera_consulta);
        console.log('🔍 DEBUG: Datos de segunda_consulta:', responseData.segunda_consulta);

        // Si no recibimos el objeto paciente, obtenerlo
        if (!paciente && responseData.tratamiento?.paciente) {
          try {
            const pRes = await axios.get(`/api/pacientes/${responseData.tratamiento.paciente}/`, {
              headers,
            });
            updateData({ pacienteLocal: pRes.data });
          } catch (pErr) {
            console.error('Error fetching patient:', pErr);
            updateData({ pacienteLocal: null });
          }
        }
      } catch (err) {
        console.error('Error fetching treatment data:', err);
        updateData({ loading: false });
      }
    }

    if (tratamientoId) {
      fetchTreatmentData();
    }
  }, [tratamientoId, paciente]);

  // 🔥 Destructuring del estado unificado para fácil acceso
  const {
    tratamiento,
    ovocitos,
    embriones,
    fertilizaciones,
    monitoreos,
    antecedentesGinecologicos,
    antecedentesPersonales,
    resultadosEstudios,
    ordenes,
    primeraConsulta,
    segundaConsulta,
    pacienteLocal,
    loading,
    transferencias,
    seguimiento,
    puncion,
  } = data;
  
  // Determinar el estado actual del tratamiento
  const estadoActual = getEstadoTexto(
    tratamiento,
    monitoreos,
    fertilizaciones,
    transferencias,
    seguimiento,
    puncion
  );
  
  // Determinar qué secciones mostrar según el estado
  const mostrarOvocitos = ![
    'Primera consulta',
    'Segunda consulta',
    'Monitoreos',
    'En proceso',
    'Desconocido',
  ].includes(estadoActual);
  
  const mostrarFertilizaciones = ![
    'Primera consulta',
    'Segunda consulta',
    'Monitoreos',
    'Punción',
    'En proceso',
    'Desconocido',
  ].includes(estadoActual);
  
  const mostrarEmbriones = ![
    'Primera consulta',
    'Segunda consulta',
    'Monitoreos',
    'Punción',
    'En proceso',
    'Desconocido',
  ].includes(estadoActual);
  
  const puedeVer =
    user?.rol === 'MEDICO' && tratamiento?.activo === true && tratamiento?.medico === user?.id;
  if (loading) return <div className="text-gray-500">Cargando detalles del tratamiento...</div>;

  // Si nos pasaron el objeto paciente, mostrar resumen reutilizable
  const showPaciente = !!(paciente || pacienteLocal);

  return (
    <div className="space-y-6">
      {/* Estado del tratamiento */}
      <div className="mb-2 flex items-center gap-4 rounded bg-blue-50 p-4">
        <span className="text-lg font-bold text-blue-900">Última atención del tratamiento:</span>
        <span className="rounded-full bg-blue-200 px-4 py-2 font-semibold text-blue-800 shadow">
          {estadoActual}
        </span>
        {puedeVer && (
          <CancelarTratamiento
            idTratamiento={tratamientoId}
            onCancelado={() => toast.success('Tratamiento cancelado')}
          />
        )}
      </div>
      {/* cancelar tratamiento si está activo y el usuario es médico */}

      {showPaciente ? (
        <div className="rounded bg-white p-4">
          <h3 className="mb-2 text-lg font-semibold">Datos del paciente</h3>
          <PatientDetails paciente={paciente || pacienteLocal} loading={false} />
        </div>
      ) : null}

      {/* Navegación a vistas de consultas */}
      {primeraConsulta || segundaConsulta ? (
        <div
          className={`grid gap-4 ${
            primeraConsulta && segundaConsulta
              ? 'grid-cols-1 md:grid-cols-2'
              : 'mx-auto max-w-md grid-cols-1'
          }`}
        >
          {/* Primera Consulta - solo si tiene datos */}
          {primeraConsulta && (
            <div
              onClick={() =>
                navigate(`/tratamiento/${tratamientoId}/primera-consulta`, {
                  state: {
                    tratamientoData: {
                      ...tratamiento,
                      primera_consulta: primeraConsulta,
                    },
                    paciente: paciente || pacienteLocal,
                    antecedentes_ginecologicos: antecedentesGinecologicos,
                    antecedentes_personales: antecedentesPersonales,
                    resultados_estudios: resultadosEstudios,
                    ordenes: ordenes,
                  },
                })
              }
              className="cursor-pointer rounded-lg border border-blue-200 bg-blue-50 p-6 transition-colors hover:bg-blue-100"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-blue-600 p-2">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800">Primera Consulta</h3>
              </div>
              <p className="mb-3 text-sm text-blue-700">
                Ver datos generales, antecedentes, estudios y fenotipo del paciente
              </p>
              <div className="flex items-center text-sm font-medium text-blue-600">
                <Eye className="mr-1 h-4 w-4" />
                Ver detalles completos
              </div>
            </div>
          )}

          {/* Segunda Consulta - solo si tiene datos */}
          {segundaConsulta && (
            <div
              onClick={() =>
                navigate(`/tratamiento/${tratamientoId}/segunda-consulta`, {
                  state: {
                    tratamientoData: {
                      ...tratamiento,
                      segunda_consulta: segundaConsulta,
                    },
                    paciente: paciente || pacienteLocal,
                  },
                })
              }
              className="cursor-pointer rounded-lg border border-green-200 bg-green-50 p-6 transition-colors hover:bg-green-100"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-green-600 p-2">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-800">Segunda Consulta</h3>
              </div>
              <p className="mb-3 text-sm text-green-700">
                Ver resultados de estudios, protocolo, consentimiento y monitoreo
              </p>
              <div className="flex items-center text-sm font-medium text-green-600">
                <Eye className="mr-1 h-4 w-4" />
                Ver detalles completos
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <FileText className="mx-auto mb-3 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-600">No hay consultas registradas</h3>
          <p className="text-sm text-gray-500">
            Este tratamiento aún no tiene consultas médicas asociadas.
          </p>
        </div>
      )}

      <div className="rounded bg-white p-4">
        <h3 className="mb-2 text-lg font-semibold">Resumen del tratamiento</h3>
        {tratamiento ? (
          <div className="text-gray-700">
            <div>
              <strong>Estado:</strong> {tratamiento.activo ? 'Activo' : 'Inactivo'}
            </div>
            <div>
              <strong>Inicio:</strong> {tratamiento.fecha_inicio}
            </div>
            <div>
              <strong>Médico:</strong> {tratamiento.medico_nombre || `ID: ${tratamiento.medico}`}
            </div>
            <div>
              <strong>Objetivo:</strong> {tratamiento.objetivo || '-'}
            </div>
            <div>
              <strong>Creado:</strong>{' '}
              {tratamiento.fecha_creacion ? formatDateShort(tratamiento.fecha_creacion) : '-'}
            </div>
          </div>
        ) : (
          <div className="text-gray-500">No hay detalles del tratamiento disponibles.</div>
        )}
      </div>

      {/* Ovocitos - Solo mostrar desde Punción en adelante */}
      {mostrarOvocitos && (
        <div>
          <h3 className="mb-2 text-lg font-semibold">Ovocitos</h3>
          {ovocitos.length === 0 ? (
            <div className="text-gray-500">
              No se encontraron ovocitos relacionados al tratamiento.
            </div>
          ) : (
            <div className="bg-white">
              <OvocitosTable ovocitos={ovocitos} />
            </div>
          )}
        </div>
      )}

      {/* Fertilizaciones - Solo mostrar desde Fertilización en adelante */}
      {mostrarFertilizaciones && (
        <div>
          <h3 className="mb-2 text-lg font-semibold">Fertilizaciones</h3>
          {fertilizaciones.length === 0 ? (
            <div className="text-gray-500">No hay fertilizaciones relacionadas al tratamiento.</div>
          ) : (
            <FertilizacionesTable fertilizaciones={fertilizaciones} />
          )}
        </div>
      )}

      {/* Embriones - Solo mostrar desde Fertilización en adelante */}
      {mostrarEmbriones && (
        <div>
          <h3 className="mb-2 text-lg font-semibold">Embriones</h3>
          {embriones.length === 0 ? (
            <div className="text-gray-500">
              No se encontraron embriones relacionados al tratamiento.
            </div>
          ) : (
            <EmbrionesTable embriones={embriones} />
          )}
        </div>
      )}

      <div>
        <h3 className="mb-2 text-lg font-semibold">Monitoreos</h3>
        {monitoreos.length === 0 ? (
          <div className="text-gray-500">No hay monitoreos relacionados al tratamiento.</div>
        ) : (
          <MonitoreoTable monitoreos={monitoreos} />
        )}
      </div>
    </div>
  );
}
