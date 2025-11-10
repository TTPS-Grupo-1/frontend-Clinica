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
import FenotipoDonacion from '../FenotipoDonacion';
import AntecedentesGinecologicos from '../Antecedentes/AntecedentesGinecologicos';
import type { ObjetivoXProps } from '../../../../../interfaces/Medico';

const ObjetivoParejaFemeninaDonacion: React.FC<ObjetivoXProps> = ({ onDataChange }) => {
  // 🧠 Estado global de todas las secciones
  const [formData, setFormData] = React.useState({
    clinicos_mujer: [],
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
    fenotipo2: {
      ojos: '',
      peloColor: '',
      peloTipo: '',
      altura: '',
      complexion: '',
      etnia: '',
    },
    antecedentes_ginecologicos: { datos1: {}, datos2: {} },
  });

  // 🔄 Notificar cambios al padre superior
  React.useEffect(() => {
    onDataChange?.('pareja_femenina_donacion', formData);
  }, [formData]);

  // 📥 Actualizador genérico
  const handleSectionChange = (key: string, data: any) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
  };

  // 🗂️ Tarjetas ordenadas por secciones
  const cards = [
    {
      title: 'Antecedentes Clínicos',
      content: (
        <AntecedentesClinicos
          value={formData.clinicos_mujer}
          onDataChange={(d) => handleSectionChange('clinicos_mujer', d)}
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
      title: 'Estudios Ginecológicos',
      content: (
        <EstudioGinecologico
          value={formData.estudios_ginecologicos}
          onDataChange={(d) => handleSectionChange('estudios_ginecologicos', d)}
        />
      ),
    },
    {
      title: 'Fenotipo Donación - Mujer 1',
      content: (
        <FenotipoDonacion
          visible
          value={formData.fenotipo}
          onDataChange={(d) => handleSectionChange('fenotipo', d)}
        />
      ),
    },
    {
      title: 'Fenotipo Donación - Mujer 2',
      content: (
        <FenotipoDonacion
          visible
          value={formData.fenotipo2}
          onDataChange={(d) => handleSectionChange('fenotipo2', d)}
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
          onDataChange={(d) => handleSectionChange('prequirurgicos', d)}
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
      title: 'Antecedentes Ginecológicos',
      content: (
        <AntecedentesGinecologicos
          doble
          titulo1="Mujer 1"
          titulo2="Mujer 2"
          value={formData.antecedentes_ginecologicos}
          onDataChange={(d) => handleSectionChange('antecedentes_ginecologicos', d)}
        />
      ),
    },
  ];

  const [pagina, setPagina] = React.useState(1);
  const total = cards.length;

  return (
    <div className="flex flex-col items-center w-full">
      <Card title={cards[pagina - 1].title}>
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

export default ObjetivoParejaFemeninaDonacion;
