import "./Home.css";
import { Nav, Carousel, VirtualAssistant } from "../../../components/";
import { VirtualAssistantDialogue } from "../../../data/"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const modalPagesLoaded = VirtualAssistantDialogue;


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
    <div className="home-page">
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
              dialogStyle={{
                width: "20vh",
                height: "10vh",
                textAlign: "center"
              }}
            />
          )}
        </div>


        {isModalOpen && (
          <div className={"modalOverlay"} onClick={closeModal}>
            <button className="dynard-modal-close-btn" onClick={closeModal}>×</button>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <img src="assets/giph/logo.gif" alt="logo-giph" className="modal-logo-giph" />
              <div className="dynard-question">{modalPagesLoaded[modalCurrentPage].question}</div>
              <div className="dynard-options-wrapper">
                {modalPagesLoaded[modalCurrentPage].options.map((option, index) => {
                  const isBack = option.text === "Back";
                  const isButton = option.goesToPageIndex !== undefined;
                  const className = isButton
                    ? `dynard-question-option ${isBack ? "dynard-btn-back" : ""}`
                    : "dynard-question-text";

                  return (
                    <div
                      key={index}
                      className={className}
                      onClick={isButton ? () => changeModalPage(option.goesToPageIndex) : undefined}
                    >
                      {option.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

