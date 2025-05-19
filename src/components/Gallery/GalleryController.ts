import { GalleryModel } from "./GalleryModel";

export class GalleryController {
    private model: GalleryModel;

    constructor(model: GalleryModel) {
        this.model = model;
    }

    handleDinosaurClick(index: number) {
        this.model.setSelectedDinosaur(index);
    }

    handleDinosaurHover(index: number) {
        this.model.setActiveDinosaur(index);
    }

    handleDinosaurLeave() {
        this.model.setActiveDinosaur(null);
    }

    handleModalClose() {
        this.model.closeModal();
    }
} 