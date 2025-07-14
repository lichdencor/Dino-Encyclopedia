import { AuthContext } from '../context';

const SESSION_COOKIE_NAME = 'user_session';
const COOKIE_EXPIRY_DAYS = 7;

export interface AuthService {
    login(email: string, password: string): Promise<void>;
    register(data: { email: string; password: string; full_name: string }): Promise<void>;
    loginAsGuest(): void;
    clearRegistrationSuccess(): void;
    logout(): void;
    checkSession(): boolean;
}

export class AuthContextService implements AuthService {
    private authContext: React.ContextType<typeof AuthContext>;

    constructor(authContext: React.ContextType<typeof AuthContext>) {
        if (!authContext) {
            throw new Error('AuthContext is required');
        }
        this.authContext = authContext;
        this.initializeFromCookie();
    }

    private setCookie(name: string, value: string, days: number): void {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        const secure = process.env.NODE_ENV === 'production' ? '; secure' : '';
        document.cookie = `${name}=${value}; ${expires}; path=/; samesite=strict${secure}`;
    }

    private getCookie(name: string): string | null {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    private deleteCookie(name: string): void {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    private initializeFromCookie(): void {
        const sessionData = this.getCookie(SESSION_COOKIE_NAME);
        if (sessionData) {
            try {
                const userData = JSON.parse(sessionData);
                if (userData && userData.email) {
                    this.authContext?.updateUser?.(userData);
                }
            } catch (error) {
                console.error('Error parsing session cookie:', error);
                this.clearSession();
            }
        }
    }

    private saveSession(userData: any): void {
        this.setCookie(
            SESSION_COOKIE_NAME,
            JSON.stringify(userData),
            COOKIE_EXPIRY_DAYS
        );
    }

    private clearSession(): void {
        this.deleteCookie(SESSION_COOKIE_NAME);
        this.authContext?.updateUser?.(null);
    }

    public async login(email: string, password: string): Promise<void> { // M1-30 M1-58
        if (!this.authContext) {
            throw new Error('Auth context is not available');
        }
        await this.authContext.login(email, password);
        // Después de un login exitoso, guardar en cookie
        const userData = this.authContext.user;
        if (userData) {
            this.saveSession(userData);
        }
    }

    public async register(data: { email: string; password: string; full_name: string }): Promise<void> { // M1-122 M1-151
        if (!this.authContext) {
            throw new Error('Auth context is not available');
        }
        await this.authContext.register(data);
        // No guardamos en cookie después del registro porque normalmente
        // el usuario necesita hacer login después
    }

    public loginAsGuest(): void { // M1-73
        if (!this.authContext) {
            throw new Error('Auth context is not available');
        }
        this.authContext.loginAsGuest();
        // Para usuarios invitados también guardamos la sesión
        const guestData = { isGuest: true };
        this.saveSession(guestData);
    }

    public clearRegistrationSuccess(): void {
        if (!this.authContext) {
            throw new Error('Auth context is not available');
        }
        this.authContext.clearRegistrationSuccess();
    }

    public logout(): void {
        this.clearSession();
    }

    public checkSession(): boolean {
        const sessionData = this.getCookie(SESSION_COOKIE_NAME);
        return !!sessionData;
    }
} 