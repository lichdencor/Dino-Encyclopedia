import styles from "./Triassic-Medium.module.css";
import { Gallery } from "../../../components/Gallery/Gallery";
import galleries_data from "../../../context/data/galleries_data.json";
import { useProgress } from '../../../context/Progress/ProgressProvider';
import { createDinosaurModel } from '../../../utils/dinosaur';
import { GalleryModel } from '../../../components/Gallery/GalleryModel';
import { SubPeriodModel } from '../../../models/PeriodModel';

export const TriassicMedium = () => {
  const { progress } = useProgress();

  const customStyles = {
    "containerClass": styles["triassicMediumContainer"],
    "backgroundClass": styles["triassicMediumBg"],
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

  const mediumTriassicData = galleries_data.galleries[0].era_triassic.find(
    (era) => era.period === "Triassic Medium"
  );

  if (!mediumTriassicData || !mediumTriassicData.dinosaurs[0]) {
    console.error('No dinosaur data found for Triassic Medium period');
    return null;
  }

  // Create the DinosaurModels with progress data
  const dinosaurs = mediumTriassicData.dinosaurs.map((dino) => {
    return createDinosaurModel(dino, progress);
  });

  // Create the GalleryModel
  const galleryModel = new GalleryModel(
    dinosaurs,
    "triassic-inferior",
    "triassic-superior",
    customStyles,
    "/assets/img/dinosaurs/tr-2-",
    "/assets/img/dinosaurs/skeleton/skeleton-tr-2-",
    "triassic",
    "Medium"
  );

  // Create the SubPeriodModel
  const subPeriod = new SubPeriodModel("Triassic Medium", dinosaurs);

  return <Gallery model={galleryModel} />;
};
