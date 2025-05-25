import React from 'react';
import templateStyles from './Templates.module.css';
import styles from './Template2.module.css';
import { Slot } from '../../types/album';

interface Template2Props {
    slots: Slot[];
    onDrop: (slotId: string) => void;
    getStickerImageById: (id: string) => string;
}

export const Template2: React.FC<Template2Props> = ({ slots, onDrop, getStickerImageById }) => {
    return (

        <div className={templateStyles["template-container"]}>
            <div className={styles["top-section"]}>
                <div className={styles["individual-sticker-left-container"]}>
                    <img src="/public/assets/img/dinosaurs/cr-1-Microceratus.png" alt="sticker" className={styles["individual-sticker-left"]} />
                </div>
                <div className={styles["scene-1-container"]}>
                    <img src="/public/assets/img/album/template-2/1-compsognathus/sene-1.png" alt="scene 1" className={styles["scene-1"]} />
                </div>
                <div className={styles["info-and-shiny"]}>
                    <div className={styles["info-box"]}>
                        <h3>Sabías que...</h3>
                        <p>LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM</p>
                    </div>
                    <div className={styles["shiny-sticker-container"]}>
                        <img src="/public/assets/img/dinosaurs/cr-1-Pachycephalosaurus.png" alt="shiny sticker" className={styles["shiny-sticker"]} />
                    </div>
                </div>
            </div>
            <div className={styles["bottom-section"]}>
                <div className={styles["scene-2-container"]}>
                    <img src="/public/assets/img/album/template-2/1-compsognathus/scene-2.png" alt="scene 2" className={styles["scene-2"]} />
                </div>
                <div className={styles["individual-sticker-container"]}>
                    <p className={styles["individual-sticker-title"]}></p>
                    <div className={styles["individual-sticker-right-container"]}>
                        <img src="/public/assets/img/dinosaurs/cr-1-Gallimimus.png" alt="sticker" className={styles["individual-sticker-right"]} />
                    </div>
                </div>
            </div>
        </div>

        // <div className={styles.templateContainer}>
        //     <div className={styles.leftSection}>
        //         <div className={`${styles.slotGroup} ${styles.template2Layout}`}>
        //             {slots.slice(0, 4).map((slot) => (
        //                 <div
        //                     key={slot.id}
        //                     className={styles.slot}
        //                     onMouseUp={() => onDrop(slot.id)}
        //                 >
        //                     {slot.occupied && slot.stickerId && (
        //                         <img
        //                             src={getStickerImageById(slot.stickerId)}
        //                             alt="Sticker en slot"
        //                             className={styles.stickerImage}
        //                         />
        //                     )}
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        //     <div className={styles.rightSection}>
        //         <div className={styles.decorativeSquare} style={{ backgroundColor: '#FFD700' }} />
        //         <div className={styles.decorativeSquare} style={{ backgroundColor: '#DEB887' }} />
        //         <div className={styles.decorativeSquare} style={{ backgroundColor: '#FFB6C1' }} />
        //     </div>
        // </div>
    );
}; 