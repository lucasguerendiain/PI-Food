import { useEffect, useState } from "react";
import styles from "./CFF.module.css";
import {validation} from "./validation"; 
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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
                console.log(nuevaReceta);
            dispatch(saveRecipe(nuevaReceta));
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
        <div>
            <Link to={"/Home"}>
                <button>pa las casa</button>
            </Link>
            <form className={styles.Formulario} onSubmit={handleSubmit}>
                <label>Nombre:
                    <input
                    type="text"
                    name="name"
                    value={inputs.name}
                    placeholder="nombre de la receta"
                    onChange={handleChange}
                    //posible classname de los errores
                    />
                    <br/>
                    {errors.name && <p className={styles.Danger}>{errors.name}</p>}
                </label>
                <br/>
                <label>Resumen:
                    <input
                    type="text"
                    name="description"
                    value={inputs.description}
                    placeholder="descripcion simple de la receta"
                    onChange={handleChange}
                    //posible classname de los errores
                    />
                    {/*posible span informando errores*/}
                </label>
                <br/>
                <label>Imagen:
                    <input
                    type="text"
                    name="image"
                    value={inputs.image}
                    placeholder="url de la imagen"
                    onChange={handleChange}
                    //posible classname de los errores
                    />
                    <br/>
                    {errors.image && <p className={styles.Danger}>{errors.image}</p>}
                </label>
                <br/>
                <label>Steps:
                <input
                    type="text"
                    name="steps"
                    value={inputs.steps}
                    placeholder="preparacion de la receta paso a paso"
                    onChange={handleChange}
                    //posible classname de los errores
                    />
                    {/*posible span informando errores*/}
                </label>
                <br/>
                <label>Health Score:
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
                    return <div key={key}>
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