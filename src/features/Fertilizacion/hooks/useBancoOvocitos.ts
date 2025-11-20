import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export const useBancoOvocitos = (tratamientoInfo: any) => {
  const [bancoOvocitos, setBancoOvocitos] = useState<any[]>([]);
  const [loadingBancoOvocitos, setLoadingBancoOvocitos] = useState(false);
  const [ovocitoDonadoSeleccionado, setOvocitoDonadoSeleccionado] = useState<any>(null);

  const necesitaOvocitosDonados = () => {
    if (!tratamientoInfo) return false;

    const { segunda_consulta } = tratamientoInfo;
    // Necesita ovocitos donados si los ovocitos no son viables
    return segunda_consulta && !segunda_consulta.ovocito_viable;
  };

  const buscarOvocitosDonados = async () => {
    if (!tratamientoInfo?.fenotipo) return;

    setLoadingBancoOvocitos(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/fertilizacion/buscar-banco-ovocitos/',
        {
          color_ojos: tratamientoInfo.fenotipo.color_ojos,
          color_pelo: tratamientoInfo.fenotipo.color_pelo,
          tipo_pelo: tratamientoInfo.fenotipo.tipo_pelo,
          altura_cm: tratamientoInfo.fenotipo.altura_cm,
          complexion_corporal: tratamientoInfo.fenotipo.complexion_corporal,
          rasgos_etnicos: tratamientoInfo.fenotipo.rasgos_etnicos,
        }
      );

      setBancoOvocitos(response.data.resultados || []);
    } catch (error) {
      console.error('Error buscando en banco de ovocitos:', error);
      toast.error('Error buscando ovocitos donados compatibles');
      setBancoOvocitos([]);
    } finally {
      setLoadingBancoOvocitos(false);
    }
  };

  useEffect(() => {
    if (tratamientoInfo && necesitaOvocitosDonados()) {
      buscarOvocitosDonados();
    } else {
      setBancoOvocitos([]);
      setOvocitoDonadoSeleccionado(null);
    }
  }, [tratamientoInfo]);

  return {
    bancoOvocitos,
    loadingBancoOvocitos,
    ovocitoDonadoSeleccionado,
    setOvocitoDonadoSeleccionado,
    necesitaOvocitosDonados: necesitaOvocitosDonados(),
    buscarOvocitosDonados,
  };
};
