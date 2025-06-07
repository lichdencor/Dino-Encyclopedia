import React from "react";
import styles from "./Template3.module.css";
import { Slot } from "../../types/album";

interface Template3Props {
  slots: Slot[];
  onDrop: (slotId: string) => void;
  getStickerImageById: (id: string) => string;
}

export const Template3: React.FC<Template3Props> = ({
  slots,
  onDrop,
  getStickerImageById,
}) => {
  return (
    <div className={styles["template-container"]}>
      <div className={styles["left-section"]}>
        <div className={styles["shiny-sticker-info-container"]}>
          <p className={styles["shiny-sticker-name"]}></p>
          <div className={styles["shiny-sticker-container"]}>
            <div
              className={`${styles["drop-zone"]} ${styles["drop-zone-shiny"]}`}
              onMouseUp={() => onDrop(slots[0].id)}
            >
              {(!slots[0].occupied || slots[0].stickerId !== slots[0].correctStickerId) && (
                <img
                  src={getStickerImageById(slots[0].correctStickerId)}
                  alt="Sticker placeholder"
                  className={styles["placeholder-image"]}
                />
              )}
              <span className={styles["slot-id"]}>{slots[0].correctStickerId}</span>
              {slots[0].occupied && slots[0].stickerId && (
                <img
                  src={getStickerImageById(slots[0].stickerId)}
                  alt="Sticker en slot"
                  className={styles["sticker-image"]}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles["default-stickers-container"]}>
          <div className={styles["default-sticker-container-1"]}>
            <div className={styles["shiny-sticker-container"]}>
              <div
                className={`${styles["drop-zone"]}`}
                onMouseUp={() => onDrop(slots[1].id)}
              >
                {(!slots[1].occupied || slots[1].stickerId !== slots[1].correctStickerId) && (
                  <img
                    src={getStickerImageById(slots[1].correctStickerId)}
                    alt="Sticker placeholder"
                    className={styles["placeholder-image"]}
                  />
                )}
                <span className={styles["slot-id"]}>{slots[1].correctStickerId}</span>
                {slots[1].occupied && slots[1].stickerId && (
                  <img
                    src={getStickerImageById(slots[1].stickerId)}
                    alt="Sticker en slot"
                    className={styles["sticker-image"]}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles["default-sticker-container-2"]}>
            <div
              className={`${styles["drop-zone"]}`}
              onMouseUp={() => onDrop(slots[2].id)}
            >
              {(!slots[2].occupied || slots[2].stickerId !== slots[2].correctStickerId) && (
                <img
                  src={getStickerImageById(slots[2].correctStickerId)}
                  alt="Sticker placeholder"
                  className={styles["placeholder-image"]}
                />
              )}
              <span className={styles["slot-id"]}>{slots[2].correctStickerId}</span>
              {slots[2].occupied && slots[2].stickerId && (
                <img
                  src={getStickerImageById(slots[2].stickerId)}
                  alt="Sticker en slot"
                  className={styles["sticker-image"]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles["right-section"]}>
        <div className={`${styles["info-box"]} ${styles["info-box"]}`}>
          <img 
            src="/public/assets/giph/logo.gif" 
            alt="Dynard" 
            className={styles["dynard-mascot"]}
          />
          <div className={styles["title-container"]}>
            <h3>Did you know...</h3>
          </div>
          <p>
            <img 
              src="/public/assets/img/paws/level-paw-complete.png" 
              alt="Dinosaur paw" 
              className={styles["fact-icon"]}
            />
            <span>Some young Triceratops walked in herds separate from adults, like a mini gang.</span>
          </p>
        </div>
        <div className={styles["scene-container"]}>
          <img
            src="/public/assets/giph/scenes/template-3.gif"
            alt="scene"
            className={styles["scene"]}
          />
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-1"]}`}
            onMouseUp={() => onDrop(slots[3].id)}
          >
            {(!slots[3].occupied || slots[3].stickerId !== slots[3].correctStickerId) && (
              <img
                src={getStickerImageById(slots[3].correctStickerId)}
                alt="Sticker placeholder"
                className={styles["placeholder-image"]}
              />
            )}
            <span className={styles["slot-id"]}>{slots[3].correctStickerId}</span>
            {slots[3].occupied && slots[3].stickerId && (
              <img
                src={getStickerImageById(slots[3].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-2"]}`}
            onMouseUp={() => onDrop(slots[4].id)}
          >
            {(!slots[4].occupied || slots[4].stickerId !== slots[4].correctStickerId) && (
              <img
                src={getStickerImageById(slots[4].correctStickerId)}
                alt="Sticker placeholder"
                className={styles["placeholder-image"]}
              />
            )}
            <span className={styles["slot-id"]}>{slots[4].correctStickerId}</span>
            {slots[4].occupied && slots[4].stickerId && (
              <img
                src={getStickerImageById(slots[4].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-3"]}`}
            onMouseUp={() => onDrop(slots[5].id)}
          >
            {(!slots[5].occupied || slots[5].stickerId !== slots[5].correctStickerId) && (
              <img
                src={getStickerImageById(slots[5].correctStickerId)}
                alt="Sticker placeholder"
                className={styles["placeholder-image"]}
              />
            )}
            <span className={styles["slot-id"]}>{slots[5].correctStickerId}</span>
            {slots[5].occupied && slots[5].stickerId && (
              <img
                src={getStickerImageById(slots[5].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
          {/* Beetle sticker slot */}
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-4"]}`}
            onMouseUp={() => onDrop(slots[7].id)}
          >
            {(!slots[7].occupied || slots[7].stickerId !== slots[7].correctStickerId) && (
              <img
                src={getStickerImageById(slots[7].correctStickerId)}
                alt="Sticker placeholder"
                className={styles["placeholder-image"]}
              />
            )}
            <span className={styles["slot-id"]}>{slots[7].correctStickerId}</span>
            {slots[7].occupied && slots[7].stickerId && (
              <img
                src={getStickerImageById(slots[7].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
        </div>
        <div className={styles["default-sticker-container"]}>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-individual-sticker-1"]}`}
            onMouseUp={() => onDrop(slots[6].id)}
          >
            {(!slots[6].occupied || slots[6].stickerId !== slots[6].correctStickerId) && (
              <img
                src={getStickerImageById(slots[6].correctStickerId)}
                alt="Sticker placeholder"
                className={styles["placeholder-image"]}
              />
            )}
            <span className={styles["slot-id"]}>{slots[6].correctStickerId}</span>
            {slots[6].occupied && slots[6].stickerId && (
              <img
                src={getStickerImageById(slots[6].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
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
