import { VirtualAssistantDialogue } from "../../../data/";
import json from '../../../context/data/galleries_data.json'

export interface Gallery {
    link: string,
    image: string,
    period: string,
}

export interface LandingPageState {
    isVirtualAssistantOpen: boolean;
    modalCurrentPage: number;
    isTutorialOpen: boolean;
    galleriesData: any;
    galleries: Array<Gallery>
}

export class LandingPageModel {
    private state: LandingPageState = {
        isVirtualAssistantOpen: false,
        modalCurrentPage: 0,
        isTutorialOpen: false,
        galleriesData: this.loadGalleries(),
        galleries: [],
    };

    private listeners: ((state: LandingPageState) => void)[] = [];

    private loadGalleries(): any {
        return json['galleries'];
    }

    getState(): LandingPageState {
        return { ...this.state };
    }

    subscribe(listener: (state: LandingPageState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    getAllGalleries() {
        const eras = ['era_triassic', 'era_jurassic', 'era_cretaceous'];
        const getAllGalleries: Gallery[] = this.processEras(eras);

        this.setState({ ...this.state, galleries: getAllGalleries });
        this.notifyListeners();
    }

    private setState(state: LandingPageState) {
        this.state = state;
    }

    private processEras(eras: string[]) {
        const getAllGalleries: Gallery[] = [];
        eras.forEach(era => {
            const eraData = this.state.galleriesData[0][era];
            if (Array.isArray(eraData)) {
                eraData.forEach(period => {
                    getAllGalleries.push({
                        link: period.link,
                        image: period.image,
                        period: period.period
                    });
                });
            }
        });
        return getAllGalleries;
    }

    getCarouselLinks() {
        return this.state.galleries.map((gallery: Gallery) => gallery.link)
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    openModal() {
        this.setState({ ...this.state, isVirtualAssistantOpen: true });
        this.notifyListeners();
    }

    closeModal() {
        this.setState({ ...this.state, isVirtualAssistantOpen: false, modalCurrentPage: 0 });
        this.notifyListeners();
    }

    changeModalPage(page: number) {
        // Alt
        const openTutorial = page === -1;
        if (openTutorial) {
            this.closeModal();
            this.setState({ ...this.state, isTutorialOpen: true });
        } else {
            this.setState({ ...this.state, modalCurrentPage: page });
        }
        this.notifyListeners();
    }

    closeTutorial() {
        this.setState({ ...this.state, isTutorialOpen: false });
        this.notifyListeners();
    }

    getModalPages() {
        return VirtualAssistantDialogue;
    }
} 