import { useNavigate, useLocation } from 'react-router-dom';
import TreatmentDetails from '../components/TreatmentDetails';
export default function TratamientoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tratamientoId, pacienteId, paciente } = location.state || {};

  if (!tratamientoId || !pacienteId || !paciente) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-100 via-white to-blue-300">
        {/* Fondo decorativo */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-2xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-300 opacity-30 blur-2xl" />
        </div>
        <div className="z-10 w-full max-w-2xl rounded-xl bg-white p-8 text-center text-red-600 shadow-lg">
          Faltan datos del tratamiento o paciente. <br />
          <button
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-100 via-white to-blue-300 p-20">
      {/* Fondo decorativo */}
      <article className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-2xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-300 opacity-30 blur-2xl" />
      </article>
      <article className="z-10 mx-4 w-full max-w-3xl rounded-xl bg-white p-8 text-gray-800 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold">Detalles del tratamiento</h3>
          <button
            onClick={() => navigate(-1)}
            className="rounded bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
          >
            Volver
          </button>
        </div>
        <TreatmentDetails
          tratamientoId={tratamientoId}
          pacienteId={pacienteId}
          paciente={paciente}
        />
      </article>
    </section>
  );
}
