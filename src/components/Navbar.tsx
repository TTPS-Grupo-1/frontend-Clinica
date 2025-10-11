import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, User } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../store/authSlice';


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Only one dropdown open at a time: 'embriones', 'donaciones', 'profile', or null
  const [openDropdown, setOpenDropdown] = useState<null | 'embriones' | 'donaciones' | 'profile'>(null);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-[#24222B]/35 backdrop-blur-sm transition-transform duration-300"
      style={{ minHeight: "60px" }}
    >
      <section className="flex items-center justify-between w-full px-4 py-3">
        {/* Logo: inline medical icon (clickable) */}
        <button
          aria-label="Ir al inicio"
          onClick={() => navigate('/')}
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

        {/* Enlaces en escritorio (dropdown) */}
        <section className="hidden md:flex items-center gap-5 afacad-bold text-base text-[#CDA053]">
          {/* Embriones Dropdown */}
          <div className="relative z-50 group">
            <button
              aria-haspopup="true"
              aria-expanded={openDropdown === 'embriones'}
              onClick={() => setOpenDropdown(openDropdown === 'embriones' ? null : 'embriones')}
              onMouseEnter={() => setOpenDropdown('embriones')}
              onMouseLeave={() => setOpenDropdown(null)}
              className="flex items-center gap-2 text-white font-medium hover:text-yellow-500 transition-colors duration-200"
            >
              <ChevronRight className="ml-1 h-4 w-4 text-white" />
              Embriones
            </button>
            {/* Dropdown panel */}
            <div
              onMouseEnter={() => setOpenDropdown('embriones')}
              onMouseLeave={() => setOpenDropdown(null)}
              className={`absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                openDropdown === 'embriones' ? 'opacity-100 visible transform scale-100' : 'opacity-0 invisible transform scale-95'
              }`}
            >
              <ul className="py-1">
                <li>
                  <Link
                    to="/embriones"
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    Listado de embriones
                  </Link>
                </li>
                {/* Puedes añadir más opciones aquí */}
              </ul>
            </div>
          </div>
          {/* Operador Dropdown */}
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
              className={`absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
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
              </ul>
            </div>
          </div>
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
                      onClick={() => {
                        dispatch(logout());
                        setIsProfileOpen(false);
                        navigate('/login');
                      }}
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
              ? "max-h-[200px] opacity-100 py-4 px-6"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <ul className="flex flex-col gap-4 text-white text-sm">
            <li>
              <Link
                to="/embriones"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-yellow-400"
              >
                Embriones
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
            <li className="pt-2 border-t border-white/20">
            </li>
          </ul>
        </article>
      </section>
    </nav>
  );
}
