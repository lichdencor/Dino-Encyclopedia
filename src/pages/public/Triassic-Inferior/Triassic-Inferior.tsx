import React, { useState } from "react";
import styles from "./Triassic-Inferior.module.css";
import { Nav, VirtualAssistant } from "../../../components";
import { Link } from "react-router-dom";
import { GalleryArrows } from "../../../components/GalleryArrows/GalleryArrows";
import { GalleryDinosaurNames } from "../../../components/GalleryDinosaurNames/GalleryDinosaurNames";
import galleries_data from "../../../context/data/galleries_data.json";
import { XRayModal } from "../../../components/XRay/XrayModal";

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

        <GalleryArrows page1="map" page2="triassic-medio" />
        <GalleryDinosaurNames dinosaurs={["Eoraptor", "Postosuchus", "Herrerasaurus"]}></GalleryDinosaurNames>

        {[styles.dinosaurBg1, styles.dinosaurBg2, styles.dinosaurBg3].map((bgClass, index) => {
          return (
            <div
              key={index}
              className={bgClass}
              onClick={() => handleDinosaurClick(index)}
            >
              <div className={`${styles.dinosaur} ${styles[`dinosaur${index + 1}`]}`}></div>
            </div>
          );
        })}

        {isModalOpen &&
            <XRayModal
              isOpen={isModalOpen}
              onClose={closeModal}
              selectedDinosaur={selectedDinosaur}
              activeDinosaur={activeDinosaur}
              setActiveDinosaur={setActiveDinosaur}
            />
        }
      </div>
    </div>
  );
};
