import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  full_name: string;
  profile_picture?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; full_name: string }) => Promise<void>;
  logout: () => void;
  recuperarContrasenia: (email: string) => Promise<void>;
  registrationSuccess: boolean;
  clearRegistrationSuccess: () => void;
  loginAsGuest: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const profile = await authService.checkSession();
        if (profile) {
          setUser(profile);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.postLogin({ email, password });
      setUser(response.profile);
      navigate('/');
    } catch (error) {
      console.error('Error de login:', error);
      throw error;
    }
  };

  const registrar = async (data: { email: string; password: string; full_name: string }) => {
    try {
      const response = await authService.postRegistro(data);
      setUser(response.profile);
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

  const loginAsGuest = () => {
    const guestUser: User = {
      id: 'guest',
      email: 'guest@guest.com',
      full_name: 'Guest User'
    };
    setUser(guestUser);
    navigate('/');
  };

  const value = {
    user,
    isAuthenticated: !!user && user.id !== 'guest',
    login,
    register: registrar,
    logout,
    recuperarContrasenia,
    registrationSuccess,
    clearRegistrationSuccess,
    loginAsGuest,
    isLoading,
  };

  if (isLoading) {
    return <div>Loading...</div>; // O tu componente de loading personalizado
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

