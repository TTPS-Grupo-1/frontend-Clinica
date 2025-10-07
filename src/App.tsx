import { BrowserRouter, Routes } from 'react-router-dom';
import getAppRoutes from './appRoutes';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="overflow-x-auto">
      <BrowserRouter>
      <Navbar />
        <Routes>
          {getAppRoutes()}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

