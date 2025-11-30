import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  FlaskConical,
  Syringe,
  Paperclip,
  Calendar,
  ClipboardCheck,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';

import {
  SeccionEstudios,
  SeccionProtocolo,
  SeccionConsentimiento,
  SeccionMonitoreo,
  SeccionConclusion,
} from './Secciones';

import { getTratamientoByPaciente, getEstudiosAgrupadosPorConsulta } from './consultasService';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SECCIONES = [
  { key: 'estudios', label: 'Cargar estudios', icon: FlaskConical },
  { key: 'protocolo', label: 'Registrar protocolo', icon: Syringe },
  { key: 'consentimiento', label: 'Subir consentimiento', icon: Paperclip },
  { key: 'monitoreo', label: 'Monitoreo estimulación', icon: Calendar },
  { key: 'conclusion', label: 'Conclusión', icon: ClipboardCheck },
];

const SegundaConsulta: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [estudiosAgrupados, setEstudiosAgrupados] = useState<any[]>([]);
  const user = useSelector((state: any) => state.auth.user);
  const medicoId = user.id;
  const [objetivo, setObjetivo] = useState<string>('');

  const [formData, setFormData] = useState({
    estudios: {},
    protocolo: {},
    consentimientoPDF: null as File | null,
    monitoreo: [],
    conclusion: { ovocitoViable: false, semenViable: false },
  });

  const { pacienteId } = useParams();

  const handleSectionChange = (key: string, data: any) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tratamiento = await getTratamientoByPaciente(Number(pacienteId));
        setObjetivo(tratamiento.objetivo || '');
        localStorage.setItem('tratamiento_id', tratamiento.id);

        if (tratamiento.primera_consulta) {
          const estudiosData = await getEstudiosAgrupadosPorConsulta(tratamiento.primera_consulta);
          setEstudiosAgrupados(estudiosData.estudios);
        }
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Error cargando información del tratamiento');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleConfirmar = async () => {
    try {
      const form = new FormData();

      const tratamientoId = localStorage.getItem('tratamiento_id');
      form.append('tratamiento_id', tratamientoId || '');
      form.append('protocolo', JSON.stringify(formData.protocolo));
      form.append('monitoreo', JSON.stringify(formData.monitoreo));
      const estudiosArray = Object.entries(formData.estudios || {}).map(([id, valor]) => ({
        id: Number(id),
        valor,
      }));
      form.append('estudios', JSON.stringify(estudiosArray));
      form.append('conclusion', JSON.stringify(formData.conclusion));
      if (formData.consentimientoPDF) form.append('consentimiento', formData.consentimientoPDF);
      await axios.post('/api/segunda_consultas/', form, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Segunda consulta registrada correctamente.');
      navigate('/medico/home');
    } catch (err) {
      console.error(err);
      toast.error('Error al guardar la segunda consulta.');
    }
  };

  const renderSeccion = () => {
    switch (SECCIONES[step].key) {
      case 'estudios':
        return (
          <SeccionEstudios
            estudiosAgrupados={estudiosAgrupados}
            initialData={formData.estudios}
            onDataChange={(data) => handleSectionChange('estudios', data)}
          />
        );
      case 'protocolo':
        return (
          <SeccionProtocolo
            initialData={formData.protocolo}
            onDataChange={(data) => handleSectionChange('protocolo', data)}
          />
        );
      case 'consentimiento':
        return (
          <SeccionConsentimiento
            initialData={formData.consentimientoPDF}
            onDataChange={(file) => handleSectionChange('consentimientoPDF', file)}
          />
        );
      case 'monitoreo':
        return (
          <SeccionMonitoreo
            idMedico={medicoId}
            initialData={formData.monitoreo}
            onDataChange={(data) => handleSectionChange('monitoreo', data)}
          />
        );
      case 'conclusion':
        return (
          <SeccionConclusion
            initialData={formData.conclusion}
            objetivo={objetivo}
            onDataChange={(data) => handleSectionChange('conclusion', data)}
          />
        );
      default:
        return null;
    }
  };

  if (loading)
    return <div className="mt-10 text-center text-gray-500">Cargando información...</div>;

  if (error) return <div className="mt-10 text-center text-red-500">{error}</div>;

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
      <button
        onClick={() => (window.location.href = '/medico/home')}
        className="mb-4 flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-blue-600 transition-all hover:bg-blue-200"
      >
        <ArrowLeft className="h-5 w-5" />
        Volver al home
      </button>

      <div className="mb-6 flex justify-center gap-4">
        {SECCIONES.map((sec, idx) => {
          const Icon = sec.icon;
          const active = step === idx;
          return (
            <div
              key={sec.key}
              className={`flex flex-col items-center ${active ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <Icon className="mb-1 h-6 w-6" />
              <span className="text-xs">{sec.label}</span>
              <div
                className={`mt-1 h-2 w-2 rounded-full ${active ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            </div>
          );
        })}
      </div>

      <div className="min-h-[300px]">{renderSeccion()}</div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setStep((p) => Math.max(p - 1, 0))}
          disabled={step === 0}
          className={`rounded-lg px-4 py-2 font-semibold transition-all ${
            step === 0
              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          Anterior
        </button>

        {step < SECCIONES.length - 1 ? (
          <button
            onClick={() => setStep((p) => Math.min(p + 1, SECCIONES.length - 1))}
            className="rounded-lg bg-blue-100 px-4 py-2 font-semibold text-blue-700 transition-all hover:bg-blue-200"
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={handleConfirmar}
            disabled={!formData.consentimientoPDF}
            className={`flex items-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-md transition-all ${
              formData.consentimientoPDF
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            <CheckCircle className="h-5 w-5" />
            Confirmar Segunda Consulta
          </button>
        )}
      </div>
    </div>
  );
};

export default SegundaConsulta;
