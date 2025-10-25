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
import EstudiosPrequirurgicos from '../Estudios/EstudioPrequirugico';
import AntecedentesGinecologicos from '../Antecedentes/AntecedentesGinecologicos';
import type { ObjetivoXProps } from '../../../../../interfaces/Medico';

const ObjetivoParejaFemeninaRopa: React.FC<ObjetivoXProps> = ({ onDataChange }) => {
  const cards = [
    {
      key: 'clinicos_mujer1',
      title: "Antecedentes Clínicos - Mujer 1",
      content: (
        <AntecedentesClinicos
          key="clinicos_mujer1"
          titulo="Mujer 1"
          onDataChange={(d) => onDataChange('clinicos_mujer1', d)}
        />
      ),
    },
    {
      key: 'clinicos_mujer2',
      title: "Antecedentes Clínicos - Mujer 2",
      content: (
        <AntecedentesClinicos
          key="clinicos_mujer2"
          titulo="Mujer 2"
          onDataChange={(d) => onDataChange('clinicos_mujer2', d)}
        />
      ),
    },
    {
      key: 'familiares_mujer1',
      title: "Antecedentes Familiares - Mujer 1",
      content: (
        <AntecedentesFamiliares
          key="familiares_mujer1"
          onDataChange={(d) => onDataChange('familiares_mujer1', d)}
        />
      ),
    },
    {
      key: 'familiares_mujer2',
      title: "Antecedentes Familiares - Mujer 2",
      content: (
        <AntecedentesFamiliares
          key="familiares_mujer2"
          onDataChange={(d) => onDataChange('familiares_mujer2', d)}
        />
      ),
    },
    {
      key: 'quirurgicos_mujer1',
      title: "Antecedentes Quirúrgicos - Mujer 1",
      content: (
        <AntecedentesQuirurgicos
          key="quirurgicos_mujer1"
          onDataChange={(d) => onDataChange('antecedentes_quirurgicos_mujer1', d)}
        />
      ),
    },
    {
      key: 'quirurgicos_mujer2',
      title: "Antecedentes Quirúrgicos - Mujer 2",
      content: (
        <AntecedentesQuirurgicos
          key="quirurgicos_mujer2"
          onDataChange={(d) => onDataChange('antecedentes_quirurgicos_mujer2', d)}
        />
      ),
    },
    {
      key: 'prequirurgicos_mujer1',
      title: "Estudios Prequirúrgicos - Mujer 1",
      content: (
        <EstudiosPrequirurgicos
          key="prequirurgicos_mujer1"
          onDataChange={(d) => onDataChange('prequirurgicos_mujer1', d)}
        />
      ),
    },
    {
      key: 'prequirurgicos_mujer2',
      title: "Estudios Prequirúrgicos - Mujer 2",
      content: (
        <EstudiosPrequirurgicos
          key="prequirurgicos_mujer2"
          onDataChange={(d) => onDataChange('prequirurgicos_mujer2', d)}
        />
      ),
    },
    {
      key: 'ginecologicos_mujer1',
      title: "Estudios Ginecológicos - Mujer 1",
      content: (
        <EstudioGinecologico
          key="ginecologicos_mujer1"
          onDataChange={(d) => onDataChange('estudios_ginecologicos_mujer1', d)}
        />
      ),
    },
    {
      key: 'ginecologicos_mujer2',
      title: "Estudios Ginecológicos - Mujer 2",
      content: (
        <EstudioGinecologico
          key="ginecologicos_mujer2"
          onDataChange={(d) => onDataChange('estudios_ginecologicos_mujer2', d)}
        />
      ),
    },
    {
      key: 'hormonales_mujer1',
      title: "Estudios Hormonales - Mujer 1",
      content: (
        <EstudiosHormonales
          key="hormonales_mujer1"
          onDataChange={(d) => onDataChange('hormonales_mujer1', d)}
        />
      ),
    },
    {
      key: 'hormonales_mujer2',
      title: "Estudios Hormonales - Mujer 2",
      content: (
        <EstudiosHormonales
          key="hormonales_mujer2"
          onDataChange={(d) => onDataChange('hormonales_mujer2', d)}
        />
      ),
    },
    {
      key: 'examen_fisico_mujer1',
      title: "Examen Físico - Mujer 1",
      content: (
        <ExamenFisico
          key="examen_fisico_mujer1"
          onDataChange={(d) => onDataChange('examen_fisico_mujer1', d)}
        />
      ),
    },
    {
      key: 'examen_fisico_mujer2',
      title: "Examen Físico - Mujer 2",
      content: (
        <ExamenFisico
          key="examen_fisico_mujer2"
          onDataChange={(d) => onDataChange('examen_fisico_mujer2', d)}
        />
      ),
    },
    {
      key: 'personales_mujer1',
      title: "Antecedentes Personales - Mujer 1",
      content: (
        <AntecedentesPersonales
          key="personales_mujer1"
          titulo="Mujer 1"
          onDataChange={(d) => onDataChange('personales_mujer1', d)}
        />
      ),
    },
    {
      key: 'personales_mujer2',
      title: "Antecedentes Personales - Mujer 2",
      content: (
        <AntecedentesPersonales
          key="personales_mujer2"
          titulo="Mujer 2"
          onDataChange={(d) => onDataChange('personales_mujer2', d)}
        />
      ),
    },
    {
      key: 'antecedentes_ginecologicos_mujer1',
      title: "Antecedentes Ginecológicos - Mujer 1",
      content: (
        <AntecedentesGinecologicos
          key="antecedentes_ginecologicos_mujer1"
          onDataChange={(d) => onDataChange('antecedentes_ginecologicos_mujer1', d)}
        />
      ),
    },
    {
      key: 'antecedentes_ginecologicos_mujer2',
      title: "Antecedentes Ginecológicos - Mujer 2",
      content: (
        <AntecedentesGinecologicos
          key="antecedentes_ginecologicos_mujer2"
          onDataChange={(d) => onDataChange('antecedentes_ginecologicos_mujer2', d)}
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

export default ObjetivoParejaFemeninaRopa;
