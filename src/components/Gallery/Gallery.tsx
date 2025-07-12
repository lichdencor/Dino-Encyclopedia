import { Component } from "react";
import { GalleryDinosaurFrame, Nav } from "../../components";
import { GalleryArrows } from "../GalleryArrows/GalleryArrows";
import { GalleryCurtains } from "./GalleryCurtains";
import { GalleryDinosaurs } from "./GalleryDinosaurs";
import { XRayModal } from "../XRay/XrayModal";
import GalleryTitle from "../GalleryTitle/GalleryTitle";
import { GalleryStyles } from "./types";
import { SubPeriodModel } from "../../models/PeriodModel";
import { GalleryModel, GalleryState } from "./GalleryModel";
import { GalleryController } from "./GalleryController";

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



export class Gallery extends Component<GalleryProps, GalleryState> {
  private model: GalleryModel;
  private controller: GalleryController;
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
    this.controller = new GalleryController(this.model);
    this.state = this.controller.getState();
  }

  componentDidMount() {
    this.unsubscribe = this.controller.subscribe((state) => {
      this.setState(state);
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleDinosaurClick = (index: number) => {
    this.controller.handleDinosaurClick(index);
  };

  closeModal = () => {
    this.controller.closeModal();
  };

  setActiveDinosaur = (dinosaur: number | null) => {
    this.controller.setActiveDinosaur(dinosaur);
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

          <GalleryDinosaurFrame
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
            onClose={this.closeModal} // mer86
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