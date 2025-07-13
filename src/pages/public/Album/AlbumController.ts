import { AlbumModel } from './AlbumModel';
import { Sticker } from '../../../types/album';

export class AlbumController {
    private model: AlbumModel;

    constructor(model: AlbumModel) {
        this.model = model;

        // Bind methods to preserve 'this' context
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleStickerDragStart = this.handleStickerDragStart.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handlePageNavigation = this.handlePageNavigation.bind(this);
        this.getStickerImageById = this.getStickerImageById.bind(this);
    }

    public handleMouseMove(e: MouseEvent) { // M5-36
        if (this.model.getState().draggingSticker) {
            this.model.setMousePosition(e.clientX, e.clientY);
        }
    }

    public handleMouseUp() { // M5-71
        this.model.stopDraggingSticker();
    }

    public handleStickerDragStart(e: React.MouseEvent, sticker: Sticker) { // M5-25
        e.preventDefault();
        this.model.startDraggingSticker(sticker);
        this.model.setMousePosition(e.clientX, e.clientY);
    }

    public handleDrop(slotId: string) { // M5-43 M5-61
        const { draggingSticker, pages, currentPage } = this.model.getState();
        if (draggingSticker) {
            const slot = pages[currentPage].slots.find(s => s.id === slotId);
            if (this.model.isSlotAvailable(slot)) {
                this.model.putStickerOnSlot(slotId);
            }
            this.model.stopDraggingSticker();
        }
    }

    public handlePageNavigation(direction: 'next' | 'previous') { // M5-11
        const { currentPage } = this.model.getState();
        const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        this.model.navigateToPage(newPage);
    }

    public getStickerImageById(id: string): string {
        return this.model.getStickerImageById(id);
    }

    public handleNextStickerPage = () => { // M5-18
        this.model.nextStickerPage();
    }

    public handlePreviousStickerPage = () => {
        this.model.previousStickerPage();
    }

    public handleCheat = () => {
        this.model.cheatPlaceAllStickers();
    }
} 