import { useState, useEffect } from "react";
import { useAuth } from "../../../context/Auth/AuthProvider";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, registrationSuccess, clearRegistrationSuccess } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Limpiar el estado de registro exitoso cuando el componente se desmonte
    return () => {
      clearRegistrationSuccess();
    };
  }, [clearRegistrationSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <button 
          className={styles.closeButton}
          onClick={() => navigate('/')}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h1>Iniciar Sesión</h1>
        
        {registrationSuccess && (
          <div className={styles.successMessage}>
            ¡Registro exitoso! Por favor, inicia sesión con tus credenciales.
          </div>
        )}
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Tu contraseña"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Iniciar Sesión
          </button>
        </form>

        <p className={styles.registerLink}>
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
        <p className={styles.recoveryLink}>
          ¿Olvidaste tu contraseña? <Link to="/recovery-password">Recupérala aquí</Link>
        </p>
      </div>
    </div>
  );
};
