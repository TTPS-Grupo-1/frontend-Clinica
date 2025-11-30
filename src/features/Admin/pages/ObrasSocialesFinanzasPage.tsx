import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ObrasSocialesFinanzasPage() {
  const [obras, setObras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleCobrar = async (obraId: number) => {
    try {
      if (!window.confirm('¿Confirmar cobro de esta obra social?')) return;

      const response = await fetch('http://127.0.0.1:8000/api/finanzas/cobrar-obra-social/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_obra_social: obraId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert('Error procesando el cobro: ' + JSON.stringify(data));
        return;
      }

      alert('Cobro realizado correctamente ✔');

      // 🔄 Recargar la página después del cobro
      window.location.reload();
    } catch (error) {
      console.error('Error cobrando obra social:', error);
      alert('Error inesperado procesando el cobro.');
    }
  };

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const resp = await axios.get('/api/finanzas/obras-sociales/');
        setObras(resp.data);
      } catch (err: any) {
        setError('Error al obtener datos de obras sociales.');
      } finally {
        setLoading(false);
      }
    };

    fetchObras();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 pt-24 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Deudas y Cobros de Obras Sociales</h1>
          <p className="mt-2 text-lg text-gray-600">
            Consulta el estado financiero de cada obra social.
          </p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-lg">
          {loading && <p className="text-center text-lg text-gray-600">Cargando datos...</p>}

          {error && <p className="text-center font-semibold text-red-600">{error}</p>}

          {!loading && obras.length === 0 && (
            <p className="text-center text-lg text-gray-600">No hay movimientos registrados.</p>
          )}

          {!loading && obras.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-purple-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                      Obra Social
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-white">Deuda</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-white">
                      Cobrado
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-white">
                      Acción
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {obras.map((obra) => {
                    const deuda = obra.total_deuda;
                    const cobrado = obra.total_cobrado;

                    return (
                      <tr key={obra.id} className="transition hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {obra.nombre}
                        </td>

                        {/* DEUDA EN ROJO */}
                        <td className="px-6 py-4 text-right text-sm font-semibold text-red-600">
                          ${deuda.toFixed(2)}
                        </td>

                        <td className="px-6 py-4 text-right text-sm font-semibold text-green-600">
                          ${cobrado.toFixed(2)}
                        </td>

                        {/* Botón COBRAR si hay deuda */}
                        <td className="px-6 py-4 text-center">
                          {deuda > 0 ? (
                            <button
                              onClick={() => handleCobrar(obra.id)}
                              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                            >
                              Cobrar
                            </button>
                          ) : (
                            <span className="text-sm text-gray-400 italic">Sin deuda</span>
                          )}
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
