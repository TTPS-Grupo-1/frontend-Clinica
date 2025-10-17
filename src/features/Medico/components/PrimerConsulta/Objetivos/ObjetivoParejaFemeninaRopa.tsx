import React from 'react';
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
  return (
    <>
      <Card title="Antecedentes Clínicos - Mujer 1" >
        <AntecedentesClinicos titulo="Mujer 1" onDataChange={(d) => onDataChange('clinicos_mujer1', d)} />
      </Card>
      <Card title="Antecedentes Clínicos - Mujer 2" >
        <AntecedentesClinicos titulo="Mujer 2" onDataChange={(d) => onDataChange('clinicos_mujer2', d)} />
      </Card>

      <Card title="Antecedentes Familiares - Mujer 1" >
        <AntecedentesFamiliares onDataChange={(d) => onDataChange('familiares_mujer1', d)} />
      </Card>
      <Card title="Antecedentes Familiares - Mujer 2" >
        <AntecedentesFamiliares onDataChange={(d) => onDataChange('familiares_mujer2', d)} />
      </Card>

      <Card title="Antecedentes Quirúrgicos - Mujer 1" >
        <AntecedentesQuirurgicos onDataChange={(d) => onDataChange('antecedentes_quirurgicos_mujer1', d)} />
      </Card>
      <Card title="Antecedentes Quirúrgicos - Mujer 2" >
        <AntecedentesQuirurgicos onDataChange={(d) => onDataChange('antecedentes_quirurgicos_mujer2', d)} />
      </Card>

      <Card title="Estudios Prequirúrgicos - Mujer 1" >
        <EstudiosPrequirurgicos onDataChange={(d) => onDataChange('prequirurgicos_mujer1', d)} />
      </Card>
      <Card title="Estudios Prequirúrgicos - Mujer 2">
        <EstudiosPrequirurgicos onDataChange={(d) => onDataChange('prequirurgicos_mujer2', d)} />
      </Card>

      <Card title="Estudios Ginecológicos - Mujer 1" >
        <EstudioGinecologico onDataChange={(d) => onDataChange('estudios_ginecologicos_mujer1', d)} />
      </Card>
      <Card title="Estudios Ginecológicos - Mujer 2" >
        <EstudioGinecologico onDataChange={(d) => onDataChange('estudios_ginecologicos_mujer2', d)} />
      </Card>

      <Card title="Estudios Hormonales - Mujer 1" >
        <EstudiosHormonales onDataChange={(d) => onDataChange('hormonales_mujer1', d)} />
      </Card>
      <Card title="Estudios Hormonales - Mujer 2" >
        <EstudiosHormonales onDataChange={(d) => onDataChange('hormonales_mujer2', d)} />
      </Card>

      <Card title="Examen Físico - Mujer 1" >
        <ExamenFisico onDataChange={(d) => onDataChange('examen_fisico_mujer1', d)} />
      </Card>
      <Card title="Examen Físico - Mujer 2" >
        <ExamenFisico onDataChange={(d) => onDataChange('examen_fisico_mujer2', d)} />
      </Card>

      <Card title="Antecedentes Personales - Mujer 1" >
        <AntecedentesPersonales titulo="Mujer 1" onDataChange={(d) => onDataChange('personales_mujer1', d)} />
      </Card>
      <Card title="Antecedentes Personales - Mujer 2" >
        <AntecedentesPersonales titulo="Mujer 2" onDataChange={(d) => onDataChange('personales_mujer2', d)} />
      </Card>

      <Card title="Antecedentes Ginecológicos - Mujer 1">
        <AntecedentesGinecologicos onDataChange={(d) => onDataChange('antecedentes_ginecologicos_mujer1', d)} />
      </Card>
      <Card title="Antecedentes Ginecológicos - Mujer 2">
        <AntecedentesGinecologicos onDataChange={(d) => onDataChange('antecedentes_ginecologicos_mujer2', d)} />
      </Card>

    </>
  );
};

export default ObjetivoParejaFemeninaRopa;
