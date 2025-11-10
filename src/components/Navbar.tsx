import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, User, MessageCircle } from "lucide-react";
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
  // Only one dropdown open at a time: 'embriones', 'donaciones', 'profile', or null
  const [openDropdown, setOpenDropdown] = useState<null | 'embriones' | 'donaciones' | 'profile'>(null);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => (state.auth as any)?.isAuthenticated);
  const user = useSelector((state: RootState) => (state.auth as any)?.user);
  // Parse stored role from localStorage (it may be JSON-stringified or plain)
  const _storedRoleRaw = localStorage.getItem('role');
  let _storedRole: string | null = null;
  if (_storedRoleRaw) {
    try {
      _storedRole = JSON.parse(_storedRoleRaw);
    } catch (e) {
      _storedRole = _storedRoleRaw;
    }
  }
  const role = user?.role || user?.rol || _storedRole;
  const dispatch = useDispatch();

 const handleLogout = async () => {
  setIsProfileOpen(false);
  const token = localStorage.getItem('token');

  try {
    await axios.post('/api/logout/', {}, {
      headers: { Authorization: token ? `Token ${token}` : '' }
    });
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
      className="fixed top-0 w-full z-50 bg-[#24222B]/35 backdrop-blur-sm transition-transform duration-300"
      style={{ minHeight: "60px" }}
    >
      <section className="flex items-center justify-between w-full px-4 py-3">
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
            } else {
              navigate('/');
            }
          }}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
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
          className="md:hidden ml-auto text-[#CDA053] focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
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
        <section className="hidden md:flex items-center gap-5 afacad-bold text-base text-[#CDA053]">
          {role === 'OPERADOR_LABORATORIO' && (
            <div className="relative z-50 group">
              <button
                aria-haspopup="true"
                aria-expanded={openDropdown === 'donaciones'}
                onClick={() => setOpenDropdown(openDropdown === 'donaciones' ? null : 'donaciones')}
                onMouseEnter={() => setOpenDropdown('donaciones')}
                onMouseLeave={() => setOpenDropdown(null)}
                className="flex items-center gap-2 text-white font-medium hover:text-yellow-500 transition-colors duration-200"
              >
                <ChevronRight className="ml-1 h-4 w-4 text-white" />
                Operador
              </button>
              {/* Dropdown panel */}
              <div
                onMouseEnter={() => setOpenDropdown('donaciones')}
                onMouseLeave={() => setOpenDropdown(null)}
                className={`absolute right-0 mt-1 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                  openDropdown === 'donaciones' ? 'opacity-100 visible transform scale-100' : 'opacity-0 invisible transform scale-95'
                }`}
              >
                <ul className="py-1">
                  <li>
                    <Link
                      to="/operador"
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/operador/donaciones"
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      Donaciones
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/operador/punciones"
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      Punciones
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/embriones"
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      Listado de embriones
                    </Link>
                  </li>
                  <li>
                      <Link
                        to="/operador/fertilizaciones"
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                      >
                        Fertilizaciones
                      </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Chatbot Button */}
          {isAuthenticated && (
            <button
              onClick={() => setIsChatbotOpen(!isChatbotOpen)}
              className="text-white font-medium hover:text-yellow-500 transition-colors duration-200 mr-4"
              title="Chatbot de asistencia"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
          )}

          {/* User Menu */}
          {isAuthenticated && (
            <div className="relative z-50 group">
              <button
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
                onClick={() => setIsProfileOpen((s) => !s)}
                onBlur={() => setTimeout(() => setIsProfileOpen(false), 150)}
                className="flex items-center gap-2 text-white font-medium hover:text-yellow-500 transition-colors duration-200"
              >
                <User className="h-6 w-6" />
              </button>
              {/* Dropdown perfil */}
              <div
                className={`absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                  isProfileOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'
                }`}
              >
                <ul className="py-1">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
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
            className={`md:hidden w-full bg-[#24222B]/90 transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-[300px] opacity-100 py-4 px-6"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <ul className="flex flex-col gap-4 text-white text-sm">
              {role === 'OPERADOR_LABORATORIO' && (
                <>
                  <li>
                    <Link
                      to="/operador"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:text-yellow-400"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/operador/donaciones"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:text-yellow-400"
                    >
                      Donaciones
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/operador/punciones"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:text-yellow-400"
                    >
                      Punciones
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/embriones"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:text-yellow-400"
                    >
                      Listado de embriones
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/operador/fertilizaciones"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:text-yellow-400"
                    >
                      Fertilizaciones
                    </Link>
                  </li>
                </>
              )}
              <li className="pt-2 border-t border-white/20">
              </li>
            </ul>
          </article>
      </section>

      {/* Chatbot Component */}
      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </nav>
  );
}
