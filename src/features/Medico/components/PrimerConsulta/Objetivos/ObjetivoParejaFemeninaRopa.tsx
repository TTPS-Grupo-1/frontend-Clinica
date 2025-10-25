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
    { title: "Antecedentes Clínicos - Mujer 1", content: <AntecedentesClinicos titulo="Mujer 1" onDataChange={(d) => onDataChange('clinicos_mujer1', d)} /> },
    { title: "Antecedentes Clínicos - Mujer 2", content: <AntecedentesClinicos titulo="Mujer 2" onDataChange={(d) => onDataChange('clinicos_mujer2', d)} /> },
    { title: "Antecedentes Familiares - Mujer 1", content: <AntecedentesFamiliares onDataChange={(d) => onDataChange('familiares_mujer1', d)} /> },
    { title: "Antecedentes Familiares - Mujer 2", content: <AntecedentesFamiliares onDataChange={(d) => onDataChange('familiares_mujer2', d)} /> },
    { title: "Antecedentes Quirúrgicos - Mujer 1", content: <AntecedentesQuirurgicos onDataChange={(d) => onDataChange('antecedentes_quirurgicos_mujer1', d)} /> },
    { title: "Antecedentes Quirúrgicos - Mujer 2", content: <AntecedentesQuirurgicos onDataChange={(d) => onDataChange('antecedentes_quirurgicos_mujer2', d)} /> },
    { title: "Estudios Prequirúrgicos - Mujer 1", content: <EstudiosPrequirurgicos onDataChange={(d) => onDataChange('prequirurgicos_mujer1', d)} /> },
    { title: "Estudios Prequirúrgicos - Mujer 2", content: <EstudiosPrequirurgicos onDataChange={(d) => onDataChange('prequirurgicos_mujer2', d)} /> },
    { title: "Estudios Ginecológicos - Mujer 1", content: <EstudioGinecologico onDataChange={(d) => onDataChange('estudios_ginecologicos_mujer1', d)} /> },
    { title: "Estudios Ginecológicos - Mujer 2", content: <EstudioGinecologico onDataChange={(d) => onDataChange('estudios_ginecologicos_mujer2', d)} /> },
    { title: "Estudios Hormonales - Mujer 1", content: <EstudiosHormonales onDataChange={(d) => onDataChange('hormonales_mujer1', d)} /> },
    { title: "Estudios Hormonales - Mujer 2", content: <EstudiosHormonales onDataChange={(d) => onDataChange('hormonales_mujer2', d)} /> },
    { title: "Examen Físico - Mujer 1", content: <ExamenFisico onDataChange={(d) => onDataChange('examen_fisico_mujer1', d)} /> },
    { title: "Examen Físico - Mujer 2", content: <ExamenFisico onDataChange={(d) => onDataChange('examen_fisico_mujer2', d)} /> },
    { title: "Antecedentes Personales - Mujer 1", content: <AntecedentesPersonales titulo="Mujer 1" onDataChange={(d) => onDataChange('personales_mujer1', d)} /> },
    { title: "Antecedentes Personales - Mujer 2", content: <AntecedentesPersonales titulo="Mujer 2" onDataChange={(d) => onDataChange('personales_mujer2', d)} /> },
    { title: "Antecedentes Ginecológicos - Mujer 1", content: <AntecedentesGinecologicos onDataChange={(d) => onDataChange('antecedentes_ginecologicos_mujer1', d)} /> },
    { title: "Antecedentes Ginecológicos - Mujer 2", content: <AntecedentesGinecologicos onDataChange={(d) => onDataChange('antecedentes_ginecologicos_mujer2', d)} /> },
  ];

  const [pagina, setPagina] = React.useState(1);
  const total = cards.length;

  return (
    <div className="flex flex-col items-center w-full">
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
