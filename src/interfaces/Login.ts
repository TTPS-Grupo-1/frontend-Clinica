export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token?: string;
}

export interface AuthContextType {
  user: LoginResponse['user'] | null;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}