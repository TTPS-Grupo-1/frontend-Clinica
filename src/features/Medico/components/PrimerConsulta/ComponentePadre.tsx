import React, { useState } from 'react';
import ObjetivoModal from './ObjetivoModal';
import AntecedentesClinicos from './AntecedentesClinicos';
import AntecedentesQuirurgicos from './AntecedentesQuirurgicos';
import AntecedentesPersonales from './AntecedentesPersonales';
import AntecedentesGinecologicos from './AntecedentesGinecologicos';
import FenotipoDonacion from './FenotipoDonacion';
import AntecedentesGenitales from './AntecedentesGenitales';

const ComponentePadre: React.FC = () => {
  const [objetivoSeleccionado, setObjetivoSeleccionado] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-center mt-8">
        <button onClick={() => setModalAbierto(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          Seleccionar objetivo
        </button>
      </div>
      <ObjetivoModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSelect={(opcion) => setObjetivoSeleccionado(opcion)}
      />

      {/* Mostrar los demás componentes solo si hay objetivo seleccionado */}
      {objetivoSeleccionado && (
        <>
          {/* Antecedentes Clínicos (dos veces si corresponde) */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <AntecedentesClinicos titulo="Antecedentes Clínicos Mujer 1" />
              <AntecedentesClinicos titulo="Antecedentes Clínicos Mujer 2" />
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <AntecedentesClinicos titulo="Antecedentes Clínicos Mujer" />
              <AntecedentesClinicos titulo="Antecedentes Clínicos Hombre" />
            </>
          ) : (
            <AntecedentesClinicos />
          )}

          {/* Antecedentes Quirúrgicos */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <AntecedentesQuirurgicos titulo="Antecedentes Quirúrgicos Mujer 1" />
              <AntecedentesQuirurgicos titulo="Antecedentes Quirúrgicos Mujer 2" />
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <AntecedentesQuirurgicos titulo="Antecedentes Quirúrgicos Mujer" />
              <AntecedentesQuirúrgicos titulo="Antecedentes Quirúrgicos Hombre" />
            </>
          ) : (
            <AntecedentesQuirurgicos />
          )}

          {/* Antecedentes Personales */}
          {(objetivoSeleccionado === 'pareja_femenina_ropa') ? (
            <>
              <AntecedentesPersonales titulo="Antecedentes Personales Mujer 1" />
              <AntecedentesPersonales titulo="Antecedentes Personales Mujer 2" />
            </>
          ) : objetivoSeleccionado === 'pareja_heterosexual' ? (
            <>
              <AntecedentesPersonales titulo="Antecedentes Personales Mujer" />
              <AntecedentesPersonales titulo="Antecedentes Personales Hombre" />
            </>
          ) : (
            <AntecedentesPersonales />
          )}

          {/* Antecedentes Ginecológicos (doble si método ropa) */}
          <AntecedentesGinecologicos doble={objetivoSeleccionado === 'pareja_femenina_ropa'} />

          {/* Fenotipo solo si mujer sola donación */}
          <FenotipoDonacion visible={objetivoSeleccionado === 'mujer_sola_donacion'} />

          {/* Antecedentes genitales solo si pareja heterosexual */}
          <AntecedentesGenitales visible={objetivoSeleccionado === 'pareja_heterosexual'} />
        </>
      )}
    </div>
  );
};

export default ComponentePadre;
