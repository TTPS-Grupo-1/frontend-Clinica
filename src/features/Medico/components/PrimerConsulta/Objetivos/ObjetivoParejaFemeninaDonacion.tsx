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
import FenotipoDonacion from '../FenotipoDonacion';
import AntecedentesGinecologicos from '../Antecedentes/AntecedentesGinecologicos';
import type { ObjetivoXProps } from '../../../../../interfaces/Medico';
import EstudiosPrequirurgicos from '../Estudios/EstudioPrequirugico';

const ObjetivoParejaFemeninaDonacion: React.FC<ObjetivoXProps> = ({ onDataChange }) => {
  const cards = [
    { title: "Antecedentes Clínicos", content: <AntecedentesClinicos onDataChange={(d) => onDataChange('clinicos_mujer', d)} /> },
    { title: "Antecedentes Familiares", content: <AntecedentesFamiliares onDataChange={(d) => onDataChange('familiares', d)} /> },
    { title: "Antecedentes Personales", content: <AntecedentesPersonales onDataChange={(d) => onDataChange('personales', d)} /> },
    { title: "Antecedentes Quirúrgicos", content: <AntecedentesQuirurgicos onDataChange={(d) => onDataChange('antecedentes_quirurgicos', d)} /> },
    { title: "Estudios Ginecológicos", content: <EstudioGinecologico onDataChange={(d) => onDataChange('estudios_ginecologicos', d)} /> },
    { title: "Fenotipo Donación", content: <FenotipoDonacion visible onDataChange={(d) => onDataChange('fenotipo', d)} /> },
    { title: "Estudios Hormonales", content: <EstudiosHormonales onDataChange={(d) => onDataChange('hormonales', d)} /> },
    { title: "Estudios Prequirúrgicos", content: <EstudiosPrequirurgicos onDataChange={(d) => onDataChange('prequirurgicos', d)} /> },
    { title: "Examen Físico", content: <ExamenFisico onDataChange={(d) => onDataChange('examen_fisico', d)} /> },
    { title: "Antecedentes Ginecológicos", content: <AntecedentesGinecologicos onDataChange={(d) => onDataChange('antecedentes_ginecologicos', d)} /> },
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

export default ObjetivoParejaFemeninaDonacion;
