import { createContext, useContext, useState, ReactNode } from 'react';
import { authService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  full_name: string;
  profile_picture?: string;
  rol: 'CLIENTE' | 'ADMINISTRADOR' | 'INVITADO';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; full_name: string }) => Promise<void>;
  logout: () => void;
  recuperarContrasenia: (email: string) => Promise<void>;
  registrationSuccess: boolean;
  clearRegistrationSuccess: () => void;
  loginAsGuest: () => void;
  isLoading: boolean;
  updateUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

const STORAGE_KEY = 'dino_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (!storedUser) return null;
      
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.rol === 'INVITADO') {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsedUser;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser && newUser.rol !== 'INVITADO') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.postLogin({ email, password });
      updateUser(response.profile);
      navigate('/');
    } catch (error) {
      console.error('Error de login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registrar = async (data: { email: string; password: string; full_name: string }) => {
    try {
      setIsLoading(true);
      const response = await authService.postRegistro(data);
      updateUser(response.profile);
      setRegistrationSuccess(true);
      navigate('/login');
    } catch (error) {
      console.error('Error de registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const recuperarContrasenia = async (email: string) => {
    try {
      setIsLoading(true);
      await authService.postRecuperarContrasenia(email);
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      updateUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      updateUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearRegistrationSuccess = () => {
    setRegistrationSuccess(false);
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      id: 'guest',
      email: 'guest@guest.com',
      full_name: 'Guest User',
      rol: 'INVITADO'
    };
    setUser(guestUser);
    navigate('/');
  };

  const value = {
    user,
    isAuthenticated: !!user && user.id !== 'guest',
    isGuest: !!user && user.rol === 'INVITADO',
    isAdmin: !!user && user.rol === 'ADMINISTRADOR',
    login,
    register: registrar,
    logout,
    recuperarContrasenia,
    registrationSuccess,
    clearRegistrationSuccess,
    loginAsGuest,
    isLoading,
    updateUser
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

