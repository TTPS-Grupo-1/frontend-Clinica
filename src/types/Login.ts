export type UserRole = 'admin' | 'doctor' | 'directorMedico' | 'paciente' | 'operadorLaboratorio';

export type LoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  } | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
};