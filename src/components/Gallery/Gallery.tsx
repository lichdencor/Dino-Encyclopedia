import { Component } from "react";
import { GalleryDinosaurNames, Nav } from "../../components";
import { GalleryArrows } from "../GalleryArrows/GalleryArrows";
import { GalleryCurtains } from "./GalleryCurtains";
import { GalleryDinosaurs } from "./GalleryDinosaurs";
import { XRayModal } from "../XRay/XrayModal";
import GalleryTitle from "../GalleryTitle/GalleryTitle";
import { GalleryStyles } from "./types";
import { DinosaurInfo as XRayDinosaurInfo } from "../XRay/types";
import { SubPeriodModel } from "../../models/PeriodModel";
import { GalleryModel } from "./GalleryModel";

interface GalleryProps {
  subPeriodModel: SubPeriodModel;
  customStyles: GalleryStyles;
  previousPage: string;
  nextPage: string;
  imagePrefix: string;
  skeletonPrefix: string;
  era: "triassic" | "jurassic" | "cretaceous";
  period: "Inferior" | "Medium" | "Superior";
}

interface GalleryState {
  activeDinosaur: number | null;
  isModalOpen: boolean;
  selectedDinosaur: number;
  customStyles: GalleryStyles;
  previousPage: string;
  nextPage: string;
  dinosaurNames: string[];
  currentDinosaurInfo: XRayDinosaurInfo;
  era: "triassic" | "jurassic" | "cretaceous";
  period: "Inferior" | "Medium" | "Superior";
  dinosaurImage: string;
  dinosaurBone: string;
}

export class Gallery extends Component<GalleryProps, GalleryState> {
  private model: GalleryModel;
  private unsubscribe: (() => void) | null = null;

  constructor(props: GalleryProps) {
    super(props);
    const { 
      subPeriodModel, 
      customStyles, 
      previousPage, 
      nextPage, 
      imagePrefix, 
      skeletonPrefix, 
      era, 
      period 
    } = props;

    this.model = new GalleryModel(
      subPeriodModel,
      customStyles,
      previousPage,
      nextPage,
      imagePrefix,
      skeletonPrefix,
      era,
      period
    );
    this.state = this.model.getState();
  }

  componentDidMount() {
    this.unsubscribe = this.model.subscribe((state) => {
      this.setState(state);
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleDinosaurClick = (index: number) => {
    this.model.handleDinosaurClick(index);
  };

  closeModal = () => {
    this.model.closeModal();
  };

  setActiveDinosaur = (dinosaur: number | null) => {
    this.model.setActiveDinosaur(dinosaur);
  };

  render() {
    const { 
      activeDinosaur, 
      isModalOpen, 
      selectedDinosaur,
      customStyles,
      previousPage,
      nextPage,
      dinosaurNames,
      currentDinosaurInfo,
      era,
      period,
      dinosaurImage,
      dinosaurBone
    } = this.state;

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

          <GalleryArrows 
            previousPage={previousPage} 
            nextPage={nextPage} 
          />
          
          <GalleryDinosaurNames 
            dinosaurs={dinosaurNames}
            era={era}
            period={period}
          />

          <GalleryDinosaurs 
            customStyles={customStyles}
            onDinosaurClick={this.handleDinosaurClick}
          />

          <GalleryTitle
            period={era}
            subperiod={period}
          />

          <XRayModal
            isOpen={isModalOpen}
            onClose={this.closeModal}
            selectedDinosaur={selectedDinosaur}
            activeDinosaur={activeDinosaur}
            setActiveDinosaur={this.setActiveDinosaur}
            dinosaurInfo={currentDinosaurInfo}
            dinosaurImage={dinosaurImage}
            dinosaurBone={dinosaurBone}
            era={era}
            period={period}
          />
        </div>
      </div>
    );
  }
} 