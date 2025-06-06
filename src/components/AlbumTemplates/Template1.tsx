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
        <div className={styles["scene-1-container"]}>
          <img className={styles["scene-1"]} src="/public/assets/giph/scenes/template-1-1.gif" alt="Scene 1" />
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
        <div className={styles["individual-stickers-container"]}>
          <div className={styles["individual-sticker-1-container"]}>
            <div
              className={`${styles["individual-sticker"]} ${styles["drop-zone"]} ${styles["drop-zone-1"]} ${styles["individual-sticker-1"]}`}
              onMouseUp={() => onDrop(slots[9].id)}
            >
              <img
                src={getStickerImageById(slots[9].correctStickerId)}
                alt="Sticker placeholder"
                className={styles["placeholder-image-individual"]}
              />
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
          <div className={styles["individual-sticker-2-container"]}>
            <div
              className={`${styles["individual-sticker"]}  ${styles["drop-zone"]} ${styles["drop-zone-2"]} ${styles["individual-sticker-2"]}`}
              onMouseUp={() => onDrop(slots[10].id)}
            >
              <img
                src={getStickerImageById(slots[10].correctStickerId)}
                alt="Sticker placeholder"
                className={styles["placeholder-image-individual"]}
              />
              <span className={templateStyles["slot-id"]}>{slots[10].correctStickerId}</span>
              {slots[10].occupied && slots[10].stickerId && (
                <img
                  src={getStickerImageById(slots[10].stickerId)}
                  alt="Sticker en slot"
                  className={styles["sticker-image"]}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles["scene-2-container"]}>
          <img className={styles["scene-2"]} src="/public/assets/giph/scenes/template-1-2.gif" alt="Scene 2" />
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
      <div className={styles["bottom-section"]}>
        <div className={styles["scene-3-container"]}>
          <img className={styles["scene-3"]} src="/public/assets/giph/scenes/template-1-3.gif" alt="Scene 3" />
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-1"]}`}
            onMouseUp={() => onDrop(slots[6].id)}
          >
            {(!slots[6].occupied || slots[6].stickerId !== slots[6].correctStickerId) && (
              <img
                src={getStickerImageById(slots[6].correctStickerId)}
                alt="Sticker placeholder"
                className={styles["placeholder-image"]}
              />
            )}
            <span className={templateStyles["slot-id"]}>{slots[6].correctStickerId}</span>
            {slots[6].occupied && slots[6].stickerId && (
              <img
                src={getStickerImageById(slots[6].stickerId)}
                alt="Sticker en slot"
                className={styles["sticker-image"]}
              />
            )}
          </div>
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-2"]}`}
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
          <div
            className={`${styles["drop-zone"]} ${styles["drop-zone-3"]}`}
            onMouseUp={() => onDrop(slots[8].id)}
          >
            {(!slots[8].occupied || slots[8].stickerId !== slots[8].correctStickerId) && (
              <img
                src={getStickerImageById(slots[8].correctStickerId)}
                alt="Sticker placeholder"
                className={styles["placeholder-image"]}
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
            <span>Maiasaura built communal nests</span>
          </p>
          <p>
            <img 
              src="/public/assets/img/paws/level-paw-complete.png" 
              alt="Dinosaur paw" 
              className={templateStyles["fact-icon"]}
            />
            <span>The Oviraptor was found on a nest, protecting its eggs</span>
          </p>
          <p>
            <img 
              src="/public/assets/img/paws/level-paw-complete.png" 
              alt="Dinosaur paw" 
              className={templateStyles["fact-icon"]}
            />
            <span>Troodon laid their eggs in circles and covered them with soil</span>
          </p>
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
