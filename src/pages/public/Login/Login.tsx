import { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { IntroSequence } from "../../../components/IntroSequence/IntroSequence";
import { UserSessionModel, UserSessionState } from "../../../models/UserSessionModel";
import { LoginController } from "./LoginController";
import { AuthService } from "../../../services/AuthService";
import { withAuth } from "../../../hoc/withAuth";

interface LoginProps {
    authService: AuthService;
}

interface LoginComponentState extends UserSessionState {}

class LoginComponent extends Component<LoginProps, LoginComponentState> {
    private model: UserSessionModel;
    private controller: LoginController;
    private unsubscribe: (() => void) | null = null;

    constructor(props: LoginProps) {
        super(props);
        this.model = new UserSessionModel(props.authService);
        this.controller = new LoginController(this.model);
        this.state = {
            ...this.model.getState(),
        };
    }

    componentDidMount() {
        this.unsubscribe = this.model.subscribe((state) => {
            this.setState({ ...state });
        });
    }

    componentDidUpdate(prevProps: LoginProps, prevState: LoginComponentState) {
        if (prevState.error !== this.state.error && this.state.error) {
            setTimeout(() => {
                this.controller.clearError();
            }, 2000);
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.controller.clearRegistrationSuccess();
    }

    mostrarFormularioLogin() {
        return <form onSubmit={this.controller.onSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={this.state.formData.email}
                    onChange={(e) => this.controller.onEmailChange(e.target.value)}
                    required
                    placeholder="tu@email.com"
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    value={this.state.formData.password}
                    onChange={(e) => this.controller.onPasswordChange(e.target.value)}
                    required
                    placeholder="Tu contraseña"
                />
            </div>

            <button type="submit" className={styles.submitButton}>
                Login
            </button>

            <button
                type="button"
                onClick={() => this.controller.onGuestLogin()}
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
                    <div className={`${styles["gold-line"]} ${styles["gold-line1"]}`} />
                    <div className={styles["login-content"]}>
                        <h1>Iniciar Sesión</h1>

                        {this.state.registrationSuccess && (
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
                                ¿Olvidaste tu contraseña? <Link to="/recovery-password" className={styles.link}>Recupérala aquí</Link>
                            </p>
                        </div>
                    </div>
                    <div className={`${styles["gold-line"]} ${styles["gold-line2"]}`} />
                </div>
            </div>
        );
    }
}

export const Login = withAuth(LoginComponent);
