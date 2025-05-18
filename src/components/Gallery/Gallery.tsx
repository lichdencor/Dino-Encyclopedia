import { useState } from "react";
import { GalleryDinosaurNames, Nav } from "../../components";
import { GalleryArrows } from "../GalleryArrows/GalleryArrows";
import { GalleryCurtains } from "./GalleryCurtains";
import { GalleryDinosaurs } from "./GalleryDinosaurs";
import { GalleryXRayModal } from "./GalleryXRayModal";
import { DinosaurInfo, GalleryStyles } from "./types";
import styles from './Gallery.module.css';
import GalleryTitle from "../GalleryTitle/GalleryTitle";

interface GalleryProps {
  previousPage: string;
  nextPage: string;
  customStyles: GalleryStyles;
  imagePrefix: string;
  skeletonPrefix: string;
  dinosaursInfo: DinosaurInfo[];
  era: "triassic" | "jurassic" | "cretaceous";
  period: "Inferior" | "Medium" | "Superior";
}

export const Gallery = ({
  previousPage,
  nextPage,
  customStyles,
  imagePrefix,
  skeletonPrefix,
  dinosaursInfo,
  era,
  period
}: GalleryProps) => {
  const [activeDinosaur, setActiveDinosaur] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDinosaur, setSelectedDinosaur] = useState<number>(0);

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
        <GalleryCurtains 
          customStyles={customStyles}
          era={era}
          period={period}
        />
        
        <div className={customStyles.backgroundClass} style={{ pointerEvents: "none" }}></div>

        <GalleryArrows previousPage={previousPage} nextPage={nextPage} />
        <GalleryDinosaurNames 
          dinosaurs={dinosaursInfo.map(dino => dino.name)}
          era={era}
          period={period}
        />

        <GalleryDinosaurs 
          customStyles={customStyles}
          onDinosaurClick={handleDinosaurClick}
        />

        <GalleryTitle
          period={era}
          subperiod={period}
        ></GalleryTitle>

        <GalleryXRayModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedDinosaur={selectedDinosaur}
          activeDinosaur={activeDinosaur}
          setActiveDinosaur={setActiveDinosaur}
          dinosaursInfo={dinosaursInfo}
          imagePrefix={imagePrefix}
          skeletonPrefix={skeletonPrefix}
          era={era}
          period={period}
        />
      </div>
    </div>
  );
}; 