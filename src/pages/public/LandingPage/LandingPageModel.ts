import { VirtualAssistantDialogue } from "../../../data/";

export interface LandingPageState {
    isVirtualAssistantOpen: boolean;
    modalCurrentPage: number;
    isTutorialOpen: boolean;
}

export class LandingPageModel {
    private state: LandingPageState = {
        isVirtualAssistantOpen: false,
        modalCurrentPage: 0,
        isTutorialOpen: false
    };

    private listeners: ((state: LandingPageState) => void)[] = [];

    getState(): LandingPageState {
        return { ...this.state };
    }

    subscribe(listener: (state: LandingPageState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    openModal() {
        this.state.isVirtualAssistantOpen = true;
        this.notifyListeners();
    }

    closeModal() {
        this.state.isVirtualAssistantOpen = false;
        this.state.modalCurrentPage = 0;
        this.notifyListeners();
    }

    changeModalPage(page: number) {
        if (page === -1) {
            this.closeModal();
            this.state.isTutorialOpen = true;
        } else {
            this.state.modalCurrentPage = page;
        }
        this.notifyListeners();
    }

    closeTutorial() {
        this.state.isTutorialOpen = false;
        this.notifyListeners();
    }

    getModalPages() {
        return VirtualAssistantDialogue;
    }
} 