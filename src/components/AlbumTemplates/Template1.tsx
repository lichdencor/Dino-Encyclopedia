import React from 'react';
import styles from './Templates.module.css';
import { Slot } from '../../types/album';

interface Template1Props {
    slots: Slot[];
    onDrop: (slotId: string) => void;
    getStickerImageById: (id: string) => string;
}

export const Template1: React.FC<Template1Props> = ({ slots, onDrop, getStickerImageById }) => {
    return (
        <div className={styles.templateContainer}>
            <div className={styles.leftSection}>
                <div className={`${styles.slotGroup} ${styles.template1Layout}`}>
                    {slots.slice(0, 4).map((slot) => (
                        <div
                            key={slot.id}
                            className={styles.slot}
                            onMouseUp={() => onDrop(slot.id)}
                        >
                            {slot.occupied && slot.stickerId && (
                                <img
                                    src={getStickerImageById(slot.stickerId)}
                                    alt="Sticker en slot"
                                    className={styles.stickerImage}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.rightSection}>
                <div className={styles.infoBox}>
                    <h3>Sabías que...</h3>
                    <p>LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM</p>
                </div>
            </div>
        </div>
    );
}; 