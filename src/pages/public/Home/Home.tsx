import "./Home.css";
import { Nav } from "../../../components/";
import DinoDialog from "../../../components/DinoDialog/DinoDialog.tsx";
import { useState } from "react";

const modalPages = [
    // 0 - Menú Principal
    {
        question: "¿En qué puedo ayudarte?",
        options: [
            { text: "Tutorial", goesToPageIndex: 0 },
            { text: "Mi Cuenta", goesToPageIndex: 1 },
            { text: "Explorar el Museo", goesToPageIndex: 2 },
            { text: "Juegos", goesToPageIndex: 3 },
            { text: "Tienda y Canjes", goesToPageIndex: 4 },
            { text: "Contenido Interactivo", goesToPageIndex: 5 }
        ]
    },

    // 1 - Mi Cuenta
    {
        question: "¿En qué te puedo ayudar con tu cuenta?",
        options: [
            { text: "Registro", goesToPageIndex: 6 },
            { text: "Inicio de sesión", goesToPageIndex: 12 },
            { text: "Perfil", goesToPageIndex: 18 },
            { text: "Mascota virtual", goesToPageIndex: 19 },
            { text: "Tokens", goesToPageIndex: 25 }
        ]
    },

    // 2 - Explorar el Museo
    {
        question: "¿En qué te puedo ayudar con la exploración del museo?",
        options: [
            { text: "Mapa", goesToPageIndex: 31 },
            { text: "Galerías", goesToPageIndex: 32 },
            { text: "X-Ray", goesToPageIndex: 33 },
            { text: "Dinosaurios", goesToPageIndex: 34 }
        ]
    },

    // 3 - Juegos
    {
        question: "¿En qué te puedo ayudar con los juegos?",
        options: [
            { text: "Minijuegos", goesToPageIndex: 35 },
            { text: "Logros", goesToPageIndex: 36 },
            { text: "Álbum", goesToPageIndex: 37 },
            { text: "Stickers", goesToPageIndex: 38 }
        ]
    },

    // 4 - Tienda y Canjes
    {
        question: "¿En qué te puedo ayudar con la tienda y los canjes?",
        options: [
            { text: "Compras", goesToPageIndex: 39 },
            { text: "Productos", goesToPageIndex: 40 },
            { text: "Carrito", goesToPageIndex: 41 },
            { text: "Wallet", goesToPageIndex: 42 },
            { text: "Historial", goesToPageIndex: 43 }
        ]
    },

    // 5 - Contenido Interactivo
    {
        question: "¿En qué te puedo ayudar con el contenido interactivo?",
        options: [
            { text: "Biblioteca", goesToPageIndex: 44 },
            { text: "Cine", goesToPageIndex: 45 }
        ]
    },

    // 6 - Registro
    {
        question: "¿En qué te puedo ayudar con el registro?",
        options: [
            { text: "¿Cómo me registro en la plataforma?", goesToPageIndex: 7 },
            { text: "¿Qué actividades puedo hacer sin registrarme?", goesToPageIndex: 8 },
            { text: "¿Cuál es el beneficio de registrarme?", goesToPageIndex: 9 },
            { text: "¿Qué datos necesito para crear mi cuenta?", goesToPageIndex: 10 },
            { text: "¿Puedo registrarme con una red social?", goesToPageIndex: 11 }
        ]
    },

    // 7 a 11 - Subpáginas de Registro
    { question: "¿Cómo me registro en la plataforma?", options: [] },           // 7
    { question: "¿Qué actividades puedo hacer sin registrarme?", options: [] }, // 8
    { question: "¿Cuál es el beneficio de registrarme?", options: [] },         // 9
    { question: "¿Qué datos necesito para crear mi cuenta?", options: [] },     // 10
    { question: "¿Puedo registrarme con una red social?", options: [] },        // 11

    // 12 - Inicio de Sesión
    {
        question: "¿En qué te puedo ayudar con el inicio de sesión?",
        options: [
            { text: "¿Dónde inicio sesión?", goesToPageIndex: 13 },
            { text: "¿Qué hago si olvidé mi contraseña?", goesToPageIndex: 14 },
            { text: "¿Puedo mantener mi sesión iniciada?", goesToPageIndex: 15 },
            { text: "¿Cómo cierro sesión?", goesToPageIndex: 16 },
            { text: "¿Puedo iniciar sesión desde otro dispositivo?", goesToPageIndex: 17 }
        ]
    },

    // 13 a 17 - Subpáginas de Inicio de Sesión
    { question: "¿Dónde inicio sesión?", options: [] },                           // 13
    { question: "¿Qué hago si olvidé mi contraseña?", options: [] },              // 14
    { question: "¿Puedo mantener mi sesión iniciada?", options: [] },            // 15
    { question: "¿Cómo cierro sesión?", options: [] },                            // 16
    { question: "¿Puedo iniciar sesión desde otro dispositivo?", options: [] },  // 17

    // 18 - Perfil
    { question: "¿En qué te puedo ayudar con tu perfil?", options: [] },

    // 19 - Mascota virtual
    {
        question: "¿En qué te puedo ayudar con tu mascota virtual?",
        options: [
            { text: "¿Cómo elijo mi mascota virtual?", goesToPageIndex: 20 },
            { text: "¿Puedo cambiarla después?", goesToPageIndex: 21 },
            { text: "¿Cómo la visto o personalizo?", goesToPageIndex: 22 },
            { text: "¿Mi mascota puede evolucionar?", goesToPageIndex: 23 },
            { text: "¿Para qué sirve la mascota en el museo?", goesToPageIndex: 24 }
        ]
    },

    // 20 a 24 - Subpáginas de Mascota
    { question: "¿Cómo elijo mi mascota virtual?", options: [] },                // 20
    { question: "¿Puedo cambiarla después?", options: [] },                      // 21
    { question: "¿Cómo la visto o personalizo?", options: [] },                  // 22
    { question: "¿Mi mascota puede evolucionar?", options: [] },                 // 23
    { question: "¿Para qué sirve la mascota en el museo?", options: [] },        // 24

    // 25 - Tokens
    {
        question: "¿En qué te puedo ayudar con los tokens?",
        options: [
            { text: "¿Para qué son los tokens?", goesToPageIndex: 26 },
            { text: "¿Cómo gano tokens?", goesToPageIndex: 27 },
            { text: "¿Dónde veo cuántos tengo?", goesToPageIndex: 28 },
            { text: "¿Puedo usarlos en la tienda?", goesToPageIndex: 29 },
            { text: "¿Puedo perder tokens?", goesToPageIndex: 30 }
        ]
    },

    // 26 a 30 - Subpáginas de Tokens
    { question: "¿Para qué son los tokens?", options: [] },                      // 26
    { question: "¿Cómo gano tokens?", options: [] },                             // 27
    { question: "¿Dónde veo cuántos tengo?", options: [] },                      // 28
    { question: "¿Puedo usarlos en la tienda?", options: [] },                   // 29
    { question: "¿Puedo perder tokens?", options: [] },                          // 30

    // 31 a 34 - Subpáginas de Explorar el Museo
    { question: "Mapa", options: [] },                                           // 31
    { question: "Galerías", options: [] },                                       // 32
    { question: "X-Ray", options: [] },                                          // 33
    { question: "Dinosaurios", options: [] },                                    // 34

    // 35 a 38 - Subpáginas de Juegos
    { question: "Minijuegos", options: [] },                                     // 35
    { question: "Logros", options: [] },                                         // 36
    { question: "Álbum", options: [] },                                          // 37
    { question: "Stickers", options: [] },                                       // 38

    // 39 a 43 - Subpáginas de Tienda y Canjes
    { question: "Compras", options: [] },                                        // 39
    { question: "Productos", options: [] },                                      // 40
    { question: "Carrito", options: [] },                                        // 41
    { question: "Wallet", options: [] },                                         // 42
    { question: "Historial", options: [] },                                      // 43

    // 44 a 45 - Subpáginas de Contenido Interactivo
    { question: "Biblioteca", options: [] },                                     // 44
    { question: "Cine", options: [] }                                            // 45
];


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
                            <img src="assets/giph/logo.gif" alt="logo-giph" className="modal-logo-giph" />
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

