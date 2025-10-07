import { BrowserRouter, Routes } from 'react-router-dom';
import getAppRoutes from './appRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="overflow-x-auto">
      <BrowserRouter>
      <Navbar />
        <Routes>
          {getAppRoutes()}
        </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

