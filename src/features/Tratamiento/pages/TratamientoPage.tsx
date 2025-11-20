import { useNavigate, useLocation } from 'react-router-dom';
import TreatmentDetails from '../components/TreatmentDetails';
export default function TratamientoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tratamientoId, pacienteId, paciente } = location.state || {};

  if (!tratamientoId || !pacienteId || !paciente) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 relative overflow-x-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-2xl" />
        </div>
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center text-red-600 z-10">
          Faltan datos del tratamiento o paciente. <br />
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen p-20 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 relative overflow-x-hidden">
      {/* Fondo decorativo */}
      <article className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-2xl" />
      </article>
      <article className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-8 text-gray-800 mx-4 z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Detalles del tratamiento</h3>
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded bg-gray-100">Volver</button>
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
