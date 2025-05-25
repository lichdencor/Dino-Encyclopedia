import { UserSessionModel } from '../../../models/UserSessionModel';

export class LoginController {
    private model: UserSessionModel;

    constructor(model: UserSessionModel) {
        this.model = model;
    }

    public onEmailChange = (email: string) => {
        this.model.updateFormField('email', email);
    };

    public onPasswordChange = (password: string) => {
        this.model.updateFormField('password', password);
    };

    public onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await this.model.login();
    };

    public onGuestLogin = () => {
        this.model.loginAsGuest();
    };

    public clearRegistrationSuccess = () => {
        this.model.clearRegistrationSuccess();
    };
} 