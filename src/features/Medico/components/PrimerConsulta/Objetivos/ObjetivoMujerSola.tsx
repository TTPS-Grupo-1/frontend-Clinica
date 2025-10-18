import React from 'react';
import Card from '../Card';
import AntecedentesClinicos from '../Antecedentes/AntecedentesClinicos';
import AntecedentesFamiliares from '../Antecedentes/AntecedentesFamiliares';
import AntecedentesPersonales from '../Antecedentes/AntecedentesPersonales';
import AntecedentesQuirurgicos from '../Antecedentes/AntecedentesQuirurgicos';
import ExamenFisico from '../ExamenFisico';
import EstudioGinecologico from '../Estudios/EstudioGinecologico';
import EstudiosHormonales from '../Estudios/EstudiosHormonales';
import FenotipoDonacion from '../FenotipoDonacion';
import AntecedentesGinecologicos from '../Antecedentes/AntecedentesGinecologicos';
import type { ObjetivoXProps } from '../../../../../interfaces/Medico';
import GenerarRecetaConFirma from '../../GenerarRecetaConFirma';

const ObjetivoMujerSola: React.FC<ObjetivoXProps> = ({ onDataChange }) => {
  return (
    <>
      <Card title="Antecedentes Clínicos">
        <AntecedentesClinicos onDataChange={(d) => onDataChange('clinicos', d)} />
      </Card>

      <Card title="Antecedentes Familiares">
        <AntecedentesFamiliares onDataChange={(d) => onDataChange('familiares', d)} />
      </Card>

      <Card title="Antecedentes Personales">
        <AntecedentesPersonales onDataChange={(d) => onDataChange('personales', d)} />
      </Card>

      <Card title="Antecedentes Quirúrgicos">
        <AntecedentesQuirurgicos onDataChange={(d) => onDataChange('antecedentes_quirurgicos', d)} />
      </Card>

      <Card title="Examen Físico">
        <ExamenFisico onDataChange={(d) => onDataChange('examen_fisico', d)} />
      </Card>

      <Card title="Estudios Ginecológicos">
        <EstudioGinecologico onDataChange={(d) => onDataChange('estudios_ginecologicos', d)} />
      </Card>

      <Card title="Estudios Hormonales">
        <EstudiosHormonales onDataChange={(d) => onDataChange('hormonales', d)} />
      </Card>

      <Card title="Estudios Prequirúrgicos">
        <EstudiosHormonales onDataChange={(d) => onDataChange('prequirurgicos', d)} />
      </Card>

      <Card title="Fenotipo Donación">
        <FenotipoDonacion visible onDataChange={(d) => onDataChange('fenotipo', d)} />
      </Card>

      <Card title="Antecedentes Ginecológicos">
        <AntecedentesGinecologicos onDataChange={(d) => onDataChange('antecedentes_ginecologicos', d)} />
      </Card>
      
      <GenerarRecetaConFirma>

      </GenerarRecetaConFirma>

    </>
  );
};

export default ObjetivoMujerSola;
