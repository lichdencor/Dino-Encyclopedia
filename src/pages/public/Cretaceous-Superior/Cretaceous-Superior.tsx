import React, { useState, useEffect } from 'react';
import styles from "./Cretaceous-Superior.module.css";
import { Gallery } from "../../../components/Gallery/Gallery";
import galleries_data from "../../../context/data/galleries_data.json";
import { TransitionScreen } from '../../../components/TransitionScreen';
import { usePreviousRoute } from '../../../context/NavigationContext';

export const CretaceousSuperior = () => {
  const [showTransition, setShowTransition] = useState(false);
  const previousRoute = usePreviousRoute();

  useEffect(() => {
    if (previousRoute === '/map') {
      setShowTransition(true);
    }
  }, [previousRoute]);

  const customStyles = {
    "containerClass": styles["cretaceous-superior-container"],
    "backgroundClass": styles["cretaceous-superior-bg"],
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

  const superiorCretaceousData = galleries_data.galleries[0].era_cretaceous.find(
    (era) => era.period === "Cretaceous Superior"
  );

  const dinosaursInfo = superiorCretaceousData?.dinosaurs.map(dino => ({
    name: dino.name,
    nombreCientifico: dino.scientific_name,
    altura: dino.height,
    peso: dino.weight,
    clasificacion: dino.classification,
    dieta: dino.diet_type,
    velocidad: dino.speed,
    caracteristicas: dino.special_features,
    naturaleza: dino.defense_attack_mechanism,
    fosiles: dino.fossils_found_in,
    sociabilidad: dino.social_behaviour,
    relacionEvolutiva: dino.evolutionary_relationship
  })) || [];

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
      <Gallery
        previousPage="cretaceous-medium"
        nextPage="map"
        customStyles={customStyles}
        imagePrefix="/assets/img/dinosaurs/cr-3-"
        skeletonPrefix="/assets/img/dinosaurs/skeleton/skeleton-cr-3-"
        dinosaursInfo={dinosaursInfo}
        era="cretaceous"
        period="Superior"
      />
    </>
  );
};
