import { AuthService } from '../services/AuthService';
import { analyticsService } from '../services/AnalyticsService';

/**
 * Interface for user form data
 */
export interface UserFormData {
    email: string;
    password: string;
    full_name?: string;
}

/**
 * Interface for user session state
 */
export interface UserSessionState {
    formData: UserFormData;
    error: string;
    registrationSuccess: boolean;
}

/**
 * Model class for handling user session state and authentication
 */
export class UserSessionModel {
    private state: UserSessionState;
    private listeners: ((state: UserSessionState) => void)[] = [];
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
        this.state = this.getInitialState();
    }

    /**
     * Get initial state for the model
     */
    private getInitialState(): UserSessionState { // M1-3 M1-90
        return {
            formData: {
                email: '',
                password: '',
                full_name: ''
            },
            error: '',
            registrationSuccess: false
        };
    }

    /**
     * Get current state
     */
    public getState(): UserSessionState { // M1-88
        return { ...this.state };
    }

    /**
     * Subscribe to state changes
     */
    public subscribe(listener: (state: UserSessionState) => void): () => void { // M1-5 M1-87
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    /**
     * Update state and notify listeners
     */
    private setState(newState: Partial<UserSessionState>): void { // M1-13 M1-21 M1-97 M1-105 M1-113 M1-132
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    }

    /**
     * Notify all listeners of state change
     */
    private notifyListeners(): void { // M1-22 M1-41 M1-50 M1-66 M1-80 M1-98 M1-106 M1-114 M1-134 M1-143 M1-159
        this.listeners.forEach(listener => listener(this.getState()));
    }

    /**
     * Update a form field value
     */
    public updateFormField(field: keyof UserFormData, value: string): void { // M1-20 M1-96 M1-104 M1-112
        this.setState({
            formData: {
                ...this.state.formData,
                [field]: value
            }
        });
    }

    /**
     * Validate form data
     */
    private validateForm(requireFullName: boolean = false): boolean { // M1-29 M1-48 M1-57 M1-121 M1-141 M1-150
        const { email, password, full_name } = this.state.formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            this.setError('Invalid email format');
            return false;
        }

        if (password.length < 8) {
            this.setError('Password must be at least 8 characters long');
            return false;
        }

        if (requireFullName && (!full_name || full_name.trim() === '')) {
            this.setError('Full name is required'); // M1-142
            return false;
        }

        return true;
    }

    /**
     * Set error message
     */
    private setError(message: string): void { // M1-49
        this.setState({ error: message });
    }

    /**
     * Handle authentication errors
     */
    private handleAuthError(err: unknown): void { // M1-65 M1-158
        const errorMessage = err instanceof Error ? err.message : 'Authentication error';
        this.setError(errorMessage);
    }

    /**
     * Login user
     */
    public async login(): Promise<void> { // M1-28 M1-47 M1-56
        if (!this.validateForm()) return;

        try {
            await this.authService.login(this.state.formData.email, this.state.formData.password);
            this.clearError();

            analyticsService.trackLogin('email');
        } catch (err) {
            this.handleAuthError(err);

            analyticsService.trackError('login_error', err instanceof Error ? err.message : 'Unknown login error');
        }
    }

    /**
     * Register new user
     */
    public async register(): Promise<void> { // M1-120 M1-140 M1-150
        if (!this.validateForm(true)) return; // M1-122

        try {
            await this.authService.register({
                email: this.state.formData.email,
                password: this.state.formData.password,
                full_name: this.state.formData.full_name || ''
            });
            this.setState({ registrationSuccess: true });
            this.clearError();

            analyticsService.trackRegister('email');
        } catch (err) {
            this.handleAuthError(err);

            analyticsService.trackError('registration_error', err instanceof Error ? err.message : 'Unknown registration error');
        }
    }

    /**
     * Login as guest
     */
    public loginAsGuest(): void { // M1-72
        try {
            this.authService.loginAsGuest();
            this.clearError();

            analyticsService.trackCustomEvent('Guest Login', {
                login_method: 'guest',
                timestamp: new Date().toISOString(),
            });
        } catch (err) {
            this.handleAuthError(err);

            analyticsService.trackError('guest_login_error', err instanceof Error ? err.message : 'Unknown guest login error');
        }
    }

    /**
     * Clear error message
     */
    public clearError(): void { // M1-36 M1-79 M1-133
        this.setState({ error: '' });
    }

    /**
     * Clear registration success state
     */
    public clearRegistrationSuccess(): void {
        this.setState({ registrationSuccess: false });
        this.authService.clearRegistrationSuccess();
    }
} 