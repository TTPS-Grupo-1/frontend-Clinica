import { useEffect, useState } from "react";
import axios from "axios";

export default function ObrasSocialesFinanzasPage() {
  const [obras, setObras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleCobrar = async (obraId: number) => {
    alert(`Cobro pendiente para obra social con ID: ${obraId}`);
  };

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const resp = await axios.get("/api/finanzas/obras-sociales/");
        setObras(resp.data);
      } catch (err: any) {
        setError("Error al obtener datos de obras sociales.");
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
          <h1 className="text-4xl font-bold text-gray-900">
            Deudas y Cobros de Obras Sociales
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Consulta el estado financiero de cada obra social.
          </p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-lg">

          {loading && (
            <p className="text-center text-gray-600 text-lg">Cargando datos...</p>
          )}

          {error && (
            <p className="text-center text-red-600 font-semibold">{error}</p>
          )}

          {!loading && obras.length === 0 && (
            <p className="text-center text-gray-600 text-lg">
              No hay movimientos registrados.
            </p>
          )}

          {!loading && obras.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-purple-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Obra Social</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-white">Deuda</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-white">Cobrado</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-white">Acción</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {obras.map((obra) => {
                    const deuda = obra.total_deuda;
                    const cobrado = obra.total_cobrado;

                    return (
                      <tr key={obra.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {obra.nombre}
                        </td>

                        {/* DEUDA EN ROJO */}
                        <td className="px-6 py-4 text-right text-sm text-red-600 font-semibold">
                          ${deuda.toFixed(2)}
                        </td>

                        <td className="px-6 py-4 text-right text-sm text-green-600 font-semibold">
                          ${cobrado.toFixed(2)}
                        </td>

                        {/* Botón COBRAR si hay deuda */}
                        <td className="px-6 py-4 text-center">
                          {deuda > 0 ? (
                            <button
                              onClick={() => handleCobrar(obra.id)}
                              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                            >
                              Cobrar
                            </button>
                          ) : (
                            <span className="text-gray-400 text-sm italic">
                              Sin deuda
                            </span>
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
