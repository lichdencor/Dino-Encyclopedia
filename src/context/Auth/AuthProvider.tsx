import { createContext, useContext, useState, ReactNode } from 'react';
import { authService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

interface PerfilUsuarioCliente {
  id: string;
  email: string;
  full_name: string;
}

interface AuthContextType {
  user: PerfilUsuarioCliente | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; full_name: string }) => Promise<void>;
  logout: () => void;
  recuperarContrasenia: (email: string) => Promise<void>;
  registrationSuccess: boolean;
  clearRegistrationSuccess: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PerfilUsuarioCliente | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const perfilUsuarioCliente = await authService.postLogin({ email, password });
      guardarPerfil(perfilUsuarioCliente.profile)
      navigate('/');
    } catch (error) {
      console.error('Error de login:', error);
      throw error;
    }
  };

  const registrar = async (data: { email: string; password: string; full_name: string }) => {
    try {
      const perfilUsuarioCliente = await authService.postRegistro(data);
      guardarPerfil(perfilUsuarioCliente);
      setRegistrationSuccess(true);
      navigate('/login');
    } catch (error) {
      console.error('Error de registro:', error);
      throw error;
    }
  };

  const recuperarContrasenia = async (email: string) => {
    try {
      await authService.postRecuperarContrasenia(email);
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const clearRegistrationSuccess = () => {
    setRegistrationSuccess(false);
  };

  function guardarPerfil(perfilUsuarioCliente: PerfilUsuarioCliente) {
    setUser(perfilUsuarioCliente);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register: registrar,
    logout,
    recuperarContrasenia,
    registrationSuccess,
    clearRegistrationSuccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

