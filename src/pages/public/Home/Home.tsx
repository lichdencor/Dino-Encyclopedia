import "./Home.css";
import { Nav, Carousel, VirtualAssistant, BannerAd } from "../../../components/";
import { VirtualAssistantDialogue } from "../../../data/"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const modalPages = VirtualAssistantDialogue;


export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalCurrentPage, setModalCurrentPage] = useState<number>(0);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalCurrentPage(0);
  };

  const changeModalPage = (page: number) => {
    setModalCurrentPage(page);
  }

  const navigatePage = (route: string) => {
    navigate(route);
  };


  return (
    <div className="homePage">
      <Nav />
      <header>
        <div className="text">
          <div className="header-title">ACADEMIA DEL DINO CULTO</div>
          <div className="header-subtitle">MUSEO INTERACTIVO DE PALEONTOLOGIA</div>
        </div>
      </header>
      <div className="periods-container">

        <Carousel />

        <div className="ticket-purchase-container">
          <img className="star" src="assets/img/ticket/star.png" alt="star" />

          <button className="ticket-wrapper" onClick={() => navigatePage("/store")}>
            <img className="ticket" src="assets/img/ticket/ticket.png" alt="tickets" />
          </button>

          <span>¡Comprá tus entradas!</span>
        </div>


        <div className="dynardContainer">
          {!isModalOpen && (
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
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <img src="assets/giph/logo.gif" alt="logoGiph" className="modalLogoGiph" />
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
        )}

        {/* Banner de publicidad en la parte baja */}
        <BannerAd position="position1" />
      </div>
    </div>
  );
};

