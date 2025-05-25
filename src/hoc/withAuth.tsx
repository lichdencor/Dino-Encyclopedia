import { ComponentType } from 'react';
import { AuthContext } from '../context';
import { AuthContextService, AuthService } from '../services/AuthService';

interface WithAuthProps {
    authService: AuthService;
}

export function withAuth<P extends WithAuthProps>(WrappedComponent: ComponentType<P>) {
    return function WithAuthComponent(props: Omit<P, keyof WithAuthProps>) {
        return (
            <AuthContext.Consumer>
                {(context) => {
                    if (!context) {
                        throw new Error('AuthContext is required');
                    }
                    const authService = new AuthContextService(context);
                    return <WrappedComponent {...(props as P)} authService={authService} />;
                }}
            </AuthContext.Consumer>
        );
    };
} 