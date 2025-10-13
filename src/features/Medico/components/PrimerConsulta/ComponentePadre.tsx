import React, { useState } from 'react';
import ObjetivoModal from './ObjetivoModal';
import AntecedentesClinicos from './AntecedentesClinicos';
import AntecedentesQuirurgicos from './AntecedentesQuirurgicos';
import AntecedentesPersonales from './AntecedentesPersonales';
import AntecedentesGinecologicos from './AntecedentesGinecologicos';
import FenotipoDonacion from './FenotipoDonacion';
import AntecedentesGenitales from './AntecedentesGenitales';
import AntecedentesFamiliares from './AntecedentesFamiliares';
import ExamenFisico from './ExamenFisico';
import AntecedentesGinecologicosAPI from './AntecedentesGinecologicosAPI';
import AntecedentesHormonales from './AntecedentesHormonales';


// Iconos
const icons = {
  clinicos: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3v1a3 3 0 006 0v-1c0-1.657-1.343-3-3-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
    </svg>
  ),
  quirurgicos: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-7 7-7-7" />
    </svg>
  ),
  personales: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8" />
    </svg>
  ),
  ginecologicos: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8" />
    </svg>
  ),
  fenotipo: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8" />
    </svg>
  ),
  genitales: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8" />
    </svg>
  ),
  familiares: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
};

// Card reutilizable
const Card: React.FC<{ children: React.ReactNode; title: string; icon?: React.ReactNode }> = ({ children, title, icon }) => (
  <div className="bg-white bg-opacity-90 border-2 border-black rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8">
    <h2 className="text-xl font-bold mb-4 flex items-center text-black">{icon}{title}</h2>
    {children}
  </div>
);

// Componente principal
const ComponentePadre: React.FC = () => {
  const [objetivoSeleccionado, setObjetivoSeleccionado] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // 🔹 Nuevo estado para los antecedentes familiares
  const [familiares, setFamiliares] = useState<string>('');

  return (
    <div className="min-h-screen py-10 px-2 bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Modal de selección */}
      <div className="flex justify-center mt-8 mb-2">
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-black text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-lg hover:bg-gray-800 transition"
        >
          Seleccionar objetivo
        </button>
      </div>

      {/* Mostrar objetivo */}
      {objetivoSeleccionado && (
        <div className="flex justify-center mb-6">
          <span className="text-lg font-medium text-black bg-white bg-opacity-80 px-4 py-2 rounded shadow border border-black">
            Objetivo seleccionado: <span className="font-bold">{objetivoSeleccionado.replace(/_/g, ' ')}</span>
          </span>
        </div>
      )}

      {/* Modal */}
      <ObjetivoModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSelect={(opcion) => setObjetivoSeleccionado(opcion)}
      />

      {/* Contenido dinámico */}
      {objetivoSeleccionado && (
        <>
          {/* Antecedentes Clínicos */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Antecedentes Clínicos" icon={icons.clinicos}>
                <AntecedentesClinicos titulo= "Mujer 1" />
              </Card>
              <Card title="Antecedentes Clínicos" icon={icons.clinicos}>
                <AntecedentesClinicos titulo= "Mujer 2" />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Antecedentes Clínicos - Mujer" icon={icons.clinicos}>
                <AntecedentesClinicos titulo= "Mujer" />
              </Card>
              <Card title="Antecedentes Clínicos - Hombre" icon={icons.clinicos}>
                <AntecedentesClinicos titulo= "Hombre" />
              </Card>
            </>
          ) : (
            <Card title="Antecedentes Clínicos" icon={icons.clinicos}>
              <AntecedentesClinicos />
            </Card>
          )}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Antecedentes Familiares - Mujer 1" icon={icons.familiares}>
                <AntecedentesFamiliares onDataChange={setFamiliares}/>
              </Card>
              <Card title="Antecedentes Familiares - Mujer 2" icon={icons.familiares}>
                <AntecedentesFamiliares onDataChange={setFamiliares}/>
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Antecedentes Familiares - Mujer" icon={icons.familiares}>
                <AntecedentesFamiliares onDataChange={setFamiliares}/>
              </Card>
              <Card title="Antecedentes Familiares - Hombre" icon={icons.familiares}>
                <AntecedentesFamiliares onDataChange={setFamiliares}/>
              </Card>
            </>
          ) : (
            <Card title="Antecedentes Familiares" icon={icons.familiares}>
              <AntecedentesFamiliares onDataChange={setFamiliares}/>
            </Card>
          )}

          {/* Antecedentes Ginecológicos */}
          {objetivoSeleccionado === 'pareja_femenina_ropa' ? (
            <>
              <Card title="Antecedentes Ginecológicos" icon={icons.ginecologicos}>
                <AntecedentesGinecologicos doble={objetivoSeleccionado === 'pareja_femenina_ropa'} />
              </Card>
            </>
          ) : (
            <Card title="Antecedentes Ginecológicos" icon={icons.ginecologicos}>
              <AntecedentesGinecologicos />
            </Card>

          )}
          {/* Antecedentes Quirúrgicos */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Antecedentes Quirúrgicos - Mujer 1" icon={icons.quirurgicos}>
                <AntecedentesQuirurgicos titulo= "Mujer 1" />
              </Card>
              <Card title="Antecedentes Quirúrgicos - Mujer 2" icon={icons.quirurgicos}>
                <AntecedentesQuirurgicos titulo= "Mujer 2" />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Antecedentes Quirúrgicos - Mujer" icon={icons.quirurgicos}>
                <AntecedentesQuirurgicos titulo= "Mujer" />
              </Card>
              <Card title="Antecedentes Quirúrgicos - Hombre" icon={icons.quirurgicos}>
                <AntecedentesQuirurgicos titulo= "Hombre" />
              </Card>
            </>
          ) : (
            <Card title="Antecedentes Quirúrgicos" icon={icons.quirurgicos}>
              <AntecedentesQuirurgicos />
            </Card>
          )}
          {/* Antecedentes Personales */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Antecedentes Personales - Mujer 1" icon={icons.personales}>
                <AntecedentesPersonales titulo= "Mujer 1" />
              </Card>
              <Card title="Antecedentes Personales - Mujer 2" icon={icons.personales}>
                <AntecedentesPersonales titulo= "Mujer 2" />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Antecedentes Personales - Mujer" icon={icons.personales}>
                <AntecedentesPersonales titulo= "Mujer" />
              </Card>
              <Card title="Antecedentes Personales - Hombre" icon={icons.personales}>
                <AntecedentesPersonales titulo= "Hombre" />
              </Card>
            </>
          ) : (
            <Card title="Antecedentes Personales" icon={icons.personales}>
              <AntecedentesPersonales />
            </Card>
          )}
          {/* Examen Físico */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Examen Físico - Mujer 1" icon={icons.personales}>
                <ExamenFisico/>
              </Card>
              <Card title="Examen Físico - Mujer 2" icon={icons.personales}>
                <ExamenFisico/>
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Examen Físico - Mujer" icon={icons.personales}>
                <ExamenFisico/>
              </Card>
              <Card title="Examen Físico - Hombre" icon={icons.personales}>
                <ExamenFisico/>
              </Card>
            </>
          ) : (
            <Card title="Examen Físico" icon={icons.personales}>
              <ExamenFisico />
            </Card>
          )}
          {/* Antecedentes Ginecológicos vía API */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Antecedentes Ginecológicos API - Mujer 1" icon={icons.ginecologicos}>
                <AntecedentesGinecologicosAPI />
              </Card>
              <Card title="Antecedentes Ginecológicos API - Mujer 2" icon={icons.ginecologicos}>
                <AntecedentesGinecologicosAPI />
              </Card>
            </>
          ) : (
            <>
              <Card title="Antecedentes Ginecológicos API" icon={icons.ginecologicos}>
                <AntecedentesGinecologicosAPI />
              </Card>
            </>
          )}


          {/* Fenotipo y Genitales */}
          <Card title="Fenotipo (solo para donación)" icon={icons.fenotipo}>
            <FenotipoDonacion visible={objetivoSeleccionado === 'mujer_sola_donacion' || objetivoSeleccionado === 'pareja_femenina_donacion'} />
          </Card>

          <Card title="Antecedentes Genitales" icon={icons.genitales}>
            <AntecedentesGenitales visible={objetivoSeleccionado === 'pareja_heterosexual'} />
          </Card>

          {/* Antecedentes hormonales */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Antecedentes Hormonales - Mujer 1" icon={icons.clinicos}>
                <AntecedentesHormonales />
              </Card>
              <Card title="Antecedentes Hormonales - Mujer 2" icon={icons.clinicos}>
                <AntecedentesHormonales />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Antecedentes Hormonales - Mujer" icon={icons.clinicos}>
                <AntecedentesHormonales/>
              </Card>
              <Card title="Antecedentes Hormonales - Hombre" icon={icons.clinicos}>  
                <AntecedentesHormonales/>
              </Card>
            </>
          ) : (
            <Card title="Antecedentes Hormonales" icon={icons.clinicos}>
              <AntecedentesHormonales />
            </Card>
          )}

        </>
      )}

      {/* Confirmar */}
      {objetivoSeleccionado && (
        <div className="flex justify-center fixed bottom-0 left-0 w-full pb-6 z-30 pointer-events-none">
          <button
            className="pointer-events-auto bg-black text-white px-10 py-4 rounded-full shadow-xl font-bold text-lg border-2 border-white hover:bg-white hover:text-black transition duration-200"
            onClick={() => {
              const datos = {
                objetivo: objetivoSeleccionado,
                familiares, // 🔹 incluido en el envío
              };
              console.log('Enviar datos al backend:', datos);
              alert('Enviar datos al backend:\n' + JSON.stringify(datos, null, 2));
            }}
          >
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
};

export default ComponentePadre;
