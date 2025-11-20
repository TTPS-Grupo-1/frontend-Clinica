import { BrowserRouter, Routes } from 'react-router-dom';
import getAppRoutes from './appRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="overflow-x-auto">
      <BrowserRouter>
        <Toaster richColors />
        <Navbar />
        <Routes>{getAppRoutes()}</Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
