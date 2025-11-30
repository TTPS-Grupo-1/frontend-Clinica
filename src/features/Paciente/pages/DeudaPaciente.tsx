import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { obtenerDeudaPaciente } from '../helpers/deudaService';
import { registrarPagoSupabase } from '../helpers/deudaService';

export default function DeudaPaciente() {
  const user = useSelector((state: RootState) => state.auth.user);
  const pacienteId = user?.id ?? 6;

  const [loading, setLoading] = useState(false);
  const [deuda, setDeuda] = useState<number | null>(null);
  const [sinDeuda, setSinDeuda] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchDeuda = async () => {
      setLoading(true);
      try {
        const data = await obtenerDeudaPaciente(pacienteId, 1);

        setDeuda(data.deuda_total ?? 0);
      } catch (err: any) {
        if (err?.response?.status === 404) {
          setSinDeuda(true); // ← No tiene deudas
        } else {
          setError('Usted no tiene deudas.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDeuda();
  }, []);

  // -------------------------------------------------------
  // 🧮 Pagar deuda completa
  // -------------------------------------------------------
  const handlePagar = async () => {
    setError('');
    setMensaje('');

    try {
      setLoading(true);

      const resultado = await registrarPagoSupabase(
        1, // id_grupo
        false, // obra_social_pagada
        true, // paciente_pagado
        pacienteId // id_paciente
      );

      console.log('PAGO:', resultado);
      setMensaje('¡Pago realizado con éxito! Gracias.');
      setDeuda(0);
      setSinDeuda(true);
    } catch (err: any) {
      setError('Error al procesar el pago.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-blue-800">Mi Deuda Pendiente</h2>

        {loading && (
          <div className="animate-pulse">
            <p className="mb-4 text-center text-gray-600">Cargando deuda pendiente...</p>
            <div className="text-center">
              <div className="mx-auto mb-4 h-6 w-32 rounded bg-gray-200"></div>
              <div className="mx-auto mb-6 h-12 w-40 rounded bg-gray-200"></div>
              <div className="h-10 w-full rounded bg-gray-200"></div>
            </div>
          </div>
        )}

        {/* Sin deuda */}
        {sinDeuda && !loading && (
          <p className="text-center font-semibold text-green-600">Usted no tiene deudas.</p>
        )}

        {/* Errores */}
        {error && <p className="text-center font-semibold text-red-600">{error}</p>}

        {/* Mostrar deuda y botón pagar */}
        {!loading && !sinDeuda && deuda !== null && (
          <div className="text-center">
            <p className="text-lg text-gray-700">Deuda total:</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">${deuda.toFixed(2)}</p>

            <button
              onClick={handlePagar}
              className="mt-6 w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Pagar deuda
            </button>

            {mensaje && <p className="mt-4 font-semibold text-green-600">{mensaje}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
