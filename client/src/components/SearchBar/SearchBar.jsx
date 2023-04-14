import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../redux/actions/actions";
import axios from "axios";

function SearchBar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    function handleChange(event) {
        setInput(event.target.value);
    }

    async function busquedaPorNombre() {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/?name=${input}`);
            dispatch(addRecipe(response.data));
        } catch (error) {
            window.alert(error.response? (error.response.data) : (error.message));
        }
    };

    return (
        <div className={styles.Bar}>
            <input type="search" onChange={handleChange} value={input} className={styles.Nombramiento}/>
            <button onClick={busquedaPorNombre} className={styles.Busqueda}>buscar</button>
        </div>
    );
}   

export default SearchBar;