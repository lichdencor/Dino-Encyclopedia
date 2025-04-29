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
  const [second1Passed, setSecond1Passed] = useState<boolean>(false);
  const [second2Passed, setSecond2Passed] = useState<boolean>(false);
  const [second3Passed, setSecond3Passed] = useState<boolean>(false);

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

    console.log(dinosaurElements);

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
          className={`${styles.courtains1} ${curtain1IsHovered && second1Passed ? styles.curtainHover : ""}`}
          onMouseEnter={() => {
            setCurtain1IsHovered(true);
            setTimeout(() => setSecond1Passed(true), 1000);
          }}
        >
          <div className={`${styles.leftCurtain} ${curtain1IsHovered && styles.leftCurtainHover}`}></div>
          <div className={`${styles.rightCurtain} ${curtain1IsHovered && styles.rightCurtainHover}`}></div>
        </div>

        {/* Curtain 2 */}
        <div
          className={`${styles.courtains2} ${curtain2IsHovered && second2Passed ? styles.curtainHover : ""}`}
          onMouseEnter={() => {
            setCurtain2IsHovered(true);
            setTimeout(() => setSecond2Passed(true), 1000);
          }}
        >
          <div className={`${styles.leftCurtain} ${curtain2IsHovered && styles.leftCurtainHover}`}></div>
          <div className={`${styles.rightCurtain} ${curtain2IsHovered && styles.rightCurtainHover}`}></div>
        </div>

        {/* Curtain 3 */}
        <div
          className={`${styles.courtains3} ${curtain3IsHovered && second3Passed ? styles.curtainHover : ""}`}
          onMouseEnter={() => {
            setCurtain3IsHovered(true);
            setTimeout(() => setSecond3Passed(true), 1000);
          }}
        >
          <div className={`${styles.leftCurtain} ${curtain3IsHovered && styles.leftCurtainHover}`}></div>
          <div className={`${styles.rightCurtain} ${curtain3IsHovered && styles.rightCurtainHover}`}></div>
        </div>


        <div className={styles.triassicInferiorBg} style={{ pointerEvents: "none" }}></div>

        {/* <VirtualAssistant/> */}
        <GalleryArrows page1="map" page2="triassic-medio" />
        <GalleryDinosaurNames dinosaurs={["Eoraptor", "Postosuchus", "Herrerasaurus"]}></GalleryDinosaurNames>

        {[styles.dinosaurBg1, styles.dinosaurBg2, styles.dinosaurBg3].map((bgClass, index) => {
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
                className={[styles.dinosaurBg1, styles.dinosaurBg2, styles.dinosaurBg3][selectedDinosaur]}
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
