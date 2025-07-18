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
    private state: AlbumState = {
        currentPage: 0,
        pages: [],
        stickers: [],
        draggingSticker: null,
        mousePos: { x: 0, y: 0 },
        currentStickerPage: 0,
        stickersPerPage: 8
    };
    private listeners: ((state: AlbumState) => void)[] = [];
    private initialStickers: Sticker[] = [
        // TEMPLATE 1 - Eggs
        { id: '01', image: "/assets/img/album/stickers/sticker-01.png" },
        { id: '02', image: "/assets/img/album/stickers/sticker-02.png" },
        { id: '03', image: "/assets/img/album/stickers/sticker-03.png" },
        { id: '04', image: "/assets/img/album/stickers/sticker-04.png" },
        { id: '05', image: "/assets/img/album/stickers/sticker-05.png" },
        { id: '06', image: "/assets/img/album/stickers/sticker-06.png" },
        { id: '07', image: "/assets/img/album/stickers/sticker-07.png" },
        { id: '08', image: "/assets/img/album/stickers/sticker-08.png" },
        { id: '09', image: "/assets/img/album/stickers/sticker-09.png" },
        { id: '10', image: "/assets/img/album/stickers/sticker-10.png" },
        { id: '11', image: "/assets/img/album/stickers/sticker-11.png" },
        // TEMPLATE 2 - Dryosaurus
        { id: '50', image: "/assets/img/album/stickers/sticker-50.png" },
        { id: '51', image: "/assets/img/album/stickers/sticker-51.png" },
        { id: '52', image: "/assets/img/album/stickers/sticker-52.png" },
        { id: '53', image: "/assets/img/album/stickers/sticker-53.png" },
        { id: '54', image: "/assets/img/album/stickers/sticker-54.png" },
        { id: '55', image: "/assets/img/album/stickers/sticker-55.png" },
        { id: '56', image: "/assets/img/album/stickers/sticker-56.png" },
        { id: '57', image: "/assets/img/album/stickers/sticker-57.png" },
        // TEMPLATE 3 - Triceratops
        { id: '64', image: "/assets/img/album/stickers/sticker-64.png" }, // Barro (fuera de escena)
        { id: '61', image: "/assets/img/album/stickers/sticker-61.png" }, // Triceratops morado (fuera de escena)
        { id: '62', image: "/assets/img/album/stickers/sticker-62.png" }, // Triceratops verde (fuera de escena)
        { id: '69', image: "/assets/img/album/stickers/sticker-69.png" }, // Triceratops rojo (fuera de escena)
        { id: '63', image: "/assets/img/album/stickers/sticker-63.png" }, // Huella (fuera de escena)
        { id: '58', image: "/assets/img/album/stickers/sticker-58.png" }, // Huevo (en escena)
        { id: '59', image: "/assets/img/album/stickers/sticker-59.png" }, // Triceratops naranja (en escena)
        // Segundo hongo
        { id: '65', image: "/assets/img/album/stickers/sticker-56.png" }, // Temporalmente usando la misma imagen
        // Escarabajo
        { id: '70', image: "/assets/img/album/stickers/sticker-70.png" }
    ];

    private shuffleStickers(stickers: Sticker[]): Sticker[] { // M5-2
        // Crear una copia del array para no mutar el original
        const shuffled = [...stickers];
        // Algoritmo de Fisher-Yates
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    constructor() {
        this.setUpPagesSlots();
    }

    private setUpPagesSlots() { // M5-3
        this.state = {
            ...this.state,
            pages: [
                {
                    id: 'page-1',
                    templateType: TemplateType.TEMPLATE_1,
                    slots: [
                        { id: 'slot-1-1', occupied: false, correctStickerId: '01' },
                        { id: 'slot-1-2', occupied: false, correctStickerId: '02' },
                        { id: 'slot-1-3', occupied: false, correctStickerId: '03' },
                        { id: 'slot-1-4', occupied: false, correctStickerId: '04' },
                        { id: 'slot-1-5', occupied: false, correctStickerId: '05' },
                        { id: 'slot-1-6', occupied: false, correctStickerId: '06' },
                        { id: 'slot-1-7', occupied: false, correctStickerId: '07' },
                        { id: 'slot-1-8', occupied: false, correctStickerId: '08' },
                        { id: 'slot-1-9', occupied: false, correctStickerId: '09' },
                        { id: 'slot-1-10', occupied: false, correctStickerId: '10' },
                        { id: 'slot-1-11', occupied: false, correctStickerId: '11' },
                    ],
                    infoText: "Los dinosaurios más grandes..."
                },
                {
                    id: 'page-2',
                    templateType: TemplateType.TEMPLATE_2,
                    slots: [
                        { id: 'slot-2-1', occupied: false, correctStickerId: '50' },
                        { id: 'slot-2-2', occupied: false, correctStickerId: '51' },
                        { id: 'slot-2-3', occupied: false, correctStickerId: '52' },
                        { id: 'slot-2-4', occupied: false, correctStickerId: '53' },
                        { id: 'slot-2-5', occupied: false, correctStickerId: '54' },
                        { id: 'slot-2-6', occupied: false, correctStickerId: '55' },
                        { id: 'slot-2-7', occupied: false, correctStickerId: '56' },
                        { id: 'slot-2-8', occupied: false, correctStickerId: '57' },
                        { id: 'slot-2-9', occupied: false, correctStickerId: '65' },
                        { id: 'slot-2-10', occupied: false, correctStickerId: '70' }
                    ],
                    infoText: "Los dinosaurios carnívoros..."
                },
                {
                    id: 'page-3',
                    templateType: TemplateType.TEMPLATE_3,
                    slots: [
                        { id: 'slot-3-1', occupied: false, correctStickerId: '64' }, // Barro (fuera de escena)
                        { id: 'slot-3-2', occupied: false, correctStickerId: '61' }, // Triceratops morado (fuera de escena)
                        { id: 'slot-3-3', occupied: false, correctStickerId: '62' }, // Triceratops verde (fuera de escena)
                        { id: 'slot-3-4', occupied: false, correctStickerId: '69' }, // Triceratops rojo (fuera de escena)
                        { id: 'slot-3-5', occupied: false, correctStickerId: '63' }, // Huella (fuera de escena)
                        { id: 'slot-3-6', occupied: false, correctStickerId: '58' }, // Huevo (en escena)
                        { id: 'slot-3-7', occupied: false, correctStickerId: '59' }, // Triceratops naranja (en escena)
                    ],
                    infoText: "Los dinosaurios voladores..."
                }
            ],
            stickers: this.shuffleStickers([...this.initialStickers]),
            draggingSticker: null,
            mousePos: { x: 0, y: 0 }
        };
    }

    public subscribe(listener: (state: AlbumState) => void): () => void { // M5-6
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners() {
        const newState = this.getState();
        this.listeners.forEach(listener => {
            listener(newState);
        });
    }

    public getState(): AlbumState {
        return { ...this.state };
    }

    public setMousePosition(x: number, y: number) { // M5-30 M5-37
        this.setState({ mousePos: { x, y } });
        this.notifyListeners();
    }

    public startDraggingSticker(sticker: Sticker) { // M5-26
        this.setState({ draggingSticker: sticker });
        this.notifyListeners();
    }

    public stopDraggingSticker() { // M5-55 M5-65 M5-72
        this.setState({ draggingSticker: null });
        this.notifyListeners();
    }

    public isSlotAvailable(slot: Slot | undefined): boolean { // M5-44 M5-62
        if (!slot || slot.occupied) return false;

        const { draggingSticker } = this.state;
        if (!draggingSticker) return false;

        // check if slot and sticker match M5-45 M5-63
        return slot.correctStickerId === draggingSticker.id;
    }

    public putStickerOnSlot(slotId: string) { // M5-47
        const { draggingSticker } = this.state;
        if (!draggingSticker) return;

        // check if slot id is valid M5-48
        const slot = this.state.pages.flatMap(page => page.slots).find(s => s.id === slotId);
        if (!slot) return;

        // check if sticker matches slot M5-49
        if (slot.correctStickerId !== draggingSticker.id) {
            // if it doesn't match, stop dragging and return
            this.stopDraggingSticker();
            return;
        }
        this.updateSlotAsOccupied(slotId, draggingSticker);
        this.setState({
            stickers: this.removeStickerFromAvailableStickers(draggingSticker)
        });
        this.notifyListeners();
    }

    private updateSlotAsOccupied(slotId: string, draggingSticker: Sticker) { // M5-50
        this.state.pages = this.state.pages.map(page => ({
            ...page,
            slots: page.slots.map(slot => slot.id === slotId
                ? { ...slot, occupied: true, stickerId: draggingSticker.id }
                : slot
            )
        }));
    }

    private removeStickerFromAvailableStickers(draggingSticker: Sticker): Sticker[] | undefined { // M5-51
        return this.state.stickers.filter(sticker => sticker.id !== draggingSticker.id
        );
    }

    private setCurrentPage(pageIndex: number) { // M5-13
        this.setState({ currentPage: pageIndex });
    }

    public navigateToPage(pageIndex: number) { // M5-12
        if (pageIndex >= 0 && pageIndex < this.state.pages.length) {
            this.setCurrentPage(pageIndex);
            this.notifyListeners();
        }
    }

    public getStickerImageById(id: string): string {
        // Buscar primero en stickers disponibles, luego en stickers iniciales
        const sticker = this.state.stickers.find(s => s.id === id) ||
            this.initialStickers.find(s => s.id === id);
        return sticker?.image || `/assets/img/album/stickers/sticker-${id}.png`;
    }

    public getCurrentPageStickers(): Sticker[] { // M5-77
        const start = this.calculateStart();
        const end = this.calculateEnd(start);
        return this.state.stickers.slice(start, end); // M5-80
    }

    private calculateStart() { // M5-78
        return this.state.currentStickerPage * this.state.stickersPerPage;
    }

    private calculateEnd(start: number) { // M5-79
        return start + this.state.stickersPerPage;
    }

    public getTotalStickerPages(): number {
        return Math.ceil(this.state.stickers.length / this.state.stickersPerPage);
    }

    public nextStickerPage() { // M5-19
        const totalPages = this.getTotalStickerPages();

        if (this.state.currentStickerPage < totalPages - 1) {
            const nextPage = this.state.currentStickerPage + 1;

            this.setState({ currentStickerPage: nextPage });

            this.notifyListeners();
        }
    }

    private setState(state: Partial<AlbumState>) { // M5-20 M5-27 M5-31 M5-38 M5-52 M5-56 M5-66 M5-73
        this.state = {
            ...this.state,
            ...state
        };
    }

    public previousStickerPage() {
        if (this.state.currentStickerPage > 0) {
            const prevPage = this.state.currentStickerPage - 1;

            this.setState({ currentStickerPage: prevPage });

            this.notifyListeners();
        }
    }

    public cheatPlaceAllStickers() {
        this.state.pages = this.state.pages.map(page => ({
            ...page,
            slots: page.slots.map(slot => ({
                ...slot,
                occupied: true,
                stickerId: slot.correctStickerId
            }))
        }));

        this.state.stickers = [];
        this.state.currentStickerPage = 0;
        this.notifyListeners();
    }
} 