import React, { useState } from "react";
import styles from "./Triassic-Inferior.module.css";
import { Nav, VirtualAssistant } from "../../../components";
import { Link } from "react-router-dom";
import { GalleryArrows } from "../../../components/GalleryArrows/GalleryArrows";
import { GalleryDinosaurNames } from "../../../components/GalleryDinosaurNames/GalleryDinosaurNames";
import galleries_data from "../../../context/data/galleries_data.json";
import { XRayModal } from "../../../components/XRay/XrayModal";

// const dinosaurs = galleries_data["galleries"][0][]

export const TriassicInferior = () => {
  const [activeDinosaur, setActiveDinosaur] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDinosaur, setSelectedDinosaur] = useState<number>(0);
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
    setSelectedDinosaur(0);
  };

  const dinosaursInfo = [
    {
      nombreCientifico: "Eoraptor lunensis",
      altura: "50 cm",
      peso: "9–10 kg",
      clasificacion: "Saurisquio, Herrerasáurido",
      dieta: "Omnívoro (animales, insectos, plantas)",
      velocidad: "Hasta 40 km/h",
      caracteristicas: "Ágil, liviano, con garras y mordida rápida",
      naturaleza: "Dientes afilados y garras prensiles",
      fosiles: "Argentina, Formación Ischigualasto",
      sociabilidad: "Solitario o grupos pequeños",
      relacionEvolutiva: "Primitivo, cercano a terópodos y saurópodos"
    },
    {
      nombreCientifico: "Herrerasaurus",
      altura: "1,0–1,3 metros (a la cadera)",
      peso: "180–210 kg",
      clasificacion: "Saurisquio, Herrerasáurido",
      dieta: "Carnívoro (principalmente pequeños vertebrados y posiblemente otros dinosaurios)",
      velocidad: "Hasta 30–40 km/h (estimado)",
      caracteristicas: "Ágil, cuerpo alargado, extremidades fuertes, cráneo largo, dientes aserrados",
      naturaleza: "Dientes afilados y garras grandes en las manos",
      fosiles: "Argentina, Formación Ischigualasto",
      sociabilidad: "Probablemente solitario",
      relacionEvolutiva: "Uno de los dinosaurios más primitivos, relacionado con los saurópodos y terópodos"
    },
    {
      nombreCientifico: "Postosuchus",
      altura: "1,2 metros (a la cadera)",
      peso: "250–300 kg",
      clasificacion: "Arcosaurio, Rauisuquio",
      dieta: "Carnívoro (principalmente otros reptiles y dinosaurios primitivos)",
      velocidad: "Hasta 40 km/h (estimado)",
      caracteristicas: "Cuerpo robusto, fuerte mordida, extremidades potentes, placas óseas en la espalda",
      naturaleza: "Dientes afilados y garras curvas",
      fosiles: "Estados Unidos, Texas y Nuevo México (Formación Cooper Canyon)",
      sociabilidad: "Posiblemente solitario",
      relacionEvolutiva: "Arcosaurio primitivo, más cercano a cocodrilos modernos que a dinosaurios"
    },
  ];

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
              // onMouseMove={(e) => handleMouseMove(e, index)}
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
              dinosaurInfo={dinosaursInfo[selectedDinosaur]}
            />
        }
      </div>
    </div>
  );
};
