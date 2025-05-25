import { AuthContext } from '../context';

export interface AuthService {
    login(email: string, password: string): Promise<void>;
    register(data: { email: string; password: string; full_name: string }): Promise<void>;
    loginAsGuest(): void;
    clearRegistrationSuccess(): void;
}

export class AuthContextService implements AuthService {
    private authContext: React.ContextType<typeof AuthContext>;

    constructor(authContext: React.ContextType<typeof AuthContext>) {
        if (!authContext) {
            throw new Error('AuthContext is required');
        }
        this.authContext = authContext;
    }

    public async login(email: string, password: string): Promise<void> {
        if (!this.authContext) {
            throw new Error('Auth context is not available');
        }
        await this.authContext.login(email, password);
    }

    public async register(data: { email: string; password: string; full_name: string }): Promise<void> {
        if (!this.authContext) {
            throw new Error('Auth context is not available');
        }
        await this.authContext.register(data);
    }

    public loginAsGuest(): void {
        if (!this.authContext) {
            throw new Error('Auth context is not available');
        }
        this.authContext.loginAsGuest();
    }

    public clearRegistrationSuccess(): void {
        if (!this.authContext) {
            throw new Error('Auth context is not available');
        }
        this.authContext.clearRegistrationSuccess();
    }
} 