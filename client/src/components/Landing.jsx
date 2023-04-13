import {Link} from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
    return (
        <div className={styles.Land}>
            <Link to={"/home"}>
                <button className={styles.Entrada}>Henry Food</button>
            </Link>
        </div>
    );
}

export default Landing;