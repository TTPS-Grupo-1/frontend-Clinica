import { Route } from 'react-router-dom';
import LandingPage from './features/Landing/components/LandingPage';

export default function getAppRoutes() {
  return (
    <Route path="/" element={<LandingPage />} />
  );
}