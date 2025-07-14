import { UserSessionModel } from '../../../models/UserSessionModel';

export class LoginController {
    private model: UserSessionModel;

    constructor(model: UserSessionModel) {
        this.model = model;
    }

    public onEmailChange = (email: string) => { // M1-11
        this.model.updateFormField('email', email);
    };

    public onPasswordChange = (password: string) => { // M1-19
        this.model.updateFormField('password', password);
    };

    public onSubmit = async (e: React.FormEvent) => { // M1-27 M1-46 M1-55
        e.preventDefault();
        await this.model.login();
    };

    public onGuestLogin = () => { // M1-71
        this.model.loginAsGuest();
    };

    public clearRegistrationSuccess = () => {
        this.model.clearRegistrationSuccess();
    };

    public clearError = () => {
        this.model.clearError();
    };
} 