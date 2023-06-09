import { useEffect, useState } from "react";
import styles from "./CFF.module.css";
import {validation} from "./validation"; 
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveRecipe } from "../../redux/actions/actions";

function CFF() {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        healthScore: "",
        image: "",
        steps: "",
    });
    const [dietas, setDietas] = useState({
        "dairy free": false,
        "pescatarian": false,
        "gluten free": false,
        "vegetarian": false,
        "vegan": false,
        "ketogenic": false,
        "lacto ovo vegetarian": false,
        "paleolithic": false,
        "primal": false,
        "whole 30": false
    });
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        healthScore: "",
        image: "",
        steps: ""
    });

    const handleChange = (event) => {
        setInputs({...inputs,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.values(errors).length === 0) {
            const formatoValido = [];
            for (let tipo of Object.keys(dietas)) {
                if (dietas[tipo]) formatoValido.push(tipo);
            }
            const nuevaReceta = {
                ...inputs,
                diets: formatoValido
                }
            dispatch(saveRecipe(nuevaReceta))
            .then(data => {
                if (data.type === "SAVE_RECIPE") alert("receta guardada con exito");
                else if (data.payload === "Request failed with status code 401") alert("ya existe la receta");
                    else alert("ha ocurrido un error inesperado");
            });
        } else alert(Object.values(errors));
    }

    const handleToggle = (event) => {
        setDietas({
            ...dietas,
            [event.target.name]: !dietas[event.target.name]
        });
    }

    useEffect(() => {
        setErrors(validation(inputs));
    }, [inputs]);

    return (
        <div className={styles.Fondo}>
            <Link to={"/Home"}>
                <button className={styles.Boton}>pa las casa</button>
            </Link>
            <form className={styles.Formulario} onSubmit={handleSubmit}>
                <label>Nombre: {" "}
                    <input
                    type="text"
                    name="name"
                    value={inputs.name}
                    placeholder="nombre de la receta"
                    onChange={handleChange}
                    />
                    <br/>
                    {errors.name && <p className={styles.Danger}>{errors.name}</p>}
                </label>
                <br/>
                <label>Resumen: {" "}
                    <textarea
                    type="text"
                    name="description"
                    value={inputs.description}
                    placeholder="descripcion simple de la receta"
                    onChange={handleChange}
                    />
                    <br/>
                    {errors.description && <p className={styles.Danger}>{errors.description}</p>}
                </label>
                <br/>
                <label>Imagen: {" "}
                    <input
                    type="text"
                    name="image"
                    value={inputs.image}
                    placeholder="url de la imagen"
                    onChange={handleChange}
                    />
                    <br/>
                    {errors.image && <p className={styles.Danger}>{errors.image}</p>}
                </label>
                <br/>
                <label>Steps: {" "}
                <textarea
                    type="text"
                    name="steps"
                    value={inputs.steps}
                    placeholder="preparacion de la receta paso a paso"
                    onChange={handleChange}
                    />
                    <br/>
                    {errors.steps && <p className={styles.Danger}>{errors.steps}</p>}
                </label>
                <br/>
                <label>Health Score: {" "}
                    <input
                    type="number"
                    name="healthScore"
                    pattern="[0-9]*"
                    value={dietas.healthScore}
                    placeholder="nivel de comida saludable en numero"
                    onChange={handleChange}
                    />
                    <br/>
                    {errors.healthScore && <p className={styles.Danger}>{errors.healthScore}</p>}
                </label>
                <br/>
                {Object.keys(dietas).map((key) => {
                    return <div key={key} className={styles.Checkbox}>
                    <input
                    type="checkbox"
                    onChange={handleToggle}
                    value={key}
                    name={key}
                    checked={dietas[key]}
                    />
                    <span>{key}</span>
                    </div> 
                })}
                <button type="submit" name="submit">Confirmar y guardar receta</button>
            </form>
        </div>
    );
}   

export default CFF;