import React from 'react';
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
  return (
    <>
      <Card title="Antecedentes Clínicos - Mujer" >
        <AntecedentesClinicos titulo="Mujer" onDataChange={(d) => onDataChange('clinicos_mujer', d)} />
      </Card>
      <Card title="Antecedentes Clínicos - Hombre" >
        <AntecedentesClinicos titulo="Hombre" onDataChange={(d) => onDataChange('clinicos_hombre', d)} />
      </Card>

      <Card title="Antecedentes Familiares - Mujer" >
        <AntecedentesFamiliares onDataChange={(d) => onDataChange('familiares_mujer', d)} />
      </Card>
      <Card title="Antecedentes Familiares - Hombre" >
        <AntecedentesFamiliares onDataChange={(d) => onDataChange('familiares_hombre', d)} />
      </Card>

      <Card title="Antecedentes Quirúrgicos - Mujer" >
        <AntecedentesQuirurgicos onDataChange={(d) => onDataChange('antecedentes_quirurgicos_mujer', d)} />
      </Card>
      <Card title="Antecedentes Quirúrgicos - Hombre" >
        <AntecedentesQuirurgicos onDataChange={(d) => onDataChange('antecedentes_quirurgicos_hombre', d)} />
      </Card>

      <Card title="Estudios Prequirúrgicos - Mujer" >
        <EstudiosPrequirurgicos onDataChange={(d) => onDataChange('estudios_prequirurgicos_mujer', d)} />
      </Card>
      <Card title="Estudios Prequirúrgicos - Hombre" >
        <EstudiosPrequirurgicos onDataChange={(d) => onDataChange('estudios_prequirurgicos_hombre', d)} />
      </Card>

      <Card title="Estudios Ginecológicos" >
        <EstudioGinecologico onDataChange={(d) => onDataChange('estudios_ginecologicos', d)} />
      </Card>

      <Card title="Estudio de Semen" >
        <EstudioSemen visible onDataChange={(d) => onDataChange('estudios_semen', d)} />
      </Card>

      <Card title="Estudios Hormonales" >
        <EstudiosHormonales onDataChange={(d) => onDataChange('hormonales', d)} />
      </Card>

      <Card title="Examen Físico - Mujer" >
        <ExamenFisico onDataChange={(d) => onDataChange('examen_fisico_mujer', d)} />
      </Card>
      <Card title="Examen Físico - Hombre" >
        <ExamenFisico onDataChange={(d) => onDataChange('examen_fisico_hombre', d)} />
      </Card>

      <Card title="Antecedentes Personales - Mujer" >
        <AntecedentesPersonales titulo="Mujer" onDataChange={(d) => onDataChange('personales_mujer', d)} />
      </Card>
      <Card title="Antecedentes Personales - Hombre" >
        <AntecedentesPersonales titulo="Hombre" onDataChange={(d) => onDataChange('personales_hombre', d)} />
      </Card>

      <Card title="Antecedentes Ginecológicos - Mujer" >
        <AntecedentesGinecologicos onDataChange={(d) => onDataChange('antecedentes_ginecologicos', d)} />
      </Card>

      <Card title="Antecedentes Genitales - Hombre" >
        <AntecedentesGenitales onDataChange={(d) => onDataChange('genitales_hombre', d)} />
      </Card>
      
    </>
  );
};

export default ObjetivoParejaHeterosexual;
