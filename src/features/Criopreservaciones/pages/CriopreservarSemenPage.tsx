import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../Medico/components/DashboardCard';
import RoleHomeButton from '../../../shared/components/RoleHomeButton';
import ModalAccion from '../components/ModalAccion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function CriopreservarSemenPage() {
  const navigate = useNavigate();

  const [showConfirmacion, setShowConfirmacion] = useState(false);
  const [showCongelar, setShowCongelar] = useState(false);
  const [showDescongelar, setShowDescongelar] = useState(false);
  const [showBuscar, setShowBuscar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dniPaciente, setDniPaciente] = useState('');
  const [dniDescongelar, setDniDescongelar] = useState('');
  const [dniBuscar, setDniBuscar] = useState('');
  const [resultadoBusqueda, setResultadoBusqueda] = useState<string | null>(null);

  const handleVolver = () => {
    setShowConfirmacion(false);
    setShowCongelar(false);
    setShowDescongelar(false);
    setShowBuscar(false);
    setDniPaciente('');
    setDniDescongelar('');
    setDniBuscar('');
    setResultadoBusqueda(null);
  };

  const handleCrearTanque = () => setShowConfirmacion(true);
  const handleCongelarSemen = () => setShowCongelar(true);
  const handleDescongelarSemen = () => setShowDescongelar(true);
  const handleBuscarMuestra = () => setShowBuscar(true);

  const handleConfirmarTanque = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://bmcgxbtbcmlzoetyqajn.supabase.co/functions/v1/crear-tanque',
        { group_id: 1 },
        {
          headers: {
            token: 'token-grupo-4',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message || 'Tanque creado exitosamente');
      } else {
        toast.error(response.data.message || 'Error al crear el tanque');
      }
      setShowConfirmacion(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Error al crear el tanque';
      toast.error(errorMessage);
      setShowConfirmacion(false);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmarCongelar = async () => {
    if (!dniPaciente.trim()) {
      toast.error('Por favor ingrese el DNI del paciente');
      return;
    }
    const dniNumero = parseInt(dniPaciente, 10);
    if (isNaN(dniNumero) || dniNumero <= 0) {
      toast.error('El DNI debe ser un número válido');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        'https://bmcgxbtbcmlzoetyqajn.supabase.co/functions/v1/congelar-semen',
        { dni: dniPaciente, group_id: 1 },
        {
          headers: {
            token: 'token-grupo-4',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message || 'Semen congelado exitosamente');
      } else {
        toast.error(response.data.message || 'Error al congelar semen');
      }
      setShowCongelar(false);
      setDniPaciente('');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Error al congelar semen';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmarDescongelar = async () => {
    if (!dniDescongelar.trim()) {
      toast.error('Por favor ingrese el DNI del semen a descongelar');
      return;
    }
    const dniNumero = parseInt(dniDescongelar, 10);
    if (isNaN(dniNumero) || dniNumero <= 0) {
      toast.error('El DNI debe ser un número válido');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        'https://bmcgxbtbcmlzoetyqajn.supabase.co/functions/v1/descongelar-semen',
        { dni: dniDescongelar, group_id: 1 },
        {
          headers: {
            token: 'token-grupo-4',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message || 'Semen descongelado exitosamente');
      } else {
        toast.error(response.data.message || 'Error al descongelar semen');
      }
      setShowDescongelar(false);
      setDniDescongelar('');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Error al descongelar semen';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmarBuscar = async () => {
    if (!dniBuscar.trim()) {
      toast.error('Por favor ingrese el DNI del paciente');
      return;
    }
    const dniNumero = parseInt(dniBuscar, 10);
    if (isNaN(dniNumero) || dniNumero <= 0) {
      toast.error('El DNI debe ser un número válido');
      return;
    }
    setLoading(true);
    setResultadoBusqueda(null);
    try {
      const response = await axios.post(
        'https://bmcgxbtbcmlzoetyqajn.supabase.co/functions/v1/dni-tiene-muestra',
        { dni: dniBuscar, group_id: 1 },
        {
          headers: {
            token: 'token-grupo-4',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        setResultadoBusqueda(response.data.message || 'El paciente tiene muestra registrada.');
      } else {
        setResultadoBusqueda(response.data.message || 'El paciente NO tiene muestra registrada.');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Error al buscar muestra';
      setResultadoBusqueda(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarTanque = () => setShowConfirmacion(false);

  const handleCancelarCongelar = () => {
    setShowCongelar(false);
    setDniPaciente('');
  };

  const handleCancelarDescongelar = () => {
    setShowDescongelar(false);
    setDniDescongelar('');
  };

  const handleCancelarBuscar = () => {
    setShowBuscar(false);
    setDniBuscar('');
    setResultadoBusqueda(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 pt-28">
      <Toaster position="top-center" />
      <div className="w-full max-w-7xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Criopreservación de Semen</h1>
          <RoleHomeButton className="!static" />
        </div>

        {!showConfirmacion && !showCongelar && !showDescongelar && !showBuscar ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Crear Tanque"
              description="Registrar un nuevo tanque de criopreservación (10 racks x 10 posiciones)"
              icon="🏭"
              onClick={handleCrearTanque}
            />
            <DashboardCard
              title="Congelar Semen"
              description="Registrar una nueva muestra de semen congelada"
              icon="❄️"
              onClick={handleCongelarSemen}
            />
            <DashboardCard
              title="Descongelar Semen"
              description="Descongelar una muestra para su uso"
              icon="🔥"
              onClick={handleDescongelarSemen}
            />
            <DashboardCard
              title="Buscar Muestra"
              description="Consultar muestras por DNI del paciente"
              icon="🔍"
              onClick={handleBuscarMuestra}
            />
          </div>
        ) : showConfirmacion ? (
          <ModalAccion
            icon="🏭"
            titulo="Crear Nuevo Tanque"
            descripcion="¿Está seguro que desea crear un nuevo tanque de criopreservación?"
            loading={loading}
            onConfirm={handleConfirmarTanque}
            onCancel={handleCancelarTanque}
            onVolver={handleVolver}
            confirmText="Confirmar"
            cancelText="Cancelar"
          >
            <div className="mb-2 rounded-md bg-blue-50 p-4 text-left text-sm">
              <p className="mb-2 font-semibold text-gray-800">Características:</p>
              <ul className="space-y-1 text-gray-600">
                <li>• 10 racks por tanque</li>
                <li>• 10 posiciones por rack</li>
                <li>• Capacidad total: 100 muestras</li>
              </ul>
            </div>
          </ModalAccion>
        ) : showCongelar ? (
          <ModalAccion
            icon="❄️"
            titulo="Congelar Muestra de Semen"
            descripcion="Ingrese el DNI del paciente para congelar la muestra"
            loading={loading}
            onConfirm={handleConfirmarCongelar}
            onCancel={handleCancelarCongelar}
            onVolver={handleVolver}
            confirmText="Congelar"
            cancelText="Cancelar"
            disableConfirm={loading || !dniPaciente.trim()}
          >
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                DNI del Paciente
              </label>
              <input
                type="text"
                value={dniPaciente}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setDniPaciente(value);
                }}
                placeholder="Ej: 12345678"
                maxLength={8}
                className="w-full rounded-md border border-gray-300 px-4 py-3 font-medium text-gray-900 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                disabled={loading}
              />
            </div>
          </ModalAccion>
        ) : showDescongelar ? (
          <ModalAccion
            icon="🔥"
            titulo="Descongelar Muestra de Semen"
            descripcion="Ingrese el DNI del semen a descongelar"
            loading={loading}
            onConfirm={handleConfirmarDescongelar}
            onCancel={handleCancelarDescongelar}
            onVolver={handleVolver}
            confirmText="Descongelar"
            cancelText="Cancelar"
            disableConfirm={loading || !dniDescongelar.trim()}
          >
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">DNI del Semen</label>
              <input
                type="text"
                value={dniDescongelar}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setDniDescongelar(value);
                }}
                placeholder="Ej: 12345678"
                maxLength={8}
                className="w-full rounded-md border border-gray-300 px-4 py-3 font-medium text-gray-900 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                disabled={loading}
              />
            </div>
          </ModalAccion>
        ) : (
          <ModalAccion
            icon="🔍"
            titulo="Buscar Muestra por DNI"
            descripcion="Ingrese el DNI del paciente para consultar si tiene muestra registrada"
            loading={loading}
            onConfirm={handleConfirmarBuscar}
            onCancel={handleCancelarBuscar}
            onVolver={handleVolver}
            confirmText="Buscar"
            cancelText="Cancelar"
            disableConfirm={loading || !dniBuscar.trim()}
          >
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                DNI del Paciente
              </label>
              <input
                type="text"
                value={dniBuscar}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setDniBuscar(value);
                }}
                placeholder="Ej: 12345678"
                maxLength={8}
                className="w-full rounded-md border border-gray-300 px-4 py-3 font-medium text-gray-900 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                disabled={loading}
              />
              {resultadoBusqueda && (
                <div className="mt-4 rounded-md border border-cyan-200 bg-cyan-50 p-3 text-center text-sm font-medium text-cyan-800">
                  {resultadoBusqueda}
                </div>
              )}
            </div>
          </ModalAccion>
        )}
      </div>
    </main>
  );
}
