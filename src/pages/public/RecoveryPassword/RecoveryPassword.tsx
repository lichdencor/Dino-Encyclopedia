import { useState } from "react";
import { useAuth } from "../../../context/Auth/AuthProvider";
import styles from "./RecoveryPassword.module.css";
import { Link } from "react-router-dom";

export const RecoveryPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    try {
      await resetPassword(email);
      setSuccess(true);
      setEmail(""); // Limpiar el campo después del éxito
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar el correo de recuperación");
    }
  };

  return (
    <div className={styles.recoveryContainer}>
      <div className={styles.recoveryBox}>
        <h1>Recuperar Contraseña</h1>
        
        {success && (
          <div className={styles.successMessage}>
            Se ha enviado un correo con las instrucciones para recuperar tu contraseña.
            Por favor, revisa tu bandeja de entrada.
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
              placeholder="Ingresa tu email"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Enviar Instrucciones
          </button>
        </form>

        <div className={styles.links}>
          <Link to="/login" className={styles.backLink}>
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}; 