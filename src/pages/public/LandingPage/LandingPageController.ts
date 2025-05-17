import { LandingPageModel } from './LandingPageModel';
import {useNavigate} from "react-router-dom";

export class LandingPageController {
    private model: LandingPageModel;

    constructor(model: LandingPageModel) {
        this.model = model;
    }

    handleOpenModal() {
        this.model.openModal();
    }

    handleCloseModal() {
        this.model.closeModal();
    }

    handleChangeModalPage(page: number) {
        this.model.changeModalPage(page);
    }

    handleCloseTutorial() {
        this.model.closeTutorial();
    }

    handleNavigateToStore() {
        const navigate = useNavigate();
        navigate('/store');
    }

    getModalPages() {
        return this.model.getModalPages();
    }
} 