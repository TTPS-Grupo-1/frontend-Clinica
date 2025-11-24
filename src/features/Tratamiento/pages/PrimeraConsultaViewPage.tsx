import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import DatosGenerales from '../components/PrimeraConsulta/DatosGenerales';
import AntecedentesView from '../components/PrimeraConsulta/AntecedentesView';
import EstudiosView from '../components/PrimeraConsulta/EstudiosView';
import FenotipView from '../components/PrimeraConsulta/FenotipView';

export default function PrimeraConsultaViewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    tratamientoData, 
    paciente,
    antecedentes_ginecologicos = [],
    antecedentes_personales = [],
    resultados_estudios = [],
    ordenes = []
  } = location.state || {};
  console.log('tratamientoData en PrimeraConsultaViewPage:', tratamientoData);
  console.log(antecedentes_ginecologicos)
  console.log(antecedentes_personales)
  console.log(resultados_estudios)
  if (!tratamientoData || !paciente) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-100 via-white to-blue-300">
        <div className="z-10 w-full max-w-2xl rounded-xl bg-white p-8 text-center text-red-600 shadow-lg">
          Faltan datos de la primera consulta. <br />
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

  const primeraConsulta = tratamientoData.primera_consulta;
  
  return (
    <section className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-100 via-white to-blue-300 py-8">
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-2xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-300 opacity-30 blur-2xl" />
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
              <h1 className="text-2xl font-bold text-gray-800">Primera Consulta</h1>
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

        {/* Grid de componentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Datos Generales */}
          <div className="lg:col-span-2">
            <DatosGenerales 
              objetivo={primeraConsulta?.objetivo_consulta || tratamientoData?.objetivo}
              fecha={primeraConsulta?.fecha}
              medico={tratamientoData?.medico_nombre || tratamientoData?.medico}
              consultaId={primeraConsulta?.id}
            />
          </div>

          {/* Antecedentes */}
          <AntecedentesView 
            antecedentes={{
              clinicos_1: primeraConsulta?.antecedentes_clinicos_1,
              clinicos_2: primeraConsulta?.antecedentes_clinicos_2,
              familiares_1: primeraConsulta?.antecedentes_familiares_1,
              familiares_2: primeraConsulta?.antecedentes_familiares_2,
              quirurgicos_1: primeraConsulta?.antecedentes_quirurgicos_1,
              quirurgicos_2: primeraConsulta?.antecedentes_quirurgicos_2,
              genitales: primeraConsulta?.antecedentes_genitales,
              examen_fisico_1: primeraConsulta?.examen_fisico_1,
              examen_fisico_2: primeraConsulta?.examen_fisico_2
            }}
            objetivo={primeraConsulta?.objetivo_consulta || tratamientoData?.objetivo}
            antecedentesGinecologicos={antecedentes_ginecologicos}
            antecedentesPersonales={antecedentes_personales}
          />

          {/* Estudios */}
          <EstudiosView 
            estudios={[]}
            objetivo={primeraConsulta?.objetivo_consulta || tratamientoData?.objetivo}
            resultadosEstudios={resultados_estudios}
            ordenes={ordenes}
          />

          {/* Fenotipo */}
          {((primeraConsulta?.objetivo_consulta || tratamientoData?.objetivo) === 'mujer_sola_donacion' || 
            (primeraConsulta?.objetivo_consulta || tratamientoData?.objetivo) === 'pareja_femenina_donacion') && (
            <div className="lg:col-span-2">
              <FenotipView fenotipo={{}} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}