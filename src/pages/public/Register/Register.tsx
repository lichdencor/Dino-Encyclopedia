import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/Auth/AuthProvider';
import styles from './Register.module.css';

interface RegisterState {
  formData: {
    email: string;
    password: string;
    full_name: string;
  };
  error: string;
}

interface RegisterProps {
  navigate: (route: string) => void;
  register: (data: RegisterState['formData']) => Promise<void>;
}

export class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: '',
        full_name: '',
      },
      error: ''
    };
  }

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ error: '' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.state.formData.email)) {
      const errorEmailInvalido = 'Error email invalido';
      this.mostrarError(errorEmailInvalido);
      return;
    }

    if (this.state.formData.password.length < 8) {
      const errorPasswordInvalida = 'Error password invalida';
      this.mostrarError(errorPasswordInvalida);
      return;
    }
    
    try {
      await this.props.register(this.state.formData);
      this.props.navigate('/');
    } catch (err) {
      this.setState({ error: err instanceof Error ? err.message : 'Error en el registro' });
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value
      }
    });
  };

  mostrarError = (error: string) => {
    this.setState({ error });
  };

  mostrarFormularioRegistro = () => {
    return <div className={styles.formWrapper}>
      <h2>Registro</h2>
      {this.state.error && <p className={styles.error}>{this.state.error}</p>}
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="full_name">Nombre completo</label>
          <input
              type="text"
              id="full_name"
              name="full_name"
              value={this.state.formData.full_name}
              onChange={this.handleChange}
              required
              placeholder="Ingresa tu nombre completo"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
              type="email"
              id="email"
              name="email"
              value={this.state.formData.email}
              onChange={this.handleChange}
              required
              placeholder="Ingresa tu email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
              type="password"
              id="password"
              name="password"
              value={this.state.formData.password}
              onChange={this.handleChange}
              required
              placeholder="Ingresa tu contraseña"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Registrarse
        </button>
      </form>
      <div className={styles.loginLink}>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </div>
    </div>;
  };

  render() {
    return (
      <div className={styles.container}>
        {this.mostrarFormularioRegistro()}
      </div>
    );
  }
}

// HOC para manejar la navegación y el contexto de autenticación
export const withAuthAndNavigation = (WrappedComponent: typeof Register) => {
  return function WithAuthAndNavigationComponent() {
    const navigate = useNavigate();
    const { register } = useAuth();
    return <WrappedComponent navigate={navigate} register={register} />;
  };
};

// Exportar el componente envuelto con la navegación y autenticación
export default withAuthAndNavigation(Register); 