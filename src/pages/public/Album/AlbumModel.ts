import { AlbumPage, Slot, Sticker, TemplateType } from '../../../types/album';

export interface AlbumState {
    currentPage: number;
    pages: AlbumPage[];
    stickers: Sticker[];
    draggingSticker: Sticker | null;
    mousePos: { x: number; y: number };
    currentStickerPage: number;
    stickersPerPage: number;
}

export class AlbumModel {
    private state: AlbumState;
    private listeners: ((state: AlbumState) => void)[] = [];

    constructor() {
        this.state = {
            currentPage: 0,
            currentStickerPage: 0,
            stickersPerPage: 10,
            pages: [
                {
                    id: 'page-1',
                    templateType: TemplateType.TEMPLATE_1,
                    slots: [
                        { id: 'slot-1-1', occupied: false,  },
                        { id: 'slot-1-2', occupied: false },
                        { id: 'slot-1-3', occupied: false },
                        { id: 'slot-1-4', occupied: false },
                        { id: 'slot-1-5', occupied: false },
                        { id: 'slot-1-6', occupied: false },
                        { id: 'slot-1-7', occupied: false },
                        { id: 'slot-1-8', occupied: false },
                        { id: 'slot-1-9', occupied: false },
                        { id: 'slot-1-10', occupied: false },
                        { id: 'slot-1-11', occupied: false },
                    ],
                    infoText: "Los dinosaurios más grandes..."
                },
                {
                    id: 'page-2',
                    templateType: TemplateType.TEMPLATE_2,
                    slots: [
                        { id: 'slot-2-1', occupied: false },
                        { id: 'slot-2-2', occupied: false },
                        { id: 'slot-2-3', occupied: false },
                        { id: 'slot-2-4', occupied: false },
                        { id: 'slot-2-5', occupied: false },
                        { id: 'slot-2-6', occupied: false },
                        { id: 'slot-2-7', occupied: false },
                        { id: 'slot-2-8', occupied: false },
                    ],
                    infoText: "Los dinosaurios carnívoros..."
                },
                {
                    id: 'page-3',
                    templateType: TemplateType.TEMPLATE_3,
                    slots: [
                        { id: 'slot-3-1', occupied: false, stickerId: "cr-1-Gallimimus" },
                        { id: 'slot-3-2', occupied: false },
                        { id: 'slot-3-3', occupied: false },
                        { id: 'slot-3-4', occupied: false },
                        { id: 'slot-3-5', occupied: false },
                        { id: 'slot-3-6', occupied: false },
                        { id: 'slot-3-7', occupied: false },
                    ],
                    infoText: "Los dinosaurios voladores..."
                }
            ],  
            stickers: [
                { id: 'cr-1-Gallimimus', image: "/public/assets/img/dinosaurs/cr-1-Gallimimus.png" },
                { id: 'cr-1-Microceratus', image: "/public/assets/img/dinosaurs/cr-1-Microceratus.png" },
                { id: 'cr-1-Pachycephalosaurus', image: "/public/assets/img/dinosaurs/cr-1-Pachycephalosaurus.png" },
                { id: 'cr-2-Baryonyx', image: "/public/assets/img/dinosaurs/cr-2-Baryonyx.png" },
                { id: 'cr-2-Irritator', image: "/public/assets/img/dinosaurs/cr-2-Irritator.png" },
                { id: 'cr-2-Spinosaurus', image: "/public/assets/img/dinosaurs/cr-2-Spinosaurus.png" },
                { id: 'cr-3-Ankylosaurus', image: "/public/assets/img/dinosaurs/cr-3-Ankylosaurus.png" },
                { id: 'cr-3-Triceratops', image: "/public/assets/img/dinosaurs/cr-3-Triceratops.png" },
                { id: 'cr-3-Tyrannosaurus', image: "/public/assets/img/dinosaurs/cr-3-Tyrannosaurus.png" },
                { id: 'ju-1-Compsognathus', image: "/public/assets/img/dinosaurs/ju-1-Compsognathus.png" },
                { id: 'ju-1-Dilophosaurus', image: "/public/assets/img/dinosaurs/ju-1-Dilophosaurus.png" },
                { id: 'ju-1-Cryolophosaurus', image: "/public/assets/img/dinosaurs/ju-1-Cryolophosaurus.png" },
                { id: 'ju-2-Allosaurus', image: "/public/assets/img/dinosaurs/ju-2-Allosaurus.png" },
                { id: 'ju-2-Camarasaurus', image: "/public/assets/img/dinosaurs/ju-2-Camarasaurus.png" },
                { id: 'ju-2-Apatosaurus', image: "/public/assets/img/dinosaurs/ju-2-Apatosaurus.png" },
                { id: 'ju-3-Diplodocus', image: "/public/assets/img/dinosaurs/ju-3-Diplodocus.png" },
                { id: 'ju-3-Stegosaurus', image: "/public/assets/img/dinosaurs/ju-3-Stegosaurus.png" },
                { id: 'tr-1-Herrerasaurus', image: "/public/assets/img/dinosaurs/tr-1-Herrerasaurus.png" },
                { id: 'tr-1-Eoraptor', image: "/public/assets/img/dinosaurs/tr-1-Eoraptor.png" },
                { id: 'tr-3-Coelophysis', image: "/public/assets/img/dinosaurs/tr-3-Coelophysis.png" },
            ],
            draggingSticker: null,
            mousePos: { x: 0, y: 0 }
        };
    }

    public subscribe(listener: (state: AlbumState) => void): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    public getState(): AlbumState {
        return { ...this.state };
    }

    public setMousePosition(x: number, y: number) {
        this.state.mousePos = { x, y };
        this.notifyListeners();
    }

    public startDraggingSticker(sticker: Sticker) {
        this.state.draggingSticker = sticker;
        this.notifyListeners();
    }

    public stopDraggingSticker() {
        this.state.draggingSticker = null;
        this.notifyListeners();
    }

    public isSlotAvailable(slot: Slot | undefined): boolean {
        return slot ? !slot.occupied : false;
    }

    public putStickerOnSlot(slotId: string) {
        const { draggingSticker } = this.state;
        if (!draggingSticker) return;

        this.state.pages = this.state.pages.map(page => ({
            ...page,
            slots: page.slots.map(slot =>
                slot.id === slotId
                    ? { ...slot, occupied: true, stickerId: draggingSticker.id }
                    : slot
            )
        }));

        this.state.stickers = this.state.stickers.filter(sticker => 
            sticker.id !== draggingSticker.id
        );

        this.notifyListeners();
    }

    public navigateToPage(pageIndex: number) {
        if (pageIndex >= 0 && pageIndex < this.state.pages.length) {
            this.state.currentPage = pageIndex;
            this.notifyListeners();
        }
    }

    public getStickerImageById(id: string): string {
        return `/assets/img/dinosaurs/${id}.png`;
    }

    public getCurrentPageStickers(): Sticker[] {
        const start = this.state.currentStickerPage * this.state.stickersPerPage;
        const end = start + this.state.stickersPerPage;
        return this.state.stickers.slice(start, end);
    }

    public getTotalStickerPages(): number {
        return Math.ceil(this.state.stickers.length / this.state.stickersPerPage);
    }

    public nextStickerPage() {
        const totalPages = this.getTotalStickerPages();
        if (this.state.currentStickerPage < totalPages - 1) {
            this.state.currentStickerPage++;
            this.notifyListeners();
        }
    }

    public previousStickerPage() {
        if (this.state.currentStickerPage > 0) {
            this.state.currentStickerPage--;
            this.notifyListeners();
        }
    }
} 