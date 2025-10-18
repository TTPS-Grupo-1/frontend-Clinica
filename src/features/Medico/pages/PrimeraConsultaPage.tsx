import React from 'react';
import PrimerConsulta from '../components/PrimerConsulta/PrimerConsulta';

const PrimerConsultaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Primera Consulta</h1>
      <PrimerConsulta />
    </div>
  );
};

export default PrimerConsultaPage;
