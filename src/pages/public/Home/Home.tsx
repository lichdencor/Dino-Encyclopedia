import "./Home.css";
import { Nav } from "../../../components/";
import DinoDialog from "../../../components/DinoDialog/DinoDialog.tsx";
import {useState} from "react";

const modalPages = [
    {
        question: "¿En que puedo ayudarte?",
        options: [
            {
                text: "opcion 1",
                goesToPageIndex: 1
            },
            {
                text: "opcion 2",
                goesToPageIndex: 2
            },
            {
                text: "opcion 3",
                goesToPageIndex: 3
            },
            {
                text: "opcion 4",
                goesToPageIndex: 4
            },
        ]
    },
    {
        question: "¿En que puedo ayudarte? [opcion 1]",
        options: [
            {
                text: "opcion 1",
                goesToPageIndex: 4
            },
            {
                text: "opcion 2",
                goesToPageIndex: 4
            },
            {
                text: "opcion 3",
                goesToPageIndex: 4
            },
            {
                text: "opcion 4",
                goesToPageIndex: 4
            },
        ]
    },
    {
        question: "¿En que puedo ayudarte? [opcion 2]",
        options: [
            {
                text: "opcion 1",
                goesToPageIndex: 1
            },
            {
                text: "opcion 2",
                goesToPageIndex: 2
            },
            {
                text: "opcion 3",
                goesToPageIndex: 3
            },
            {
                text: "opcion 4",
                goesToPageIndex: 4
            },
        ]
    },
    {
        question: "¿En que puedo ayudarte? [opcion 3]",
        options: [
            {
                text: "opcion 1",
                goesToPageIndex: 1
            },
            {
                text: "opcion 2",
                goesToPageIndex: 2
            },
            {
                text: "opcion 3",
                goesToPageIndex: 3
            },
            {
                text: "opcion 4",
                goesToPageIndex: 4
            },
        ]
    },
    {
        question: "¿En que puedo ayudarte? [opcion 4]",
        options: [
            {
                text: "opcion 1",
                goesToPageIndex: 1
            },
            {
                text: "opcion 2",
                goesToPageIndex: 2
            },
            {
                text: "opcion 3",
                goesToPageIndex: 3
            },
            {
                text: "opcion 4",
                goesToPageIndex: 4
            },
        ]
    }
]

export const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalCurrentPage, setModalCurrentPage] = useState<number>(0);

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
        <div className="period triassic">

        </div>
        <div className="period jurassic">

        </div>
        <div className="period cretaceous">

        </div>

        <div className="dynardContainer">
            <DinoDialog
                onClick={openModal}
                text="¿Necesitas Ayuda?"
                boldWords={["Ayuda"]}
                looped={true}
                dialogStyle={{
                    width: "20vh",
                    height: "10vh",
                    textAlign: "center",
                    opacity: isModalOpen ? "0" : "1"
                }}
            />
        </div>

          {isModalOpen && (
              <div className={"modalOverlay"} onClick={closeModal}>
                  <div
                      className="modalContent"
                      onClick={(e) => e.stopPropagation()}
                  >
                    <div className="dynard-question">{modalPages[modalCurrentPage].question}</div>
                      {modalPages[modalCurrentPage].options.map((option, index) => (
                          <div key={index} className="dynard-question-option" onClick={() => changeModalPage(option.goesToPageIndex)}>{option.text}</div>
                      ))}
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};

