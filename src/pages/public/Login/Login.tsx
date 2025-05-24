import { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";
import styles from "./Login.module.css";
import { IntroSequence } from "../../../components/IntroSequence/IntroSequence";

interface LoginState {
    email: string;
    password: string;
    error: string;
}

export class Login extends Component<{}, LoginState> {
    static contextType = AuthContext;
    declare context: React.ContextType<typeof AuthContext>;

    state: LoginState = {
        email: "",
        password: "",
        error: ""
    };

    componentWillUnmount() {
        this.context.clearRegistrationSuccess();
    }

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        this.setState({ error: "" });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.state.email)) {
            const errorEmailInvalido = 'Error email invalido';
            this.mostrarError(errorEmailInvalido);
            return;
        }

        if (this.state.password.length < 8) {
            const errorPasswordInvalida = 'Error password invalida';
            this.mostrarError(errorPasswordInvalida);
            return;
        }

        try {
            if (!this.context) {
                throw new Error('Auth context is not available');
            }
            await this.context.login(this.state.email, this.state.password);
        } catch (err) {
            this.setState({ error: err instanceof Error ? err.message : "Error al iniciar sesión" });
        }
    };

    mostrarError(error: string) {
        this.setState({ error });
    }

    mostrarFormularioLogin() {
        return <form onSubmit={this.handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    required
                    placeholder="tu@email.com"
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    value={this.state.password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    required
                    placeholder="Tu contraseña"
                />
            </div>

            <button type="submit" className={styles.submitButton}>
                Login
            </button>

            <button
                type="button"
                onClick={() => {
                    if (this.context) {
                        this.context.loginAsGuest();
                    }
                }}
                className={styles.guestButton}
            >
                Guest
            </button>
        </form>;
    }

    render() {
        return (
            <div className={styles["login-page"]}>
                <IntroSequence />
                <div className={styles["login-container"]}>
                    <div className={`${styles["gold-line"]} ${styles["gold-line1"]
                        }`} />
                    <div className={styles["login-content"]}>
                        <h1>Iniciar Sesión</h1>

                        {this.context?.registrationSuccess && (
                            <div className={styles.successMessage}>
                                ¡Registro exitoso! Por favor, inicia sesión con tus credenciales.
                            </div>
                        )}

                        {this.state.error && <div className={styles.error}>{this.state.error}</div>}

                        {this.mostrarFormularioLogin()}

                        <div className={styles["links-container"]}>
                            <p className={styles["register-link"]}>
                                ¿No tienes una cuenta? <Link to="/register" className={styles.link}>Regístrate aquí</Link>
                            </p>
                            <p className={styles["recovery-link"]}>
                                ¿Olvidaste tu contraseña? <Link to="/recovery-password" className={styles.link}>Recupérala aquí</Link >
                            </p>
                        </div>
                    </div>
                    <div className={`${styles["gold-line"]} ${styles["gold-line2"]
                        }`} />
                </div>
            </div>
        );
    }
}
