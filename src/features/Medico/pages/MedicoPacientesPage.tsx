import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PacientCard from '../components/PacientCard';
import RoleHomeButton from '../../../shared/components/RoleHomeButton';
import type { PacienteMinimal } from '../utils/pacienteHelpers';
import { getAuthHeaders, fetchPacientesForMedico, fetchPacienteIfHasTratamiento } from '../utils/pacienteHelpers';

export default function MedicoPacientesPage() {
  const { medicoId: medicoIdParam } = useParams<{ medicoId?: string }>();
  const [pacienteIdInput, setPacienteIdInput] = useState<string>('');
  // Valor debounced para evitar búsquedas en cada tecla. Se actualiza 600ms después de que el usuario deja de escribir.
  const [debouncedPacienteId, setDebouncedPacienteId] = useState<string>(pacienteIdInput);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pacientes, setPacientes] = useState<PacienteMinimal[]>([]);
  const navigate = useNavigate();
  // Ya usamos debouncedPacienteId; no necesitamos refs para timeouts aquí.

  // Effect para mantener debouncedPacienteId en sync con pacienteIdInput después de 600ms
  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedPacienteId(pacienteIdInput), 600);
    return () => window.clearTimeout(t);
  }, [pacienteIdInput]);

  useEffect(() => {
    // Debounced: usar debouncedPacienteId (no se dispara por cada letra)
    // Si la ruta ya trae medicoIdParam, usarlo inmediatamente.
    const effectiveId = medicoIdParam ? Number(medicoIdParam) : (debouncedPacienteId ? Number(debouncedPacienteId) : null);

    const doLoad = async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        const headers = getAuthHeaders();
        // Buscar paciente por ID y validar tratamiento
        const paciente = await fetchPacienteIfHasTratamiento(id, headers);
        if (paciente) setPacientes([paciente]);
        else setPacientes([]);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || 'Error cargando pacientes');
      } finally {
        setLoading(false);
      }
    };

    if (!effectiveId) {
      setPacientes([]);
      return;
    }

    // Si viene por param de ruta, interpretar ese parámetro como MEDICO ID
    if (medicoIdParam) {
      const medicoIdNum = Number(medicoIdParam);
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const headers = getAuthHeaders();
          const pacientesData = await fetchPacientesForMedico(medicoIdNum, headers);
          setPacientes(pacientesData);
        } catch (err: any) {
          console.error(err);
          setError(err?.message || 'Error cargando pacientes');
        } finally {
          setLoading(false);
        }
      })();

      return;
    }

    // Si viene del input debounced, ejecutar la búsqueda por paciente
    doLoad(Number(debouncedPacienteId));

    return () => {
      // nothing to cleanup here (debounce handled in separate effect)
    };
  }, [debouncedPacienteId, medicoIdParam]);

  const handleVerHistoria = (pacienteId: number) => {
    navigate(`/pacientes/${pacienteId}/historia`);
  };

  const pacientesMemo = useMemo(() => pacientes, [pacientes]);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(pacientesMemo.length / pageSize));
  const currentPatients = pacientesMemo.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen pt-20 pb-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-700">Pacientes atendidos</h1>
            {/* Render the role-aware home button as static so it doesn't overlap content */}
            <RoleHomeButton className="!static" />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">Paciente ID</label>
            <div className="flex gap-2">
              <input value={pacienteIdInput} onChange={e => setPacienteIdInput(e.target.value)} placeholder="Ingrese ID del paciente" className="border rounded px-3 text-black py-2 w-48" />
              <button onClick={() => {
                // navegar a la ruta con pacienteId para que quede en URL
                if (pacienteIdInput) navigate(`/medico/${pacienteIdInput}/pacientes`);
              }} className="bg-blue-600 text-white px-3 py-2 rounded">Buscar</button>
            </div>

          </div>

          {loading ? (
            <div className="text-center py-8">Cargando pacientes...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : pacientesMemo.length === 0 ? (
            <div className="text-gray-500">No se encontró paciente con tratamiento activo.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentPatients.map(p => (
                  <PacientCard
                    key={p.id}
                    paciente={{
                      id: p.id,
                      first_name: p.first_name,
                      last_name: p.last_name,
                      dni: p.dni,
                      fechaTurno: p.fechaTurno || undefined,
                      horaTurno: p.horaTurno || undefined,
                    } as any}
                    onAtender={() => {
                      // redirigir a la lista de turnos para atender
                      navigate('/medico/turnos');
                    }}
                    onVerHistoria={(id) => handleVerHistoria(id)}
                    showAtender={false}
                  />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Anterior</button>
                  <div className="text-sm text-gray-700">Página {page} de {totalPages}</div>
                  <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Siguiente</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
