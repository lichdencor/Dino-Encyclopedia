import React, { Component } from 'react';
import styles from "./Album.module.css";
import { Template1 } from '../../../components/AlbumTemplates/Template1';
import { Template2 } from '../../../components/AlbumTemplates/Template2';
import { Template3 } from '../../../components/AlbumTemplates/Template3';
import { AlbumModel, AlbumState } from './AlbumModel';
import { AlbumController } from './AlbumController';
import { TemplateType } from '../../../types/album';

export class Album extends Component<{}, AlbumState> {
    private model: AlbumModel;
    private controller: AlbumController;
    private unsubscribe: (() => void) | null = null;

    constructor(props: {}) {
        super(props);
        this.model = new AlbumModel();
        this.controller = new AlbumController(this.model);
        this.state = this.model.getState();
    }

    componentDidMount() {
        this.unsubscribe = this.model.subscribe((newState) => {
            this.setState(newState);
        });
        window.addEventListener('mousemove', this.controller.handleMouseMove);
        window.addEventListener('mouseup', this.controller.handleMouseUp);
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        window.removeEventListener('mousemove', this.controller.handleMouseMove);
        window.removeEventListener('mouseup', this.controller.handleMouseUp);
    }

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
            onDrop: this.controller.handleDrop,
            getStickerImageById: this.controller.getStickerImageById
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
        const state = this.state;
        const currentTemplate = this.renderCurrentTemplate();
        const stickers = this.model.getCurrentPageStickers();
        const totalPages = this.model.getTotalStickerPages();
        const currentPage = state.currentStickerPage;

        return (
            <div className={styles["album-container"]}>
                <div className={styles["album"]}>
                    <div className={styles["sticker-section-gold-container"]}>
                        <div className={styles["sticker-section"]}>
                            <div className={styles["stickers-content"]}>
                                <div className={styles["stickers-header"]}>
                                    <p className={styles["stickers-title"]}>Stickers</p>
                                    <div className={styles["pagination-controls"]}>
                                        <button 
                                            onClick={this.controller.handlePreviousStickerPage}
                                            disabled={currentPage === 0}
                                            className={styles["pagination-button"]}
                                        >
                                            ←
                                        </button>
                                        <span className={styles["page-indicator"]}>
                                            {currentPage + 1} / {totalPages}
                                        </span>
                                        <button 
                                            onClick={this.controller.handleNextStickerPage}
                                            disabled={currentPage === totalPages - 1}
                                            className={styles["pagination-button"]}
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                                <div className={styles["stickers-grid"]}>
                                    {stickers.map(sticker => (
                                        <div key={sticker.id} className={styles["sticker-container"]}>
                                            <img
                                                src={sticker.image}
                                                alt={sticker.id}
                                                onMouseDown={(e) => this.controller.handleStickerDragStart(e, sticker)}
                                                className={styles["sticker"]}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles["album-section"]}>
                        <div className={styles.navigation}>
                            <button
                                onClick={() => this.controller.handlePageNavigation('previous')}
                                disabled={currentPage === 0}
                            >
                                Previous
                            </button>
                            <span>
                                Page {currentPage + 1} of {totalPages}
                            </span>
                            <button
                                onClick={() => this.controller.handlePageNavigation('next')}
                                disabled={currentPage === totalPages - 1}
                            >
                                Next
                            </button>
                        </div>

                        {currentTemplate}
                    </div>

                    {state.draggingSticker && this.createGhostSticker()}
                </div>
            </div>
        );
    }
}
