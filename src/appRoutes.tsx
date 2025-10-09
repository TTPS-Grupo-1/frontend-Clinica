import { Route } from 'react-router-dom';
import LandingPage from './features/Landing/LandingPage';
import EmbryoPage from './features/Embryo/pages/EmbryoPage';
import AltaMedicoPage from './features/Medico/pages/AltaMedicoPage';
import EditMedicoPage from './features/Medico/pages/EditMedicoPage';
import HomePaciente from './features/Paciente/pages/HomePaciente';
import SacarTurno from './features/Paciente/pages/SacarTurno';

export default function getAppRoutes() {
  return (
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/embriones" element={<EmbryoPage />} />
      <Route path="/medicos/alta" element={<AltaMedicoPage />} />
      <Route path="/medicos/editar/:id" element={<EditMedicoPage />} />
      <Route path="/pacientes/home" element={<HomePaciente />} />
      <Route path="/pacientes/sacarTurno" element={<SacarTurno />} />
    </>
  );
}