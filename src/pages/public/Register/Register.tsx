import { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import { UserSessionModel, UserSessionState } from '../../../models/UserSessionModel';
import { RegisterController } from './RegisterController';
import { AuthService } from '../../../services/AuthService';
import { withAuth } from '../../../hoc/withAuth';

interface RegisterProps {
    authService: AuthService;
}

interface RegisterComponentState extends UserSessionState {}

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
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    mostrarFormularioRegistro() {

        return <div className={styles.formWrapper}>
            <h2>Registro</h2>
            {this.state.error && <p className={styles.error}>{this.state.error}</p>}
            <form onSubmit={(e) => this.controller.onSubmit(e)} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="full_name">Nombre completo</label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={this.state.formData.full_name}
                        onChange={(e) => this.controller.onFullNameChange(e.target.value)}
                        required
                        placeholder="Ingresa tu nombre completo"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={this.state.formData.email}
                        onChange={(e) => this.controller.onEmailChange(e.target.value)}
                        required
                        placeholder="Ingresa tu email"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.formData.password}
                        onChange={(e) => this.controller.onPasswordChange(e.target.value)}
                        required
                        placeholder="Ingresa tu contraseña"
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Registrarse
                </button>
            </form>
            <div className={styles.loginLink}>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </div>
        </div>;
    }

    render() {
        return (
            <div className={styles.container}>
                {this.mostrarFormularioRegistro()}
            </div>
        );
    }
}

export const Register = withAuth(RegisterComponent); 