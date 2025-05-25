import React from 'react';
import templateStyles from './Templates.module.css';
import styles from './Template1.module.css';
import { Slot } from '../../types/album';

interface Template1Props {
    slots: Slot[];
    onDrop: (slotId: string) => void;
    getStickerImageById: (id: string) => string;
}

export const Template1: React.FC<Template1Props> = ({ slots, onDrop, getStickerImageById }) => {
    return (

        <div className={templateStyles["template-container"]}>
            <div className={styles["top-section"]}>
                <div className={styles["scene-1"]}></div>
                <div className={styles["individual-stickers-container"]}>
                    <div className={`${styles["individual-sticker"]}
                                   ${styles["individual-sticker-1"]}`}></div>
                    <div className={`${styles["individual-sticker"]}
                                   ${styles["individual-sticker-2"]}`}></div>
                </div>
                <div className={styles["scene-2"]}></div>
            </div>
            <div className={styles["bottom-section"]}>
                <div className={styles["scene-3"]}></div>
                <div className={styles["info-box"]}>
                    <h3>Sabías que...</h3>
                    <p>LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM</p>
                </div>
            </div>
        </div>





        // <div className={styles.templateContainer}>
        //     <div className={styles.leftSection}>
        //         <div className={`${styles.slotGroup}`}>
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

        //     </div>
        // </div>
    );
}; 