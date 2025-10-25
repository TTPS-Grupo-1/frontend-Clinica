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
    { title: "Antecedentes Clínicos - Mujer", content: <AntecedentesClinicos titulo="Mujer" onDataChange={(d) => onDataChange('clinicos_mujer', d)} /> },
    { title: "Antecedentes Clínicos - Hombre", content: <AntecedentesClinicos titulo="Hombre" onDataChange={(d) => onDataChange('clinicos_hombre', d)} /> },
    { title: "Antecedentes Familiares - Mujer", content: <AntecedentesFamiliares onDataChange={(d) => onDataChange('familiares_mujer', d)} /> },
    { title: "Antecedentes Familiares - Hombre", content: <AntecedentesFamiliares onDataChange={(d) => onDataChange('familiares_hombre', d)} /> },
    { title: "Antecedentes Quirúrgicos - Mujer", content: <AntecedentesQuirurgicos onDataChange={(d) => onDataChange('antecedentes_quirurgicos_mujer', d)} /> },
    { title: "Antecedentes Quirúrgicos - Hombre", content: <AntecedentesQuirurgicos onDataChange={(d) => onDataChange('antecedentes_quirurgicos_hombre', d)} /> },
    { title: "Estudios Prequirúrgicos - Mujer", content: <EstudiosPrequirurgicos onDataChange={(d) => onDataChange('estudios_prequirurgicos_mujer', d)} /> },
    { title: "Estudios Prequirúrgicos - Hombre", content: <EstudiosPrequirurgicos onDataChange={(d) => onDataChange('estudios_prequirurgicos_hombre', d)} /> },
    { title: "Estudios Ginecológicos", content: <EstudioGinecologico onDataChange={(d) => onDataChange('estudios_ginecologicos', d)} /> },
    { title: "Estudio de Semen", content: <EstudioSemen visible onDataChange={(d) => onDataChange('estudios_semen', d)} /> },
    { title: "Estudios Hormonales", content: <EstudiosHormonales onDataChange={(d) => onDataChange('hormonales', d)} /> },
    { title: "Examen Físico - Mujer", content: <ExamenFisico onDataChange={(d) => onDataChange('examen_fisico_mujer', d)} /> },
    { title: "Examen Físico - Hombre", content: <ExamenFisico onDataChange={(d) => onDataChange('examen_fisico_hombre', d)} /> },
    { title: "Antecedentes Personales - Mujer", content: <AntecedentesPersonales titulo="Mujer" onDataChange={(d) => onDataChange('personales_mujer', d)} /> },
    { title: "Antecedentes Personales - Hombre", content: <AntecedentesPersonales titulo="Hombre" onDataChange={(d) => onDataChange('personales_hombre', d)} /> },
    { title: "Antecedentes Ginecológicos - Mujer", content: <AntecedentesGinecologicos onDataChange={(d) => onDataChange('antecedentes_ginecologicos', d)} /> },
    { title: "Antecedentes Genitales - Hombre", content: <AntecedentesGenitales onDataChange={(d) => onDataChange('genitales_hombre', d)} /> },
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

export default ObjetivoParejaHeterosexual;
