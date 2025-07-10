import { Nav } from "../../../components";
import { Game } from "../../../components/Game/Game";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./Minijuegos.module.css";

interface Juego {
    nombre: string;
    cuadro: string;
    imagen: {
        src: string;
        alt: string;
    };
    simbolo: {
        src: string;
        alt: string;
        altura: string;
    };
    link: string;
    isAvailable: boolean;
}

// Convert class component to functional component to use hooks
export const Minijuegos = () => {
    const { isGuest } = useAuth();

    const juegos: Juego[] = [{
        nombre: "Puzzleaurus",
        cuadro: "/public/assets/img/gamesPage/gameAcessFrame1.png",
        imagen: {
            src: "/public/assets/img/gamesPage/puzzleaurusAccessBg.png",
            alt: "Puzzleaurus"
        },
        simbolo: {
            src: "/public/assets/img/puzzles/puzzle-piece.png",
            alt: "pieza de puzzle",
            altura: "60%"
        },
        link: "/puzzleaurus",
        isAvailable: !isGuest
    }, {
        nombre: "Memodyn",
        cuadro: "/public/assets/img/gamesPage/gameAcessFrame2.png",
        imagen: {
            src: "/public/assets/img/gamesPage/memodynAccessBg.png",
            alt: "Memodyn"
        },
        simbolo: {
            src: "/public/assets/img/cardBase/cardBase.png",
            alt: "cartas",
            altura: "45%"
        },
        link: "/memodyn",
        isAvailable: true
    }];

    return (
        <div className={styles.gamesPage}>
            <Nav />
            <div className={styles.gamesContainer}>
                <div className={styles.sparkle1}></div>
                <div className={styles.sparkle2}></div>
                <div className={styles.sparkle3}></div>
                <div className={styles.sparkle4}></div>
                <div className={styles.sparkle5}></div>

                {juegos.map((juego) => (
                    <Game 
                        key={juego.nombre}
                        nombre={juego.nombre} 
                        cuadro={juego.cuadro} 
                        imagen={juego.imagen} 
                        simbolo={juego.simbolo} 
                        link={juego.link}
                        disabled={!juego.isAvailable}
                    />
                ))}
            </div>
        </div>
    );
}

export default Minijuegos;