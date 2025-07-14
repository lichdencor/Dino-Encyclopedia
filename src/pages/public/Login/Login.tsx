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

interface LoginComponentState extends UserSessionState { }

class LoginComponent extends Component<LoginProps, LoginComponentState> {
    private model: UserSessionModel;
    private controller: LoginController;
    private unsubscribe: (() => void) | null = null;

    constructor(props: LoginProps) {
        super(props);
        this.model = new UserSessionModel(props.authService); // M1-2
        this.controller = new LoginController(this.model); // M1-4
        this.setState(this.model.getState()); // M1-6 M1-8 
    }

    componentDidMount() {
        this.unsubscribe = this.model.subscribe(this.listenState);
    }

    componentDidUpdate(_prevProps: LoginProps, prevState: LoginComponentState) {
        if (prevState.error !== this.state.error && this.state.error) {
            setTimeout(() => this.controller.clearError(), 2000);
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.controller.clearRegistrationSuccess();
    }

    listenState(state: UserSessionState) { // M1-15 M1-23 M1-42 M1-51 M1-67 M1-81
        this.setState(state); // M1-16 M1-24 M1-43 M1-52 M1-68 M1-82
    }

    render() {
        const { formData, registrationSuccess, error } = this.state;

        return (
            <div className={styles["login-page"]}>
                <IntroSequence />
                <div className={styles["login-container"]}>
                    <div className={`${styles["gold-line"]} ${styles["gold-line1"]}`} />
                    <div className={styles["login-content"]}>
                        <h1>Login</h1>

                        {registrationSuccess && (
                            <div className={styles.successMessage}>
                                Registration successful! Please login with your credentials.
                            </div>
                        )}

                        {error && <div className={styles.error}>{error}</div>}

                        <form onSubmit={this.controller.onSubmit} className={styles.form}>
                            <div className={styles["input-group"]}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => this.controller.onEmailChange(e.target.value)} // M1-10
                                    required
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className={styles["input-group"]}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) => this.controller.onPasswordChange(e.target.value)}
                                    required
                                    placeholder="Your password"
                                />
                            </div>

                            <button type="submit" className={styles["submit-button"]}>
                                Login
                            </button>

                            <button
                                type="button"
                                onClick={() => this.controller.onGuestLogin()}
                                className={styles["guest-button"]}
                            >
                                Guest
                            </button>
                        </form>

                        <div className={styles["links-container"]}>
                            <p className={styles["register-link"]}>
                                Don't have an account? <Link to="/register" className={styles.link}>Register here</Link>
                            </p>
                            <p className={styles["recovery-link"]}>
                                Forgot your password? <Link to="/recovery-password" className={styles.link}>Recover it here</Link>
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
