import { ADD_RECIPE, GET_RECIPES, SAVE_RECIPE, FILTER_RECIPES, ORDER_RECIPES, ASC_DESC, FILTER_RECIPES_BY_TYPE} from "../actions/actionTypes";

const initialState = {
    recipes: [],
    allRecipes: [],
    ordenamiento: "nada",
    error: ""
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_RECIPE:
            return { 
                ...state,
                recipes: action.payload,
                allRecipes: [...state.allRecipes, ...action.payload]
            };
        case GET_RECIPES: 
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
        };
        case SAVE_RECIPE: 
            return {
                ...state,
                recipes: [action.payload, ...state.recipes],
                allRecipes: [...state.allRecipes, action.payload]
        };
        case FILTER_RECIPES:
            if (action.payload === "ninguno"){
                return {
                    ...state,
                    recipes: state.allRecipes
                }
            } else {
            const nuevoArreglo = (action.payload === "localDB") ? 
                (state.allRecipes.slice().filter((receta) => receta.localId)) 
                : 
                (state.allRecipes.slice().filter((receta) => !receta.localId))
            return {    
                ...state,
                recipes: nuevoArreglo
            }
            };
        case FILTER_RECIPES_BY_TYPE:
            const filtroDieta = (action.payload === "allDiets") ? 
            ([...state.allRecipes])
            :
            (state.allRecipes.slice().filter((receta) => receta.diets.includes(action.payload)));
            return {
                ...state,
                recipes: filtroDieta
            };
        case ORDER_RECIPES:
            const aux = [...state.recipes];
            const newOrder = aux.sort((action.payload === "alfabetico")? 
            ((a,b) => {return b.name < a.name}) 
            : ((a,b) => {return a.healthScore - b.healthScore})
            );
            return {
                ...state,
                recipes: newOrder,
                ordenamiento: action.payload
            };
        case ASC_DESC:
            const nuevoOrden = [...state.recipes];
            if (state.ordenamiento === "alfabetico") {
                nuevoOrden.sort((action.payload === "ascendente") ? 
                ((a,b) => {return b.name < a.name}) 
                : ((a,b) => {return a.name < b.name})
                )
            } else nuevoOrden.sort((action.payload === "ascendente") ? 
                ((a,b) => {return Number(a.healthScore) - Number(b.healthScore)}) 
                : ((a,b) => {return Number(b.healthScore) - Number(a.healthScore)})
                )
            return {
                ...state,
                recipes: nuevoOrden
            };
        case "ERROR": 
            return {
                ...state,
                error: action.payload
        };
        default: 
            return {
                ...state
        }
    }
}

export default rootReducer;