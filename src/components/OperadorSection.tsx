import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface OperadorSectionProps {
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function OperadorSection({ isMobile = false, onCloseMobile }: OperadorSectionProps) {
  const [open, setOpen] = useState<null | 'donaciones' | 'criopreservacion' | 'funciones'>(null);

  if (isMobile) {
    return (
      <>
        <li>
          <button
            onClick={() => setOpen(open === 'donaciones' ? null : 'donaciones')}
            className="flex w-full items-center justify-between px-2 py-2 text-left hover:text-yellow-400"
          >
            <span>Donaciones</span>
            <ChevronRight className="h-4 w-4" />
          </button>
          {open === 'donaciones' && (
            <ul className="mt-1 ml-4 flex flex-col gap-2">
              <li>
                <Link
                  to="/operador/donaciones/semen"
                  onClick={onCloseMobile}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Semen
                </Link>
              </li>
              <li>
                <Link
                  to="/operador/donaciones/ovocitos"
                  onClick={onCloseMobile}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Ovocitos
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <button
            onClick={() => setOpen(open === 'criopreservacion' ? null : 'criopreservacion')}
            className="flex w-full items-center justify-between px-2 py-2 text-left hover:text-yellow-400"
          >
            <span>Criopreservación</span>
            <ChevronRight className="h-4 w-4" />
          </button>
          {open === 'criopreservacion' && (
            <ul className="mt-1 ml-4 flex flex-col gap-2">
              <li>
                <Link
                  to="/operador/criopreservacion/semen"
                  onClick={onCloseMobile}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Semen
                </Link>
              </li>
              <li>
                <Link
                  to="/operador/criopreservacion/ovocitos"
                  onClick={onCloseMobile}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Ovocitos
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <button
            onClick={() => setOpen(open === 'funciones' ? null : 'funciones')}
            className="flex w-full items-center justify-between px-2 py-2 text-left hover:text-yellow-400"
          >
            <span>Funciones</span>
            <ChevronRight className="h-4 w-4" />
          </button>
          {open === 'funciones' && (
            <ul className="mt-1 ml-4 flex flex-col gap-2">
              <li>
                <Link
                  to="/operador/punciones"
                  onClick={onCloseMobile}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Punciones
                </Link>
              </li>
              <li>
                <Link
                  to="/operador/transferencias"
                  onClick={onCloseMobile}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Transferencias
                </Link>
              </li>
              <li>
                <Link
                  to="/operador/fertilizaciones"
                  onClick={onCloseMobile}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Fertilizaciones
                </Link>
              </li>
            </ul>
          )}
        </li>
      </>
    );
  }

  // Desktop: three separate dropdown buttons, only one open at a time (controlled by `open`)
  return (
    <div className="flex items-center gap-4">
      {/* Donaciones dropdown */}
      <div className="relative">
        <button
          aria-haspopup="true"
          aria-expanded={open === 'donaciones'}
          onClick={() => setOpen(open === 'donaciones' ? null : 'donaciones')}
          onMouseEnter={() => setOpen('donaciones')}
          onMouseLeave={() => setOpen(null)}
          className="flex items-center gap-2 font-medium text-white transition-colors duration-200 hover:text-yellow-500"
        >
          <ChevronRight className="ml-1 h-4 w-4 text-white" />
          Donaciones
        </button>

        <div
          onMouseEnter={() => setOpen('donaciones')}
          onMouseLeave={() => setOpen(null)}
          className={`ring-opacity-5 absolute right-0 top-full mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black transition-all duration-200 ${
            open === 'donaciones' ? 'visible scale-100 transform opacity-100' : 'invisible scale-95 transform opacity-0'
          }`}
        >
          <div className="p-3">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/operador/donaciones"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Donaciones (resumen)
                </Link>
              </li>
              <li>
                <Link
                  to="/operador/donaciones/semen"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Semen
                </Link>
              </li>
              <li>
                <Link
                  to="/operador/donaciones/ovocitos"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Ovocitos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Criopreservación dropdown */}
      <div className="relative">
        <button
          aria-haspopup="true"
          aria-expanded={open === 'criopreservacion'}
          onClick={() => setOpen(open === 'criopreservacion' ? null : 'criopreservacion')}
          onMouseEnter={() => setOpen('criopreservacion')}
          onMouseLeave={() => setOpen(null)}
          className="flex items-center gap-2 font-medium text-white transition-colors duration-200 hover:text-yellow-500"
        >
          <ChevronRight className="ml-1 h-4 w-4 text-white" />
          Criopreservación
        </button>

        <div
          onMouseEnter={() => setOpen('criopreservacion')}
          onMouseLeave={() => setOpen(null)}
          className={`ring-opacity-5 absolute right-0 top-full mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black transition-all duration-200 ${
            open === 'criopreservacion' ? 'visible scale-100 transform opacity-100' : 'invisible scale-95 transform opacity-0'
          }`}
        >
          <div className="p-3">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/operador/criopreservacion"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Criopreservación (resumen)
                </Link>
              </li>
              <li>
                <Link
                  to="/operador/criopreservacion/semen"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Semen
                </Link>
              </li>
              <li>
                <Link
                  to="/operador/criopreservacion/ovocitos"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Ovocitos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Funciones dropdown */}
      <div className="relative">
        <button
          aria-haspopup="true"
          aria-expanded={open === 'funciones'}
          onClick={() => setOpen(open === 'funciones' ? null : 'funciones')}
          onMouseEnter={() => setOpen('funciones')}
          onMouseLeave={() => setOpen(null)}
          className="flex items-center gap-2 font-medium text-white transition-colors duration-200 hover:text-yellow-500"
        >
          <ChevronRight className="ml-1 h-4 w-4 text-white" />
          Funciones
        </button>

        <div
          onMouseEnter={() => setOpen('funciones')}
          onMouseLeave={() => setOpen(null)}
          className={`ring-opacity-5 absolute right-0 top-full mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black transition-all duration-200 ${
            open === 'funciones' ? 'visible scale-100 transform opacity-100' : 'invisible scale-95 transform opacity-0'
          }`}
        >
          <div className="p-3">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/operador/punciones"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Punciones
                </Link>
              </li>
              <li>
                <Link
                  to="/operador/transferencias"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Transferencias
                </Link>
              </li>
              <li>
                <Link
                  to="/operador/fertilizaciones"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Fertilizaciones
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
