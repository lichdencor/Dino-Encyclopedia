import "./LandingPage.css";
import {Nav, Carousel, AsistenteVirtual, Tutorial} from "../../../components/";
import {VirtualAssistantDialogue} from "../../../data/"
import React from "react";
import {useNavigate} from "react-router-dom";

const modalPages = VirtualAssistantDialogue;

interface LandingPageState {
    isModalOpen: boolean;
    modalCurrentPage: number;
    isTutorialOpen: boolean;
}

interface LandingPageProps {
    navigate: (route: string) => void;
}

export class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
    constructor(props: LandingPageProps) {
        super(props);
        this.state = {
            isModalOpen: false,
            modalCurrentPage: 0,
            isTutorialOpen: false
        };
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ 
            isModalOpen: false,
            modalCurrentPage: 0
        });
    };

    changeModalPage = (page: number) => {
        if (page === -1) {
            this.closeModal();
            this.setState({ isTutorialOpen: true });
        } else {
            this.setState({ modalCurrentPage: page });
        }
    };

    closeTutorial = () => {
        this.setState({ isTutorialOpen: false });
    };

    navigatePage = (route: string) => {
        this.props.navigate(route);
    };

    mostrarNav = () => {
        return <Nav id="main-nav"/>;
    };

    cargarCarousel = () => {
        return <Carousel/>;
    };

    mostrarAccesoATienda = () => {
        return <div id="ticket-purchase-container" className="ticket-purchase-container">
            <div className="ticketImgContainer">
                <img className="ticketBackground" src="assets/img/alert/alertBorder.png"
                     alt="ticket background"/>

                <button className="ticket-wrapper" onClick={() => this.navigatePage("/store")}>
                    <img className="ticket" src="assets/img/ticket/ticket.png" alt="tickets"/>
                </button>
            </div>

            <span>¡Comprá tus entradas!</span>
        </div>;
    };

    cargarAccesoAsistenteVirtual = () => {
        return <div className="dynardContainer">
            {!this.state.isModalOpen && !this.state.isTutorialOpen && (
                <AsistenteVirtual
                    onClick={this.openModal}
                    text="¿Necesitas Ayuda?"
                    boldWords={["Ayuda"]}
                    looped={true}
                />
            )}
        </div>;
    };

    accederTutorial = () => {
        return <Tutorial onClose={this.closeTutorial}/>;
    };

    render() {
        return (
            <div className="homePage">
                {this.mostrarNav()}
                <header>
                    <div className="text">
                        <div className="header-title">ACADEMIA DEL DINO CULTO</div>
                        <div className="header-subtitle">MUSEO INTERACTIVO DE PALEONTOLOGIA</div>
                    </div>
                </header>
                <div className="periods-container">
                    {this.cargarCarousel()}
                    {this.mostrarAccesoATienda()}
                    {this.cargarAccesoAsistenteVirtual()}

                    {this.state.isModalOpen && (
                        <div className={"modalOverlay"} onClick={this.closeModal}>
                            <button className="dynardModalCloseBtn" onClick={this.closeModal}>×</button>
                            <div className="modalContentGoldBg">
                                <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                                    <img src="assets/giph/logo.gif" alt="logoGiph" className="modalLogoGiph"/>
                                    <div className="dynardQuestion">{modalPages[this.state.modalCurrentPage].question}</div>
                                    <div className="dynardOptionsWrapper">
                                        {modalPages[this.state.modalCurrentPage].options.map((option, index) => {
                                            const isBack = option.text === "Back";
                                            const isButton = option.goesToPageIndex !== undefined;
                                            const className = isButton
                                                ? `dynardQuestionOption ${isBack ? "dynardBtnBack" : ""}`
                                                : "dynardQuestionText";

                                            return (
                                                <div
                                                    key={index}
                                                    className={className}
                                                    onClick={isButton ? () => this.changeModalPage(option.goesToPageIndex) : undefined}
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

                    {this.state.isTutorialOpen && this.accederTutorial()}
                </div>
            </div>
        );
    }
}

// HOC para manejar la navegación
export const withNavigation = (WrappedComponent: typeof LandingPage) => {
    return function WithNavigationComponent(props: Omit<LandingPageProps, 'navigate'>) {
        const navigate = useNavigate();
        return <WrappedComponent {...props} navigate={navigate} />;
    };
};

// Exportar el componente envuelto con la navegación
export default withNavigation(LandingPage);

