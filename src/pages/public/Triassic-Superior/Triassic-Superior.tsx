import { useState, useEffect } from 'react';
import styles from "./Triassic-Superior.module.css";
import { Gallery } from "../../../components/Gallery/Gallery";
import galleries_data from "../../../context/data/galleries_data.json";
import { TransitionScreen } from '../../../components/TransitionScreen';
import { usePreviousRoute } from '../../../context/NavigationContext';
import { SubPeriodModel, Dinosaur } from "../../../models/PeriodModel";

export const TriassicSuperior = () => {
  const [showTransition, setShowTransition] = useState(false);
  const previousRoute = usePreviousRoute();

  useEffect(() => {
    if (previousRoute === '/jurassic-inferior' || previousRoute === '/map') {
      setShowTransition(true);
    }
  }, [previousRoute]);

  const customStyles = {
    "containerClass": styles["triassicSuperiorContainer"],
    "backgroundClass": styles["triassicSuperiorBg"],
    "dinosaur-bg-1": styles["dinosaur-bg-1"],
    "dinosaur-bg-2": styles["dinosaur-bg-2"],
    "dinosaur-bg-3": styles["dinosaur-bg-3"],
    "dinosaur": styles.dinosaur,
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

  const superiorTriassicData = galleries_data.galleries[0].era_triassic.find(
    (era) => era.period === "Triassic Superior"
  );

  if (!superiorTriassicData) {
    throw new Error("Could not find Triassic Superior data");
  }

  const dinosaurs: Dinosaur[] = superiorTriassicData.dinosaurs.map(dino => ({
    info: {
      name: dino.name,
      scientific_name: dino.scientific_name,
      height: dino.height,
      weight: dino.weight,
      classification: dino.classification,
      diet_type: dino.diet_type,
      speed: dino.speed,
      special_features: dino.special_features,
      defense_attack_mechanism: dino.defense_attack_mechanism,
      fossils_found_in: dino.fossils_found_in,
      social_behaviour: dino.social_behaviour,
      evolutionary_relationship: dino.evolutionary_relationship
    }
  }));

  const subPeriodModel = new SubPeriodModel("Triassic Superior", dinosaurs);

  return (
    <>
      {showTransition && (
        <TransitionScreen 
          eraName="Triassic Period"
          onTransitionEnd={() => setShowTransition(false)} 
        />
      )}
      <Gallery
        subPeriodModel={subPeriodModel}
        customStyles={customStyles}
        previousPage="triassic-medium"
        nextPage="jurassic-inferior"
        imagePrefix="/assets/img/dinosaurs/tr-3-"
        skeletonPrefix="/assets/img/dinosaurs/skeleton/skeleton-tr-3-"
        era="triassic"
        period="Superior"
      />
    </>
  );
};
