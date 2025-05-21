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
        galleriesData: json['galleries'],
        galleries: [],
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

    getAllGalleries(){
        const getAllGalleries: any[] = [];
        Object.values(this.state.galleries[0]).forEach((eraArray: any)=> {
            eraArray.forEach((item: any) => {
                getAllGalleries.push(item);
            })
        } )
        this.state.galleries = getAllGalleries;
    }

    getCarouselLinks(){        
        return this.state.galleries.map((gallery: Gallery) => gallery.link)
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