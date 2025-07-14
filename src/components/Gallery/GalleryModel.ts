import { GalleryStyles } from "./types";
import { DinosaurInfo as PeriodDinosaurInfo, SubPeriodModel } from "../../models/PeriodModel";
import { DinosaurInfo as XRayDinosaurInfo } from "../XRay/types";

export interface GalleryState {
    activeDinosaur: number | null;
    isModalOpen: boolean;
    selectedDinosaur: number;
    customStyles: GalleryStyles;
    previousPage: string;
    nextPage: string;
    dinosaurNames: string[];
    currentDinosaurInfo: XRayDinosaurInfo;
    era: "triassic" | "jurassic" | "cretaceous";
    period: "Inferior" | "Medium" | "Superior";
    dinosaurImage: string;
    dinosaurBone: string;
}

export class GalleryModel {
    private state: GalleryState;
    private listeners: ((state: GalleryState) => void)[] = [];

    constructor(
        private subPeriodModel: SubPeriodModel,
        private customStyles: GalleryStyles,
        private previousPage: string,
        private nextPage: string,
        private imagePrefix: string,
        private skeletonPrefix: string,
        private era: "triassic" | "jurassic" | "cretaceous",
        private period: "Inferior" | "Medium" | "Superior"
    ) {
        const dinosaurs = this.subPeriodModel.dinosaurs;
        this.state = {
            activeDinosaur: null,
            isModalOpen: false,
            selectedDinosaur: 0,
            customStyles: this.customStyles,
            previousPage: this.previousPage,
            nextPage: this.nextPage,
            dinosaurNames: dinosaurs.map(dino => dino.info.name),
            currentDinosaurInfo: this.adaptDinosaurInfo(dinosaurs[0].info),
            era: this.era,
            period: this.period,
            dinosaurImage: `${this.imagePrefix}${dinosaurs[0].info.name}.png`,
            dinosaurBone: `${this.skeletonPrefix}${dinosaurs[0].info.name}.png`
        };
    }

    private adaptDinosaurInfo(info: PeriodDinosaurInfo): XRayDinosaurInfo {
        return {
            name: info.name,
            nombreCientifico: info.scientific_name,
            altura: info.height,
            peso: info.weight,
            clasificacion: info.classification,
            dieta: info.diet_type,
            velocidad: info.speed,
            caracteristicas: info.special_features,
            naturaleza: info.defense_attack_mechanism,
            fosiles: info.fossils_found_in,
            sociabilidad: info.social_behaviour,
            relacionEvolutiva: info.evolutionary_relationship
        };
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }

    subscribe(listener: (state: GalleryState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    getState(): GalleryState {
        return { ...this.state };
    }

    private updateDinosaurData(index: number) {
        const dinosaurs = this.subPeriodModel.dinosaurs;
        const dinosaur = dinosaurs[index];
        this.setState({
            ...this.state,
            dinosaurImage: `${this.imagePrefix}${dinosaur.info.name}.png`,
            dinosaurBone: `${this.skeletonPrefix}${dinosaur.info.name}.png`,
            currentDinosaurInfo: this.adaptDinosaurInfo(dinosaur.info)
        });
    }

    setState(state: GalleryState) {
        this.state = state;
        this.notifyListeners();
    }

    setActiveDinosaur(dinosaur: number | null) {
        this.setState({
            ...this.state,
            activeDinosaur: dinosaur
        });
    }

    setIsModalOpen(isOpen: boolean) {
        this.setState({
            ...this.state,
            isModalOpen: isOpen
        });
    }

    setSelectedDinosaur(index: number) {
        this.updateDinosaurData(index);
        this.setState({
            ...this.state,
            selectedDinosaur: index
        });
    }

    handleDinosaurClick(index: number) {
        this.setSelectedDinosaur(index);
        this.setIsModalOpen(true);
    }

    closeModal() {
        this.setIsModalOpen(false);
        this.setSelectedDinosaur(0);
    }
} 