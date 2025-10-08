import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type {
  DonacionSemen,
  DonacionOvocitos,
} from "../../../interfaces/Donaciones";
import DonantesForm from "../components/DonantesForm";
import FenotipoForm from "../components/FenotipoFormNew";
import AntecedentesForm from "../components/AntecedentesNew";
import ResultadosGeneticosForm from "../components/ResultadosGeneticosNew";
import UbicacionBancoForm from "../components/UbicacionBancoForm";
import FormPagination from "../../../components/FormPagination";

// Recibe tipo: 'semen' | 'ovocitos' por query param o prop
export default function DonacionPage() {
  const navigate = useNavigate();
  const { tipo } = useParams<{ tipo: 'semen' | 'ovocitos' }>();

  // Estado único para todo el formulario
  const [formData, setFormData] = useState<any>({
    datosDonante: {},
    fenotipo: {},
    datosMedicos: {},
    resultadosGeneticos: {},
    aptoParaUso: true,
    ubicacionBanco: {},
    estado: 'Disponible',
    // Solo ovocitos
    datosObtencion: {},
    destino: 'Asignado a paciente',
    numOvocitos: 0,
  });
  // Paginación
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = tipo === 'semen' ? 5 : 6;

  // Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ...validaciones...
    if (!formData.datosDonante.nombre || !formData.datosDonante.apellido || !formData.datosDonante.dni) {
      alert("Por favor complete todos los datos del donante");
      return;
    }
    if (tipo === 'semen') {
      const donacionData: DonacionSemen = {
        id_donacion: generateId('s'),
        datos_donante: formData.datosDonante,
        fenotipo: formData.fenotipo,
        datos_medicos: formData.datosMedicos,
        resultados_geneticos: formData.resultadosGeneticos,
        apto_para_uso: formData.aptoParaUso,
        ubicacion_banco: formData.ubicacionBanco,
        estado: formData.estado,
        fecha_registro: new Date().toISOString(),
      };
      console.log("Donación de semen:", donacionData);
      alert("Donación de semen registrada exitosamente");
    } else {
      // Ovocitos
      const estadosOvo = [];
      for (let i = 1; i <= (formData.numOvocitos || 0); i++) {
        estadosOvo.push({
          id_ovocito: `ov_${i}_${Date.now()}`,
          estado: 'maduro',
          fecha_estado: new Date().toISOString(),
        });
      }
      const donacionData: DonacionOvocitos = {
        id_ovodonacion: generateId('o'),
        datos_donante: formData.datosDonante,
        fenotipo: formData.fenotipo,
        datos_obtencion: formData.datosObtencion,
        datos_geneticos: formData.resultadosGeneticos,
        estado_ovocitos: estadosOvo,
        ubicacion: formData.ubicacionBanco,
        destino: formData.destino,
        historial_acciones: [{
          fecha: new Date().toISOString(),
          accion: 'criopreservacion',
          descripcion: 'Registro inicial de donación',
          responsable: 'Sistema',
        }],
        fecha_registro: new Date().toISOString(),
      };
      console.log("Donación de ovocitos:", donacionData);
      alert("Donación de ovocitos registrada exitosamente");
    }
    navigate("/donaciones");
  };

  const generateId = (prefix: 's' | 'o') => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 1000000);
    return `don_${prefix}_${today}_${random}`;
  };

  return (
    <div className={`min-h-screen pt-20 pb-8 ${tipo === 'semen' ? 'bg-gradient-to-br from-blue-50 to-indigo-100' : 'bg-gradient-to-br from-pink-50 to-rose-100'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <button
              onClick={() => navigate("/donaciones")}
              className={`flex items-center mb-4 ${tipo === 'semen' ? 'text-blue-600 hover:text-blue-800' : 'text-pink-600 hover:text-pink-800'}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a Donaciones
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {tipo === 'semen' ? 'Registro de Donación de Semen' : 'Registro de Donación de Ovocitos'}
            </h1>
            <p className="text-gray-600">
              Complete todos los campos requeridos para registrar una nueva donación
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Wizard por secciones */}
            {currentSection === 1 && (
              <DonantesForm
                datos={formData.datosDonante}
                onChange={datos => setFormData(f => ({ ...f, datosDonante: datos }))}
              />
            )}
            {currentSection === 2 && (
              <FenotipoForm
                fenotipo={formData.fenotipo}
                onChange={fenotipo => setFormData(f => ({ ...f, fenotipo }))}
              />
            )}
            {currentSection === 3 && (
              <AntecedentesForm
                datosMedicos={formData.datosMedicos}
                onChange={datosMedicos => setFormData(f => ({ ...f, datosMedicos }))}
              />
            )}
            {currentSection === 4 && (
              <ResultadosGeneticosForm
                resultados={formData.resultadosGeneticos}
                onChange={resultadosGeneticos => setFormData(f => ({ ...f, resultadosGeneticos }))}
                aptoParaUso={formData.aptoParaUso}
                onAptoChange={aptoParaUso => setFormData(f => ({ ...f, aptoParaUso }))}
              />
            )}
            {tipo === 'ovocitos' && currentSection === 5 && (
              <section className="bg-pink-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Datos de Obtención</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Punción *</label>
                    <input
                      type="date"
                      name="fecha_puncion"
                      required
                      value={formData.datosObtencion.fecha_puncion || ''}
                      onChange={e => setFormData(f => ({ ...f, datosObtencion: { ...f.datosObtencion, fecha_puncion: e.target.value } }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número de Ovocitos Extraídos *</label>
                    <input
                      type="number"
                      name="numero_ovocitos_extraidos"
                      required
                      min="1"
                      max="50"
                      value={formData.datosObtencion.numero_ovocitos_extraidos || ''}
                      onChange={e => {
                        const num = parseInt(e.target.value) || 0;
                        setFormData(f => ({ ...f, datosObtencion: { ...f.datosObtencion, numero_ovocitos_extraidos: num }, numOvocitos: num }));
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número de Viables *</label>
                    <input
                      type="number"
                      name="numero_viables"
                      required
                      min="0"
                      max={formData.numOvocitos}
                      value={formData.datosObtencion.numero_viables || ''}
                      onChange={e => setFormData(f => ({ ...f, datosObtencion: { ...f.datosObtencion, numero_viables: parseInt(e.target.value) || 0 } }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>
              </section>
            )}

            {currentSection === totalSections && (
              <>
                <UbicacionBancoForm
                  value={formData.ubicacionBanco}
                  onChange={ubicacionBanco => setFormData(f => ({ ...f, ubicacionBanco }))}
                />
                {tipo === 'semen' ? (
                  <section className="bg-gray-50 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Estado Actual</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                      <select
                        required
                        value={formData.estado}
                        onChange={e => setFormData(f => ({ ...f, estado: e.target.value as 'Disponible' | 'En uso' | 'Descartado' | 'Donado' }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Disponible">Disponible</option>
                        <option value="En uso">En uso</option>
                        <option value="Descartado">Descartado</option>
                        <option value="Donado">Donado</option>
                      </select>
                    </div>
                  </section>
                ) : (
                  <section className="bg-gray-50 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Destino</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Destino *</label>
                      <select
                        required
                        value={formData.destino}
                        onChange={e => setFormData(f => ({ ...f, destino: e.target.value as 'Asignado a paciente' | 'Donado' | 'Descartado' }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      >
                        <option value="Asignado a paciente">Asignado a paciente</option>
                        <option value="Donado">Donado</option>
                        <option value="Descartado">Descartado</option>
                      </select>
                    </div>
                  </section>
                )}
              </>
            )}
            <FormPagination
              currentStep={currentSection}
              totalSteps={totalSections}
              onStepChange={setCurrentSection}
              onPrev={() => setCurrentSection(currentSection - 1)}
              onNext={() => setCurrentSection(currentSection + 1)}
              isLastStep={currentSection === totalSections}
              onCancel={() => navigate("/donaciones")}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
