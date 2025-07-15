import { GalleryModel } from './GalleryModel';

export class GalleryController {
    private model: GalleryModel;

    constructor(model: GalleryModel) {
        this.model = model;
    }

    handleDinosaurClick(index: number) {
        this.model.handleDinosaurClick(index);
    }

    closeModal() {
        this.model.closeModal();
    }

    setActiveDinosaur(dinosaur: number | null) {
        this.model.setActiveDinosaur(dinosaur);
    }

    getState() {
        return this.model.getState();
    }
} 