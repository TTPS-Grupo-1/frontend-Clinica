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
};

export default function TreatmentDetails({ tratamientoId, paciente }: Props) {
  const navigate = useNavigate();
  
  // 🔥 NUEVO: Un solo estado unificado en lugar de 14 estados separados
  const [data, setData] = useState<TreatmentData>(initialState);

  // 🔥 Helper function para actualizar partes del estado
  const updateData = (updates: Partial<TreatmentData>) => {
    setData(prevData => ({ ...prevData, ...updates }));
  };

  // Helper para mostrar el estado en texto amigable
  function getEstadoTexto(tratamiento: any, monitoreos: any[], fertilizaciones: any[]): string {
    
    console.log('🔍 DEBUG: Tratamiento para estado texto:', tratamiento);
    // Si no, puedes inferirlo por los datos presentes
    if (!tratamiento) return 'Desconocido';
    if (!tratamiento.activo) return 'Finalizado';
    if (seguimiento) return 'En seguimiento'; //
    if (tratamiento.transferencia) return 'Transferencia'; //
    if (fertilizaciones.length > 0) return 'Fertilización';
    if (tratamiento.puncion) return 'Punción';
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

        // Obtener monitoreos
        const id_tratamiento = responseData.tratamiento.id; 
        const monitoreos = await axios.get(`/api/monitoreo/monitoreos/atendidos-por-tratamiento/${id_tratamiento}/`, {
          headers,
        });
        responseData.monitoreos = monitoreos.data.data || [];
      
        //obtener transferencias asociadas al tratamiento
        const transferencias = await axios.get(`/api/transferencias/transferencias-por-tratamiento/${id_tratamiento}/`, {
          headers,
        });
        responseData.transferencias = transferencias.data.data || [];

        // 🔥 NUEVO: Actualizar todo el estado de una vez
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
    loading
  } = data;

  if (loading) return <div className="text-gray-500">Cargando detalles del tratamiento...</div>;

  // Si nos pasaron el objeto paciente, mostrar resumen reutilizable
  const showPaciente = !!(paciente || pacienteLocal);


  return ( 
    <div className="space-y-6">
      {/* Estado del tratamiento */}
      <div className="rounded bg-blue-50 p-4 mb-2 flex items-center gap-4">
        <span className="text-lg font-bold text-blue-900">Última atención del tratamiento:</span>
        <span className="rounded-full bg-blue-200 px-4 py-2 text-blue-800 font-semibold shadow">
          {getEstadoTexto(tratamiento,monitoreos , fertilizaciones)}
        </span>
      </div>

      {showPaciente ? (
        <div className="rounded bg-white p-4">
          <h3 className="mb-2 text-lg font-semibold">Datos del paciente</h3>
          <PatientDetails paciente={paciente || pacienteLocal} loading={false} />
        </div>
      ) : null}

      {/* Navegación a vistas de consultas */}
      {(primeraConsulta || segundaConsulta) ? (
        <div className={`grid gap-4 ${
          primeraConsulta && segundaConsulta 
            ? 'grid-cols-1 md:grid-cols-2' 
            : 'grid-cols-1 max-w-md mx-auto'
        }`}>
          {/* Primera Consulta - solo si tiene datos */}
          {primeraConsulta && (
            <div 
              onClick={() => navigate(`/tratamiento/${tratamientoId}/primera-consulta`, {
                state: { 
                  tratamientoData: {
                    ...tratamiento,
                    primera_consulta: primeraConsulta
                  },
                  paciente: paciente || pacienteLocal,
                  antecedentes_ginecologicos: antecedentesGinecologicos,
                  antecedentes_personales: antecedentesPersonales,
                  resultados_estudios: resultadosEstudios,
                  ordenes: ordenes
                }
              })}
              className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:bg-blue-100 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-600 rounded-lg p-2">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800">Primera Consulta</h3>
              </div>
              <p className="text-blue-700 text-sm mb-3">
                Ver datos generales, antecedentes, estudios y fenotipo del paciente
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <Eye className="h-4 w-4 mr-1" />
                Ver detalles completos
              </div>
            </div>
          )}

          {/* Segunda Consulta - solo si tiene datos */}
          {segundaConsulta && (
            <div 
              onClick={() => navigate(`/tratamiento/${tratamientoId}/segunda-consulta`, {
                state: { 
                  tratamientoData: {
                    ...tratamiento,
                    segunda_consulta: segundaConsulta
                  },
                  paciente: paciente || pacienteLocal
                }
              })}
              className="bg-green-50 border border-green-200 rounded-lg p-6 hover:bg-green-100 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-600 rounded-lg p-2">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-800">Segunda Consulta</h3>
              </div>
              <p className="text-green-700 text-sm mb-3">
                Ver resultados de estudios, protocolo, consentimiento y monitoreo
              </p>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <Eye className="h-4 w-4 mr-1" />
                Ver detalles completos
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center bg-gray-50">
          <FileText className="mx-auto mb-3 h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No hay consultas registradas</h3>
          <p className="text-gray-500 text-sm">
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
              {tratamiento.fecha_creacion
                ? formatDateShort(tratamiento.fecha_creacion)
                : '-'}
            </div>
          </div>
        ) : (
          <div className="text-gray-500">No hay detalles del tratamiento disponibles.</div>
        )}
      </div>

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

      <div>
        <h3 className="mb-2 text-lg font-semibold">Fertilizaciones</h3>
        {fertilizaciones.length === 0 ? (
          <div className="text-gray-500">No hay fertilizaciones relacionadas al tratamiento.</div>
        ) : (
          <FertilizacionesTable fertilizaciones={fertilizaciones} />
        )}
      </div>
      
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