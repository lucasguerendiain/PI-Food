import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import styles from "./Home.module.css";
import { getRecipes, orderRecipes } from "../../redux/actions/actions";
import { filterRecipes } from "../../redux/actions/actions";
import axios from "axios";
import { Link } from "react-router-dom";

function Home({ storeRecetas }) {
    const dispatch = useDispatch();
    const [ordenado, setOrdenado] = useState(false);
    const [filtroTipo, setFiltroTipo] = useState(false);
    const [dietas, setDietas] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [arregloPaginado, setArregloPaginado] = useState([]);

    const handleSort = (event) => {
        dispatch(orderRecipes(event.target.name, event.target.value));
        if (event.target.value === "nop") setOrdenado(false);
        else setOrdenado(true);
    };

    const handleFilter = (event) => {
        if (event.target.value === "ninguno") setFiltroTipo(false);
        if (event.target.value === "tipo") {
            setFiltroTipo(true);
        } else if (event.target.name === "tipoDietas") {
                dispatch(filterRecipes("tipo", event.target.value))
            } else {
                dispatch(filterRecipes(event.target.value));
            }
    }

    const handlePage = (event) => {
        if (event.target.name === "sig") {
            if (pagina < arregloPaginado.length - 1) setPagina(pagina+1);
        } else {
            if (pagina > 0) setPagina(pagina-1);
        }
    }

    useEffect(async () => {
        dispatch(getRecipes());
        const response = await axios.get("http://localhost:3001/diets");
        setDietas(response.data);
    }, []);

    useEffect(() => {
        setPagina(0);
        const aux = [];
        for (let i = 0; i < storeRecetas.length; i += 9) {
            aux.push(storeRecetas.slice(i, i + 9));
        }
        setArregloPaginado(aux);
    }, [storeRecetas]);

    return (
        <div className={styles.Father}>
            <Link to={"/CreateRecipe"}>
                <button className={styles.ToForm}>Crear receta</button>
            </Link>
            <SearchBar/>
            <select name="ordenar" onChange={handleSort}>
                <option value="nop">-----</option> 
                <option value="alfabetico">Alfabeticamente</option>
                <option value="healthScore">Health Score</option>
            </select>
            {ordenado? (<select name="orden" onChange={handleSort}>
                <option value="ascendente">Ascendente</option>
                <option value="descendente">Descendente</option>
            </select>) : null}
            <select name="filtrar" onChange={handleFilter}>
                <option value="ninguno">-----</option>
                <option value="tipo">tipo de dieta</option>
                <option value="localDB">reccetas propias</option>
                <option value="API">recetas de la API</option>
            </select>
            {filtroTipo? (<select name="tipoDietas" onChange={handleFilter}>
                <option value="allDiets" key="allDiets">all diets</option>
                {dietas.length && dietas.map((elem) => {
                    return<option value={elem.name} key={elem.name}>
                            {elem.name}
                        </option>
                })}
            </select>) : null}
            <br/>
            <button name="ant" onClick={handlePage} className={styles.Cambio}>ant</button>
            <span className={styles.Spanito}>pagina: {pagina}</span>
            <button name="sig" onClick={handlePage} className={styles.Cambio}>sig</button>
            <div className={styles.HomeDiv}>
                {
                arregloPaginado.length ? (arregloPaginado[pagina].map((elem, index) => {
                    return<Card
                            name={elem.name}
                            image={elem.image}
                            diets={elem.diets}
                            id={elem.id || elem.localId}
                            local={elem.localId? 1 : 0}
                            key={elem.name + index}/>
                }))
                : ("no hay recetas")}
            </div>
        </div>
    );
}

export function mapStateToProps(state) {
    return {
        storeRecetas: state.recipes
    };
}


export default connect(mapStateToProps, null)(Home);