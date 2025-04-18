import { Nav } from "../../../components";
import styles from "./Games.module.css";
import {Link} from "react-router-dom";

export const Games = () => {
    return (
        <div className={styles.gamesPage}>
            <Nav />
            <div className={styles.gamesContainer}>
                <Link to="/puzzleaurus" className={styles.puzzleaurus} />
                <Link to="/memodyn" className={styles.memodyn} />
            </div>
        </div>
    );
};

export default Games;