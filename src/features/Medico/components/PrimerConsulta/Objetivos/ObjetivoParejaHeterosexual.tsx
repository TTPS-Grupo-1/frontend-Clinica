import React from 'react';
import Pagination from '../../../../../components/Pagination';
import Card from '../Card';
import AntecedentesClinicos from '../Antecedentes/AntecedentesClinicos';
import AntecedentesFamiliares from '../Antecedentes/AntecedentesFamiliares';
import AntecedentesPersonales from '../Antecedentes/AntecedentesPersonales';
import AntecedentesQuirurgicos from '../Antecedentes/AntecedentesQuirurgicos';
import ExamenFisico from '../ExamenFisico';
import EstudiosPrequirurgicos from '../Estudios/EstudiosPrequirugicos';
import EstudiosHormonales from '../Estudios/EstudiosHormonales';
import EstudioGinecologico from '../Estudios/EstudioGinecologico';
import EstudioSemen from '../Estudios/EstudioSemen';
import AntecedentesGinecologicos from '../Antecedentes/AntecedentesGinecologicos';
import AntecedentesGenitales from '../Antecedentes/AntecedentesGenitales';
import type { ObjetivoXProps } from '../../../../../interfaces/Medico';

// 💡 Tipamos las cards
interface CardItem {
  key: string;
  title: string;
  content: React.ReactNode;
}

const ObjetivoParejaHeterosexual: React.FC<ObjetivoXProps> = ({ onDataChange }) => {
  // 🧠 Estado global inicial con tipos seguros
  const [formData, setFormData] = React.useState({
    clinicos_mujer: [] as string[],
    clinicos_hombre: [] as string[],
    familiares_mujer: '',
    familiares_hombre: '',
    personales_mujer: { fuma: '', alcohol: '', drogas: '', observaciones: '' },
    personales_hombre: { fuma: '', alcohol: '', drogas: '', observaciones: '' },
    antecedentes_quirurgicos_mujer: { descripcion: '' },
    antecedentes_quirurgicos_hombre: { descripcion: '' },
    examen_fisico_mujer: '',
    examen_fisico_hombre: '',
    estudios_prequirurgicos_mujer: { valores: {} as Record<string, boolean> },
    estudios_prequirurgicos_hombre: { valores: {} as Record<string, boolean> },
    estudios_ginecologicos: { seleccionados: [] as string[] },
    estudios_semen: { estudiosSeleccionados: [] as string[] },
    hormonales: { seleccionados: [] as string[] },
    antecedentes_ginecologicos: { datos1: {}, datos2: {} },
    genitales_hombre: { descripcion: '' },
  });

  // 🔄 Cada vez que cambia algo, avisamos al padre
  React.useEffect(() => {
    onDataChange?.('pareja_heterosexual', formData);
  }, [formData]);

  // 🧩 Actualiza cada sección
  const handleDataChange = (key: keyof typeof formData, data: any) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
  };

  // 🗂️ Cards configuradas
  const cards: CardItem[] = [
    {
      key: 'clinicos_mujer',
      title: 'Antecedentes Clínicos - Mujer',
      content: (
        <AntecedentesClinicos
          titulo="Mujer"
          value={formData.clinicos_mujer}
          onDataChange={(d) => handleDataChange('clinicos_mujer', d)}
        />
      ),
    },
    {
      key: 'clinicos_hombre',
      title: 'Antecedentes Clínicos - Hombre',
      content: (
        <AntecedentesClinicos
          titulo="Hombre"
          value={formData.clinicos_hombre}
          onDataChange={(d) => handleDataChange('clinicos_hombre', d)}
        />
      ),
    },
    {
      key: 'familiares_mujer',
      title: 'Antecedentes Familiares - Mujer',
      content: (
        <AntecedentesFamiliares
          value={formData.familiares_mujer}
          onDataChange={(d) => handleDataChange('familiares_mujer', d)}
        />
      ),
    },
    {
      key: 'familiares_hombre',
      title: 'Antecedentes Familiares - Hombre',
      content: (
        <AntecedentesFamiliares
          value={formData.familiares_hombre}
          onDataChange={(d) => handleDataChange('familiares_hombre', d)}
        />
      ),
    },
    {
      key: 'antecedentes_quirurgicos_mujer',
      title: 'Antecedentes Quirúrgicos - Mujer',
      content: (
        <AntecedentesQuirurgicos
          value={formData.antecedentes_quirurgicos_mujer}
          onDataChange={(d) => handleDataChange('antecedentes_quirurgicos_mujer', d)}
        />
      ),
    },
    {
      key: 'antecedentes_quirurgicos_hombre',
      title: 'Antecedentes Quirúrgicos - Hombre',
      content: (
        <AntecedentesQuirurgicos
          value={formData.antecedentes_quirurgicos_hombre}
          onDataChange={(d) => handleDataChange('antecedentes_quirurgicos_hombre', d)}
        />
      ),
    },
    {
      key: 'estudios_prequirurgicos_mujer',
      title: 'Estudios Prequirúrgicos - Mujer',
      content: (
        <EstudiosPrequirurgicos
          value={formData.estudios_prequirurgicos_mujer}
          onDataChange={(d) => handleDataChange('estudios_prequirurgicos_mujer', d)}
        />
      ),
    },
    {
      key: 'estudios_prequirurgicos_hombre',
      title: 'Estudios Prequirúrgicos - Hombre',
      content: (
        <EstudiosPrequirurgicos
          value={formData.estudios_prequirurgicos_hombre}
          onDataChange={(d) => handleDataChange('estudios_prequirurgicos_hombre', d)}
        />
      ),
    },
    {
      key: 'estudios_ginecologicos',
      title: 'Estudios Ginecológicos - Mujer',
      content: (
        <EstudioGinecologico
          value={formData.estudios_ginecologicos}
          onDataChange={(d) => handleDataChange('estudios_ginecologicos', d)}
        />
      ),
    },
    {
      key: 'estudios_semen',
      title: 'Estudio de Semen - Hombre',
      content: (
        <EstudioSemen
        value={formData.estudios_semen}
        onDataChange={(d) => handleDataChange('estudios_semen', d)}
      />
      ),
    },
    {
      key: 'hormonales',
      title: 'Estudios Hormonales',
      content: (
        <EstudiosHormonales
          value={formData.hormonales}
          onDataChange={(d) => handleDataChange('hormonales', d)}
        />
      ),
    },
    {
      key: 'examen_fisico_mujer',
      title: 'Examen Físico - Mujer',
      content: (
        <ExamenFisico
          value={formData.examen_fisico_mujer}
          onDataChange={(d) => handleDataChange('examen_fisico_mujer', d)}
        />
      ),
    },
    {
      key: 'examen_fisico_hombre',
      title: 'Examen Físico - Hombre',
      content: (
        <ExamenFisico
          value={formData.examen_fisico_hombre}
          onDataChange={(d) => handleDataChange('examen_fisico_hombre', d)}
        />
      ),
    },
    {
      key: 'personales_mujer',
      title: 'Antecedentes Personales - Mujer',
      content: (
        <AntecedentesPersonales
          titulo="Mujer"
          value={formData.personales_mujer}
          onDataChange={(d) => handleDataChange('personales_mujer', d)}
        />
      ),
    },
    {
      key: 'personales_hombre',
      title: 'Antecedentes Personales - Hombre',
      content: (
        <AntecedentesPersonales
          titulo="Hombre"
          value={formData.personales_hombre}
          onDataChange={(d) => handleDataChange('personales_hombre', d)}
        />
      ),
    },
    {
      key: 'antecedentes_ginecologicos',
      title: 'Antecedentes Ginecológicos - Mujer',
      content: (
        <AntecedentesGinecologicos
          value={formData.antecedentes_ginecologicos}
          onDataChange={(d) => handleDataChange('antecedentes_ginecologicos', d)}
        />
      ),
    },
    {
      key: 'genitales_hombre',
      title: 'Antecedentes Genitales - Hombre',
      content: (
        <AntecedentesGenitales
          value={formData.genitales_hombre}
          onDataChange={(d) => handleDataChange('genitales_hombre', d)}
        />
      ),
    },
  ];

  // 📄 Paginador
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
