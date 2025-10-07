import { Route } from 'react-router-dom';
import LandingPage from './features/Landing/LandingPage';
import EmbryoPage from './features/Embryo/pages/EmbryoPage';

export default function getAppRoutes() {
  return (
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/embriones" element={<EmbryoPage />} />
    </>
  );
}