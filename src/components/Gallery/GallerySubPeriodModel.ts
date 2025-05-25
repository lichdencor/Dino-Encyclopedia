import { SubPeriodModel } from "../../models/PeriodModel";
import { GalleryStyles } from "./types";

export class GallerySubPeriodModel {
    constructor(
        private model: SubPeriodModel,
        private previousPage: string,
        private nextPage: string,
        private customStyles: GalleryStyles,
        private imagePrefix: string,
        private skeletonPrefix: string,
        private era: "triassic" | "jurassic" | "cretaceous",
        private period: "Inferior" | "Medium" | "Superior"
    ) {}

    getCustomStyles() {
        return this.customStyles;
    }

    getPreviousPage() {
        return this.previousPage;
    }

    getNextPage() {
        return this.nextPage;
    }

    getImagePrefix() {
        return this.imagePrefix;
    }

    getSkeletonPrefix() {
        return this.skeletonPrefix;
    }

    getDinosaursInfo() {
        return this.model.dinosaurs.map(dino => dino.info);
    }

    getEra() {
        return this.era;
    }

    getPeriod() {
        return this.period;
    }

    getDinosaurInfo(index: number) {
        return this.model.dinosaurs[index].info;
    }

    getDinosaurImage(index: number) {
        return `${this.imagePrefix}${this.model.dinosaurs[index].info.name}.png`;
    }

    getDinosaurBone(index: number) {
        return `${this.skeletonPrefix}${this.model.dinosaurs[index].info.name}.png`;
    }

    getDinosaurNames() {
        return this.model.dinosaurs.map(dino => dino.info.name);
    }

    getModel() {
        return this.model;
    }
} 