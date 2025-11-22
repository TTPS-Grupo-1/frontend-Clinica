import { Route } from 'react-router-dom';
import LandingPage from './features/Landing/LandingPage';
import EmbryoPage from './features/Embryo/pages/EmbryoPage';
import AltaMedicoPage from './features/Medico/pages/AltaMedicoPage';
import EditMedicoPage from './features/Medico/pages/EditMedicoPage';
import HomePaciente from './features/Paciente/pages/HomePaciente';
import SacarTurno from './features/Paciente/pages/SacarTurno';
import LoginPage from './features/Login/pages/LoginPage';
import ListadoTurnos from './features/Medico/pages/ListadoTurnos';
import HomePage from './features/Medico/pages/HomePage';
import ListadoMedicosPage from './features/Medico/pages/ListadoMedicosPage';
import RegistroPage from './features/Paciente/pages/RegistroPage';
import DonacionesHomePage from './features/Donaciones/pages/HomePage';
import DonacionPage from './features/Donaciones/pages/DonacionPage';
import TurnosPacientePage from './features/Paciente/pages/TurnosPacientePage';
import HomePageAdmin from './features/Admin/pages/HomePageAdmin';
import VerOrdenesMedicas from './features/Paciente/pages/VerOrdenesMedicasPage';
import PrimeraConsultaPage from './features/Medico/pages/PrimeraConsultaPage';
import SegundaConsultaPage from './features/Medico/pages/segunda-consulta/SegundaConsultaPage';

import HomePuncion from './features/Punciones/pages/HomePuncion';
import HomeLaboratorio from './features/Operador/pages/HomeLaboratorio';
import FertilizacionPage from './features/Fertilizacion/pages/FertilizacionPage';
import EmbrionPage from './features/Embryo/pages/EmbrionPage';
import AlmacenamientoPage from './features/Donaciones/pages/AlmacenamientoPage';
import AsignarTurnosPage from './features/Admin/pages/AsignarTurnosPage';
import MonitoreosPage from './features/Medico/pages/MonitoreosPage';
import TransferenciaPage from './features/Transferencia/pages/TransferenciaPage';
import CriopreservacionSemenPage from './features/Criopreservaciones/pages/CriopreservarSemenPage';
import HistoriaClinicaPage from './features/Paciente/pages/HistoriaClinicaPage';
import MedicoPacientesPage from './features/Medico/pages/MedicoPacientesPage';
import TratamientoPage from './features/Tratamiento/pages/TratamientoPage';
import PrimeraConsultaViewPage from './features/Tratamiento/pages/PrimeraConsultaViewPage';
import SegundaConsultaViewPage from './features/Tratamiento/pages/SegundaConsultaViewPage';

export default function getAppRoutes() {
  return (
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/medico/home" element={<HomePage />} />
      <Route path="/medico/monitoreos" element={<MonitoreosPage />} />
      <Route path="/embriones" element={<EmbryoPage />} />
      <Route path="/embriones/:id" element={<EmbrionPage />} />
      <Route path="/medicos/alta" element={<AltaMedicoPage />} />
      <Route path="/medicos/editar/:dni" element={<EditMedicoPage />} />
      <Route path="/pacientes/home" element={<HomePaciente />} />
      <Route path="/pacientes/sacarTurno" element={<SacarTurno />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/medico/turnos" element={<ListadoTurnos />} />
      <Route path="/medicos/listado" element={<ListadoMedicosPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="/admin/home" element={<HomePageAdmin />} />
      {/* Para probar la page unificada con param tipo */}
      <Route path="/donaciones/nueva/:tipo" element={<DonacionPage />} />
      <Route path="/pacientes/misTurnos" element={<TurnosPacientePage />} />
      <Route path="/pacientes/verOrdenesMedicas" element={<VerOrdenesMedicas />} />
      <Route path="/pacientes/:pacienteId/primeraConsulta" element={<PrimeraConsultaPage />} />
      <Route path="/pacientes/:pacienteId/segundaConsulta" element={<SegundaConsultaPage />} />
      <Route path="/tratamiento/:tratamientoId/primera-consulta" element={<PrimeraConsultaViewPage />} />
      <Route path="/tratamiento/:tratamientoId/segunda-consulta" element={<SegundaConsultaViewPage />} />
      <Route path="/operador/donaciones/nueva/:tipo" element={<DonacionPage />} />
      <Route path="/pacientes/turnos" element={<TurnosPacientePage />} />
      <Route path="/operador" element={<HomeLaboratorio />} />
      <Route path="/operador/donaciones" element={<DonacionesHomePage />} />
      <Route path="/operador/punciones" element={<HomePuncion />} />
      <Route path="/pacientes/:pacienteId/historia" element={<HistoriaClinicaPage />} />
      <Route path="/medico/:medicoId/pacientes" element={<MedicoPacientesPage />} />
      <Route path="/operador/fertilizaciones" element={<FertilizacionPage />} />
      <Route path="/operador/tanques" element={<AlmacenamientoPage />} />
      <Route path="/medicos/asignar_turnos" element={<AsignarTurnosPage />} />
      <Route path="/transferencias" element={<TransferenciaPage />} />
      <Route path="/operador/criopreservacion" element={<CriopreservacionSemenPage />} />
      <Route path="/tratamiento/:id" element={<TratamientoPage />} />
    </>
  );
}
