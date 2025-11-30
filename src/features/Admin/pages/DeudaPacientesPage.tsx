import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DeudaPacientesPage() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const resp = await axios.get('/api/finanzas/pacientes/');
        setPacientes(resp.data);
      } catch (err: any) {
        setError('Error al obtener datos de pacientes.');
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 pt-24 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Título */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Deudas y Cobros de Pacientes</h1>
          <p className="mt-2 text-lg text-gray-600">
            Visualiza los montos adeudados y cobrados por cada paciente.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl bg-white p-8 shadow-lg">
          {/* Loader */}
          {loading && <p className="text-center text-lg text-gray-600">Cargando datos...</p>}

          {/* Error */}
          {error && <p className="text-center font-semibold text-red-600">{error}</p>}

          {/* Estado vacío */}
          {!loading && pacientes.length === 0 && (
            <p className="text-center text-lg text-gray-600">No hay movimientos registrados.</p>
          )}

          {/* Tabla */}
          {!loading && pacientes.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                      Paciente
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                      Obra Social
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-white">Deuda</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-white">
                      Cobrado
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {pacientes.map((p) => {
                    const saldo = p.total_deuda - p.total_cobrado;

                    return (
                      <tr key={p.id} className="transition hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.nombre}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                          {p.obra_social_sigla}
                        </td>

                        <td className="px-6 py-4 text-right text-sm font-semibold text-red-800">
                          ${p.total_deuda.toFixed(2)}
                        </td>

                        <td className="px-6 py-4 text-right text-sm font-semibold text-green-600">
                          ${p.total_cobrado.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
