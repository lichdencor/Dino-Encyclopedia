import React, { useState, useEffect } from 'react';
import styles from "./Jurassic-Inferior.module.css";
import { Gallery } from "../../../components/Gallery/Gallery";
import galleries_data from "../../../context/data/galleries_data.json";
import { TransitionScreen } from '../../../components/TransitionScreen';
import { usePreviousRoute } from '../../../context/NavigationContext';
import { useProgress } from '../../../context/Progress/ProgressProvider';
import { createDinosaurModel } from '../../../utils/dinosaur';
import { GalleryModel } from '../../../components/Gallery/GalleryModel';
import { SubPeriodModel } from '../../../models/PeriodModel';

export const JurassicInferior = () => {
  const [showTransition, setShowTransition] = useState(false);
  const previousRoute = usePreviousRoute();
  const { progress } = useProgress();

  useEffect(() => {
    if (previousRoute === '/triassic-superior' || previousRoute === '/map') {
      setShowTransition(true);
    }
  }, [previousRoute]);

  const customStyles = {
    "containerClass": styles["jurassicInferiorContainer"],
    "backgroundClass": styles["jurassicInferiorBg"],
    "dinosaur-bg-1": styles["dinosaur-bg-1"],
    "dinosaur-bg-2": styles["dinosaur-bg-2"],
    "dinosaur-bg-3": styles["dinosaur-bg-3"],
    dinosaur: styles.dinosaur,
    "dinosaur-1": styles["dinosaur-1"],
    "dinosaur-2": styles["dinosaur-2"],
    "dinosaur-3": styles["dinosaur-3"],
    "courtains-1": styles["courtains-1"],
    "courtains-2": styles["courtains-2"],
    "courtains-3": styles["courtains-3"],
    "left-curtain": styles["left-curtain"],
    "right-curtain": styles["right-curtain"],
    "left-curtain-hover": styles["left-curtain-hover"],
    "right-curtain-hover": styles["right-curtain-hover"],
    "curtain-hover": styles["curtain-hover"],
  };

  const inferiorJurassicData = galleries_data.galleries[0].era_jurassic.find(
    (era) => era.period === "Jurassic Inferior"
  );

  if (!inferiorJurassicData || !inferiorJurassicData.dinosaurs[0]) {
    console.error('No dinosaur data found for Jurassic Inferior period');
    return null;
  }

  // Create the DinosaurModels with progress data
  const dinosaurs = inferiorJurassicData.dinosaurs.map((dino) => {
    return createDinosaurModel(dino, progress);
  });

  // Create the GalleryModel
  const galleryModel = new GalleryModel(
    dinosaurs,
    "triassic-superior",
    "jurassic-medium",
    customStyles,
    "/assets/img/dinosaurs/ju-1-",
    "/assets/img/dinosaurs/skeleton/skeleton-jur-1-",
    "jurassic",
    "Inferior"
  );

  // Create the SubPeriodModel
  const subPeriod = new SubPeriodModel("Jurassic Inferior", dinosaurs);

  const handleTransitionEnd = () => {
    setShowTransition(false);
  };

  return (
    <>
      {showTransition && (
        <TransitionScreen 
          eraName="Jurassic Period" 
          onTransitionEnd={handleTransitionEnd} 
        />
      )}
      <Gallery model={galleryModel} />
    </>
  );
};

export default JurassicInferior;
