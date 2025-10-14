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
import TurnosPacientePage from './features/Paciente/pages/TurnosPacientePage'
import HomePageAdmin from './features/Admin/pages/HomePageAdmin';

export default function getAppRoutes() {
  return (
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/medico/home" element={<HomePage />} />
      <Route path="/embriones" element={<EmbryoPage />} />
      <Route path="/medicos/alta" element={<AltaMedicoPage />} />
      <Route path="/medicos/editar/:dni" element={<EditMedicoPage />} />
      <Route path="/pacientes/home" element={<HomePaciente />} />
      <Route path="/pacientes/sacarTurno" element={<SacarTurno />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/medico/turnos" element={<ListadoTurnos />} />
      <Route path="/medicos/listado" element={<ListadoMedicosPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="/donaciones" element={<DonacionesHomePage />} />
       <Route path="/admin/home" element={<HomePageAdmin />} />
      {/* Para probar la page unificada con param tipo */}
      <Route path="/donaciones/nueva/:tipo" element={<DonacionPage />} />
      <Route path="/pacientes/misTurnos" element={<TurnosPacientePage/>} />

     
    </>
  );
}