import { AuthService } from '../services/AuthService';

export interface UserFormData {
    email: string;
    password: string;
    full_name?: string;
}

export interface UserSessionState {
    formData: UserFormData;
    error: string;
    registrationSuccess: boolean;
}

export class UserSessionModel {
    private state: UserSessionState;
    private listeners: ((state: UserSessionState) => void)[] = [];
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
        this.state = {
            formData: {
                email: '',
                password: '',
                full_name: ''
            },
            error: '',
            registrationSuccess: false
        };
    }

    public getState(): UserSessionState {
        return { ...this.state };
    }

    public subscribe(listener: (state: UserSessionState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private setState(newState: Partial<UserSessionState>) {
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    public updateFormField(field: keyof UserFormData, value: string) {
        this.setState({
            formData: {
                ...this.state.formData,
                [field]: value
            }
        });
    }

    private validateForm(requireFullName: boolean = false): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(this.state.formData.email)) {
            this.setState({ error: 'Error email invalido' });
            return false;
        }

        if (this.state.formData.password.length < 8) {
            this.setState({ error: 'Error password invalida' });
            return false;
        }

        if (requireFullName && (!this.state.formData.full_name || this.state.formData.full_name.trim() === '')) {
            this.setState({ error: 'El nombre completo es requerido' });
            return false;
        }

        return true;
    }

    public async login() {
        if (!this.validateForm()) return;

        try {
            await this.authService.login(this.state.formData.email, this.state.formData.password);
            this.clearError();
        } catch (err) {
            this.setState({ error: err instanceof Error ? err.message : 'Error al iniciar sesión' });
        }
    }

    public async register() {
        if (!this.validateForm(true)) return;

        try {
            await this.authService.register({
                email: this.state.formData.email,
                password: this.state.formData.password,
                full_name: this.state.formData.full_name || ''
            });
            this.setState({ registrationSuccess: true });
            this.clearError();
        } catch (err) {
            this.setState({ error: err instanceof Error ? err.message : 'Error en el registro' });
        }
    }

    public loginAsGuest() {
        try {
            this.authService.loginAsGuest();
            this.clearError();
        } catch (err) {
            this.setState({ error: err instanceof Error ? err.message : 'Error al iniciar sesión como invitado' });
        }
    }

    public clearError() {
        this.setState({ error: '' });
    }

    public clearRegistrationSuccess() {
        this.setState({ registrationSuccess: false });
        this.authService.clearRegistrationSuccess();
    }
} 