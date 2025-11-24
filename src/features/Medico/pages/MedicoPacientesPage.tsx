import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PacientCard from '../components/PacientCard';
import RoleHomeButton from '../../../shared/components/RoleHomeButton';
import type { PacienteMinimal } from '../utils/pacienteHelpers';
import {
  getAuthHeaders,
  fetchPacientesForMedico,
  fetchPacientesByName,
  fetchTodosLosPacientes,
  fetchPacientesByNameDirector,
  pacienteTieneTransferencia,
} from '../utils/pacienteHelpers';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';

export default function MedicoPacientesPage() {
  const { medicoId: medicoIdParam } = useParams<{ medicoId?: string }>();
  const [pacienteQuery, setPacienteQuery] = useState<string>('');
  // Valor debounced para evitar búsquedas en cada tecla. Se actualiza 600ms después de que el usuario deja de escribir.
  const [debouncedPacienteQuery, setDebouncedPacienteQuery] = useState<string>(pacienteQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pacientes, setPacientes] = useState<PacienteMinimal[]>([]);
  const navigate = useNavigate();
  // Ya usamos debouncedPacienteId; no necesitamos refs para timeouts aquí.
  const [searchParams, setSearchParams] = useSearchParams();
  const [verTodos, setVerTodos] = useState(false);
  const [pacientesMios, setPacientesMios] = useState<number[]>([]);
  const [pacientesConTransferencia, setPacientesConTransferencia] = useState<number[]>([]);



  const currentUser = useSelector((state: RootState) => (state.auth as any)?.user);
  const es_director = currentUser?.is_director ?? false;
  async function marcarPacientesConTransferencia(lista: PacienteMinimal[], headers: any) {
    const ids: number[] = [];

    await Promise.all(
      lista.map(async (p) => {
        const tiene = await pacienteTieneTransferencia(p.id, headers);
        if (tiene) ids.push(p.id);
      })
    );

    setPacientesConTransferencia(ids);
  }


  // Effect para mantener debouncedPacienteQuery en sync con pacienteQuery después de 600ms
  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedPacienteQuery(pacienteQuery), 600);
    return () => window.clearTimeout(t);
  }, [pacienteQuery]);

  // Inicializar desde query param ?q=
  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    if (q && q !== pacienteQuery) {
      setPacienteQuery(q);
      setDebouncedPacienteQuery(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  const headers = getAuthHeaders();
  const search = debouncedPacienteQuery.trim();
  const medicoIdNum = medicoIdParam ? Number(medicoIdParam) : null;

  // === CASO DIRECTOR: VER TODOS ===
  if (es_director && verTodos) {

  // Si escribió búsqueda → filtra client-side igual que un médico
  if (search !== "") {
    console.log("Filtrando TODOS los pacientes por:", search);

    (async () => {
      setLoading(true);
      try {
        const all = await fetchTodosLosPacientes(headers);

        const q = search.toLowerCase();
        const filtered = all.filter((p) => {
          const full = `${p.first_name} ${p.last_name}`.toLowerCase();
          const dni = String(p.dni).toLowerCase();
          return full.includes(q) || dni.includes(q);
        });

        setPacientes(filtered);
        await marcarPacientesConTransferencia(filtered, headers);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();

    return;
  }

  // Si NO escribió búsqueda → traer todos
  (async () => {
    setLoading(true);
    try {
      const all = await fetchTodosLosPacientes(headers);
      setPacientes(all);
      await marcarPacientesConTransferencia(all, headers);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  })();

  return;
}


  // === CASO MÉDICO O DIRECTOR (verTodos=false): traer SUS pacientes ===
  if (medicoIdNum) {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchPacientesForMedico(medicoIdNum, headers);
        setPacientesMios(data.map(p => p.id));

        // Filtrar por búsqueda
        if (search !== "") {
          const q = search.toLowerCase();
          const filtered = data.filter((p) => {
            const full = `${p.first_name} ${p.last_name}`.toLowerCase();
            const dni = String(p.dni).toLowerCase();
            return full.includes(q) || dni.includes(q);
          });
          setPacientes(filtered);
          await marcarPacientesConTransferencia(filtered, headers);
        } else {
          setPacientes(data);
          await marcarPacientesConTransferencia(data, headers);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
    return;
  }

  // === Búsqueda general (sin médico asignado) ===
  if (search !== "") {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchPacientesByName(search, headers);
        setPacientes(data);
        await marcarPacientesConTransferencia(data, headers);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }

}, [debouncedPacienteQuery, medicoIdParam, verTodos, es_director]);



  const handleVerHistoria = (pacienteId: number) => {
    navigate(`/pacientes/${pacienteId}/historia`);
  };

  const pacientesMemo = useMemo(() => pacientes, [pacientes]);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(pacientesMemo.length / pageSize));
  const currentPatients = pacientesMemo.slice((page - 1) * pageSize, page * pageSize);

  function handleRealizarSeguimiento(pacientId: number): void {
    navigate(`/medico/seguimiento/${pacientId}`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <header className="mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-blue-700">Pacientes atendidos</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Pacientes que fueron tratados — ver historial y atender pacientes
                </p>
              </div>
              <div className="flex-shrink-0">
                {/* Render the role-aware home button as static so it doesn't overlap content */}
                <RoleHomeButton className="!static" />
              </div>
            </div>
          </header>

          <section aria-labelledby="search-heading" className="mb-6">
            <h2 id="search-heading" className="sr-only">
              Buscar paciente
            </h2>
            {es_director && (
              <div className="mb-4 flex items-center gap-3 bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <label className="text-sm font-medium text-blue-800">
                  Ver todos los pacientes
                </label>

                <input
                  type="checkbox"
                  checked={verTodos}
                  onChange={() => {
                    setVerTodos(!verTodos);
                    setPacienteQuery('');
                    setDebouncedPacienteQuery('');

                  }}

                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
              </div>
            )}
            <form
              className="flex flex-col sm:flex-row sm:items-center sm:gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                // Force immediate search when user submits the form
                setDebouncedPacienteQuery(pacienteQuery);
              }}
              role="search"
              aria-label="Buscar pacientes por nombre, apellido o DNI"
            >
              <label className="sr-only" htmlFor="paciente-search">
                Buscar paciente
              </label>
              <div className="relative w-full sm:w-96">
                <svg
                  aria-hidden="true"
                  className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id="paciente-search"
                  value={pacienteQuery}
                  onChange={(e) => setPacienteQuery(e.target.value)}
                  placeholder="Buscar por nombre, apellido o DNI"
                  className="w-full rounded border px-3 py-2 pl-10 text-black focus:ring-2 focus:ring-blue-300 focus:outline-none sm:w-96"
                  aria-label="Buscar por nombre, apellido o DNI"
                />
              </div>

              <div className="mt-3 flex items-center gap-2 sm:mt-0">
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700"
                >
                  Buscar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPacienteQuery('');
                    setDebouncedPacienteQuery('');
                    setSearchParams({});
                    setPacientes([]);
                  }}
                  className="rounded border bg-white px-4 py-2 text-gray-700 shadow transition hover:bg-gray-50"
                >
                  Limpiar
                </button>
              </div>
            </form>
          </section>

          <section aria-live="polite" aria-atomic="true">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {pacientesMemo.length > 0 ? (
                  <>
                    Resultados: <strong className="text-gray-800">{pacientesMemo.length}</strong>
                  </>
                ) : (
                  <>Sin resultados</>
                )}
              </div>
              {debouncedPacienteQuery && debouncedPacienteQuery.trim() !== '' && (
                <div className="text-sm text-blue-600">
                  Filtrando por "
                  <span className="font-medium text-blue-800">{debouncedPacienteQuery}</span>"
                </div>
              )}
            </div>

            {loading ? (
              <div className="py-8 text-center">Cargando pacientes...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : pacientesMemo.length === 0 ? (
              <div className="py-8 text-center">
                <div className="text-gray-500">
                  {debouncedPacienteQuery ? (
                    <>
                      No se encontraron pacientes que coincidan con "
                      <span className="font-medium text-gray-700">{debouncedPacienteQuery}</span>".
                    </>
                  ) : (
                    <>No se encontró paciente con tratamiento activo.</>
                  )}
                </div>
                <div className="mt-3 text-sm text-gray-400">
                  Prueba buscar por nombre, apellido o parte del DNI.
                </div>
              </div>
            ) : (
              <>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="list">
                  {currentPatients.map((p) => (
                    <li key={p.id} className="rounded-lg transition hover:shadow-lg">
                      <PacientCard
                        paciente={
                          {
                            id: p.id,
                            first_name: p.first_name,
                            last_name: p.last_name,
                            dni: p.dni,
                            fechaTurno: p.fechaTurno || undefined,
                            horaTurno: p.horaTurno || undefined,
                          } as any
                        }
                        onAtender={() => {
                          // redirigir a la lista de turnos para atender
                          navigate('/medico/turnos');
                        }}
                        onVerHistoria={(id) => handleVerHistoria(id)}
                        showAtender={false}
                        onRealizarSeguimiento={(id: number) => handleRealizarSeguimiento(id)} 
                        showSeguimiento={pacientesMios.includes(p.id) && pacientesConTransferencia.includes(p.id)}

                      />
                    </li>
                  ))}
                </ul>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <button
                      aria-label="Página anterior"
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                      className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
                    >
                      Anterior
                    </button>
                    <div className="text-sm text-gray-700">
                      Página {page} de {totalPages}
                    </div>
                    <button
                      aria-label="Página siguiente"
                      disabled={page === totalPages}
                      onClick={() => setPage(page + 1)}
                      className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}