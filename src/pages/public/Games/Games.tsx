import { Nav } from "../../../components";
import styles from "./Games.module.css";
import { Link } from "react-router-dom";

export const Games = () => {
    return (
        <div className={styles.gamesPage}>
            <Nav />
            <div className={styles.gamesContainer}>
                <div className={styles.gameContainer}>
                    <div className={styles.gameImgContainer}>
                        <Link to="/puzzleaurus" className={styles.gameImg} />
                    </div>
                    <img src="/public/assets/img/gamesPage/gameNameDivisionLine.png" alt="gold line" className={styles.goldLine} />
                    <div className={styles.gameNameContainer}>
                        <div className={styles.symbolContainer}>
                            <div className={styles.symbolBg}></div>
                            <img src="/public/assets/img/puzzles/puzzle-piece.png" alt="puzzle piece" className={styles.symbol} />
                        </div>
                        <span className={styles.gameName}>PUZZLEAURUS</span>
                    </div>

                </div>
                <div className={styles.gameContainer}>
                    <Link to="/memodyn" className={styles.memodyn} />
                </div>
            </div>
        </div>
    );
};

export default Games;