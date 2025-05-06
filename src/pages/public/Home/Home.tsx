import "./Home.css";
import {Nav, Carousel, VirtualAssistant, BannerAd, Tutorial} from "../../../components/";
import {VirtualAssistantDialogue} from "../../../data/"
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const modalPages = VirtualAssistantDialogue;

export const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalCurrentPage, setModalCurrentPage] = useState<number>(0);
    const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalCurrentPage(0);
    };

    const changeModalPage = (page: number) => {
        if (page === -1) { // Asumiendo que -1 es el índice para el tutorial
            closeModal();
            setIsTutorialOpen(true);
        } else {
            setModalCurrentPage(page);
        }
    }

    const closeTutorial = () => {
        setIsTutorialOpen(false);
    };

    const navigatePage = (route: string) => {
        navigate(route);
    };

    return (
        <div className="homePage">
            <Nav id="main-nav"/>
            <header>
                <div className="text">
                    <div className="header-title">ACADEMIA DEL DINO CULTO</div>
                    <div className="header-subtitle">MUSEO INTERACTIVO DE PALEONTOLOGIA</div>
                </div>
            </header>
            <div className="periods-container">

                <Carousel/>

                <div id="ticket-purchase-container" className="ticket-purchase-container">
                    <div className="ticketImgContainer">
                        <img className="ticketBackground" src="assets/img/alert/alertBorder.png"
                             alt="ticket background"/>

                        <button className="ticket-wrapper" onClick={() => navigatePage("/store")}>
                            <img className="ticket" src="assets/img/ticket/ticket.png" alt="tickets"/>
                        </button>
                    </div>

                    <span>¡Comprá tus entradas!</span>
                </div>

                <div className="dynardContainer">
                    {!isModalOpen && !isTutorialOpen && (
                        <VirtualAssistant
                            onClick={openModal}
                            text="¿Necesitas Ayuda?"
                            boldWords={["Ayuda"]}
                            looped={true}
                        />
                    )}
                </div>

                {isModalOpen && (
                    <div className={"modalOverlay"} onClick={closeModal}>
                        <button className="dynardModalCloseBtn" onClick={closeModal}>×</button>
                        <div className="modalContentGoldBg">
                            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                                <img src="assets/giph/logo.gif" alt="logoGiph" className="modalLogoGiph"/>
                                <div className="dynardQuestion">{modalPages[modalCurrentPage].question}</div>
                                <div className="dynardOptionsWrapper">
                                    {modalPages[modalCurrentPage].options.map((option, index) => {
                                        const isBack = option.text === "Back";
                                        const isButton = option.goesToPageIndex !== undefined;
                                        const className = isButton
                                            ? `dynardQuestionOption ${isBack ? "dynardBtnBack" : ""}`
                                            : "dynardQuestionText";

                                        return (
                                            <div
                                                key={index}
                                                className={className}
                                                onClick={isButton ? () => changeModalPage(option.goesToPageIndex) : undefined}
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

                {isTutorialOpen && <Tutorial onClose={closeTutorial}/>}

                {/* Banner de publicidad en la parte baja */}
                <BannerAd position="position1"/>
            </div>
        </div>
    );
};

