import { ADD_RECIPE, GET_RECIPES, SAVE_RECIPE, FILTER_RECIPES, FILTER_RECIPES_BY_TYPE, ORDER_RECIPES, ASC_DESC} from "./actionTypes";
import axios from "axios";
//import fs from "fs";
//const file = "../../../../api/src/utils/pivot.json";

export const addRecipe = (recetas) => {
        return {
            type: ADD_RECIPE,
            payload: recetas
        }
}

export const getRecipes = () => {
    return async function(dispatch) {
        try{
            const localRecipes = await axios.get("http://localhost:3001/recipes/?name=allRecipes");
            return dispatch({
                type: GET_RECIPES,
                payload: localRecipes.data
            })
        } catch (error) {
            return dispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }
}

export const saveRecipe = (receta) => {
    return async function(dispatch) {
        try {
            console.log("hola");
            const response = await axios.post("http://localhost:3001/recipes", receta);
            console.log("chau");
            return dispatch({
                type: SAVE_RECIPE,
                payload: response.data
            });
        } catch (error) {
            return dispatch({
                type: "ERROR",
                paylaod: error.message
            });
        }
    }
}

export const orderRecipes = (tipo, value) => {
    if (tipo === "orden") {
        return{
            type: ASC_DESC,
            payload: value
        };
    }
    else return{
        type: ORDER_RECIPES,
        payload: value
    };
}

export const filterRecipes = (condition, value = "") => {
    if (condition === "tipo" && value) {
        return {
            type: FILTER_RECIPES_BY_TYPE,
            payload: value
        }
    } else return {
        type: FILTER_RECIPES,
        payload: condition
        }
}