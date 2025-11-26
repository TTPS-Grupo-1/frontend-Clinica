import SegundaConsulta from '../../components/SegundaConsulta/SegundaConsulta';

export default function SegundaConsultaPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 pt-24">
      {' '}
      {/* 👈 agregá pt-24 */}
      <h1 className="mb-8 text-center text-3xl font-bold text-blue-700">Segunda Consulta</h1>
      <SegundaConsulta />
    </div>
  );
}
