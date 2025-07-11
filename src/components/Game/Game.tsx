import styles from "./Game.module.css";
import { Link } from 'react-router-dom';

type SimboloProps = {
    src: string;
    alt: string;
    altura: string;
}

type ImagenProps = {
    src: string;
    alt: string;
}

type GameProps = {
    nombre: string;
    cuadro: string;
    imagen: ImagenProps;
    simbolo: SimboloProps;
    link: string;
    disabled?: boolean;
}

export const Game = ({ nombre, cuadro, imagen, simbolo, link, disabled = false }: GameProps) => {
    return (
        <div className={`${styles.gameContainer} ${disabled ? styles.disabled : ''}`}>
            <div className={styles.gameImgContainer} style={{ backgroundImage: `url(${cuadro})`}}>
                {disabled ? (
                    <div 
                        className={styles.gameImg} 
                        style={{ 
                            backgroundImage: `url(${imagen.src})`,
                            cursor: 'not-allowed'
                        }} 
                    />
                ) : (
                    <Link
                        to={link}
                        className={styles.gameImg}
                        style={{ backgroundImage: `url(${imagen.src})` }}
                    />
                )}
            </div>
            <img src="/assets/img/gamesPage/gameNameDivisionLine.png" alt="gold line" className={styles.goldLine} />
            <div className={styles.gameNameContainer}>
                <div className={styles.symbolContainer}>
                    <div className={styles.symbolBg}></div>
                    <img src={simbolo.src} alt={simbolo.alt} className={styles.symbol} style={{ height: `${simbolo.altura}`}}/>
                </div>
                <span className={styles.gameName}>{nombre}</span>
                {disabled && <span className={styles.disabledText}>Solo usuarios registrados</span>}
            </div>
        </div>
    )
}
