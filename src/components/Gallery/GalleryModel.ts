import { DinosaurModel } from "../../models/PeriodModel";
import { GalleryStyles } from "./types";

export interface GalleryState {
    activeDinosaur: number | null;
    isModalOpen: boolean;
    selectedDinosaur: number;
}

export class GalleryModel {
    private state: GalleryState;
    private listeners: ((state: GalleryState) => void)[] = [];
    private _dinosaurs: DinosaurModel[];
    private _previousPage: string;
    private _nextPage: string;
    private _customStyles: GalleryStyles;
    private _imagePrefix: string;
    private _skeletonPrefix: string;
    private _era: "triassic" | "jurassic" | "cretaceous";
    private _period: "Inferior" | "Medium" | "Superior";

    constructor(
        dinosaurs: DinosaurModel[],
        previousPage: string,
        nextPage: string,
        customStyles: GalleryStyles,
        imagePrefix: string,
        skeletonPrefix: string,
        era: "triassic" | "jurassic" | "cretaceous",
        period: "Inferior" | "Medium" | "Superior"
    ) {
        if (!dinosaurs || dinosaurs.length === 0) {
            throw new Error('GalleryModel: dinosaurs array is required and cannot be empty');
        }

        this._dinosaurs = dinosaurs;
        this._previousPage = previousPage;
        this._nextPage = nextPage;
        this._customStyles = customStyles;
        this._imagePrefix = imagePrefix;
        this._skeletonPrefix = skeletonPrefix;
        this._era = era;
        this._period = period;

        this.state = {
            activeDinosaur: null,
            isModalOpen: false,
            selectedDinosaur: 0
        };
    }

    // Getters
    get dinosaurs(): DinosaurModel[] {
        return this._dinosaurs;
    }

    get previousPage(): string {
        return this._previousPage;
    }

    get nextPage(): string {
        return this._nextPage;
    }

    get customStyles(): GalleryStyles {
        return this._customStyles;
    }

    get imagePrefix(): string {
        return this._imagePrefix;
    }

    get skeletonPrefix(): string {
        return this._skeletonPrefix;
    }

    get era(): "triassic" | "jurassic" | "cretaceous" {
        return this._era;
    }

    get period(): "Inferior" | "Medium" | "Superior" {
        return this._period;
    }

    // State management
    getState(): GalleryState {
        return this.state;
    }

    subscribe(listener: (state: GalleryState) => void): () => void {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // Actions
    setActiveDinosaur(index: number | null) {
        this.state.activeDinosaur = index;
        this.notifyListeners();
    }

    openModal() {
        this.state.isModalOpen = true;
        this.notifyListeners();
    }

    closeModal() {
        this.state.isModalOpen = false;
        this.state.activeDinosaur = null;
        this.notifyListeners();
    }

    setSelectedDinosaur(index: number) {
        if (index >= 0 && index < this._dinosaurs.length) {
            this.state.selectedDinosaur = index;
            this.state.isModalOpen = true;
            this.notifyListeners();
        }
    }
} 