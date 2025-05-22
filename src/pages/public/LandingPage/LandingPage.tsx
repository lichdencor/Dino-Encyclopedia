import "./LandingPage.css";
import { AsistenteVirtual, Carousel, Nav, Tutorial } from "../../../components/";
import { Component } from "react";
import { LandingPageModel, LandingPageState } from "./LandingPageModel";
import { LandingPageController } from "./LandingPageController";
import { ProgressData } from "../../../services/progress/types.ts";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useProgress } from "../../../context/Progress/ProgressProvider.tsx";
import { GalleryFrame } from "../../../components/GalleryFrame/GalleryFrame.tsx";

interface LandingPageProps {
    progress: ProgressData;
    navigate: NavigateFunction;
}

export class LandingPageComponent extends Component<LandingPageProps, LandingPageState> {
    private model: LandingPageModel;
    private controller: LandingPageController;
    private unsubscribe: () => void;

    constructor(props: LandingPageProps) {
        super(props);
        this.model = new LandingPageModel();
        this.controller = new LandingPageController(this.model, props.navigate);
        this.unsubscribe = this.model.subscribe(this.handleStateChange.bind(this));
        this.controller.getAllGalleries();
        this.state = this.model.getState();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleStateChange(newState: LandingPageState) {
        this.setState(newState);
    }
    
    render() {
        const modalPages = this.controller.getModalPages();
        const state = this.state as LandingPageState;

        return (
            <div className="homePage">
                <Nav id="main-nav" />
                <div className="home-container">

                    <div className="title-container">
                        <div className="header-title">Cultured Dino Academy</div>
                        <div className="header-subtitle">Interactive Paleontology Museum</div>
                    </div>
                    <div className="periods-container">
                        <Carousel links={state.galleries.map((gallery) => gallery.link)} accessText="Visit" >
                            {state.galleries.map((gallery, index) => (
                                <GalleryFrame key={index} title={gallery.period} image={gallery.image} />
                            ))}
                        </Carousel>
                        <div id="ticket-purchase-container" className="ticket-purchase-container">
                            <div className="ticketImgContainer">
                                <img className="ticketBackground" src="assets/img/alert/alertBorder.png"
                                    alt="ticket background" />
                                <button className="ticket-wrapper"
                                    onClick={() => this.controller.handleNavigateToStore()}>
                                    <img className="ticket" src="assets/img/ticket/ticket.png" alt="tickets" />
                                </button>
                            </div>
                            <span>¡Comprá tus entradas!</span>
                        </div>

                        <div className="dynardContainer">
                            {!this.state.isVirtualAssistantOpen && !this.state.isTutorialOpen && (
                                <AsistenteVirtual
                                    onClick={() => this.controller.handleOpenModal()}
                                    text="¿Necesitas Ayuda?"
                                    boldWords={["Ayuda"]}
                                    looped={true}
                                />
                            )}
                        </div>

                        {state.isVirtualAssistantOpen && (
                            <div className="modal-overlay" onClick={() => this.controller.handleCloseModal()}>
                                <button className="dynardModalCloseBtn" onClick={() => this.controller.handleCloseModal()}>×</button>
                                <div className="modalContentGoldBg">
                                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                        <img src="assets/giph/logo.gif" alt="logoGiph" className="modalLogoGiph" />
                                        <div className="dynardQuestion">{modalPages[state.modalCurrentPage].question}</div>
                                        <div className="dynardOptionsWrapper">
                                            {modalPages[state.modalCurrentPage].options.map((option, index) => {
                                                const isBack = option.text === "Back";
                                                const isButton = option.goesToPageIndex !== undefined;
                                                const className = isButton
                                                    ? `dynardQuestionOption ${isBack ? "dynardBtnBack" : ""}`
                                                    : "dynardQuestionText";

                                                return (
                                                    <div
                                                        key={index}
                                                        className={className}
                                                        onClick={isButton ? () => this.controller.handleChangeModalPage(option.goesToPageIndex) : undefined}
                                                    >
                                                        <p>{option.text}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {state.isTutorialOpen &&
                            <Tutorial onClose={() => this.controller.handleCloseTutorial()} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

// Esto fue necesario para poder usar los hooks useNavigate y useProgress dentro de una Clase.
function withNavigateAndProgress(WrappedComponent: typeof LandingPageComponent) {
    return function WithNavigateComponent() {
        const navigate = useNavigate();
        const { progress } = useProgress();
        return <WrappedComponent progress={progress} navigate={navigate} />;
    };
}

export const LandingPage = withNavigateAndProgress(LandingPageComponent);
