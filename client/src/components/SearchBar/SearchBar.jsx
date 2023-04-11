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
            window.alert(error.message);
        }
    };

    return (
        <div>
            <input type="search" onChange={handleChange} value={input}/>
            <button onClick={busquedaPorNombre}>buscar</button>
        </div>
    );
}   

export default SearchBar;