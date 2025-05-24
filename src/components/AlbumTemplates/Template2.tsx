import React from 'react';
import styles from './Templates.module.css';
import { Slot } from '../../types/album';

interface Template2Props {
    slots: Slot[];
    onDrop: (slotId: string) => void;
    getStickerImageById: (id: string) => string;
}

export const Template2: React.FC<Template2Props> = ({ slots, onDrop, getStickerImageById }) => {
    return (
        <div className={styles.templateContainer}>
            <div className={styles.leftSection}>
                <div className={`${styles.slotGroup} ${styles.template2Layout}`}>
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
                <div className={styles.decorativeSquare} style={{ backgroundColor: '#FFD700' }} />
                <div className={styles.decorativeSquare} style={{ backgroundColor: '#DEB887' }} />
                <div className={styles.decorativeSquare} style={{ backgroundColor: '#FFB6C1' }} />
            </div>
        </div>
    );
}; 