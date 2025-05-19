import { Component } from "react";
import { GalleryDinosaurNames, Nav } from "../../components";
import { GalleryArrows } from "../GalleryArrows/GalleryArrows";
import { GalleryCurtains } from "./GalleryCurtains";
import { GalleryDinosaurs } from "./GalleryDinosaurs";
import { GalleryXRayModal } from "./GalleryXRayModal";
import { DinosaurInfo as GalleryDinosaurInfo } from "./types";
import { GalleryModel, GalleryState } from "./GalleryModel";
import { GalleryController } from "./GalleryController";
import { DinosaurInfo as ModelDinosaurInfo } from "../../models/PeriodModel";
import GalleryTitle from "../GalleryTitle/GalleryTitle";

function adaptDinosaurInfo(info: ModelDinosaurInfo): GalleryDinosaurInfo {
  return {
    name: info.name,
    nombreCientifico: info.scientific_name,
    altura: info.height,
    peso: info.weight,
    clasificacion: info.classification,
    dieta: info.diet_type,
    velocidad: info.speed,
    caracteristicas: info.special_features,
    naturaleza: info.defense_attack_mechanism,
    fosiles: info.fossils_found_in,
    sociabilidad: info.social_behaviour,
    relacionEvolutiva: info.evolutionary_relationship
  };
}

interface GalleryProps {
  model: GalleryModel;
}

interface GalleryComponentState {
  state: GalleryState;
}

export class Gallery extends Component<GalleryProps, GalleryComponentState> {
  private controller: GalleryController;

  constructor(props: GalleryProps) {
    super(props);
    this.controller = new GalleryController(props.model);
    this.state = {
      state: props.model.getState()
    };
    props.model.subscribe(this.handleStateChange);
  }

  handleStateChange = (newState: GalleryState) => {
    this.setState({ state: newState });
  }

  render() {
    const { state } = this.state;
    const { model } = this.props;
    const dinosaurs = model.dinosaurs;
    
    if (!dinosaurs || dinosaurs.length === 0) {
      console.error('Gallery: dinosaurs array is required but was not provided or is empty');
      return null;
    }

    const dinosaursInfo = dinosaurs.map(dinosaur => adaptDinosaurInfo(dinosaur.info));

    return (
      <div>
        <Nav />
        <div className={model.customStyles.containerClass}>
          <GalleryCurtains 
            customStyles={model.customStyles}
            era={model.era}
            period={model.period}
          />
          
          <div className={model.customStyles.backgroundClass} style={{ pointerEvents: "none" }}></div>

          <GalleryArrows previousPage={model.previousPage} nextPage={model.nextPage} />
          <GalleryDinosaurNames 
            dinosaurs={dinosaurs}
            era={model.era}
            period={model.period}
          />

          <GalleryDinosaurs 
            customStyles={model.customStyles}
            onDinosaurClick={(index) => this.controller.handleDinosaurClick(index)}
          />

          <GalleryTitle
            period={model.era}
            subperiod={model.period}
          />

          <GalleryXRayModal
            isOpen={state.isModalOpen}
            onClose={() => this.controller.handleModalClose()}
            selectedDinosaur={state.selectedDinosaur}
            activeDinosaur={state.activeDinosaur}
            setActiveDinosaur={(index) => this.controller.handleDinosaurHover(index)}
            dinosaursInfo={dinosaursInfo}
            imagePrefix={model.imagePrefix}
            skeletonPrefix={model.skeletonPrefix}
            era={model.era}
            period={model.period}
          />
        </div>
      </div>
    );
  }
} 