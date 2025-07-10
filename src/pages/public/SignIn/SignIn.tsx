import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      await register({ email, password, full_name: "Guest User" });
      navigate("/pet-selection");
    } catch (error) {
      console.error("Error en registro:", error);
      setError("No se pudo registrar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setAnimate(false);
    setTimeout(() => {
      navigate("/login");
    }, 300);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.card} ${animate ? styles.fadeIn : styles.fadeOut}`}
      >
        <button className={styles.backButton} onClick={handleBackToLogin}>
          ← Volver al login
        </button>
        <h1>Sign In</h1>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button
          className={styles.registerButton}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Register"}
        </button>
      </div>
    </div>
  );
};
