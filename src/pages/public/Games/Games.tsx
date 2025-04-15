import { Nav } from "../../../components";
import styles from "./Games.module.css";

export const Games = () => {


    return (
        <div className={styles.gamesPage}>
            <Nav />
            <div className={styles.gamesContainer}>
                <div className={styles.puzzleaurus} />
                <div className={styles.memodyn} />
            </div>
        </div>
    );
};

export default Games;