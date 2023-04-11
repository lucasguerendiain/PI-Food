import {Link} from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
    return (
        <div className={styles.Land}>
            <h1>Henry Food</h1>
            <Link to={"/home"}>ir al Home</Link>
            <img></img>
        </div>
    );
}

export default Landing;