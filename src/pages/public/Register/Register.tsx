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
        this.model = new UserSessionModel(props.authService);
        this.controller = new RegisterController(this.model);
        this.state = {
            ...this.model.getState(),
        };
    }

    componentDidMount() {
        this.unsubscribe = this.model.subscribe((state) => {
            this.setState({ ...state });
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    renderRegisterForm() {
        return (
            <div className={styles["login-content"]}>
                <h1>Register</h1>
                {this.state.error && <div className={styles.error}>{this.state.error}</div>}
                <form onSubmit={(e) => this.controller.onSubmit(e)} className={styles.form}>
                    <div className={styles["input-group"]}>
                        <label htmlFor="full_name">Full Name</label>
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            value={this.state.formData.full_name}
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
                            name="email"
                            value={this.state.formData.email}
                            onChange={(e) => this.controller.onEmailChange(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className={styles["input-group"]}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={this.state.formData.password}
                            onChange={(e) => this.controller.onPasswordChange(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className={styles["submit-button"]}>
                        Sign Up
                    </button>
                </form>

                <div className={styles["links-container"]}>
                    <p className={styles["register-link"]}>
                        Already have an account?{" "}
                        <Link to="/login" className={styles.link}>
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={styles["login-page"]}>
                <div className={styles["login-container"]}>
                    <div className={`${styles["gold-line"]} ${styles["gold-line1"]}`} />
                    {this.renderRegisterForm()}
                    <div className={`${styles["gold-line"]} ${styles["gold-line2"]}`} />
                </div>
            </div>
        );
    }
}

export const Register = withAuth(RegisterComponent);
