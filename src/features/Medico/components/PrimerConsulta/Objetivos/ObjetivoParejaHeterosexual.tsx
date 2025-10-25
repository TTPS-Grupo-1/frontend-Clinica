import React from 'react';
import Pagination from '../../../../../components/Pagination';
import Card from '../Card';
import AntecedentesClinicos from '../Antecedentes/AntecedentesClinicos';
import AntecedentesFamiliares from '../Antecedentes/AntecedentesFamiliares';
import AntecedentesPersonales from '../Antecedentes/AntecedentesPersonales';
import AntecedentesQuirurgicos from '../Antecedentes/AntecedentesQuirurgicos';
import ExamenFisico from '../ExamenFisico';
import EstudiosPrequirurgicos from '../Estudios/EstudioPrequirugico';
import EstudiosHormonales from '../Estudios/EstudiosHormonales';
import EstudioGinecologico from '../Estudios/EstudioGinecologico';
import EstudioSemen from '../Estudios/EstudioSemen';
import AntecedentesGinecologicos from '../Antecedentes/AntecedentesGinecologicos';
import AntecedentesGenitales from '../Antecedentes/AntecedentesGenitales';
import type { ObjetivoXProps } from '../../../../../interfaces/Medico';

const ObjetivoParejaHeterosexual: React.FC<ObjetivoXProps> = ({ onDataChange }) => {
  const cards = [
    {
      key: 'clinicos_mujer',
      title: "Antecedentes Clínicos - Mujer",
      content: (
        <AntecedentesClinicos
          key="clinicos_mujer"
          titulo="Mujer"
          onDataChange={(d) => onDataChange('clinicos_mujer', d)}
        />
      ),
    },
    {
      key: 'clinicos_hombre',
      title: "Antecedentes Clínicos - Hombre",
      content: (
        <AntecedentesClinicos
          key="clinicos_hombre"
          titulo="Hombre"
          onDataChange={(d) => onDataChange('clinicos_hombre', d)}
        />
      ),
    },
    {
      key: 'familiares_mujer',
      title: "Antecedentes Familiares - Mujer",
      content: (
        <AntecedentesFamiliares
          key="familiares_mujer"
          onDataChange={(d) => onDataChange('familiares_mujer', d)}
        />
      ),
    },
    {
      key: 'familiares_hombre',
      title: "Antecedentes Familiares - Hombre",
      content: (
        <AntecedentesFamiliares
          key="familiares_hombre"
          onDataChange={(d) => onDataChange('familiares_hombre', d)}
        />
      ),
    },
    {
      key: 'quirurgicos_mujer',
      title: "Antecedentes Quirúrgicos - Mujer",
      content: (
        <AntecedentesQuirurgicos
          key="quirurgicos_mujer"
          onDataChange={(d) => onDataChange('antecedentes_quirurgicos_mujer', d)}
        />
      ),
    },
    {
      key: 'quirurgicos_hombre',
      title: "Antecedentes Quirúrgicos - Hombre",
      content: (
        <AntecedentesQuirurgicos
          key="quirurgicos_hombre"
          onDataChange={(d) => onDataChange('antecedentes_quirurgicos_hombre', d)}
        />
      ),
    },
    {
      key: 'prequirurgicos_mujer',
      title: "Estudios Prequirúrgicos - Mujer",
      content: (
        <EstudiosPrequirurgicos
          key="prequirurgicos_mujer"
          onDataChange={(d) => onDataChange('estudios_prequirurgicos_mujer', d)}
        />
      ),
    },
    {
      key: 'prequirurgicos_hombre',
      title: "Estudios Prequirúrgicos - Hombre",
      content: (
        <EstudiosPrequirurgicos
          key="prequirurgicos_hombre"
          onDataChange={(d) => onDataChange('estudios_prequirurgicos_hombre', d)}
        />
      ),
    },
    {
      key: 'ginecologicos_mujer',
      title: "Estudios Ginecológicos",
      content: (
        <EstudioGinecologico
          key="ginecologicos_mujer"
          onDataChange={(d) => onDataChange('estudios_ginecologicos', d)}
        />
      ),
    },
    {
      key: 'semen_hombre',
      title: "Estudio de Semen",
      content: (
        <EstudioSemen
          key="semen_hombre"
          visible
          onDataChange={(d) => onDataChange('estudios_semen', d)}
        />
      ),
    },
    {
      key: 'hormonales',
      title: "Estudios Hormonales",
      content: (
        <EstudiosHormonales
          key="hormonales"
          onDataChange={(d) => onDataChange('hormonales', d)}
        />
      ),
    },
    {
      key: 'examen_fisico_mujer',
      title: "Examen Físico - Mujer",
      content: (
        <ExamenFisico
          key="examen_fisico_mujer"
          onDataChange={(d) => onDataChange('examen_fisico_mujer', d)}
        />
      ),
    },
    {
      key: 'examen_fisico_hombre',
      title: "Examen Físico - Hombre",
      content: (
        <ExamenFisico
          key="examen_fisico_hombre"
          onDataChange={(d) => onDataChange('examen_fisico_hombre', d)}
        />
      ),
    },
    {
      key: 'personales_mujer',
      title: "Antecedentes Personales - Mujer",
      content: (
        <AntecedentesPersonales
          key="personales_mujer"
          titulo="Mujer"
          onDataChange={(d) => onDataChange('personales_mujer', d)}
        />
      ),
    },
    {
      key: 'personales_hombre',
      title: "Antecedentes Personales - Hombre",
      content: (
        <AntecedentesPersonales
          key="personales_hombre"
          titulo="Hombre"
          onDataChange={(d) => onDataChange('personales_hombre', d)}
        />
      ),
    },
    {
      key: 'antecedentes_ginecologicos',
      title: "Antecedentes Ginecológicos - Mujer",
      content: (
        <AntecedentesGinecologicos
          key="antecedentes_ginecologicos"
          onDataChange={(d) => onDataChange('antecedentes_ginecologicos', d)}
        />
      ),
    },
    {
      key: 'antecedentes_genitales',
      title: "Antecedentes Genitales - Hombre",
      content: (
        <AntecedentesGenitales
          key="antecedentes_genitales"
          onDataChange={(d) => onDataChange('genitales_hombre', d)}
        />
      ),
    },
  ];

  const [pagina, setPagina] = React.useState(1);
  const total = cards.length;

  return (
    <div className="flex flex-col items-center w-full">
      <Card key={cards[pagina - 1].key} title={cards[pagina - 1].title}>
        {cards[pagina - 1].content}
      </Card>
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

export default ObjetivoParejaHeterosexual;
