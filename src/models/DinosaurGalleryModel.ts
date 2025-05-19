import { DinosaurModel } from './PeriodModel';
import { GalleryStyles } from '../components/Gallery/types';

export class DinosaurGalleryModel {
    private _dinosaurs: DinosaurModel[];
    private _imagePrefix: string;
    private _skeletonPrefix: string;
    private _customStyles: GalleryStyles;
    private _previousPage: string;
    private _nextPage: string;
    private _era: "triassic" | "jurassic" | "cretaceous";
    private _period: "Inferior" | "Medium" | "Superior";
    private _currentIndex: number;

    constructor(
        dinosaurs: DinosaurModel[],
        imagePrefix: string,
        skeletonPrefix: string,
        customStyles: GalleryStyles,
        previousPage: string,
        nextPage: string,
        era: "triassic" | "jurassic" | "cretaceous",
        period: "Inferior" | "Medium" | "Superior"
    ) {
        this._dinosaurs = dinosaurs;
        this._imagePrefix = imagePrefix;
        this._skeletonPrefix = skeletonPrefix;
        this._customStyles = customStyles;
        this._previousPage = previousPage;
        this._nextPage = nextPage;
        this._era = era;
        this._period = period;
        this._currentIndex = 0;
    }

    get dinosaurs(): DinosaurModel[] {
        return this._dinosaurs;
    }

    get currentDinosaur(): DinosaurModel | null {
        return this._dinosaurs.length > 0 ? this._dinosaurs[this._currentIndex] : null;
    }

    get imagePrefix(): string {
        return this._imagePrefix;
    }

    get skeletonPrefix(): string {
        return this._skeletonPrefix;
    }

    get customStyles(): GalleryStyles {
        return this._customStyles;
    }

    get previousPage(): string {
        return this._previousPage;
    }

    get nextPage(): string {
        return this._nextPage;
    }

    get era(): "triassic" | "jurassic" | "cretaceous" {
        return this._era;
    }

    get period(): "Inferior" | "Medium" | "Superior" {
        return this._period;
    }

    get currentIndex(): number {
        return this._currentIndex;
    }

    nextDinosaur(): boolean {
        if (this._currentIndex < this._dinosaurs.length - 1) {
            this._currentIndex++;
            return true;
        }
        return false;
    }

    previousDinosaur(): boolean {
        if (this._currentIndex > 0) {
            this._currentIndex--;
            return true;
        }
        return false;
    }

    setCurrentDinosaur(index: number): void {
        if (index >= 0 && index < this._dinosaurs.length) {
            this._currentIndex = index;
        }
    }
} 