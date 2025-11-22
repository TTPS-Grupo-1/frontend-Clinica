import { useState, useEffect } from 'react';
import { AlertTriangle, Snowflake, Heart } from 'lucide-react';
import ErrorsBanner from './modal/FertilizacionErrorsBanner';
import SemenSection from './modal/FertilizacionSemenSection';
import OvocitosSection from './modal/FertilizacionOvocitosSection';
import { useOvocitosFetch } from '../../../shared/hooks/useOvocitosFetch';
import { useTratamientoInfo } from '../hooks/useTratamientoInfo';
import type { SemenData, OvocitoData, GametoDonado } from '../../../types/Fertilizacion';
interface FertilizacionPlanProps {
  pacienteId: number;
  usuarioId: number;
  onPlanReady: (plan: any) => void;
  onDescriPreservacionConfirmada: (ovocitosIds: number[]) => void;
}

interface PlanFertilizacion {
  semen: SemenData | GametoDonado | null;
  ovocitos: (OvocitoData | GametoDonado)[];
  descripPreservados: number[];
  usandoDonantes: {
    semen: boolean;
    ovocitos: boolean;
  };
  errores: string[];
}

export default function FertilizacionPlan({
  pacienteId,
  usuarioId,
  onPlanReady,
  onDescriPreservacionConfirmada,
}: FertilizacionPlanProps) {
  const [plan, setPlan] = useState<PlanFertilizacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [paso, setPaso] = useState<'evaluacion' | 'confirmacion' | 'listo'>('evaluacion');
  const [ovocitosParaDescriPreservar, setOvocitosParaDescriPreservar] = useState<number[]>([]);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  // Usar hooks existentes para obtener datos y construir el plan aquí
  const { ovocitos: ovocitosRaw, loading: ovocitosLoading } = useOvocitosFetch(pacienteId);
  const { tratamientoInfo, loading: tratamientoLoading } = useTratamientoInfo(
    pacienteId?.toString() || null,
    true
  );

  // Construir plan cuando tengamos datos
  useEffect(() => {
    const construirPlan = () => {
      setLoading(true);
      try {
        const planLocal: PlanFertilizacion = {
          semen: tratamientoInfo?.segunda_consulta?.semen_viable
            ? {
                id: tratamientoInfo?.segunda_consulta?.semen_id ?? 0,
                viable: true,
                origen: 'PAREJA',
                paciente_id: pacienteId,
              }
            : null,
          ovocitos: (ovocitosRaw || []).map(
            (o: any) =>
              ({
                id: o.id_ovocito ?? o.id,
                viable: o.viable ?? true,
                estado:
                  (o.tipo_estado || '').toLowerCase() === 'criopreservado'
                    ? 'criopreservado'
                    : 'fresco',
                paciente_id: pacienteId,
                puncion_id: o.puncion ?? o.puncion_id ?? 0,
              }) as OvocitoData
          ),
          descripPreservados: [],
          usandoDonantes: {
            semen: !tratamientoInfo?.segunda_consulta?.semen_viable,
            ovocitos: (ovocitosRaw || []).length === 0,
          },
          errores: [],
        };

        setPlan(planLocal);

        const ovocitosCriopreservados = planLocal.ovocitos.filter(
          (o) => 'estado' in o && (o as OvocitoData).estado === 'criopreservado'
        ) as OvocitoData[];
        if (ovocitosCriopreservados.length > 0) {
          setPaso('confirmacion');
          setOvocitosParaDescriPreservar(ovocitosCriopreservados.map((o) => o.id));
        } else {
          setPaso('listo');
          onPlanReady(planLocal);
        }
      } catch (error) {
        console.error('Error construyendo plan de fertilización:', error);
        setPlan({
          semen: null,
          ovocitos: [],
          descripPreservados: [],
          usandoDonantes: { semen: false, ovocitos: false },
          errores: ['Error cargando el plan de fertilización'],
        });
      } finally {
        setLoading(false);
      }
    };

    // Ejecutar cuando tengamos datos iniciales
    if (pacienteId != null) {
      // esperar a que al menos uno de los loaders termine
      if (!ovocitosLoading && !tratamientoLoading) {
        construirPlan();
      }
    }
  }, [
    pacienteId,
    usuarioId,
    ovocitosRaw,
    ovocitosLoading,
    tratamientoInfo,
    tratamientoLoading,
    onPlanReady,
  ]);

  const manejarDescriPreservacion = async () => {
    if (ovocitosParaDescriPreservar.length > 0) {
      onDescriPreservacionConfirmada(ovocitosParaDescriPreservar);

      // Actualizar el plan con ovocitos descriopreservados
      if (plan) {
        const planActualizado = {
          ...plan,
          ovocitos: plan.ovocitos.map((o) => {
            if ('estado' in o && ovocitosParaDescriPreservar.includes((o as OvocitoData).id)) {
              return { ...o, estado: 'fresco' as const };
            }
            return o;
          }),
          descripPreservados: ovocitosParaDescriPreservar,
        };
        setPlan(planActualizado);
        setPaso('listo');
        onPlanReady(planActualizado);
      }
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-blue-500" />
        <p className="text-gray-600">Evaluando viabilidad de gametos...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle className="mx-auto mb-4 h-8 w-8 text-red-500" />
        <p className="text-red-600">Error cargando el plan de fertilización</p>
      </div>
    );
  }

  if (paso === 'confirmacion') {
    return (
      <div className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Snowflake className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-bold text-gray-800">Ovocitos Criopreservados Disponibles</h3>
        </div>

        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="mb-4 text-blue-800">
            Se encontraron ovocitos criopreservados viables. ¿Deseas descriopreservarlos para la
            fertilización?
          </p>

          <div className="space-y-2">
            {plan.ovocitos
              .filter((o) => 'estado' in o && (o as OvocitoData).estado === 'criopreservado')
              .map((ovocito) => {
                const o = ovocito as OvocitoData;
                return (
                  <div key={o.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`ovocito-${o.id}`}
                      checked={ovocitosParaDescriPreservar.includes(o.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setOvocitosParaDescriPreservar((prev) => [...prev, o.id]);
                        } else {
                          setOvocitosParaDescriPreservar((prev) =>
                            prev.filter((id) => id !== o.id)
                          );
                        }
                      }}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor={`ovocito-${o.id}`} className="text-sm text-gray-700">
                      Ovocito #{o.id} (Punción #{o.puncion_id})
                    </label>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setOvocitosParaDescriPreservar([]);
              setPaso('listo');
              onPlanReady(plan);
            }}
            className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Continuar sin descriopreservar
          </button>
          <button
            onClick={manejarDescriPreservacion}
            disabled={ovocitosParaDescriPreservar.length === 0}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Descriopreservar seleccionados
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-2">
        <Heart className="h-6 w-6 text-red-500" />
        <h3 className="text-lg font-bold text-gray-800">Plan de Fertilización</h3>
      </div>
      <ErrorsBanner errores={plan.errores} />
      <SemenSection {...({ plan, expandedSections, toggleSection } as any)} />
      <OvocitosSection {...({ plan, expandedSections, toggleSection } as any)} />

      {/* Botón para proceder */}
      {plan.semen && plan.ovocitos.length > 0 && (
        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="mb-2 font-medium text-blue-800">Plan listo para fertilización</p>
          <p className="text-sm text-blue-700">
            Se procederá con {plan.usandoDonantes.semen ? 'semen donado' : 'semen de pareja'} y{' '}
            {plan.ovocitos.length} ovocito{plan.ovocitos.length > 1 ? 's' : ''}
            {plan.usandoDonantes.ovocitos ? ' donado' : ' propio'}
            {plan.ovocitos.length > 1 ? 's' : ''}.
          </p>
        </div>
      )}
    </div>
  );
}
