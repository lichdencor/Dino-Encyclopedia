import React, { useState } from "react";
import styles from "./Triassic-Inferior.module.css";
import { Nav, VirtualAssistant } from "../../../components";
import { Link } from "react-router-dom";
import { GalleryArrows } from "../../../components/GalleryArrows/GalleryArrows";
import { GalleryDinosaurNames } from "../../../components/GalleryDinosaurNames/GalleryDinosaurNames";
import galleries_data from "../../../context/data/galleries_data.json";

// const dinosaurs = galleries_data["galleries"][0][]

export const TriassicInferior = () => {
  const [activeDinosaur, setActiveDinosaur] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDinosaur, setSelectedDinosaur] = useState<number | null>(null);
  const [curtain1IsHovered, setCurtain1IsHovered] = useState<boolean>(false);
  const [curtain2IsHovered, setCurtain2IsHovered] = useState<boolean>(false);
  const [curtain3IsHovered, setCurtain3IsHovered] = useState<boolean>(false);
  const [secondPassed, setSecondPassed] = useState<boolean>(false);

  const handleMouseMove = (
    mouseEvent: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = mouseEvent.currentTarget.getBoundingClientRect();

    const x = `${((mouseEvent.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((mouseEvent.clientY - rect.top) / rect.height) * 100}%`;

    mouseEvent.currentTarget.style.setProperty("--cursor-x", x);
    mouseEvent.currentTarget.style.setProperty("--cursor-y", y);

    const dinosaurElements = mouseEvent.currentTarget.getElementsByClassName(styles.dinosaur);
    for (let i = 0; i < dinosaurElements.length; i++) {
      const dinosaur = dinosaurElements[i] as HTMLElement;
      const rect = dinosaur.getBoundingClientRect();
      if (
        mouseEvent.clientX >= rect.left &&
        mouseEvent.clientX <= rect.right &&
        mouseEvent.clientY >= rect.top &&
        mouseEvent.clientY <= rect.bottom
      ) {
        setActiveDinosaur(index);
        return;
      }
    }
    setActiveDinosaur(null);
  };

  const handleDinosaurClick = (index: number) => {
    setSelectedDinosaur(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDinosaur(null);
  };

  return (
    <div>
      <Nav />
      <div className={styles.triassicInferiorContainer}>
        <div
          className={`${styles.courtains1} ${curtain1IsHovered && secondPassed ? styles.curtainHover : ""}`}
          onMouseEnter={() => {
            setCurtain1IsHovered(true);
            setTimeout(() => setSecondPassed(true), 1000);
          }}
        >
          <div className={`${styles.leftCurtain} ${curtain1IsHovered && styles.leftCurtainHover}`}></div>
          <div className={`${styles.rightCurtain} ${curtain1IsHovered && styles.rightCurtainHover}`}></div>
        </div>
        <div className={styles.courtains2}></div>
        <div className={styles.courtains3}></div>

        <div className={styles.triassicInferiorBg} style={{ pointerEvents: "none" }}></div>

        {/* <VirtualAssistant/> */}
        <GalleryArrows page1="map" page2="triassic-medio" />
        <GalleryDinosaurNames dinosaurs={["Eoraptor", "Postosuchus", "Herrerasaurus"]}></GalleryDinosaurNames>

        {[styles.geneticBg1, styles.geneticBg2, styles.geneticBg3].map((bgClass, index) => {
          return (
            <div
              key={index}
              className={bgClass}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onClick={() => handleDinosaurClick(index)}
            >
              <div className={`${styles.dinosaur} ${styles[`dinosaur${index + 1}`]}`}></div>
            </div>
          );
        })}


        {isModalOpen && (
          <div className={styles.modalOverlay + " preview-scan-dino"} onClick={closeModal}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{`Dinosaurio ${selectedDinosaur !== null ? selectedDinosaur + 1 : ""}`}</h2>
              <div
                key={`preview-${selectedDinosaur}`}
                className={[styles.geneticBg1, styles.geneticBg2, styles.geneticBg3][selectedDinosaur]}
                onMouseMove={(e) => handleMouseMove(e, selectedDinosaur!)}
              >
                <div
                  className={`${styles.dinosaur} ${styles[`dinosaur${selectedDinosaur + 1}`]} ${activeDinosaur === selectedDinosaur ? styles.activeBone : ""
                    }`}
                >
                  <div
                    className={`${styles[`dinosaur${selectedDinosaur + 1}Bone`]} ${activeDinosaur === selectedDinosaur ? styles.activeBone : ""
                      }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
