import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import ObjetivoModal from './ObjetivoModal';
import AntecedentesClinicos from './AntecedentesClinicos';
import EstudiosPrequirurgicos from './EstudioPrequirugico';
import AntecedentesQuirurgicos from './AntecedentesQuirurgicos';
import AntecedentesGinecologicos from './AntecedentesGinecologicos';
import FenotipoDonacion from './FenotipoDonacion';
import AntecedentesFamiliares from './AntecedentesFamiliares';
import ExamenFisico from './ExamenFisico';
import AntecedentesHormonales from './AntecedentesHormonales';
import EstudioSemen from './EstudioSemen';
import EstudioGinecologico from './EstudioGinecologico';


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

  
  // Estado global del formulario: cada sección actualizará su parte
  const [formData, setFormData] = useState<any>({});

  const updateSection = (key: string, data: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: data }));
  };

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
                <AntecedentesClinicos titulo= "Mujer 1" onDataChange={(d) => updateSection('clinicos_mujer1', d)} />
              </Card>
              <Card title="Antecedentes Clínicos" icon={icons.clinicos}>
                <AntecedentesClinicos titulo= "Mujer 2" onDataChange={(d) => updateSection('clinicos_mujer2', d)} />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Antecedentes Clínicos - Mujer" icon={icons.clinicos}>
                <AntecedentesClinicos titulo= "Mujer" onDataChange={(d) => updateSection('clinicos_mujer', d)} />
              </Card>
              <Card title="Antecedentes Clínicos - Hombre" icon={icons.clinicos}>
                <AntecedentesClinicos titulo= "Hombre" onDataChange={(d) => updateSection('clinicos_hombre', d)} />
              </Card>
            </>
          ) : (
            <Card title="Antecedentes Clínicos" icon={icons.clinicos}>
              <AntecedentesClinicos onDataChange={(d) => updateSection('clinicos', d)} />
            </Card>
          )}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Antecedentes Familiares - Mujer 1" icon={icons.familiares}>
                <AntecedentesFamiliares onDataChange={(d) => updateSection('familiares_mujer1', d)} />
              </Card>
              <Card title="Antecedentes Familiares - Mujer 2" icon={icons.familiares}>
                <AntecedentesFamiliares onDataChange={(d) => updateSection('familiares_mujer2', d)} />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Antecedentes Familiares - Mujer" icon={icons.familiares}>
                <AntecedentesFamiliares onDataChange={(d) => updateSection('familiares_mujer', d)} />
              </Card>
              <Card title="Antecedentes Familiares - Hombre" icon={icons.familiares}>
                <AntecedentesFamiliares onDataChange={(d) => updateSection('familiares_hombre', d)} />
              </Card>
            </>
          ) : (
            <Card title="Antecedentes Familiares" icon={icons.familiares}>
              <AntecedentesFamiliares onDataChange={(d) => updateSection('familiares', d)} />
            </Card>
          )}

          {/* Antecedentes Ginecológicos */}
          {objetivoSeleccionado === 'pareja_femenina_ropa' ? (
            <>
              <Card title="Antecedentes Ginecológicos" icon={icons.ginecologicos}>
                <AntecedentesGinecologicos onDataChange={(d) => updateSection('ginecologicos_mujer1', d)} />
              </Card>
              <Card title="Antecedentes Ginecológicos" icon={icons.ginecologicos}>
                <AntecedentesGinecologicos onDataChange={(d) => updateSection('ginecologicos_mujer2', d)} />
              </Card>
            </>
          ) : (
              <Card title="Antecedentes Ginecológicos" icon={icons.ginecologicos}>
                <AntecedentesGinecologicos onDataChange={(d) => updateSection('ginecologicos', d)} />
              </Card>

          )}
          {/* Antecedentes Quirúrgicos */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Estudios Prequirúrgicos - Mujer 1" icon={icons.quirurgicos}>
                <EstudiosPrequirurgicos titulo= "Mujer 1" onDataChange={(d) => updateSection('quirurgicos_mujer1', d)} />
              </Card>
              <Card title="Estudios Prequirúrgicos - Mujer 2" icon={icons.quirurgicos}>
                <EstudiosPrequirurgicos titulo= "Mujer 2" onDataChange={(d) => updateSection('quirurgicos_mujer2', d)} />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Estudios Prequirúrgicos - Mujer" icon={icons.quirurgicos}>
                <EstudiosPrequirurgicos titulo= "Mujer" onDataChange={(d) => updateSection('quirurgicos_mujer', d)} />
              </Card>
              <Card title="Estudios Prequirúrgicos - Hombre" icon={icons.quirurgicos}>
                <EstudiosPrequirurgicos titulo= "Hombre" onDataChange={(d) => updateSection('quirurgicos_hombre', d)} />
              </Card>
            </>
          ) : (
              <Card title="Estudios Prequirúrgicos" icon={icons.quirurgicos}>
                <EstudiosPrequirurgicos onDataChange={(d) => updateSection('quirurgicos', d)} />
              </Card>
          )}
          {/* Antecedentes Personales */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Antecedentes Quirúrgicos - Mujer 1" icon={icons.personales}>
                <AntecedentesQuirurgicos titulo= "Mujer 1" onDataChange={(d) => updateSection('quirurgicos_mujer1', d)} />
              </Card>
              <Card title="Antecedentes Quirúrgicos - Mujer 2" icon={icons.personales}>
                <AntecedentesQuirurgicos titulo= "Mujer 2" onDataChange={(d) => updateSection('quirurgicos_mujer2', d)} />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Antecedentes Quirúrgicos - Mujer" icon={icons.personales}>
                <AntecedentesQuirurgicos titulo= "Mujer" onDataChange={(d) => updateSection('quirurgicos_mujer', d)} />
              </Card>
              <Card title="Antecedentes Quirúrgicos - Hombre" icon={icons.personales}>
                <AntecedentesQuirurgicos titulo= "Hombre" onDataChange={(d) => updateSection('quirurgicos_hombre', d)} />
              </Card>
            </>
          ) : (
              <Card title="Antecedentes Quirúrgicos" icon={icons.personales}>
                <AntecedentesQuirurgicos onDataChange={(d) => updateSection('quirurgicos', d)} />
              </Card>
          )}
          {/* Examen Físico */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Examen Físico - Mujer 1" icon={icons.personales}>
                <ExamenFisico onDataChange={(d) => updateSection('examen_fisico_mujer1', d)} />
              </Card>
              <Card title="Examen Físico - Mujer 2" icon={icons.personales}>
                <ExamenFisico onDataChange={(d) => updateSection('examen_fisico_mujer2', d)} />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Examen Físico - Mujer" icon={icons.personales}>
                <ExamenFisico onDataChange={(d) => updateSection('examen_fisico_mujer', d)} />
              </Card>
              <Card title="Examen Físico - Hombre" icon={icons.personales}>
                <ExamenFisico onDataChange={(d) => updateSection('examen_fisico_hombre', d)} />
              </Card>
            </>
          ) : (
              <Card title="Examen Físico" icon={icons.personales}>
              <ExamenFisico onDataChange={(d) => updateSection('examen_fisico', d)} />
            </Card>
          )}
          {/* Antecedentes Ginecológicos vía API */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Estudios Ginecológicos - Mujer 1" icon={icons.ginecologicos}>
                <EstudioGinecologico onDataChange={(d) => updateSection('estudios_ginecologicos_mujer1', d)} />
              </Card>
              <Card title="Estudios Ginecológicos - Mujer 2" icon={icons.ginecologicos}>
                <EstudioGinecologico onDataChange={(d) => updateSection('estudios_ginecologicos_mujer2', d)} />
              </Card>
            </>
          ) : (
            <>
              <Card title="Estudios Ginecológicos" icon={icons.ginecologicos}>
                <EstudioGinecologico onDataChange={(d) => updateSection('estudios_ginecologicos', d)} />
              </Card>
            </>
          )}


          {/* Fenotipo y Genitales */}
            <Card title="Fenotipo (solo para donación)" icon={icons.fenotipo}>
            <FenotipoDonacion visible={objetivoSeleccionado === 'mujer_sola_donacion' || objetivoSeleccionado === 'pareja_femenina_donacion'} onDataChange={(d) => updateSection('fenotipo', d)} />
          </Card>

            <Card title="Estudio de Semen" icon={icons.genitales}>
            <EstudioSemen visible={objetivoSeleccionado === 'pareja_heterosexual'} onDataChange={(d) => updateSection('genitales', d)} />
          </Card>

          {/* Antecedentes hormonales */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <Card title="Antecedentes Hormonales - Mujer 1" icon={icons.clinicos}>
                <AntecedentesHormonales onDataChange={(d) => updateSection('hormonales_mujer1', d)} />
              </Card>
              <Card title="Antecedentes Hormonales - Mujer 2" icon={icons.clinicos}>
                <AntecedentesHormonales onDataChange={(d) => updateSection('hormonales_mujer2', d)} />
              </Card>
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <Card title="Antecedentes Hormonales - Mujer" icon={icons.clinicos}>
                <AntecedentesHormonales onDataChange={(d) => updateSection('hormonales_mujer', d)} />
              </Card>
              <Card title="Antecedentes Hormonales - Hombre" icon={icons.clinicos}>
                <AntecedentesHormonales onDataChange={(d) => updateSection('hormonales_hombre', d)} />
              </Card>
            </>
          ) : (
              <Card title="Antecedentes Hormonales" icon={icons.clinicos}>
              <AntecedentesHormonales onDataChange={(d) => updateSection('hormonales', d)} />
            </Card>
          )}

        </>
      )}

      {/* Confirmar */}
          {objetivoSeleccionado && (
        <div className="flex justify-center fixed bottom-0 left-0 w-full pb-6 z-30 pointer-events-none">
          <button
            className="pointer-events-auto bg-black text-white px-10 py-4 rounded-full shadow-xl font-bold text-lg border-2 border-white hover:bg-white hover:text-black transition duration-200"
            onClick={async () => {
              const errors: string[] = [];
              const fd = formData || {};

              // Ginecológicos: require menarca if the section exists
              if (fd.ginecologicos?.datos1) {
                const menarca = fd.ginecologicos.datos1.menarca;
                if (!menarca || menarca.toString().trim() === '') {
                  errors.push('Complete Menarca en Antecedentes Ginecológicos.');
                }
              }

              // Personales: at least one field filled
              if (fd.personales) {
                const p = fd.personales;
                const anyFilled = [p.fuma, p.alcohol, p.drogas, p.observaciones].some(v => v && v.toString().trim() !== '');
                if (!anyFilled) errors.push('Complete al menos un campo en Antecedentes Personales.');
              }

              // Clínicos: at least one non-empty value in any clinico section
              const clinicoSections = ['clinicos', 'clinicos_mujer1', 'clinicos_mujer2', 'clinicos_mujer'];
              const anyClinico = clinicoSections.some(k => {
                const sec = fd[k];
                return sec && Object.values(sec).some(v => v !== undefined && v !== null && v.toString().trim() !== '');
              });
              if (!anyClinico) {
                errors.push('Complete al menos un antecedente clínico.');
              }

              if (errors.length > 0) {
                errors.forEach(e => toast.error(e));
                return;
              }

              const datos = {
                objetivo: objetivoSeleccionado,
                form: formData,
              };
              try {
                console.log('🧾 Datos listos para enviar:', datos);
                await axios.post('/api/primer-consulta/', datos, { withCredentials: true });
                toast.success('Datos enviados correctamente');

              } catch (err: any) {
                console.error('Error enviando datos', err);
                toast.error(err.response?.data?.message || 'Error al enviar datos');
              }
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
