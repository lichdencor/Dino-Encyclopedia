import { LandingPageModel } from './LandingPageModel';
import {useNavigate} from "react-router-dom";

export class LandingPageController {
    private model: LandingPageModel;
    private navigate: ReturnType<typeof useNavigate>;

    constructor(model: LandingPageModel, navigate: ReturnType<typeof useNavigate>) {
        this.model = model;
        this.navigate = navigate;
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
        this.navigate('/store');
    }

    getModalPages() {
        return this.model.getModalPages();
    }
} 