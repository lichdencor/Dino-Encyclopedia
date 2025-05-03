import styles from "./Jurassic-Superior.module.css";
import { Gallery } from "../../../components/Gallery/Gallery";
import galleries_data from "../../../context/data/galleries_data.json";

export const JurassicSuperior = () => {
  const customStyles = {
    containerClass: styles.jurassicSuperiorContainer,
    backgroundClass: styles.jurassicSuperiorBg,
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

  const superiorJurassicData = galleries_data.galleries[0].era_jurassic.find(
    (era) => era.period === "Superior Jurassic"
  );

  const dinosaursInfo = superiorJurassicData?.dinosaurs.map(dino => ({
    name: dino.name,
    nombreCientifico: dino.scientific_name,
    altura: dino.height,
    peso: dino.weight,
    clasificacion: dino.clasification,
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
      page1="jurassic-medium"
      page2="cretaceous-inferior"
      customStyles={customStyles}
      imagePrefix="/assets/img/dinosaurs/ju-3-"
      skeletonPrefix="/assets/img/dinosaurs/skeleton/skeleton-jur-3-"
      dinosaursInfo={dinosaursInfo}
    />
  );
};
