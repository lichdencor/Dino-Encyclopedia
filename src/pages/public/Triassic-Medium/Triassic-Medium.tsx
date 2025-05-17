import styles from "./Triassic-Medium.module.css";
import { Gallery } from "../../../components/Gallery/Gallery";
import galleries_data from "../../../context/data/galleries_data.json";

export const TriassicMedium = () => {
  const customStyles = {
    containerClass: styles.triassicMediumContainer,
    backgroundClass: styles.triassicMediumBg,
    dinosaurBg1: styles.dinosaurBg1,
    dinosaurBg2: styles.dinosaurBg2,
    dinosaurBg3: styles.dinosaurBg3,
    dinosaur: styles.dinosaur,
    dinosaur1: styles.dinosaur1,
    dinosaur2: styles.dinosaur2,
    dinosaur3: styles.dinosaur3,
    courtains1: styles.courtains1,
    courtains2: styles.courtains2,
    courtains3: styles.courtains3,
    leftCurtain: styles.leftCurtain,
    rightCurtain: styles.rightCurtain,
    leftCurtainHover: styles.leftCurtainHover,
    rightCurtainHover: styles.rightCurtainHover,
    curtainHover: styles.curtainHover,
  };

  const mediumTriassicData = galleries_data.galleries[0].era_triassic.find(
    (era) => era.period === "Triassic Medium"
  );

  const dinosaursInfo = mediumTriassicData?.dinosaurs.map(dino => ({
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

  return (
    <Gallery
      previousPage="triassic-inferior"
      nextPage="triassic-superior"
      customStyles={customStyles}
      imagePrefix="/assets/img/dinosaurs/tr-2-"
      skeletonPrefix="/assets/img/dinosaurs/skeleton/skeleton-tr-2-"
      dinosaursInfo={dinosaursInfo}
      era="triassic"
      period="Medium"
    />
  );
};
