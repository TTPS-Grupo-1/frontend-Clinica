import { useEffect, useState } from 'react';
import axios from 'axios';
import OvocitosTable from '../../Punciones/components/OvocitosTable';
import FertilizacionesTable from '../../Fertilizacion/components/Fertilizaciones';
import PatientDetails from '../../Paciente/components/History/PatientDetails';
import EmbrionesTable from '../../Paciente/components/EmbrionesTable'; // ✅ Importar
import MonitoreoTable from '@/features/Paciente/components/MonitoreoTable';

type Props = {
  tratamientoId: number;
  pacienteId: number | null;
  paciente?: any | null;
};

export default function TreatmentDetails({ tratamientoId, pacienteId, paciente }: Props) {
  const [tratamiento, setTratamiento] = useState<any | null>(null);
  const [ovocitos, setOvocitos] = useState<any[]>([]);
  const [embriones, setEmbriones] = useState<any[]>([]);
  const [fertilizaciones, setFertilizaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pacienteLocal, setPacienteLocal] = useState<any | null>(null);
  const [monitoreos, setMonitoreos] = useState<any[]>([]);

  // Helper para mostrar el estado en texto amigable
  function getEstadoTexto(tratamiento: any) {
    // Si tienes un campo estado_actual, úsalo directamente
    if (tratamiento?.estado_actual) return tratamiento.estado_actual;

    // Si no, puedes inferirlo por los datos presentes
    if (!tratamiento) return 'Desconocido';
    if (tratamiento.motivo_finalizacion) return 'Finalizado';
    if (tratamiento.transferencia) return 'Seguimiento';
    if (tratamiento.fertilizacion) return 'Fertilización';//
    if (tratamiento.puncion) return 'Punción';
    if (tratamiento.monitoreo) return 'Monitoreo';//
    if (tratamiento.segunda_consulta) return 'Segunda consulta';
    if (tratamiento.primera_consulta) return 'Primer consulta';
    return 'En proceso';
  }

  useEffect(() => {
    async function fetchTreatmentData() {
      setLoading(true);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers = token ? { Authorization: `Token ${token}` } : {};

        // Usar el nuevo endpoint que devuelve todos los datos relacionados

        const response = await axios.get(`/api/tratamientos/${tratamientoId}/detalles-completos/`, {
          headers,
        });
        const data = response.data;
        

        console.log('Fetched treatment data:', data);
        const id_tratamiento = data.tratamiento.id; 
        const monitoreos = await axios.get(`/api/monitoreo/monitoreos/atendidos-por-tratamiento/${id_tratamiento}/`, {
          headers,
        });
        data.monitoreos = monitoreos.data.data || [];

        // Establecer todos los datos de una vez
        setTratamiento(data.tratamiento);
        setOvocitos(data.ovocitos || []);
        setFertilizaciones(data.fertilizaciones || []);
        setEmbriones(data.embriones || []);
        setMonitoreos(data.monitoreos || []); 

        // Si no recibimos el objeto paciente, obtenerlo
        if (!paciente && data.tratamiento?.paciente) {
          try {
            const pRes = await axios.get(`/api/pacientes/${data.tratamiento.paciente}/`, {
              headers,
            });
            setPacienteLocal(pRes.data);
          } catch (pErr) {
            console.error('Error fetching patient:', pErr);
            setPacienteLocal(null);
          }
        }
      } catch (err) {
        console.error('Error fetching treatment data:', err);
        // Agregar más detalles del error
        if (err instanceof Error) {
          console.error('Error details:', {
            message: err.message,
            response: (err as any).response?.data,
            status: (err as any).response?.status,
            config: (err as any).config,
          });
        }

        // También mostrar el error completo de axios
        if ((err as any).isAxiosError) {
          console.error('Axios error details:', {
            url: (err as any).config?.url,
            method: (err as any).config?.method,
            headers: (err as any).config?.headers,
            responseStatus: (err as any).response?.status,
            responseData: (err as any).response?.data,
          });
        }
      } finally {
        setLoading(false);
      }
    }

    if (tratamientoId) {
      fetchTreatmentData();
    }
  }, [tratamientoId, paciente]);

  if (loading) return <div className="text-gray-500">Cargando detalles del tratamiento...</div>;

  // Si nos pasaron el objeto paciente, mostrar resumen reutilizable
  const showPaciente = !!(paciente || pacienteLocal);

  return (
    <div className="space-y-6">
      {/* Estado del tratamiento */}
      <div className="rounded bg-blue-50 p-4 mb-2 flex items-center gap-4">
        <span className="text-lg font-bold text-blue-900">Estado actual:</span>
        <span className="rounded-full bg-blue-200 px-4 py-2 text-blue-800 font-semibold shadow">
          {getEstadoTexto(tratamiento)}
        </span>
      </div>

      {showPaciente ? (
        <div className="rounded bg-white p-4">
          <h3 className="mb-2 text-lg font-semibold">Datos del paciente</h3>
          <PatientDetails paciente={paciente || pacienteLocal} loading={false} />
        </div>
      ) : null}

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
                ? new Date(tratamiento.fecha_creacion).toLocaleDateString()
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
