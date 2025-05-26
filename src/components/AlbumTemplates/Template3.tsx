import React from 'react';
import templateStyles from './Templates.module.css';
import styles from './Template3.module.css';
import { Slot } from '../../types/album';

interface Template3Props {
    slots: Slot[];
    onDrop: (slotId: string) => void;
    getStickerImageById: (id: string) => string;
}

export const Template3: React.FC<Template3Props> = ({ slots, onDrop, getStickerImageById }) => {
    return (
        <div className={styles["template-container"]}>
            <div className={styles["left-section"]}>

                <div className={styles["shiny-sticker-info-container"]}>
                    <p className={styles["shiny-sticker-name"]}></p>
                    <div className={styles["shiny-sticker-container"]}>
                        <img src="/public/assets/img/dinosaurs/tr-2-Fukuiraptor.png" alt="shiny sticker" className={styles["shiny-sticker"]} />
                    </div>
                </div>
                <div className={styles["default-stickers-container"]}>
                    <div className={styles["default-sticker-container-1"]}>
                        <img src="/public/assets/img/dinosaurs/cr-2-Spinosaurus.png" alt="sticker" className={styles["default-sticker-1"]} />
                    </div>
                    <div className={styles["default-sticker-container-2"]}>
                        <img src="/public/assets/img/dinosaurs/ju-3-Stegosaurus.png" alt="sticker" className={styles["default-sticker-2"]} />
                    </div>
                </div>
            </div>
            <div className={styles["right-section"]}>
                <div className={styles["info-box"]}>
                    <h3>Sabías que...</h3>
                    <p>LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM</p>
                </div>
                <div className={styles["scene-container"]}>
                    <img src="/public/assets/img/album/template-3/1-triceratops/scene.png" alt="scene" className={styles["scene"]} />
                </div>
                <div className={styles["default-sticker-container"]}>
                    <img src="/public/assets/img/dinosaurs/ju-1-Cryolophosaurus.png" alt="sticker" className={styles["default-sticker"]} />
                </div>
            </div>
        </div>


        // <div className={styles.templateContainer}>
        //     <div className={styles.leftSection}>
        //         <div className={`${styles.slotGroup} ${styles.template3Layout}`}>
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
        //         <div className={styles.infoBox}>
        //             <h3>Sabías que...</h3>
        //             <p>LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM</p>
        //         </div>
        //         <div className={styles.decorativeSquare} style={{ backgroundColor: '#FFD700' }} />
        //         <div className={styles.decorativeSquare} style={{ backgroundColor: '#DEB887' }} />
        //     </div>
        // </div>
    );
}; 