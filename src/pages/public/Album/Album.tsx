import React, { useState, useEffect } from 'react';
import styles from "./Album.module.css";

type Slot = {
    id: string;
    occupied: boolean;
    stickerId?: string;
};

type Sticker = {
    id: string;
    image: string;
};

export const Album: React.FC = () => {
    const [slots, setSlots] = useState<Slot[]>([
        { id: 'slot-1', occupied: false },
        { id: 'slot-2', occupied: false },
        { id: 'slot-3', occupied: false },
    ]);

    const [stickers, setStickers] = useState<Sticker[]>([
        { id: 'Card01', image: "/assets/Cards/Card01.png" },
        { id: 'Card02', image: "/assets/Cards/Card02.png" },
        { id: 'Card03', image: "/assets/Cards/Card03.png" },
    ]);

    const [draggingSticker, setDraggingSticker] = useState<Sticker | null>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseUp = () => {
            setDraggingSticker(null);
        };

        if (draggingSticker) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingSticker]);

    function isSlotAvailable(slot: Slot | undefined): boolean {
        return slot ? !slot.occupied : false;
    }

    function putStickerOnSlot(slotId: string) {
        if (!draggingSticker) return;
        
        setSlots((prevSlots) =>
            prevSlots.map((slot) =>
                slot.id === slotId ? {...slot, occupied: true, stickerId: draggingSticker.id} : slot
            )
        );
        setStickers((prevStickers) =>
            prevStickers.filter((sticker) => sticker.id !== draggingSticker.id)
        );
    }

    const handleDrop = (slotId: string) => {
        if (draggingSticker) {
            const slot = slots.find((s) => s.id === slotId);
            if (isSlotAvailable(slot)) {
                putStickerOnSlot(slotId);
            }
            setDraggingSticker(null);
        }
    };

    const getStickerImageById = (id: string): string => {
        const foundSticker = stickers.find((s) => s.id === id);
        return foundSticker ? foundSticker.image : `/assets/Cards/${id}.png`;
    };

    function createGhostSticker() {
        if (!draggingSticker) return null;
        
        return (
            <img
                src={draggingSticker.image}
                alt="ghost-sticker"
                style={{
                    position: 'fixed',
                    top: mousePos.y,
                    left: mousePos.x,
                    width: 80,
                    height: 80,
                    pointerEvents: 'none',
                    opacity: 0.8,
                    transform: 'translate(-50%, -50%) scale(1.1)',
                    transition: 'transform 0.1s ease',
                    zIndex: 1000,
                }}
            />
        );
    }

    return (
        <div className={styles.albumContainer} style={{ padding: 20 }}>
            <h2>Stickers Disponibles</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                {stickers.map((sticker) => (
                    <img
                        key={sticker.id}
                        src={sticker.image}
                        alt={sticker.id}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            setDraggingSticker(sticker);
                            setMousePos({ x: e.clientX, y: e.clientY });
                        }}
                        style={{ width: 80, height: 80, cursor: 'grab' }}
                    />
                ))}
            </div>

            <h2>Álbum</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
                {slots.map((slot) => (
                    <div
                        key={slot.id}
                        onMouseUp={() => handleDrop(slot.id)}
                        style={{
                            width: 120,
                            height: 120,
                            border: '2px dashed gray',
                            backgroundColor: slot.occupied ? '#eee' : 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        {slot.occupied && slot.stickerId && (
                            <img
                                src={getStickerImageById(slot.stickerId)}
                                alt="Sticker en slot"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {draggingSticker && createGhostSticker()}
        </div>
    );
};
