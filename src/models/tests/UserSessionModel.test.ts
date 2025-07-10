import { UserSessionModel } from '../UserSessionModel.ts';
import { AuthService } from '../../services/AuthService.ts';

const mockAuthServiceImpl = {
    login: jest.fn(),
    register: jest.fn(),
    loginAsGuest: jest.fn(),
    clearRegistrationSuccess: jest.fn()
};

jest.mock('../../services/AuthService.ts', () => {
    return {
        AuthService: jest.fn().mockImplementation(() => mockAuthServiceImpl)
    };
});

describe('UserSessionModel', () => {
    let userSessionModel: UserSessionModel;
    let mockAuthService: jest.Mocked<typeof mockAuthServiceImpl>;

    beforeEach(() => {
        jest.clearAllMocks();
        
        mockAuthService = mockAuthServiceImpl as jest.Mocked<typeof mockAuthServiceImpl>;
        userSessionModel = new UserSessionModel(mockAuthService as unknown as AuthService);
    });

    describe('login', () => {
        it('should successfully login with valid credentials', async () => {
            userSessionModel.updateFormField('email', 'test@example.com');
            userSessionModel.updateFormField('password', 'password123');
            mockAuthService.login.mockResolvedValueOnce(undefined);

            await userSessionModel.login();

            expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(userSessionModel.getState().error).toBe('');
        });

        it('should show error with invalid email format', async () => {
            userSessionModel.updateFormField('email', 'invalid-email');
            userSessionModel.updateFormField('password', 'password123');

            await userSessionModel.login();

            expect(mockAuthService.login).not.toHaveBeenCalled();
            expect(userSessionModel.getState().error).toBe('Error email invalido');
        });

        it('should show error with short password', async () => {
            userSessionModel.updateFormField('email', 'test@example.com');
            userSessionModel.updateFormField('password', '123');

            await userSessionModel.login();

            expect(mockAuthService.login).not.toHaveBeenCalled();
            expect(userSessionModel.getState().error).toBe('Error password invalida');
        });

        it('should handle login service error', async () => {
            userSessionModel.updateFormField('email', 'test@example.com');
            userSessionModel.updateFormField('password', 'password123');
            mockAuthService.login.mockRejectedValueOnce(new Error('Service error'));

            await userSessionModel.login();

            expect(mockAuthService.login).toHaveBeenCalled();
            expect(userSessionModel.getState().error).toBe('Service error');
        });
    });

    describe('register', () => {
        it('should successfully register with valid data', async () => {
            userSessionModel.updateFormField('email', 'test@example.com');
            userSessionModel.updateFormField('password', 'password123');
            userSessionModel.updateFormField('full_name', 'Test User');
            mockAuthService.register.mockResolvedValueOnce(undefined);

            await userSessionModel.register();

            expect(mockAuthService.register).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
                full_name: 'Test User'
            });
            expect(userSessionModel.getState().error).toBe('');
            expect(userSessionModel.getState().registrationSuccess).toBe(true);
        });

        it('should show error when full name is missing', async () => {
            userSessionModel.updateFormField('email', 'test@example.com');
            userSessionModel.updateFormField('password', 'password123');
            userSessionModel.updateFormField('full_name', '');

            await userSessionModel.register();

            expect(mockAuthService.register).not.toHaveBeenCalled();
            expect(userSessionModel.getState().error).toBe('El nombre completo es requerido');
            expect(userSessionModel.getState().registrationSuccess).toBe(false);
        });

        it('should handle registration service error', async () => {
            userSessionModel.updateFormField('email', 'test@example.com');
            userSessionModel.updateFormField('password', 'password123');
            userSessionModel.updateFormField('full_name', 'Test User');
            mockAuthService.register.mockRejectedValueOnce(new Error('Registration failed'));

            await userSessionModel.register();

            expect(mockAuthService.register).toHaveBeenCalled();
            expect(userSessionModel.getState().error).toBe('Registration failed');
            expect(userSessionModel.getState().registrationSuccess).toBe(false);
        });
    });

    describe('form validation', () => {
        it('should clear error when clearError is called', () => {
            userSessionModel.updateFormField('email', 'invalid-email');
            userSessionModel.login();

            userSessionModel.clearError();

            expect(userSessionModel.getState().error).toBe('');
        });

        it('should clear registration success when clearRegistrationSuccess is called', async () => {
            userSessionModel.updateFormField('email', 'test@example.com');
            userSessionModel.updateFormField('password', 'password123');
            userSessionModel.updateFormField('full_name', 'Test User');
            mockAuthService.register.mockResolvedValueOnce(undefined);
            
            await userSessionModel.register();
            userSessionModel.clearRegistrationSuccess();

            expect(userSessionModel.getState().registrationSuccess).toBe(false);
        });
    });
}); 