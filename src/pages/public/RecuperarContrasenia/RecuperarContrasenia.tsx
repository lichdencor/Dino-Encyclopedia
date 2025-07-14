import { Component } from "react";
import { AuthContext } from "../../../context";
import styles from "./RecuperarContrasenia.module.css";
import { Link } from "react-router-dom";

interface RecuperarContraseniaState {
    email: string;
    error: string;
    success: boolean;
}

export class RecuperarContrasenia extends Component<{}, RecuperarContraseniaState> {
    static contextType = AuthContext;
    declare context: React.ContextType<typeof AuthContext>;

    constructor(props: {}) {
        super(props);
        this.setState({
            email: "",
            error: "",
            success: false
        });
    }

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // M1-171 M1-181 M1-191
        this.setState({ error: "", success: false }); // M1-172 M1-182 M1-192

        try {
            if (!this.context) {
                throw new Error('Auth context is not available');
            }
            await this.context.recuperarContrasenia(this.state.email);
            this.setState({ success: true, email: "" }); // M1-178
        } catch (err) {
            this.setState({
                error: err instanceof Error ? err.message : "Error al enviar el correo de recuperación"
            }); // M1-188 M1-198. Está puesto el mismo error para cuando el formato del mail es inválido y cuando no existe una cuenta con ese mail.
        }
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // M1-167
        this.setState({ email: e.target.value }); // M1-164 M1-168
    };

    mostrarFormularioRecuperarContrasenia() {
        return <form onSubmit={this.handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                    placeholder="Ingresa tu email"
                />
            </div>

            <button type="submit" className={styles.submitButton}>
                Enviar Instrucciones
            </button>
        </form>;
    }

    mostrarMensajeVerificarEmail() {
        return <div className={styles.successMessage}>
            Se ha enviado un correo con las instrucciones para recuperar tu contraseña.
            Por favor, revisa tu bandeja de entrada.
        </div>;
    }

    render() {
        return (
            <div className={styles.recoveryContainer}>
                <div className={styles.recoveryBox}>
                    <h1>Recuperar Contraseña</h1>

                    {this.state.success && this.mostrarMensajeVerificarEmail()}

                    {this.state.error && <div className={styles.error}>{this.state.error}</div>}

                    {this.mostrarFormularioRecuperarContrasenia()}

                    <div className={styles.links}>
                        <Link to="/login" className={styles.backLink}>
                            Volver al inicio de sesión
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
} 