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
        <div className={styles["individual-sticker-left-container"]}>
          <img
            src="/public/assets/img/dinosaurs/cr-1-Microceratus.png"
            alt="sticker"
            className={styles["individual-sticker-left"]}
          />
        </div>
        <div className={styles["scene-1-container"]}>
          <img
            src="/public/assets/giph/scenes/template-2-1.gif"
            alt="scene 1"
            className={styles["scene-1"]}
          />
          {/* Scene 1 drop zones */}
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-left"]}`}
            onMouseUp={() => onDrop(slots[0].id)}
          >
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
            className={`${styles["drop-zone"]} ${styles["drop-zone-center"]}`}
            onMouseUp={() => onDrop(slots[1].id)}
          >
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
            className={`${styles["drop-zone"]} ${styles["drop-zone-right"]}`}
            onMouseUp={() => onDrop(slots[2].id)}
          >
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
          <div className={styles["info-box"]}>
            <h3>Sabías que...</h3>
            <p>LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM</p>
          </div>
          <div className={styles["shiny-sticker-container"]}>
            <div
              className={`${styles["drop-zone"]} ${styles["drop-zone-left"]}`}
              onMouseUp={() => onDrop(slots[7].id)}
            >
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
        <div className={styles["scene-2-container"]}>
          <img
            src="/public/assets/giph/scenes/template-2-2.gif"
            alt="scene 2"
            className={styles["scene-2"]}
          />
          {/* Scene 2 drop zones */}
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-left"]}`}
            onMouseUp={() => onDrop(slots[3].id)}
          >
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
            className={`${styles["drop-zone"]} ${styles["drop-zone-center"]}`}
            onMouseUp={() => onDrop(slots[4].id)}
          >
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
            className={`${styles["drop-zone"]} ${styles["drop-zone-right"]}`}
            onMouseUp={() => onDrop(slots[5].id)}
          >
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
        <div className={styles["individual-sticker-container"]}>
          <p className={styles["individual-sticker-title"]}></p>
          <div className={styles["individual-sticker-right-container"]}>
            {/* Individual sticker 1 drop zone */}
            <div
              className={`${styles["drop-zone"]} ${styles["drop-zone-individual-sticker-1"]}`}
              onMouseUp={() => onDrop(slots[6].id)}
            >
              <span className={templateStyles["slot-id"]}>{slots[6].correctStickerId}</span>
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
    </div>
  );
};
