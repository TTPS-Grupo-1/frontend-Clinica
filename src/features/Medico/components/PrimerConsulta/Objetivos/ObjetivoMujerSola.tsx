import React from 'react';
import Pagination from '../../../../../components/Pagination';
import Card from '../Card';
import AntecedentesClinicos from '../Antecedentes/AntecedentesClinicos';
import AntecedentesFamiliares from '../Antecedentes/AntecedentesFamiliares';
import AntecedentesPersonales from '../Antecedentes/AntecedentesPersonales';
import AntecedentesQuirurgicos from '../Antecedentes/AntecedentesQuirurgicos';
import ExamenFisico from '../ExamenFisico';
import EstudioGinecologico from '../Estudios/EstudioGinecologico';
import EstudiosHormonales from '../Estudios/EstudiosHormonales';
import EstudiosPrequirurgicos from '../Estudios/EstudiosPrequirugicos';
import FenotipoDonacion from '../FenotipoDonacion';
import AntecedentesGinecologicos from '../Antecedentes/AntecedentesGinecologicos';
import type { ObjetivoXProps } from '../../../../../interfaces/Medico';

const ObjetivoMujerSola: React.FC<ObjetivoXProps> = ({ onDataChange }) => {
  // 🧠 Estado global unificado
  const [formData, setFormData] = React.useState({
    clinicos: [],
    familiares: '',
    personales: { fuma: '', alcohol: '', drogas: '', observaciones: '' },
    antecedentes_quirurgicos: { descripcion: '' },
    examen_fisico: '',
    estudios_ginecologicos: { seleccionados: [] },
    hormonales: { seleccionados: [] },
    prequirurgicos: { valores: {} },
    fenotipo: {
      ojos: '',
      peloColor: '',
      peloTipo: '',
      altura: '',
      complexion: '',
      etnia: '',
    },
    antecedentes_ginecologicos: { datos1: {}, datos2: {} },
  });

  // 📤 Notifica cambios al padre superior
  React.useEffect(() => {
    onDataChange?.('mujer_sola_donacion', formData);
  }, [formData]);

  // 📥 Función genérica para actualizar secciones
  const handleSectionChange = (key: string, data: any) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
  };

  // 🧱 Páginas (tarjetas)
  const cards = [
    {
      title: 'Antecedentes Clínicos',
      content: (
        <AntecedentesClinicos
          value={formData.clinicos}
          onDataChange={(d) => handleSectionChange('clinicos', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Familiares',
      content: (
        <AntecedentesFamiliares
          value={formData.familiares}
          onDataChange={(d) => handleSectionChange('familiares', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Personales',
      content: (
        <AntecedentesPersonales
          value={formData.personales}
          onDataChange={(d) => handleSectionChange('personales', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Quirúrgicos',
      content: (
        <AntecedentesQuirurgicos
          value={formData.antecedentes_quirurgicos}
          onDataChange={(d) => handleSectionChange('antecedentes_quirurgicos', d)}
        />
      ),
    },
    {
      title: 'Examen Físico',
      content: (
        <ExamenFisico
          value={formData.examen_fisico}
          onDataChange={(d) => handleSectionChange('examen_fisico', d)}
        />
      ),
    },
    {
      title: 'Estudios Ginecológicos',
      content: (
        <EstudioGinecologico
          value={formData.estudios_ginecologicos}
          onDataChange={(d) => handleSectionChange('estudios_ginecologicos', d)}
        />
      ),
    },
    {
      title: 'Estudios Hormonales',
      content: (
        <EstudiosHormonales
          value={formData.hormonales}
          onDataChange={(d) => handleSectionChange('hormonales', d)}
        />
      ),
    },
    {
      title: 'Estudios Prequirúrgicos',
      content: (
        <EstudiosPrequirurgicos
          value={formData.prequirurgicos}
          onDataChange={(d: typeof formData.prequirurgicos) =>
            handleSectionChange('prequirurgicos', d)
          }
        />
      ),
    },
    {
      title: 'Fenotipo Donación',
      content: (
        <FenotipoDonacion
          visible
          value={formData.fenotipo}
          onDataChange={(d) => handleSectionChange('fenotipo', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Ginecológicos',
      content: (
        <AntecedentesGinecologicos
          value={formData.antecedentes_ginecologicos}
          onDataChange={(d) => handleSectionChange('antecedentes_ginecologicos', d)}
        />
      ),
    },
  ];

  // 📄 Paginación
  const [pagina, setPagina] = React.useState(1);
  const total = cards.length;

  // 🧭 Render
  return (
    <div className="flex w-full flex-col items-center">
      <Card title={cards[pagina - 1].title}>{cards[pagina - 1].content}</Card>
      <Pagination
        currentPage={pagina}
        totalPages={total}
        onPageChange={setPagina}
        itemsPerPage={1}
        totalItems={total}
      />
    </div>
  );
};

export default ObjetivoMujerSola;
