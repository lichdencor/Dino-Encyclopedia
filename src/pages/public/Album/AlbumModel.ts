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

    private shuffleStickers(stickers: Sticker[]): Sticker[] {
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
        const initialStickers = [
            // TEMPLATE 1 - Eggs
            { id: '01', image: "/public/assets/img/album/stickers/sticker-01.png" },
            { id: '02', image: "/public/assets/img/album/stickers/sticker-02.png" },
            { id: '03', image: "/public/assets/img/album/stickers/sticker-03.png" },
            { id: '04', image: "/public/assets/img/album/stickers/sticker-04.png" },
            { id: '05', image: "/public/assets/img/album/stickers/sticker-05.png" },
            { id: '06', image: "/public/assets/img/album/stickers/sticker-06.png" },
            { id: '07', image: "/public/assets/img/album/stickers/sticker-07.png" },
            { id: '08', image: "/public/assets/img/album/stickers/sticker-08.png" },
            { id: '09', image: "/public/assets/img/album/stickers/sticker-09.png" },
            { id: '10', image: "/public/assets/img/album/stickers/sticker-10.png" },
            { id: '11', image: "/public/assets/img/album/stickers/sticker-11.png" },
            // TEMPLATE 2 - Dryosaurus
            { id: '51', image: "/public/assets/img/album/stickers/sticker-51.png" },
            { id: '52', image: "/public/assets/img/album/stickers/sticker-52.png" },
            { id: '53', image: "/public/assets/img/album/stickers/sticker-53.png" },
            { id: '54', image: "/public/assets/img/album/stickers/sticker-54.png" },
            { id: '55', image: "/public/assets/img/album/stickers/sticker-55.png" },
            { id: '56', image: "/public/assets/img/album/stickers/sticker-56.png" },
            { id: '57', image: "/public/assets/img/album/stickers/sticker-57.png" },
            // TEMPLATE 3 - Triceratops
            { id: '58', image: "/public/assets/img/album/stickers/sticker-58.png" },
            { id: '59', image: "/public/assets/img/album/stickers/sticker-59.png" },
            { id: '60', image: "/public/assets/img/album/stickers/sticker-60.png" },
            { id: '61', image: "/public/assets/img/album/stickers/sticker-61.png" },
            { id: '62', image: "/public/assets/img/album/stickers/sticker-62.png" },
            { id: '63', image: "/public/assets/img/album/stickers/sticker-63.png" },
            { id: '64', image: "/public/assets/img/album/stickers/sticker-64.png" }
        ];

        this.state = {
            currentPage: 0,
            currentStickerPage: 0,
            stickersPerPage: 10,
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
                        { id: 'slot-2-1', occupied: false, correctStickerId: '51' },
                        { id: 'slot-2-2', occupied: false, correctStickerId: '52' },
                        { id: 'slot-2-3', occupied: false, correctStickerId: '53' },
                        { id: 'slot-2-4', occupied: false, correctStickerId: '54' },
                        { id: 'slot-2-5', occupied: false, correctStickerId: '55' },
                        { id: 'slot-2-6', occupied: false, correctStickerId: '56' },
                        { id: 'slot-2-7', occupied: false, correctStickerId: '57' },
                        { id: 'slot-2-8', occupied: false, correctStickerId: '58' },
                    ],
                    infoText: "Los dinosaurios carnívoros..."
                },
                {
                    id: 'page-3',
                    templateType: TemplateType.TEMPLATE_3,
                    slots: [
                        { id: 'slot-3-1', occupied: false, correctStickerId: '58' },
                        { id: 'slot-3-2', occupied: false, correctStickerId: '59' },
                        { id: 'slot-3-3', occupied: false, correctStickerId: '60' },
                        { id: 'slot-3-4', occupied: false, correctStickerId: '61' },
                        { id: 'slot-3-5', occupied: false, correctStickerId: '62' },
                        { id: 'slot-3-6', occupied: false, correctStickerId: '63' },
                        { id: 'slot-3-7', occupied: false, correctStickerId: '64' },
                    ],
                    infoText: "Los dinosaurios voladores..."
                }
            ],
            stickers: this.shuffleStickers(initialStickers),
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
        if (!slot || slot.occupied) return false;
        
        const { draggingSticker } = this.state;
        if (!draggingSticker) return false;

        // Verificar si el sticker corresponde al slot
        return slot.correctStickerId === draggingSticker.id;
    }

    public putStickerOnSlot(slotId: string) {
        const { draggingSticker } = this.state;
        if (!draggingSticker) return;

        // Encontrar el slot
        const slot = this.state.pages.flatMap(page => page.slots).find(s => s.id === slotId);
        if (!slot) return;

        // Verificar si el sticker corresponde al slot
        if (slot.correctStickerId !== draggingSticker.id) {
            // Si el sticker no corresponde, no hacer nada y dejar que vuelva a la grilla
            this.stopDraggingSticker();
            return;
        }

        // Si el sticker corresponde, actualizar el estado
        this.state.pages = this.state.pages.map(page => ({
            ...page,
            slots: page.slots.map(slot =>
                slot.id === slotId
                    ? { ...slot, occupied: true, stickerId: draggingSticker.id }
                    : slot
            )
        }));

        // Remover el sticker de la lista de stickers disponibles
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
        return `/assets/img/album/stickers/sticker-${id}.png`;
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