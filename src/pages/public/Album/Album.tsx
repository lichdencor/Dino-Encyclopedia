import { Component } from 'react';
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
        this.model = new AlbumModel(); // M5-2
        this.controller = new AlbumController(this.model); // M5-5
        this.state = this.model.getState();
    }

    componentDidMount() {
        this.unsubscribe = this.model.subscribe(this.listenState.bind(this));
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

    listenState(newState: AlbumState) { // M5-7 M5-14 M5-21 M5-28 M5-32 M5-39 M5-53 M5-57 M5-67 M5-74   
        this.setState(newState); // M5-8 M5-15 M5-22 M5-29 M5-33 M5-40 M5-54 M5-58 M5-68 M5-75
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
        const stickers = this.model.getCurrentPageStickers();
        const totalPages = this.model.getTotalStickerPages();

        return (
            <div className={styles["album-container"]}>
                <div className={styles["album"]}>
                    <div className={styles["sticker-section-gold-container"]}>

                        <div className={styles["stickers-content"]}>
                            <div className={styles["stickers-header"]}>
                                <p className={styles["stickers-title"]}>Stickers</p>
                                <div className={styles["pagination-controls"]}>
                                    <button
                                        onClick={this.controller.handlePreviousStickerPage}
                                        disabled={this.state.currentStickerPage === 0}
                                        className={`${styles["pagination-button"]} ${styles["pagination-button-prev"]}`}
                                    />
                                    <span className={styles["page-indicator"]}>
                                        {this.state.currentStickerPage + 1} / {totalPages}
                                    </span>
                                    <button
                                        onClick={this.controller.handleNextStickerPage}
                                        disabled={this.state.currentStickerPage === totalPages - 1}
                                        className={`${styles["pagination-button"]} ${styles["pagination-button-next"]}`}
                                    />
                                </div>
                            </div>
                            <div className={styles["stickers-grid"]}>
                                {stickers.map(sticker => (
                                    <div key={sticker.id} className={styles["sticker-container"]}>
                                        <span className={styles["sticker-id"]}>{sticker.id}</span>
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

                    <div className={styles["album-section"]}>
                        <div className={styles.navigation}>
                            <div className={styles["navigation-text"]}>
                                <span className={styles.text}>Page</span> <span className={styles.number}>{this.state.currentPage + 1}</span> <span className={styles.text}>of</span> <span className={styles.number}>{this.state.pages.length}</span>
                            </div>
                            <div className={styles["navigation-buttons"]}>
                                <button
                                    onClick={() => this.controller.handlePageNavigation('previous')}
                                    disabled={this.state.currentPage === 0}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => this.controller.handlePageNavigation('next')}
                                    disabled={this.state.currentPage === this.state.pages.length - 1}
                                >
                                    Next
                                </button>
                            </div>
                            <div className={styles["navigation-cheat"]}>
                                <button
                                    onClick={this.controller.handleCheat}
                                    className={styles["cheat-button"]}
                                >
                                    CHEAT
                                </button>
                            </div>
                        </div>

                        {this.renderCurrentTemplate()}
                    </div>

                    {this.state.draggingSticker && this.createGhostSticker()}
                </div>
            </div>
        );
    }
}
