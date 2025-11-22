import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, FlaskConical, Syringe, FileCheck, Calendar, CheckCircle } from 'lucide-react';
import ResultadosEstudios from '../components/SegundaConsulta/ResultadosEstudios';
import ProtocoloView from '../components/SegundaConsulta/ProtocoloView';
import ConsentimientoView from '../components/SegundaConsulta/ConsentimientoView';
import MonitoreoView from '../components/SegundaConsulta/MonitoreoView';
import ConclusionesView from '../components/SegundaConsulta/ConclusionesView';

export default function SegundaConsultaViewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tratamientoData, paciente } = location.state || {};

  if (!tratamientoData || !paciente) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-gradient-to-br from-green-100 via-white to-green-300">
        <div className="z-10 w-full max-w-2xl rounded-xl bg-white p-8 text-center text-red-600 shadow-lg">
          Faltan datos de la segunda consulta. <br />
          <button
            className="mt-4 rounded bg-green-600 px-4 py-2 text-white"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const segundaConsulta = tratamientoData.segunda_consulta;
  
  return (
    <section className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-green-100 via-white to-green-300 py-8">
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-green-200 opacity-30 blur-2xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-green-300 opacity-30 blur-2xl" />
      </div>

      <div className="z-10 relative mx-auto max-w-6xl px-4 p-20">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between rounded-xl bg-white p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-600 hover:bg-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Segunda Consulta</h1>
              <p className="text-gray-600">
                {paciente.nombre} {paciente.apellido} - DNI: {paciente.dni}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-700 font-medium">Completada</span>
          </div>
        </div>

        {/* Navegación por secciones */}
        <div className="mb-6 flex flex-wrap gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-blue-700">
            <FlaskConical className="h-4 w-4" />
            <span className="text-sm font-medium">Estudios</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-purple-100 px-3 py-2 text-purple-700">
            <Syringe className="h-4 w-4" />
            <span className="text-sm font-medium">Protocolo</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-orange-100 px-3 py-2 text-orange-700">
            <FileCheck className="h-4 w-4" />
            <span className="text-sm font-medium">Consentimiento</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-cyan-100 px-3 py-2 text-cyan-700">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Monitoreo</span>
          </div>
        </div>

        {/* Grid de componentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resultados de Estudios */}
          <div className="lg:col-span-2">
            <ResultadosEstudios 
              estudios={[]}
              fecha={segundaConsulta?.fecha}
            />
          </div>

          {/* Protocolo */}
          <ProtocoloView 
            protocolo={{
              tipo_medicacion: segundaConsulta?.tipo_medicacion,
              dosis_medicacion: segundaConsulta?.dosis_medicacion,
              duracion_medicacion: segundaConsulta?.duracion_medicacion,
              droga: segundaConsulta?.droga,
              orden_droga_pdf: segundaConsulta?.orden_droga_pdf
            }}
          />

          {/* Consentimiento */}
          <ConsentimientoView 
            consentimiento={segundaConsulta?.consentimiento_informado}
            fecha={segundaConsulta?.fecha}
          />

          {/* Monitoreo */}
          <div className="lg:col-span-2">
            <MonitoreoView 
              monitoreo={[]}
            />
          </div>

          {/* Conclusiones */}
          <div className="lg:col-span-2">
            <ConclusionesView 
              conclusiones={{}}
              ovocitoViable={segundaConsulta?.ovocito_viable}
              semenViable={segundaConsulta?.semen_viable}
            />
          </div>
        </div>
      </div>
    </section>
  );
}