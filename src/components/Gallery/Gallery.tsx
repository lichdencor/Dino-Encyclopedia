import { useState } from "react";
import { GalleryDinosaurNames, Nav } from "../../components";
import { GalleryArrows } from "../GalleryArrows/GalleryArrows";
import { GalleryCurtains } from "./GalleryCurtains";
import { GalleryDinosaurs } from "./GalleryDinosaurs";
import { GalleryXRayModal } from "./GalleryXRayModal";
import { DinosaurInfo, GalleryStyles } from "./types";

interface GalleryProps {
  previousPage: string;
  nextPage: string;
  customStyles: GalleryStyles;
  imagePrefix: string;
  skeletonPrefix: string;
  dinosaursInfo: DinosaurInfo[];
  era: "triassic" | "jurassic" | "cretaceous";
  period: "Early" | "Medium" | "Superior" | "Late";
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

        <GalleryArrows page1={previousPage} page2={nextPage} />
        <GalleryDinosaurNames 
          dinosaurs={dinosaursInfo.map(dino => dino.name)}
          era={era}
          period={period}
        />

        <GalleryDinosaurs 
          customStyles={customStyles}
          onDinosaurClick={handleDinosaurClick}
        />

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