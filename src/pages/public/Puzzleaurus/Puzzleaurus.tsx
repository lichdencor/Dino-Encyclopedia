import { Nav } from "../../../components";
import styles from "./Puzzleaurus.module.css";
import {Link} from "react-router-dom";

export const Puzzleaurus = () => {
    return (
        <div className={styles.gamesPage}>
            <Nav />
            <div className={styles.gamesContainer}>
                PUZZLEAURUS
            </div>
        </div>
    );
};

export default Puzzleaurus;