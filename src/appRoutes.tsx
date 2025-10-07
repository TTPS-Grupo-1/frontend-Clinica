import { Route } from 'react-router-dom';
import LandingPage from './features/Landing/LandingPage';
import EmbryoPage from './features/Embryo/pages/EmbryoPage';
import AltaMedicoPage from './features/Medico/pages/AltaMedicoPage';
import EditMedicoPage from './features/Medico/pages/EditMedicoPage';
import LoginPage from './features/Login/pages/LoginPage';
import ListadoTurnos from './features/Medico/pages/ListadoTurnos';
import HomePage from './features/Medico/pages/HomePage';

export default function getAppRoutes() {
  return (
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/medicos" element={<HomePage />} />
      <Route path="/embriones" element={<EmbryoPage />} />
      <Route path="/medicos/alta" element={<AltaMedicoPage />} />
      <Route path="/medicos/editar/:id" element={<EditMedicoPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/medico/turnos" element={<ListadoTurnos />} />
    </>
  );
}