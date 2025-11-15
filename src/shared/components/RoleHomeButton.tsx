import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface Props {
  rol?: string | null; // optional override
  label?: string;
  className?: string;
}

/**
 * RoleHomeButton
 * - If `rol` prop is provided it will be used to determine destination.
 * - Otherwise it reads `auth.user.rol` from the redux store.
 * - Maps common role values to their home routes and navigates there on click.
 *
 * Usage:
 * <RoleHomeButton />                 // reads current user role from store
 * <RoleHomeButton rol="paciente" /> // override role
 */
export default function RoleHomeButton({ rol: rolProp = null, label = 'Volver al inicio', className = '' }: Props) {
  const navigate = useNavigate();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const rol = (rolProp || authUser?.rol || '').toString().toLowerCase();

  const roleToPath: Record<string, string> = {
    'admin': '/admin/home',
    'doctor': '/medico/home',
    'medico': '/medico/home',
    'directormedico': '/medico/home',
    'paciente': '/pacientes/home',
    'operador_laboratorio': '/operador',
    'operador': '/operador',
  };

  const destination = roleToPath[rol] || '/';

  const handleClick = () => {
    navigate(destination);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      // position absolute so it sits inside a relative parent (e.g. the page card)
      // transparent background, light-blue text, arrow inherits color via currentColor
      className={`absolute top-4 left-4 z-20 px-3 py-2 rounded-md text-blue-500 bg-transparent border border-transparent hover:bg-blue-50/40 flex items-center ${className}`}
    >
      {/* Left arrow icon */}
      <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="text-blue-500 font-medium">{label}</span>
    </button>
  );
}
