import { useState } from "react";
import { useAuth } from "../../../hooks";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/pet-selection");
    } catch (error) {
      console.error("Error en login:", error);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      await register(email, password);
      navigate("/pet-selection");
    } catch (error) {
      console.error("Error en registro:", error);
      setError("No se pudo registrar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Login / Register</h1>
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
          className={styles.loginButton}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Login"}
        </button>
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
