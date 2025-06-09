import React from "react";
import templateStyles from "./Templates.module.css";
import styles from "./Template2.module.css";
import { Slot } from "../../types/album";

interface Template2Props {
  slots: Slot[];
  onDrop: (slotId: string) => void;
  getStickerImageById: (id: string) => string;
}

export const Template2: React.FC<Template2Props> = ({
  slots,
  onDrop,
  getStickerImageById,
}) => {
  return (
    <div className={templateStyles["template-container"]}>
      <div className={styles["top-section"]}>
        <div className={styles["scene-1-container"]}>
          <img
            src="/public/assets/giph/scenes/template-2-1.gif"
            alt="scene 1"
            className={styles["scene-1"]}
          />
          {/* Scene 1 drop zones */}
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-1"]}`}
            onMouseUp={() => onDrop(slots[0].id)}
          >
            {(!slots[0].occupied || slots[0].stickerId !== slots[0].correctStickerId) && (
              <img
                src={getStickerImageById(slots[0].correctStickerId)}
                alt="Sticker placeholder"
                className={styles["placeholder-image"]}
              />
            )}
            <span className={templateStyles["slot-id"]}>{slots[0].correctStickerId}</span>
            {slots[0].occupied && slots[0].stickerId && (
              <img
                src={getStickerImageById(slots[0].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-2"]}`}
            onMouseUp={() => onDrop(slots[1].id)}
          >
            {(!slots[1].occupied || slots[1].stickerId !== slots[1].correctStickerId) && (
              <img
                src={getStickerImageById(slots[1].correctStickerId)}
                alt="Sticker placeholder"
                className={styles["placeholder-image"]}
              />
            )}
            <span className={templateStyles["slot-id"]}>{slots[1].correctStickerId}</span>
            {slots[1].occupied && slots[1].stickerId && (
              <img
                src={getStickerImageById(slots[1].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-3"]}`}
            onMouseUp={() => onDrop(slots[2].id)}
          >
            {(!slots[2].occupied || slots[2].stickerId !== slots[2].correctStickerId) && (
              <img
                src={getStickerImageById(slots[2].correctStickerId)}
                alt="Sticker placeholder"
                className={styles["placeholder-image"]}
              />
            )}
            <span className={templateStyles["slot-id"]}>{slots[2].correctStickerId}</span>
            {slots[2].occupied && slots[2].stickerId && (
              <img
                src={getStickerImageById(slots[2].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
        </div>
        <div className={styles["info-and-shiny"]}>
          <div className={`${styles["info-box"]} ${templateStyles["info-box"]}`}>
            <img 
              src="/public/assets/giph/logo.gif" 
              alt="Dynard" 
              className={templateStyles["dynard-mascot"]}
            />
            <div className={templateStyles["title-container"]}>
              <h3>Did you know...</h3>
            </div>
            <p>
              <img 
                src="/public/assets/img/paws/level-paw-complete.png" 
                alt="Dinosaur paw" 
                className={templateStyles["fact-icon"]}
              />
              <span>The Dryosaurus used its long tail to balance while running between trees.</span>
            </p>
            <p>
              <img 
                src="/public/assets/img/paws/level-paw-complete.png" 
                alt="Dinosaur paw" 
                className={templateStyles["fact-icon"]}
              />
              <span>When it saw a predator, it made quick zigzag jumps to confuse them.</span>
            </p>
          </div>
          <div className={styles["shiny-sticker-container"]}>
            <div
              className={`${styles["drop-zone"]} ${styles["drop-zone-shiny"]}`}
              onMouseUp={() => onDrop(slots[7].id)}
            >
              {(!slots[7].occupied || slots[7].stickerId !== slots[7].correctStickerId) && (
                <img
                  src={getStickerImageById(slots[7].correctStickerId)}
                  alt="Sticker placeholder"
                  className={styles["placeholder-image"]}
                />
              )}
              <span className={templateStyles["slot-id"]}>{slots[7].correctStickerId}</span>
              {slots[7].occupied && slots[7].stickerId && (
                <img
                  src={getStickerImageById(slots[7].stickerId)}
                  alt="Sticker en slot"
                  className={styles["sticker-image"]}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles["bottom-section"]}>
        {/* INDIVIDUAL STICKERS */}
        <div className={styles["individual-stickers-container"]}>
          <div className={styles["individual-sticker-1-container"]}>
            <div
              className={`${styles["individual-sticker"]} ${styles["drop-zone"]} ${styles["drop-zone-1"]} ${styles["individual-sticker-1"]}`}
              onMouseUp={() => onDrop(slots[8].id)}
            >
              {(!slots[8].occupied || slots[8].stickerId !== slots[8].correctStickerId) && (
                <img
                  src={getStickerImageById(slots[8].correctStickerId)}
                  alt="Sticker placeholder"
                  className={styles["placeholder-image-individual"]}
                />
              )}
              <span className={templateStyles["slot-id"]}>{slots[8].correctStickerId}</span>
              {slots[8].occupied && slots[8].stickerId && (
                <img
                  src={getStickerImageById(slots[8].stickerId)}
                  alt="Sticker en slot"
                  className={styles["sticker-image"]}
                />
              )}
            </div>
          </div>
          <div className={styles["individual-sticker-2-container"]}>
            <div
              className={`${styles["individual-sticker"]} ${styles["drop-zone"]} ${styles["drop-zone-2"]} ${styles["individual-sticker-2"]}`}
              onMouseUp={() => onDrop(slots[9].id)}
            >
              {(!slots[9].occupied || slots[9].stickerId !== slots[9].correctStickerId) && (
                  <img
                      src={getStickerImageById(slots[9].correctStickerId)}
                      alt="Sticker placeholder"
                      className={styles["placeholder-image-individual"]}
                  />
              )}
              <span className={templateStyles["slot-id"]}>{slots[9].correctStickerId}</span>
              {slots[9].occupied && slots[9].stickerId && (
                  <img
                      src={getStickerImageById(slots[9].stickerId)}
                      alt="Sticker en slot"
                      className={styles["sticker-image"]}
                  />
              )}
            </div>
          </div>
        </div>
        <div className={styles["scene-2-container"]}>
          <img
            src="/public/assets/giph/scenes/template-2-2.gif"
            alt="scene 2"
            className={styles["scene-2"]}
          />
          {/* Scene 2 drop zones */}
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
            <span className={templateStyles["slot-id"]}>{slots[3].correctStickerId}</span>
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
            <span className={templateStyles["slot-id"]}>{slots[4].correctStickerId}</span>
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
            <span className={templateStyles["slot-id"]}>{slots[5].correctStickerId}</span>
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
    </div>
  );
};
