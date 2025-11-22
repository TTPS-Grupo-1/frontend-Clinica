import React from 'react';
import Pagination from '../../../../../components/Pagination';
import Card from '../Card';
import AntecedentesClinicos from '../Antecedentes/AntecedentesClinicos';
import AntecedentesFamiliares from '../Antecedentes/AntecedentesFamiliares';
import AntecedentesPersonales from '../Antecedentes/AntecedentesPersonales';
import AntecedentesQuirurgicos from '../Antecedentes/AntecedentesQuirurgicos';
import ExamenFisico from '../ExamenFisico';
import EstudiosHormonales from '../Estudios/EstudiosHormonales';
import EstudioGinecologico from '../Estudios/EstudioGinecologico';
import EstudiosPrequirurgicos from '../Estudios/EstudiosPrequirugicos';
import AntecedentesGinecologicos from '../Antecedentes/AntecedentesGinecologicos';
import type { ObjetivoXProps } from '../../../../../interfaces/Medico';
import FenotipoDonacion from '../FenotipoDonacion';

const ObjetivoParejaFemeninaRopa: React.FC<ObjetivoXProps> = ({ onDataChange }) => {
  // 🧠 Estado global de ambas mujeres
  const [formData, setFormData] = React.useState({
    clinicos_mujer1: [] as string[],
    clinicos_mujer2: [] as string[],
    familiares_mujer1: '',
    familiares_mujer2: '',
    personales_mujer1: { fuma: '', alcohol: '', drogas: '', observaciones: '' },
    personales_mujer2: { fuma: '', alcohol: '', drogas: '', observaciones: '' },
    antecedentes_quirurgicos_mujer1: { descripcion: '' },
    antecedentes_quirurgicos_mujer2: { descripcion: '' },
    examen_fisico_mujer1: '',
    examen_fisico_mujer2: '',
    estudios_ginecologicos_mujer1: { seleccionados: [] },
    estudios_ginecologicos_mujer2: { seleccionados: [] },
    hormonales_mujer1: { seleccionados: [] },
    hormonales_mujer2: { seleccionados: [] },
    prequirurgicos_mujer1: { valores: {} },
    prequirurgicos_mujer2: { valores: {} },
    antecedentes_ginecologicos_mujer1: { datos1: {}, datos2: {} },
    antecedentes_ginecologicos_mujer2: { datos1: {}, datos2: {} },
    fenotipo: {
      ojos: '',
      peloColor: '',
      peloTipo: '',
      altura: '',
      complexion: '',
      etnia: '',
    },
    fenotipo2: {
      ojos: '',
      peloColor: '',
      peloTipo: '',
      altura: '',
      complexion: '',
      etnia: '',
    },
  });

  // 🔁 Notifica al padre principal (PrimerConsulta)
  React.useEffect(() => {
    onDataChange?.('pareja_femenina_ropa', formData);
  }, [formData]);

  // 🧩 Actualiza una sección específica
  const handleSectionChange = (key: string, data: any) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
  };

  // 🗂️ Tarjetas (una por sección/mujer)
  const cards = [
    {
      title: 'Antecedentes Clínicos - Mujer 1',
      content: (
        <AntecedentesClinicos
          titulo="Mujer 1"
          value={formData.clinicos_mujer1}
          onDataChange={(d) => handleSectionChange('clinicos_mujer1', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Clínicos - Mujer 2',
      content: (
        <AntecedentesClinicos
          titulo="Mujer 2"
          value={formData.clinicos_mujer2}
          onDataChange={(d) => handleSectionChange('clinicos_mujer2', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Familiares - Mujer 1',
      content: (
        <AntecedentesFamiliares
          value={formData.familiares_mujer1}
          onDataChange={(d) => handleSectionChange('familiares_mujer1', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Familiares - Mujer 2',
      content: (
        <AntecedentesFamiliares
          value={formData.familiares_mujer2}
          onDataChange={(d) => handleSectionChange('familiares_mujer2', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Personales - Mujer 1',
      content: (
        <AntecedentesPersonales
          titulo="Mujer 1"
          value={formData.personales_mujer1}
          onDataChange={(d) => handleSectionChange('personales_mujer1', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Personales - Mujer 2',
      content: (
        <AntecedentesPersonales
          titulo="Mujer 2"
          value={formData.personales_mujer2}
          onDataChange={(d) => handleSectionChange('personales_mujer2', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Quirúrgicos - Mujer 1',
      content: (
        <AntecedentesQuirurgicos
          value={formData.antecedentes_quirurgicos_mujer1}
          onDataChange={(d) => handleSectionChange('antecedentes_quirurgicos_mujer1', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Quirúrgicos - Mujer 2',
      content: (
        <AntecedentesQuirurgicos
          value={formData.antecedentes_quirurgicos_mujer2}
          onDataChange={(d) => handleSectionChange('antecedentes_quirurgicos_mujer2', d)}
        />
      ),
    },
    {
      title: 'Examen Físico - Mujer 1',
      content: (
        <ExamenFisico
          value={formData.examen_fisico_mujer1}
          onDataChange={(d) => handleSectionChange('examen_fisico_mujer1', d)}
        />
      ),
    },
    {
      title: 'Examen Físico - Mujer 2',
      content: (
        <ExamenFisico
          value={formData.examen_fisico_mujer2}
          onDataChange={(d) => handleSectionChange('examen_fisico_mujer2', d)}
        />
      ),
    },
    {
      title: 'Estudios Ginecológicos - Mujer 1',
      content: (
        <EstudioGinecologico
          value={formData.estudios_ginecologicos_mujer1}
          onDataChange={(d) => handleSectionChange('estudios_ginecologicos_mujer1', d)}
        />
      ),
    },
    {
      title: 'Estudios Ginecológicos - Mujer 2',
      content: (
        <EstudioGinecologico
          value={formData.estudios_ginecologicos_mujer2}
          onDataChange={(d) => handleSectionChange('estudios_ginecologicos_mujer2', d)}
        />
      ),
    },
    {
      title: 'Estudios Hormonales - Mujer 1',
      content: (
        <EstudiosHormonales
          value={formData.hormonales_mujer1}
          onDataChange={(d) => handleSectionChange('hormonales_mujer1', d)}
        />
      ),
    },
    {
      title: 'Estudios Hormonales - Mujer 2',
      content: (
        <EstudiosHormonales
          value={formData.hormonales_mujer2}
          onDataChange={(d) => handleSectionChange('hormonales_mujer2', d)}
        />
      ),
    },
    {
      title: 'Estudios Prequirúrgicos - Mujer 1',
      content: (
        <EstudiosPrequirurgicos
          value={formData.prequirurgicos_mujer1}
          onDataChange={(d) => handleSectionChange('prequirurgicos_mujer1', d)}
        />
      ),
    },
    {
      title: 'Estudios Prequirúrgicos - Mujer 2',
      content: (
        <EstudiosPrequirurgicos
          value={formData.prequirurgicos_mujer2}
          onDataChange={(d) => handleSectionChange('prequirurgicos_mujer2', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Ginecológicos - Mujer 1',
      content: (
        <AntecedentesGinecologicos
          doble={false}
          titulo1="Mujer 1"
          value={formData.antecedentes_ginecologicos_mujer1}
          onDataChange={(d) => handleSectionChange('antecedentes_ginecologicos_mujer1', d)}
        />
      ),
    },
    {
      title: 'Antecedentes Ginecológicos - Mujer 2',
      content: (
        <AntecedentesGinecologicos
          doble={false}
          titulo1="Mujer 2"
          value={formData.antecedentes_ginecologicos_mujer2}
          onDataChange={(d) => handleSectionChange('antecedentes_ginecologicos_mujer2', d)}
        />
      ),
    },
    {
      title: 'Fenotipo - Mujer 1',
      content: (
        <FenotipoDonacion
          value={formData.fenotipo}
          onDataChange={(d) => handleSectionChange('fenotipo', d)}
        />
      ),
    },
    {
      title: 'Fenotipo - Mujer 2',
      content: (
        <FenotipoDonacion
          value={formData.fenotipo2}
          onDataChange={(d) => handleSectionChange('fenotipo2', d)}
        />
      ),
    },
  ];

  const [pagina, setPagina] = React.useState(1);
  const total = cards.length;

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

export default ObjetivoParejaFemeninaRopa;
