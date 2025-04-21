import "./Home.css";
import { Nav } from "../../../components/";
import DinoDialog from "../../../components/DinoDialog/DinoDialog.tsx";
import {useState} from "react";

const modalPages = [
    {
        question: "¿En que puedo ayudarte?",
        options: [
            {
                text: "Tutorial",
                goesToPageIndex: 0
            },
            {
                text: "Mi Cuenta",
                goesToPageIndex: 1
            },
            {
                text: "Explorar el Museo",
                goesToPageIndex: 2
            },
            {
                text: "Juegos",
                goesToPageIndex: 3
            },
            {
                text: "Tienda y Canjes",
                goesToPageIndex: 4
            },
            {
                text: "Contenido Interactivo",
                goesToPageIndex: 5
            }
        ]
    },
    {
        question: "¿En qué te puedo ayudar con tu cuenta?",
        options: [
            {
                text: "Registro",
                goesToPageIndex: 2
            },
            {
                text: "Inicio de sesión",
                goesToPageIndex: 4
            },
            {
                text: "Perfil",
                goesToPageIndex: 4
            },
            {
                text: "Mascota",
                goesToPageIndex: 4
            },
            {
                text: "Tokens",
                goesToPageIndex: 5
            }
        ]
    },
    {
        question: "¿En qué te puedo ayudar con el registro?",
        options: [
            {
                text: "¿Cómo me registro en la plataforma?",
                goesToPageIndex: 4
            },
            {
                text: "¿Qué actividades puedo hacer sin registrarme?",
                goesToPageIndex: 4
            },
            {
                text: "¿Cuál es el beneficio de registrarme?",
                goesToPageIndex: 4
            },
            {
                text: "¿Qué datos necesito para crear mi cuenta?",
                goesToPageIndex: 4
            },
            {
                text: "¿Puedo registrarme con una red social?",
                goesToPageIndex: 5
            }
        ]
    }
    ,
    {
        question: "¿En qué te puedo ayudar con la exploración del museo?",
        options: [
            {
                text: "Mapa",
                goesToPageIndex: 1
            },
            {
                text: "Galerías",
                goesToPageIndex: 2
            },
            {
                text: "X-Ray",
                goesToPageIndex: 3
            },
            {
                text: "Dinosaurios",
                goesToPageIndex: 4
            },
        ]
    },
    {
        question: "¿En qué te puedo ayudar con los juegos?",
        options: [
            {
                text: "Minijuegos",
                goesToPageIndex: 1
            },
            {
                text: "Logros",
                goesToPageIndex: 2
            },
            {
                text: "Álbum",
                goesToPageIndex: 3
            },
            {
                text: "Stickers",
                goesToPageIndex: 4
            },
        ]
    },
    {
        question: "¿En qué te puedo ayudar con la tienda y los canjes?",
        options: [
            {
                text: "Compras",
                goesToPageIndex: 1
            },
            {
                text: "Productos",
                goesToPageIndex: 2
            },
            {
                text: "Carrito",
                goesToPageIndex: 3
            },
            {
                text: "Wallet",
                goesToPageIndex: 4
            },
            {
                text: "Historial",
                goesToPageIndex: 4
            }
        ]
    },
    {
        question: "¿En qué te puedo ayudar con el contenido interactivo?",
        options: [
            {
                text: "Biblioteca",
                goesToPageIndex: 1
            },
            {
                text: "Cine",
                goesToPageIndex: 2
            }
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

        <div className="right-arrow"></div>
        <div className="left-arrow"></div>

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
                    <img src="assets/giph/logo.gif" alt="logo-giph" className="modal-logo-giph"/>
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

