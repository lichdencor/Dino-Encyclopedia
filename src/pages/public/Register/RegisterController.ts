import { UserSessionModel } from '../../../models/UserSessionModel';

export class RegisterController {
    private model: UserSessionModel;

    constructor(model: UserSessionModel) {
        this.model = model;
    }

    public onEmailChange = (email: string) => { // M1-103
        this.model.updateFormField('email', email);
    };

    public onPasswordChange = (password: string) => { // M1-111
        this.model.updateFormField('password', password);
    };

    public onFullNameChange = (fullName: string) => { // M1-95
        this.model.updateFormField('full_name', fullName);
    };

    public onSubmit = async (e: React.FormEvent) => { // M1-119 M1-139 M1-148
        e.preventDefault();
        await this.model.register();
    };

    public clearError = () => {
        this.model.clearError();
    };
} 