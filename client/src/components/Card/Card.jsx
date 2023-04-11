import styles from "./Card.module.css";
import { Link } from "react-router-dom";

function Card(props) {
    const {name,image, diets, id, local} = props;
    return (
        <div className={styles.Card}>
            <Link to={`/detail/${id}/${local}`} className={styles.Link}>
                <h2>{name}</h2>
            </Link>
            <img src={image} alt=""></img>
            <h3>Dietas: 
                {diets.map((elem) => {
                return <span key={elem}>[{" "} {elem} {" "}]</span>
                })}
            </h3>
        </div>
    );
}

export default Card;