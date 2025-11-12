import { useEffect, useState } from 'react';
import axios from 'axios';
import OvocitosTable from '../../../Punciones/components/OvocitosTable';
import EmbryoList from '../../../Embryo/components/EmbryoList';
import FertilizacionesTable from '../../../Fertilizacion/components/Fertilizaciones';

type Props = {
  tratamientoId: number;
  pacienteId: number | null;
  paciente?: any | null;
};

import PatientDetails from './PatientDetails';

export default function TreatmentDetails({ tratamientoId, pacienteId, paciente }: Props) {
  const [tratamiento, setTratamiento] = useState<any | null>(null);
  const [ovocitos, setOvocitos] = useState<any[]>([]);
  const [historial, setHistorial] = useState<any[]>([]);
  const [embriones, setEmbriones] = useState<any[]>([]);
  const [fertilizaciones, setFertilizaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers = token ? { Authorization: `Token ${token}` } : {};

        // 1) Obtener el tratamiento
        const tRes = await axios.get(`/api/tratamientos/${tratamientoId}/`, { headers });
        const tr = tRes.data;
        setTratamiento(tr);

        // Extraer ids útiles
        const pacienteId = tr?.paciente ?? tr?.paciente_id ?? (tr?.paciente?.id ?? null);
        const puncionId = tr?.puncion ?? tr?.puncion_id ?? (tr?.puncion?.id ?? null);

        // 2) Ovocitos: preferir filtrar por punción, fallback por paciente
        let ovocitosData: any[] = [];
        try {
          if (puncionId) {
            const oRes = await axios.get(`/api/ovocitos/?puncion=${puncionId}`, { headers });
            ovocitosData = Array.isArray(oRes.data) ? oRes.data : (oRes.data.results ?? []);
          } else if (pacienteId) {
            const oRes = await axios.get(`/api/ovocitos/?paciente=${pacienteId}`, { headers });
            ovocitosData = Array.isArray(oRes.data) ? oRes.data : (oRes.data.results ?? []);
          }
        } catch (ovErr) {
          ovocitosData = [];
        }
        setOvocitos(ovocitosData);

        // 3) Historial de ovocitos: por paciente
        let historialData: any[] = [];
        try {
          if (pacienteId) {
            const hRes = await axios.get(`/api/historial_ovocitos/?paciente=${pacienteId}`, { headers });
            historialData = Array.isArray(hRes.data) ? hRes.data : (hRes.data.results ?? []);
          }
        } catch (hErr) {
          historialData = [];
        }
        setHistorial(historialData);

        // 4) Fertilizaciones: traer todas y filtrar por ovocitos del tratamiento
        let fertilizacionesData: any[] = [];
        try {
          const fRes = await axios.get(`/api/fertilizacion/`, { headers });
          const allF = Array.isArray(fRes.data) ? fRes.data : (fRes.data.results ?? fRes.data?.data ?? []);
          const ovIds = ovocitosData.map((o: any) => o.id_ovocito ?? o.id ?? o.pk).filter(Boolean);
          if (ovIds.length > 0) {
            fertilizacionesData = allF.filter((f: any) => ovIds.includes(f.ovocito ?? f.ovocito_id ?? f.ovocito?.id));
          } else if (pacienteId) {
            // fallback: sin ovocitos no podemos asociar fertilizaciones de forma fiable
            fertilizacionesData = [];
          }
        } catch (fErr) {
          fertilizacionesData = [];
        }
        setFertilizaciones(fertilizacionesData);

        // 5) Embriones: traer todos y filtrar por fertilizaciones encontradas
        let embrionesData: any[] = [];
        try {
          const eRes = await axios.get(`/api/embriones/`, { headers });
          const allE = Array.isArray(eRes.data) ? eRes.data : (eRes.data.results ?? []);
          const fertIds = fertilizacionesData.map((ff: any) => ff.id ?? ff.id_fertilizacion ?? ff.pk).filter(Boolean);
          if (fertIds.length > 0) {
            embrionesData = allE.filter((em: any) => fertIds.includes(em.fertilizacion ?? em.fertilizacion_id ?? em.fertilizacion?.id));
          }
        } catch (eErr) {
          embrionesData = [];
        }
        setEmbriones(embrionesData);
        console.log('Fetched treatment details:', {
          tratamiento: tr,
          ovocitos: ovocitosData,
          historial: historialData,
          embriones: embrionesData,
          fertilizaciones: fertilizacionesData,
        });
      } catch (err) {
        // Silencioso: algunos endpoints pueden no existir; componentes mostrarán mensajes vacíos.
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [tratamientoId]);

  if (loading) return <div className="text-gray-500">Cargando detalles del tratamiento...</div>;

  // Si nos pasaron el objeto paciente, mostrar resumen reutilizable
  const showPaciente = !!paciente;

  return (
    <div className="space-y-6">
      {showPaciente ? (
        <div className="bg-white rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Datos del paciente</h3>
          <PatientDetails paciente={paciente} loading={false} />
        </div>
      ) : null}

      <div className="bg-white rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Resumen del tratamiento</h3>
        {tratamiento ? (
          <div className="text-gray-700">
            <div><strong>ID:</strong> {tratamiento.id ?? tratamiento.pk}</div>
            <div><strong>Tipo:</strong> {tratamiento.tipo || tratamiento.nombre || '-'}</div>
            <div><strong>Estado:</strong> {tratamiento.estado || tratamiento.tipo_estado || '-'}</div>
            <div><strong>Inicio:</strong> {tratamiento.fecha_inicio || tratamiento.created_at || '-'}</div>
            <div><strong>Médico:</strong> {tratamiento.medico?.nombre || tratamiento.medico || '-'}</div>
          </div>
        ) : (
          <div className="text-gray-500">No hay detalles del tratamiento disponibles.</div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Ovocitos</h3>
        {ovocitos.length === 0 ? (
          <div className="text-gray-500">No se encontraron ovocitos relacionados al tratamiento.</div>
        ) : (
          <div className="bg-white"><OvocitosTable ovocitos={ovocitos} /></div>
        )}
      </div>


      <div>
        <h3 className="text-lg font-semibold mb-2">Embriones</h3>
        {embriones.length === 0 ? (
          <div className="text-gray-500">No se encontraron embriones relacionados al tratamiento.</div>
        ) : (
          <EmbryoList embryos={embriones} selectedPacienteId={pacienteId} />
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Fertilizaciones</h3>
        {fertilizaciones.length === 0 ? (
          <div className="text-gray-500">No hay fertilizaciones relacionadas al tratamiento.</div>
        ) : (
          <FertilizacionesTable fertilizaciones={fertilizaciones} />
        )}
      </div>
    </div>
  );
}
