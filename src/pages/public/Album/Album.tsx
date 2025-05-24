import React, { Component } from 'react';
import styles from "./Album.module.css";
import { Template1 } from '../../../components/AlbumTemplates/Template1';
import { Template2 } from '../../../components/AlbumTemplates/Template2';
import { Template3 } from '../../../components/AlbumTemplates/Template3';
import { Slot, Sticker, AlbumPage, TemplateType } from '../../../types/album';

interface AlbumState {
    currentPage: number;
    pages: AlbumPage[];
    stickers: Sticker[];
    draggingSticker: Sticker | null;
    mousePos: { x: number; y: number };
}

export class Album extends Component<{}, AlbumState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            currentPage: 0,
            pages: [
                {
                    id: 'page-1',
                    templateType: TemplateType.TEMPLATE_1,
                    slots: [
                        { id: 'slot-1-1', occupied: false },
                        { id: 'slot-1-2', occupied: false },
                        { id: 'slot-1-3', occupied: false },
                        { id: 'slot-1-4', occupied: false },
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
                    ],
                    infoText: "Los dinosaurios carnívoros..."
                },
                {
                    id: 'page-3',
                    templateType: TemplateType.TEMPLATE_3,
                    slots: [
                        { id: 'slot-3-1', occupied: false },
                        { id: 'slot-3-2', occupied: false },
                        { id: 'slot-3-3', occupied: false },
                        { id: 'slot-3-4', occupied: false },
                    ],
                    infoText: "Los dinosaurios voladores..."
                }
            ],
            stickers: [
                { id: 'Card01', image: "/assets/Cards/Card01.png" },
                { id: 'Card02', image: "/assets/Cards/Card02.png" },
                { id: 'Card03', image: "/assets/Cards/Card03.png" },
            ],
            draggingSticker: null,
            mousePos: { x: 0, y: 0 }
        };
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseMove = (e: MouseEvent) => {
        if (this.state.draggingSticker) {
            this.setState({ mousePos: { x: e.clientX, y: e.clientY } });
        }
    };

    handleMouseUp = () => {
        this.setState({ draggingSticker: null });
    };

    isSlotAvailable = (slot: Slot | undefined): boolean => {
        return slot ? !slot.occupied : false;
    };

    putStickerOnSlot = (slotId: string) => {
        const { draggingSticker } = this.state;
        if (!draggingSticker) return;

        this.setState(prevState => ({
            pages: prevState.pages.map(page => ({
                ...page,
                slots: page.slots.map(slot =>
                    slot.id === slotId
                        ? { ...slot, occupied: true, stickerId: draggingSticker.id }
                        : slot
                )
            })),
            stickers: prevState.stickers.filter(sticker => sticker.id !== draggingSticker.id)
        }));
    };

    handleDrop = (slotId: string) => {
        const { draggingSticker, pages, currentPage } = this.state;
        if (draggingSticker) {
            const slot = pages[currentPage].slots.find(s => s.id === slotId);
            if (this.isSlotAvailable(slot)) {
                this.putStickerOnSlot(slotId);
            }
            this.setState({ draggingSticker: null });
        }
    };

    getStickerImageById = (id: string): string => {
        const foundSticker = this.state.stickers.find(s => s.id === id);
        return foundSticker ? foundSticker.image : `/assets/Cards/${id}.png`;
    };

    createGhostSticker() {
        const { draggingSticker, mousePos } = this.state;
        if (!draggingSticker) return null;

        return (
            <img
                src={draggingSticker.image}
                alt="ghost-sticker"
                style={{
                    position: 'fixed',
                    top: mousePos.y,
                    left: mousePos.x,
                    width: '8vh',
                    height: '8vh',
                    pointerEvents: 'none',
                    opacity: 0.8,
                    transform: 'translate(-50%, -50%) scale(1.1)',
                    transition: 'transform 0.1s ease',
                    zIndex: 1000,
                }}
            />
        );
    }

    renderCurrentTemplate() {
        const { pages, currentPage } = this.state;
        const currentPageData = pages[currentPage];

        const templateProps = {
            slots: currentPageData.slots,
            onDrop: this.handleDrop,
            getStickerImageById: this.getStickerImageById
        };

        switch (currentPageData.templateType) {
            case TemplateType.TEMPLATE_1:
                return <Template1 {...templateProps} />;
            case TemplateType.TEMPLATE_2:
                return <Template2 {...templateProps} />;
            case TemplateType.TEMPLATE_3:
                return <Template3 {...templateProps} />;
            default:
                return null;
        }
    }

    render() {
        const { stickers, draggingSticker, pages, currentPage } = this.state;

        return (
            <div className={styles.albumContainer}>
                <div className={styles.stickerSection}>
                    <h2>Stickers Disponibles</h2>
                    <div className={styles.stickersGrid}>
                        {stickers.map(sticker => (
                            <img
                                key={sticker.id}
                                src={sticker.image}
                                alt={sticker.id}
                                onMouseDown={e => {
                                    e.preventDefault();
                                    this.setState({
                                        draggingSticker: sticker,
                                        mousePos: { x: e.clientX, y: e.clientY }
                                    });
                                }}
                                className={styles.sticker}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.albumSection}>
                    <div className={styles.navigation}>
                        <button
                            onClick={() => this.setState({ currentPage: Math.max(0, currentPage - 1) })}
                            disabled={currentPage === 0}
                        >
                            Anterior
                        </button>
                        <span>Página {currentPage + 1} de {pages.length}</span>
                        <button
                            onClick={() => this.setState({ currentPage: Math.min(pages.length - 1, currentPage + 1) })}
                            disabled={currentPage === pages.length - 1}
                        >
                            Siguiente
                        </button>
                    </div>

                    {this.renderCurrentTemplate()}
                </div>

                {draggingSticker && this.createGhostSticker()}
            </div>
        );
    }
}
