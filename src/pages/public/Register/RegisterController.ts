import { UserSessionModel } from '../../../models/UserSessionModel';

export class RegisterController {
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

    public onFullNameChange = (fullName: string) => {
        this.model.updateFormField('full_name', fullName);
    };

    public onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await this.model.register();
    };
} 