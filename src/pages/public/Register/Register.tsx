// Register.tsx
import { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import { UserSessionModel, UserSessionState } from "../../../models/UserSessionModel";
import { RegisterController } from "./RegisterController";
import { AuthService } from "../../../services/AuthService";
import { withAuth } from "../../../hoc/withAuth";

interface RegisterProps {
    authService: AuthService;
}

interface RegisterComponentState extends UserSessionState { }

class RegisterComponent extends Component<RegisterProps, RegisterComponentState> {
    private model: UserSessionModel;
    private controller: RegisterController;
    private unsubscribe: (() => void) | null = null;

    constructor(props: RegisterProps) {
        super(props);
        this.model = new UserSessionModel(props.authService); // M1-85
        this.controller = new RegisterController(this.model); // M1-86
        this.state = this.model.getState();
    }

    componentDidMount() {
        this.unsubscribe = this.model.subscribe(this.listenState);
    }

    componentDidUpdate(_: RegisterProps, prevState: RegisterComponentState) {
        if (prevState.error !== this.state.error && this.state.error) {
            setTimeout(() => this.controller.clearError(), 2000);
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    listenState(state: UserSessionState) { // M1-91 M1-99 M1-107 M1-115 M1-135 M1-144 M1-159
        this.setState(state); // M1-92 M1-100 M1-108 M1-116 M1-136 M1-145 M1-160
    }

    render() {
        const { formData, error } = this.state;

        return (
            <div className={styles["login-page"]}>
                <div className={styles["login-container"]}>
                    <div className={`${styles["gold-line"]} ${styles["gold-line1"]}`} />
                    <div className={styles["login-content"]}>
                        <h1>Register</h1>
                        {error && <div className={styles.error}>{error}</div>}

                        <form onSubmit={this.controller.onSubmit} className={styles.form}>
                            <div className={styles["input-group"]}>
                                <label htmlFor="full_name">Full Name</label>
                                <input
                                    type="text"
                                    id="full_name"
                                    value={formData.full_name}
                                    onChange={(e) => this.controller.onFullNameChange(e.target.value)}
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className={styles["input-group"]}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => this.controller.onEmailChange(e.target.value)}
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
                                Register
                            </button>
                        </form>

                        <div className={styles["links-container"]}>
                            <p className={styles["login-link"]}>
                                Already have an account?{" "}
                                <Link to="/login" className={styles.link}>
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className={`${styles["gold-line"]} ${styles["gold-line2"]}`} />
                </div>
            </div>
        );
    }
}

export const Register = withAuth(RegisterComponent);
