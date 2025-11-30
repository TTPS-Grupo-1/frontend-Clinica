import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MessageCircle } from 'lucide-react';
import OperadorSection from './OperadorSection';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { persistor } from '../store';
import { logout } from '../store/authSlice';
import axios from 'axios';
import { toast } from 'sonner';
import Chatbot from './Chatbot';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  // dropdown state handled inside subcomponents
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => (state.auth as any)?.isAuthenticated);
  const user = useSelector((state: RootState) => (state.auth as any)?.user);
  // Parse stored role from localStorage (it may be JSON-stringified or plain)
  const _storedRoleRaw = localStorage.getItem('role');
  let _storedRole: string | null = null;
  if (_storedRoleRaw) {
    try {
      _storedRole = JSON.parse(_storedRoleRaw);
    } catch {
      _storedRole = _storedRoleRaw;
    }
  }
  const role = user?.role || user?.rol || _storedRole;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsProfileOpen(false);
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        '/api/logout/',
        {},
        {
          headers: { Authorization: token ? `Token ${token}` : '' },
        }
      );
    } catch (err) {
      console.error('Logout request failed', err);
      // opcional: mostrar toast de advertencia
    } finally {
      // Limpiar el estado de Redux en memoria
      dispatch(logout()); // Limpia usuario y autenticación en Redux

      // Purgar el storage persistido (elimina la copia guardada en localStorage)
      try {
        await persistor.purge();
      } catch (e) {
        console.warn('Error purging persistor', e);
      }

      // Borrar claves usadas en localStorage por seguridad
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // clave usada por redux-persist suele ser `persist:<key>`
        localStorage.removeItem('persist:auth');
      } catch (e) {
        console.warn('Error clearing localStorage on logout', e);
      }

      toast.success('Sesión cerrada');
      navigate('/'); // Redirige al home normal
    }
  };

  return (
    <nav
      className="fixed top-0 z-50 w-full bg-[#24222B]/35 backdrop-blur-sm transition-transform duration-300"
      style={{ minHeight: '60px' }}
    >
      <section className="flex w-full items-center justify-between px-4 py-3">
        {/* Logo: inline medical icon (clickable) */}
        <button
          aria-label="Ir al inicio"
          onClick={() => {
            if (role === 'PACIENTE') {
              navigate('/pacientes/home');
            } else if (role === 'OPERADOR' || role === 'OPERADOR_LABORATORIO') {
              navigate('/operador');
            } else if (role === 'MEDICO') {
              navigate('/medico/home');
            } else if (role === 'ADMIN') {
              navigate('/admin/home');
            } else {
              navigate('/');
            }
          }}
          className="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-10 w-10 text-white"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
            />
            <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
          </svg>
          <span className="sr-only">Envy Fertilidad</span>
        </button>

        {/* Botón hamburguesa (móvil) */}
        <button
          className="ml-auto text-[#CDA053] focus:outline-none md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Enlaces en escritorio (dropdown + acciones de usuario) */}
        <section className="afacad-bold hidden items-center gap-5 text-base text-[#CDA053] md:flex">
          {role === 'OPERADOR_LABORATORIO' && <OperadorSection />}

          {/* Chatbot Button */}
          {isAuthenticated && (
            <button
              onClick={() => setIsChatbotOpen(!isChatbotOpen)}
              className="mr-4 font-medium text-white transition-colors duration-200 hover:text-yellow-500"
              title="Chatbot de asistencia"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
          )}

          {/* User Menu */}
          {isAuthenticated && (
            <div className="group relative z-50">
              <button
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
                onClick={() => setIsProfileOpen((s) => !s)}
                onBlur={() => setTimeout(() => setIsProfileOpen(false), 150)}
                className="flex items-center gap-2 font-medium text-white transition-colors duration-200 hover:text-yellow-500"
              >
                <User className="h-6 w-6" />
              </button>
              {/* Dropdown perfil */}
              <div
                className={`ring-opacity-5 absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black transition-all duration-200 ${
                  isProfileOpen ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
                }`}
              >
                <ul className="py-1">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Menú móvil */}
        <article
          className={`w-full bg-[#24222B]/90 transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen
              ? 'max-h-[300px] px-6 py-4 opacity-100'
              : 'max-h-0 overflow-hidden opacity-0'
          }`}
        >
          <ul className="flex flex-col gap-4 text-sm text-white">
            {role === 'OPERADOR_LABORATORIO' && (
              <OperadorSection isMobile onCloseMobile={() => setIsMobileMenuOpen(false)} />
            )}
            <li className="border-t border-white/20 pt-2"></li>
          </ul>
        </article>
      </section>

      {/* Chatbot Component */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </nav>
  );
}
