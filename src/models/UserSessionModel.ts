import { AuthService } from '../services/AuthService';

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
    private getInitialState(): UserSessionState {
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
    public getState(): UserSessionState {
        return { ...this.state };
    }

    /**
     * Subscribe to state changes
     */
    public subscribe(listener: (state: UserSessionState) => void): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    /**
     * Update state and notify listeners
     */
    private setState(newState: Partial<UserSessionState>): void {
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    }

    /**
     * Notify all listeners of state change
     */
    private notifyListeners(): void {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    /**
     * Update a form field value
     */
    public updateFormField(field: keyof UserFormData, value: string): void {
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
    private validateForm(requireFullName: boolean = false): boolean {
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
            this.setError('Full name is required');
            return false;
        }

        return true;
    }

    /**
     * Set error message
     */
    private setError(message: string): void {
        this.setState({ error: message });
    }

    /**
     * Handle authentication errors
     */
    private handleAuthError(err: unknown): void {
        const errorMessage = err instanceof Error ? err.message : 'Authentication error';
        this.setError(errorMessage);
    }

    /**
     * Login user
     */
    public async login(): Promise<void> {
        if (!this.validateForm()) return;

        try {
            await this.authService.login(this.state.formData.email, this.state.formData.password);
            this.clearError();
        } catch (err) {
            this.handleAuthError(err);
        }
    }

    /**
     * Register new user
     */
    public async register(): Promise<void> {
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
            this.handleAuthError(err);
        }
    }

    /**
     * Login as guest
     */
    public loginAsGuest(): void {
        try {
            this.authService.loginAsGuest();
            this.clearError();
        } catch (err) {
            this.handleAuthError(err);
        }
    }

    /**
     * Clear error message
     */
    public clearError(): void {
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