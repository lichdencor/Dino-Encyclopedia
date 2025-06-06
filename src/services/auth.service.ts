interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  full_name: string;
  profile_picture?: string;
  rol: 'CLIENTE' | 'ADMINISTRADOR' | 'INVITADO';
}

interface LoginResponse {
  token_type: string;
  expires_in: number;
  refresh_token: string;
  profile: User;
}

interface ApiError {
  detail: string;
  code?: string;
  status?: number;
}

const API_URL = 'https://dino-encyclopedia-backend-production.up.railway.app/api/v1';

const getErrorMessage = (error: ApiError): string => {
  // Errores específicos de Firebase/Auth
  if (error.code) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Este email ya está registrado. Por favor, usa otro o inicia sesión.';
      case 'auth/invalid-email':
        return 'El formato del email no es válido.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      case 'auth/user-not-found':
        return 'No existe una cuenta con este email.';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Por favor, intenta más tarde.';
    }
  }

  // Errores específicos de validación
  if (error.detail) {
    if (error.detail.includes('full_name')) {
      return 'El nombre completo es requerido.';
    }
    if (error.detail.includes('email')) {
      return 'El email proporcionado no es válido.';
    }
    if (error.detail.includes('password')) {
      return 'La contraseña no cumple con los requisitos mínimos.';
    }
  }

  // Errores de servidor
  if (error.status) {
    switch (error.status) {
      case 400:
        return 'Los datos proporcionados no son válidos.';
      case 401:
        return 'No autorizado. Por favor, inicia sesión nuevamente.';
      case 403:
        return 'No tienes permisos para realizar esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 429:
        return 'Demasiadas solicitudes. Por favor, intenta más tarde.';
      case 500:
        return 'Error en el servidor. Por favor, intenta más tarde.';
    }
  }

  return error.detail || 'Ha ocurrido un error inesperado.';
};

export const authService = {
  async checkSession(): Promise<User | null> {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include', // Importante para las cookies
      });

      if (!response.ok) {
        if (response.status === 401) {
          return null;
        }
        const data = await response.json();
        throw {
          detail: data.detail || data.message,
          code: data.code,
          status: response.status
        };
      }

      const data = await response.json();
      return data.profile;
    } catch (error) {
      console.error('Error checking session:', error);
      return null;
    }
  },

  async postLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include', // Importante para las cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          detail: data.detail || data.message,
          code: data.code,
          status: response.status
        };
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error de conexión. Por favor, verifica tu conexión a internet.');
      }
      throw new Error(getErrorMessage(error as ApiError));
    }
  },

  async postRegistro(userData: LoginCredentials & { full_name: string }): Promise<LoginResponse> {
    try {

      console.log(userData);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include', // Importante para las cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          detail: data.detail || data.message,
          code: data.code,
          status: response.status
        };
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error de conexión. Por favor, verifica tu conexión a internet.');
      }
      throw new Error(getErrorMessage(error as ApiError));
    }
  },

  async logout(): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Importante para las cookies
      });

      if (!response.ok) {
        const data = await response.json();
        throw {
          detail: data.detail || data.message,
          code: data.code,
          status: response.status
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error al cerrar sesión. Por favor, intenta de nuevo.');
      }
      throw new Error(getErrorMessage(error as ApiError));
    }
  },

  async postRecuperarContrasenia(email: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          detail: data.detail || data.message,
          code: data.code,
          status: response.status
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error al enviar el correo de recuperación. Por favor, verifica tu conexión a internet.');
      }
      throw new Error(getErrorMessage(error as ApiError));
    }
  }
}; 