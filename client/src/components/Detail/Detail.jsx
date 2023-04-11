import { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Detail() {
    const {id, local} = useParams();
    const [recipe, setRecipe] = useState({
        id: 0,
        name: "placeholder",
        description: "si estas viendo esto, fallo algo",
        healthScore: 0,
        steps: "quejate con el dev",
        image: "manuelita.jpg",
        diets: []
    });

    useEffect(async () => {
        const response = await axios.get(`http://localhost:3001/recipes/${id}/${local}`);
        console.log({id: id, local: local})
        console.log(response.data);
        setRecipe(response.data);
    }, []);

    return (
        <div className={styles.Detalle}>
            <Link to={"/home"}>
                <button>pa casa</button>
            </Link>
            <h1>Nombre: {recipe.name}</h1>
            {true && <h2>Resumen: {recipe.description}</h2>}
            <h3>Healt Score: {recipe.healthScore}</h3>
            {true && <h2>Steps: {recipe.steps}</h2>}
            <img src={recipe.image} alt=""></img>
            <ul>Tipo de dieta: 
                {recipe.diets.length? (recipe.diets.map((elem) => {
                    return <li key={elem}>{elem}</li>
                })) : ("")}
            </ul>
            <h3>pido perdon de momento, si lo arreglo ya no pido perdon nada</h3>
        </div>
    );
}


export default Detail;