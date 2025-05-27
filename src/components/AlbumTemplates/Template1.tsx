import React from "react";
import templateStyles from "./Templates.module.css";
import styles from "./Template1.module.css";
import { Slot } from "../../types/album";

interface Template1Props {
  slots: Slot[];
  onDrop: (slotId: string) => void;
  getStickerImageById: (id: string) => string;
}

export const Template1: React.FC<Template1Props> = ({
  slots,
  onDrop,
  getStickerImageById,
}) => {
  console.log(slots);
  return (
    <div className={templateStyles["template-container"]}>
      <div className={styles["top-section"]}>
        <div className={styles["scene-1"]}>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-left"]}`}
            onMouseUp={() => onDrop(slots[0].id)}
          >
            {slots[0].occupied && slots[0].stickerId && (
              <img
                src={getStickerImageById(slots[0].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-center"]}`}
            onMouseUp={() => onDrop(slots[1].id)}
          >
            {slots[1].occupied && slots[1].stickerId && (
              <img
                src={getStickerImageById(slots[1].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-right"]}`}
            onMouseUp={() => onDrop(slots[2].id)}
          >
            {slots[2].occupied && slots[2].stickerId && (
              <img
                src={getStickerImageById(slots[2].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
        </div>
        <div className={styles["individual-stickers-container"]}>
          <div className={styles["individual-sticker-1-container"]}>
            <div
              className={`${styles["individual-sticker"]} ${styles["drop-zone"]} ${styles["drop-zone-individual-sticker-1"]} ${styles["individual-sticker-1"]}`}
              onMouseUp={() => onDrop(slots[9].id)}
            >
              {slots[9].occupied && slots[9].stickerId && (
                <img
                  src={getStickerImageById(slots[9].stickerId)}
                  alt="Sticker en slot"
                  className={styles["sticker-image"]}
                />
              )}
            </div>
          </div>
          <div
            className={`${styles["individual-sticker"]}  ${styles["drop-zone"]} ${styles["drop-zone-individual-sticker-2"]} ${styles["individual-sticker-2"]}`}
            onMouseUp={() => onDrop(slots[10].id)}
          >
            {slots[10].occupied && slots[10].stickerId && (
              <img
                src={getStickerImageById(slots[10].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
        </div>
        <div className={styles["scene-2"]}>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-left"]}`}
            onMouseUp={() => onDrop(slots[3].id)}
          >
            {slots[3].occupied && slots[3].stickerId && (
              <img
                src={getStickerImageById(slots[3].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-center"]}`}
            onMouseUp={() => onDrop(slots[4].id)}
          >
            {slots[4].occupied && slots[4].stickerId && (
              <img
                src={getStickerImageById(slots[4].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-right"]}`}
            onMouseUp={() => onDrop(slots[5].id)}
          >
            {slots[5].occupied && slots[5].stickerId && (
              <img
                src={getStickerImageById(slots[5].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles["bottom-section"]}>
        <div className={styles["scene-3"]}>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-left"]}`}
            onMouseUp={() => onDrop(slots[6].id)}
          >
            {slots[6].occupied && slots[6].stickerId && (
              <img
                src={getStickerImageById(slots[6].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-center"]}`}
            onMouseUp={() => onDrop(slots[7].id)}
          >
            {slots[7].occupied && slots[7].stickerId && (
              <img
                src={getStickerImageById(slots[7].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-right"]}`}
            onMouseUp={() => onDrop(slots[8].id)}
          >
            {slots[8].occupied && slots[8].stickerId && (
              <img
                src={getStickerImageById(slots[8].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
        </div>
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
