import React, { useState } from 'react';
import ObjetivoModal from './ObjetivoModal';
import AntecedentesClinicos from './AntecedentesClinicos';
import AntecedentesQuirurgicos from './AntecedentesQuirurgicos';
import AntecedentesPersonales from './AntecedentesPersonales';
import AntecedentesGinecologicos from './AntecedentesGinecologicos';
import FenotipoDonacion from './FenotipoDonacion';
import AntecedentesGenitales from './AntecedentesGenitales';

// Puedes reemplazar estos SVGs por Heroicons o FontAwesome si los tienes instalados
const icons = {
  clinicos: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3v1a3 3 0 006 0v-1c0-1.657-1.343-3-3-3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /></svg>
  ),
  quirurgicos: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-7 7-7-7" /></svg>
  ),
  personales: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8" /></svg>
  ),
  ginecologicos: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8" /></svg>
  ),
  fenotipo: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8" /></svg>
  ),
  genitales: (
    <svg className="w-6 h-6 inline-block mr-2 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8" /></svg>
  ),
};

const Card: React.FC<{ children: React.ReactNode; title: string; icon?: React.ReactNode }> = ({ children, title, icon }) => (
  <div className="bg-white bg-opacity-90 border-2 border-black rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8">
    <h2 className="text-xl font-bold mb-4 flex items-center text-black">{icon}{title}</h2>
    {children}
  </div>
);

const ComponentePadre: React.FC = () => {
  const [objetivoSeleccionado, setObjetivoSeleccionado] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="min-h-screen py-10 px-2" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e5e7eb 100%)' }}>
      <div className="flex justify-center mt-8 mb-2">
        <button onClick={() => setModalAbierto(true)} className="bg-black text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-lg hover:bg-gray-800 transition">
          Seleccionar objetivo
        </button>
      </div>
      {objetivoSeleccionado && (
        <div className="flex justify-center mb-6">
          <span className="text-lg font-medium text-black bg-white bg-opacity-80 px-4 py-2 rounded shadow border border-black">
            Objetivo seleccionado: <span className="font-bold">{objetivoSeleccionado.replace(/_/g, ' ')}</span>
          </span>
        </div>
      )}
      <ObjetivoModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSelect={(opcion) => setObjetivoSeleccionado(opcion)}
      />

      {objetivoSeleccionado && (
        <>
          {/* Antecedentes Clínicos */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Antecedentes Clínicos - Mujer 1" icon={icons.clinicos}>
                <AntecedentesClinicos titulo="Mujer 1" />
              </Card>
              <Card title="Antecedentes Clínicos - Mujer 2" icon={icons.clinicos}>
                <AntecedentesClinicos titulo="Mujer 2" />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Antecedentes Clínicos - Mujer" icon={icons.clinicos}>
                <AntecedentesClinicos titulo="Mujer" />
              </Card>
              <Card title="Antecedentes Clínicos - Hombre" icon={icons.clinicos}>
                <AntecedentesClinicos titulo="Hombre" />
              </Card>
            </>
          ) : (
            <Card title="Antecedentes Clínicos" icon={icons.clinicos}>
              <AntecedentesClinicos />
            </Card>
          )}

          {/* Antecedentes Quirúrgicos */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Antecedentes Quirúrgicos - Mujer 1" icon={icons.quirurgicos}>
                <AntecedentesQuirurgicos titulo="Mujer 1" />
              </Card>
              <Card title="Antecedentes Quirúrgicos - Mujer 2" icon={icons.quirurgicos}>
                <AntecedentesQuirurgicos titulo="Mujer 2" />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Antecedentes Quirúrgicos - Mujer" icon={icons.quirurgicos}>
                <AntecedentesQuirurgicos titulo="Mujer" />
              </Card>
              <Card title="Antecedentes Quirúrgicos - Hombre" icon={icons.quirurgicos}>
                <AntecedentesQuirurgicos titulo="Hombre" />
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
                <AntecedentesPersonales titulo="Mujer 1" />
              </Card>
              <Card title="Antecedentes Personales - Mujer 2" icon={icons.personales}>
                <AntecedentesPersonales titulo="Mujer 2" />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Antecedentes Personales - Mujer" icon={icons.personales}>
                <AntecedentesPersonales titulo="Mujer" />
              </Card>
              <Card title="Antecedentes Personales - Hombre" icon={icons.personales}>
                <AntecedentesPersonales titulo="Hombre" />
              </Card>
            </>
          ) : (
            <Card title="Antecedentes Personales" icon={icons.personales}>
              <AntecedentesPersonales />
            </Card>
          )}

          {/* Antecedentes Ginecológicos (doble si método ropa) */}
          <Card title="Antecedentes Ginecológicos" icon={icons.ginecologicos}>
            <AntecedentesGinecologicos doble={objetivoSeleccionado === 'pareja_femenina_ropa'} />
          </Card>

          {/* Fenotipo solo si mujer sola donación */}
          <Card title="Fenotipo (solo para donación)" icon={icons.fenotipo}>
            <FenotipoDonacion visible={objetivoSeleccionado === 'mujer_sola_donacion'} />
          </Card>

          {/* Antecedentes genitales solo si pareja heterosexual */}
          <Card title="Antecedentes Genitales" icon={icons.genitales}>
            <AntecedentesGenitales visible={objetivoSeleccionado === 'pareja_heterosexual'} />
          </Card>
        </>
      )}
    </div>
  );
};

export default ComponentePadre;
