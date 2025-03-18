import { useState } from "react";
import { useAuth } from "../../../hooks";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { login, register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(email, password);
            navigate("/pet-selection");
        } catch (error) {
            console.error("Error en login:", error);
        }
    };

    //TODO: Cambiar handleLogin por () => login(email, password) cuando se conecte Firebase

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Login / Register</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.loginButton} onClick={handleLogin}>
                    Login
                </button>
                <button className={styles.registerButton} onClick={() => register(email, password)}>
                    Register
                </button>
            </div>
        </div>
    );
};
