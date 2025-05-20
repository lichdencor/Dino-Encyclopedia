import React, { useState, useEffect } from 'react';
import styles from "./Cretaceous-Inferior.module.css";
import { Gallery } from "../../../components/Gallery/Gallery";
import galleries_data from "../../../context/data/galleries_data.json";
import { TransitionScreen } from '../../../components/TransitionScreen';
import { usePreviousRoute } from '../../../context/NavigationContext';
import { useProgress } from '../../../context/Progress/ProgressProvider';
import { createDinosaurModel } from '../../../utils/dinosaur';
import { GalleryModel } from '../../../components/Gallery/GalleryModel';
import { SubPeriodModel } from '../../../models/PeriodModel';

export const CretaceousInferior = () => {
  const previousRoute = usePreviousRoute();
  const [showTransition, setShowTransition] = useState(false);
  const { progress } = useProgress();

  useEffect(() => {
    if (previousRoute === '/jurassic-superior' || previousRoute === '/map') {
      setShowTransition(true);
    }
  }, [previousRoute]);

  const customStyles = {
    "containerClass": styles["cretaceousInferiorContainer"],
    "backgroundClass": styles["cretaceousInferiorBg"],
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

  const inferiorCretaceousData = galleries_data.galleries[0].era_cretaceous.find(
    (era) => era.period === "Cretaceous Inferior"
  );

  if (!inferiorCretaceousData || !inferiorCretaceousData.dinosaurs[0]) {
    console.error('No dinosaur data found for Cretaceous Inferior period');
    return null;
  }

  // Create the DinosaurModels with progress data
  const dinosaurs = inferiorCretaceousData.dinosaurs.map((dino) => {
    return createDinosaurModel({ ...dino, id: dino.name }, progress);
  });

  // Create the GalleryModel
  const galleryModel = new GalleryModel(
    dinosaurs,
    "jurassic-superior",
    "cretaceous-medium",
    customStyles,
    "/assets/img/dinosaurs/cr-1-",
    "/assets/img/dinosaurs/skeleton/skeleton-cr-1-",
    "cretaceous",
    "Inferior"
  );

  // Create the SubPeriodModel
  const subPeriod = new SubPeriodModel("Cretaceous Inferior", dinosaurs);

  const handleTransitionEnd = () => {
    setShowTransition(false);
  };

  return (
    <>
      {showTransition && (
        <TransitionScreen 
          eraName="Cretaceous Period" 
          onTransitionEnd={handleTransitionEnd} 
        />
      )}
      <Gallery model={galleryModel} />
    </>
  );
};

export default CretaceousInferior;
