import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

type RazonBancoSemen = 'no_aplica' | 'semen_no_ok' | 'pareja_femenina' | 'sin_pareja';

export const useBancoSemen = (tratamientoInfo: any) => {
  const [bancoSemenSeleccionado, setBancoSemenSeleccionado] = useState<any>(null);
  const [loadingBanco, setLoadingBanco] = useState(false);
  const [razonBanco, setRazonBanco] = useState<RazonBancoSemen>('no_aplica');

  const determinarNecesidadBancoSemen = () => {
    if (!tratamientoInfo) return;

    const { segunda_consulta, tipo_pareja, tiene_ovocitos } = tratamientoInfo;
    
    // Validar si la paciente tiene ovocitos (sin mostrar toast, solo la alerta del form se encarga)
    if (!tiene_ovocitos) {
      setRazonBanco('no_aplica');
      setBancoSemenSeleccionado(null);
      return;
    }

    let razon: RazonBancoSemen = 'no_aplica';
    let necesitaBanco = false;

    if (tipo_pareja === 'masculina') {
      if (segunda_consulta && !segunda_consulta.semen_viable) {
        razon = 'semen_no_ok';
        necesitaBanco = true;
      }
    } else if (tipo_pareja === 'femenina') {
      razon = 'pareja_femenina';
      necesitaBanco = true;
    } else if (tipo_pareja === 'sin_pareja') {
      razon = 'sin_pareja';
      necesitaBanco = true;
    }

    setRazonBanco(razon);

    if (necesitaBanco) {
      buscarBancoSemen();
    } else {
      setBancoSemenSeleccionado(null);
    }
  };

  const buscarBancoSemen = async () => {
    if (!tratamientoInfo?.fenotipo) return;

    setLoadingBanco(true);
    try {
      const response = await axios.post('http://localhost:8000/api/fertilizacion/buscar-banco-semen/', {
        fenotipo: tratamientoInfo.fenotipo
      });
      // El banco devuelve UNA sola muestra, la más compatible
      const mejorOpcion = response.data.resultados?.[0] || null;
      setBancoSemenSeleccionado(mejorOpcion);
    } catch (error) {
      console.error('Error buscando en banco de semen:', error);
      toast.error('Error buscando coincidencias en banco de semen');
      setBancoSemenSeleccionado(null);
    } finally {
      setLoadingBanco(false);
    }
  };

  useEffect(() => {
    if (tratamientoInfo) {
      determinarNecesidadBancoSemen();
    }
  }, [tratamientoInfo]);

  return {
    bancoSemenSeleccionado,
    loadingBanco,
    razonBanco,
    buscarBancoSemen
  };
};