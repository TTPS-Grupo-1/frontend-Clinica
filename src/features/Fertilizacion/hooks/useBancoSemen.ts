import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

type RazonBancoSemen = 'no_aplica' | 'semen_no_ok' | 'pareja_femenina' | 'sin_pareja';

export const useBancoSemen = (tratamientoInfo: any) => {
  const [bancoSemenSeleccionado, setBancoSemenSeleccionado] = useState<any>(null);
  const [loadingBanco, setLoadingBanco] = useState(false);
  const [razonBanco, setRazonBanco] = useState<RazonBancoSemen>('no_aplica');

  const determinarNecesidadBancoSemen = () => {
    if (!tratamientoInfo) {
      console.log('❌ useBancoSemen: No hay tratamientoInfo');
      return;
    }

    console.log('🔍 useBancoSemen: tratamientoInfo recibido:', tratamientoInfo);

    const { segunda_consulta, tipo_pareja, tiene_ovocitos } = tratamientoInfo;



    let razon: RazonBancoSemen = 'no_aplica';
    let necesitaBanco = false;

    console.log(`🔍 useBancoSemen: tipo_pareja = "${tipo_pareja}"`);

    if (tipo_pareja === 'masculina') {
      if (segunda_consulta && !segunda_consulta.semen_viable) {
        razon = 'semen_no_ok';
        necesitaBanco = true;
        console.log('✅ Pareja masculina con semen NO viable -> NECESITA BANCO');
      } else {
        console.log('ℹ️ Pareja masculina con semen viable -> NO necesita banco');
      }
    } else if (tipo_pareja === 'femenina') {
      razon = 'pareja_femenina';
      necesitaBanco = true;
      console.log('✅ Pareja FEMENINA -> NECESITA BANCO DE SEMEN');
    } else if (tipo_pareja === 'sin_pareja') {
      razon = 'sin_pareja';
      necesitaBanco = true;
      console.log('✅ Sin pareja -> NECESITA BANCO DE SEMEN');
    } else {
      console.log(`⚠️ tipo_pareja no reconocido: "${tipo_pareja}"`);
    }

    setRazonBanco(razon);

    if (necesitaBanco) {
      console.log('🚀 Iniciando búsqueda en banco de semen...');
      buscarBancoSemen();
    } else {
      console.log('❌ No necesita banco de semen');
      setBancoSemenSeleccionado(null);
    }
  };

  const buscarBancoSemen = async () => {
    if (!tratamientoInfo?.fenotipo) {
      console.log('❌ No hay fenotipo disponible para buscar en banco de semen');
      return;
    }

    setLoadingBanco(true);
    console.log('🔍 Buscando en banco de semen con fenotipo:', tratamientoInfo.fenotipo);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/fertilizacion/buscar-banco-semen/',
        {
          color_ojos: tratamientoInfo.fenotipo.color_ojos,
          color_pelo: tratamientoInfo.fenotipo.color_pelo,
          tipo_pelo: tratamientoInfo.fenotipo.tipo_pelo,
          altura_cm: tratamientoInfo.fenotipo.altura_cm,
          complexion_corporal: tratamientoInfo.fenotipo.complexion_corporal,
          rasgos_etnicos: tratamientoInfo.fenotipo.rasgos_etnicos,
        }
      );
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
    buscarBancoSemen,
  };
};
