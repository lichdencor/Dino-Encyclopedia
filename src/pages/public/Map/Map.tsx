import { Component } from "react";
import "./Map.css";
import { Nav, PeriodsButtonHover } from "../../../components/";
import { PeriodsButtonPremium } from "../../../components/PeriodsButtonPremium/PeriodsButtonPremium";
import { MapModel, MapState } from "./MapModel";
import { MapController } from "./MapController";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom";
import { useProgress } from "../../../context/Progress/ProgressProvider";
import { useAuth } from "../../../context/Auth/AuthProvider";
import { ProgressData } from "../../../services/progress/types";
import { ProgressBar } from "../../../components/ProgressBar/ProgressBar";

interface MapProps {
    progress: ProgressData;
    navigate: NavigateFunction;
    isGuest: boolean;
}

interface MapComponentState {
    state: MapState;
}

class MapComponent extends Component<MapProps, MapComponentState> {
    private model: MapModel;
    private controller: MapController;
    private unsubscribe: (() => void) | null = null;

    constructor(props: MapProps) {
        super(props);
        
        this.model = new MapModel(props.progress);
        this.controller = new MapController(this.model, props.navigate);
        
        this.state = {
            state: this.model.getState()
        };
    }

    componentDidMount() {
        this.unsubscribe = this.model.subscribe((newState) => {
            this.setState({ state: newState });
        });
        this.model.initialize();
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render() {
        const { state } = this.state;
        const { isGuest } = this.props;
        
        return (
            <div className="mapPage">
                <Nav />
                <div className="map">
                    {!isGuest && (
                        <div className="progress-container">
                            <ProgressBar imgSrc="/public/assets/img/achievements/bronze/achievement-periods-explorer-bronze.png" progress={23}></ProgressBar>
                        </div>
                    )}
                    <div className="periodTitleGoldBg period1Container">
                        <img src="/public/assets/img/map/period1Paws.png" alt="period level" />
                        <div className="periodTitleFrame periodTitleFrame1">
                            Triassic
                            <br />
                            Period
                        </div>
                    </div>

                    <div className="periodTitleGoldBg period2Container">
                        <img src="/public/assets/img/map/period2Paws.png" alt="period level" />
                        <div className="periodTitleFrame periodTitleFrame2">
                            Jurassic
                            <br />
                            Period
                        </div>
                    </div>

                    <div className="periodTitleGoldBg period3Container">
                        <img src="/public/assets/img/map/period3Paws.png" alt="period level" />
                        <div className="periodTitleFrame periodTitleFrame3">
                            Cretaceous
                            <br />
                            Period
                        </div>
                    </div>
                </div>
                <img src="/public/assets/img/map/raptor-bites.png" alt="Raptor Bites" className="raptorBites" />

                {/* COMMON ROOMS */}
                <PeriodsButtonHover stage="main-entrance" label="main entrance" />

                <PeriodsButtonHover stage="entrance" label="entrance" infoOrientation="left" />

                <PeriodsButtonHover
                    stage="library"
                    label="library"
                    link="/library"
                    onNavigate={(route) => this.controller.navigateToGallery(route)}
                />

                <PeriodsButtonHover
                    stage="store"
                    label="store"
                    link="/store"
                    onNavigate={(route) => this.controller.navigateToGallery(route)}
                />

                <PeriodsButtonPremium stage="kids-room" label="kids-room" />

                <PeriodsButtonHover stage="restroom restroom-1" label="restroom" />

                <PeriodsButtonHover stage="restroom restroom-2" label="restroom" />

                <PeriodsButtonHover stage="restroom restroom-3" label="restroom" />

                {/* STAGES */}
                <PeriodsButtonHover
                    stage="stage-1"
                    label="inferior gallery"
                    link="/triassic-inferior"
                    dinos={[
                        "info-triassic-1-dino-1 small-dino",
                        "info-triassic-1-dino-2 medium-dino",
                        "info-triassic-1-dino-3 big-dino"
                    ]}
                    displayNames={state.displayNames['triassic-inferior']}
                    discoveredSilhouettes={state.discoveredSilhouettes['triassic-inferior']}
                    onNavigate={(route) => this.controller.navigateToGallery(route)}
                />
                <PeriodsButtonHover
                    stage="stage-2"
                    label="medium gallery"
                    link="/triassic-medium"
                    dinos={[
                        "info-triassic-2-dino-1 small-dino",
                        "info-triassic-2-dino-2 medium-dino",
                        "info-triassic-2-dino-3 big-dino"
                    ]}
                    displayNames={state.displayNames['triassic-medium']}
                    discoveredSilhouettes={state.discoveredSilhouettes['triassic-medium']}
                    onNavigate={(route) => this.controller.navigateToGallery(route)}
                />
                <PeriodsButtonHover
                    stage="stage-3"
                    label="superior gallery"
                    link="/triassic-superior"
                    dinos={[
                        "info-triassic-3-dino-1 small-dino",
                        "info-triassic-3-dino-2 big-dino",
                        "info-triassic-3-dino-3 medium-dino",
                    ]}
                    displayNames={state.displayNames['triassic-superior']}
                    discoveredSilhouettes={state.discoveredSilhouettes['triassic-superior']}
                    onNavigate={(route) => this.controller.navigateToGallery(route)}
                />
                <PeriodsButtonHover
                    stage="stage-4"
                    label="inferior gallery"
                    link="/jurassic-inferior"
                    dinos={[
                        "info-jurassic-1-dino-1 medium-dino",
                        "info-jurassic-1-dino-2 small-dino",
                        "info-jurassic-1-dino-3 big-dino",
                    ]}
                    displayNames={state.displayNames['jurassic-inferior']}
                    discoveredSilhouettes={state.discoveredSilhouettes['jurassic-inferior']}
                    onNavigate={(route) => this.controller.navigateToGallery(route)}
                />
                <PeriodsButtonHover
                    stage="stage-5"
                    label="medium gallery"
                    link="/jurassic-medium"
                    dinos={[
                        "info-jurassic-2-dino-1 small-dino",
                        "info-jurassic-2-dino-2 big-dino",
                        "info-jurassic-2-dino-3 medium-dino",
                    ]}
                    infoOrientation="left"
                    displayNames={state.displayNames['jurassic-medium']}
                    discoveredSilhouettes={state.discoveredSilhouettes['jurassic-medium']}
                    onNavigate={(route) => this.controller.navigateToGallery(route)}
                />
                <PeriodsButtonHover
                    stage="stage-6"
                    label="superior gallery"
                    link="/jurassic-superior"
                    dinos={[
                        "info-jurassic-3-dino-1 big-dino",
                        "info-jurassic-3-dino-2 medium-dino",
                        "info-jurassic-3-dino-3 small-dino",
                    ]}
                    infoOrientation="left"
                    displayNames={state.displayNames['jurassic-superior']}
                    discoveredSilhouettes={state.discoveredSilhouettes['jurassic-superior']}
                    onNavigate={(route) => this.controller.navigateToGallery(route)}
                />
                <PeriodsButtonHover
                    stage="stage-7"
                    label="inferior gallery"
                    link="/cretaceous-inferior"
                    dinos={[
                        "info-cretaceous-1-dino-1 big-dino",
                        "info-cretaceous-1-dino-2 small-dino",
                        "info-cretaceous-1-dino-3 medium-dino",
                    ]}
                    infoOrientation="left"
                    displayNames={state.displayNames['cretaceous-inferior']}
                    discoveredSilhouettes={state.discoveredSilhouettes['cretaceous-inferior']}
                    onNavigate={(route) => this.controller.navigateToGallery(route)}
                />
                <PeriodsButtonHover
                    stage="stage-8"
                    label="medium gallery"
                    link="/cretaceous-medium"
                    dinos={[
                        "info-cretaceous-2-dino-1 big-dino",
                        "info-cretaceous-2-dino-2 medium-dino",
                        "info-cretaceous-2-dino-3 small-dino",
                    ]}
                    infoOrientation="left"
                    displayNames={state.displayNames['cretaceous-medium']}
                    discoveredSilhouettes={state.discoveredSilhouettes['cretaceous-medium']}
                    onNavigate={(route) => this.controller.navigateToGallery(route)}
                />
                <PeriodsButtonHover
                    stage="stage-9"
                    label="superior gallery"
                    link="/cretaceous-superior"
                    dinos={[
                        "info-cretaceous-3-dino-1 medium-dino",
                        "info-cretaceous-3-dino-2 small-dino",
                        "info-cretaceous-3-dino-3 big-dino",
                    ]}
                    infoOrientation="left"
                    displayNames={state.displayNames['cretaceous-superior']}
                    discoveredSilhouettes={state.discoveredSilhouettes['cretaceous-superior']}
                    onNavigate={(route) => this.controller.navigateToGallery(route)}
                />
            </div>
        );
    }
}

// Esto fue necesario para poder usar los hooks useNavigate y useProgress dentro de una Clase.
function withNavigateAndProgress(WrappedComponent: typeof MapComponent) {
    return function WithNavigateComponent() {
        const navigate = useNavigate();
        const { progress } = useProgress();
        const { isGuest } = useAuth();
        return <WrappedComponent progress={progress} navigate={navigate} isGuest={isGuest} />;
    };
}

export const Map = withNavigateAndProgress(MapComponent);
