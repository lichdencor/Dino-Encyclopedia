import { useState } from "react";
import { Nav } from "../../components";
import { GalleryArrows } from "../GalleryArrows/GalleryArrows";
import { XRayModal } from "../XRay/XrayModal";

interface DinosaurInfo {
  name: string;
  nombreCientifico: string;
  altura: string;
  peso: string;
  clasificacion: string;
  dieta: string;
  velocidad: string;
  caracteristicas: string;
  naturaleza: string;
  fosiles: string;
  sociabilidad: string;
  relacionEvolutiva: string;
}

interface GalleryProps {
  era: "triassic" | "jurassic" | "cretaceous";
  period: "Early" | "Medium" | "Superior" | "Late";
  page1: string;
  page2: string;
  customStyles: {
    containerClass: string;
    backgroundClass: string;
    dinosaurBg1: string;
    dinosaurBg2: string;
    dinosaurBg3: string;
    dinosaur: string;
    dinosaur1: string;
    dinosaur2: string;
    dinosaur3: string;
    courtains1: string;
    courtains2: string;
    courtains3: string;
    leftCurtain: string;
    rightCurtain: string;
    leftCurtainHover: string;
    rightCurtainHover: string;
    curtainHover: string;
  };
  imagePrefix: string;
  skeletonPrefix: string;
  dinosaursInfo: DinosaurInfo[];
}

export const Gallery = ({
  era,
  period,
  page1,
  page2,
  customStyles,
  imagePrefix,
  skeletonPrefix,
  dinosaursInfo
}: GalleryProps) => {
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

  return (
    <div>
      <Nav />
      <div className={customStyles.containerClass}>
        <div
          className={`${customStyles.courtains1} ${curtain1IsHovered && second1Passed ? customStyles.curtainHover : ""}`}
          onMouseEnter={() => {
            setCurtain1IsHovered(true);
            setTimeout(() => setSecond1Passed(true), 1000);
          }}
        >
          <div className={`${customStyles.leftCurtain} ${curtain1IsHovered && customStyles.leftCurtainHover}`}></div>
          <div className={`${customStyles.rightCurtain} ${curtain1IsHovered && customStyles.rightCurtainHover}`}></div>
        </div>

        <div
          className={`${customStyles.courtains2} ${curtain2IsHovered && second2Passed ? customStyles.curtainHover : ""}`}
          onMouseEnter={() => {
            setCurtain2IsHovered(true);
            setTimeout(() => setSecond2Passed(true), 1000);
          }}
        >
          <div className={`${customStyles.leftCurtain} ${curtain2IsHovered && customStyles.leftCurtainHover}`}></div>
          <div className={`${customStyles.rightCurtain} ${curtain2IsHovered && customStyles.rightCurtainHover}`}></div>
        </div>

        <div
          className={`${customStyles.courtains3} ${curtain3IsHovered && second3Passed ? customStyles.curtainHover : ""}`}
          onMouseEnter={() => {
            setCurtain3IsHovered(true);
            setTimeout(() => setSecond3Passed(true), 1000);
          }}
        >
          <div className={`${customStyles.leftCurtain} ${curtain3IsHovered && customStyles.leftCurtainHover}`}></div>
          <div className={`${customStyles.rightCurtain} ${curtain3IsHovered && customStyles.rightCurtainHover}`}></div>
        </div>

        <div className={customStyles.backgroundClass} style={{ pointerEvents: "none" }}></div>

        <GalleryArrows page1={page1} page2={page2} />

        {[customStyles.dinosaurBg1, customStyles.dinosaurBg2, customStyles.dinosaurBg3].map((bgClass, index) => {
          const dinosaurNumber = `dinosaur${index + 1}` as keyof typeof customStyles;
          return (
            <div
              key={index}
              className={bgClass}
              onClick={() => handleDinosaurClick(index)}
            >
              <div className={`${customStyles.dinosaur} ${customStyles[dinosaurNumber]}`}></div>
            </div>
          );
        })}

        {isModalOpen && dinosaursInfo[selectedDinosaur] &&
          <XRayModal
            isOpen={isModalOpen}
            onClose={closeModal}
            selectedDinosaur={selectedDinosaur}
            activeDinosaur={activeDinosaur}
            setActiveDinosaur={setActiveDinosaur}
            dinosaurInfo={dinosaursInfo[selectedDinosaur]}
            dinosaurImage={`${imagePrefix}${dinosaursInfo[selectedDinosaur].name}.png`}
            dinosaurBone={`${skeletonPrefix}${dinosaursInfo[selectedDinosaur].name}.png`}
          />
        }
      </div>
    </div>
  );
}; 