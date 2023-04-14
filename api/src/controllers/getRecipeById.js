const axios = require("axios");
const { Recipe, Diet } = require("../db");
const URL = `https://api.spoonacular.com/recipes/`;
const { API_KEY_SUPLENTE } = process.env;

function convertDiets(diets) {
    //la base de datos guarda diets como un arreglo de objetos nesteados
    // esto toma de cada objeto el nombre y lo devuleve para poder usarlo
    if (!diets) return [];
    else {
        const aux = [];
        for (let elem of diets) {
            aux.push(elem.name);
        }
        return aux;
    }
}

async function getRecipeById(req, res) {
    try {
        const {id, local} = req.params;
        //local es un int entre 0 y 1: 0 significa que la recipe es de la api, 1 que es de la base de datos local
        if (Number(local) === 0) {
            const recipeApi = await axios.get(URL + `${id}/information?apiKey=${API_KEY_SUPLENTE}`);
            const DatosApiRefinados = {
                id: recipeApi.data.id,
                name: recipeApi.data.title,
                image: recipeApi.data.image,
                description: recipeApi.data.summary,
                healthScore: recipeApi.data.healthScore,
                steps: recipeApi.data.instructions,
                diets: recipeApi.data.diets
            }
            res.status(201).json(DatosApiRefinados);
        } else {
            const recipeDB = await Recipe.findByPk(id, {
                include: Diet,
                });
            if (recipeDB) {
                const datosDBRefinados = {
                    localId: recipeDB.localId,
                    name: recipeDB.name,
                    image: recipeDB.image,
                    description: recipeDB.description,
                    healthScore: recipeDB.healthScore,
                    steps: recipeDB.steps,
                    diets: convertDiets(recipeDB.Diets)
                }
                res.status(201).json(datosDBRefinados);
            } else res.status(400).json({message: "no existe una receta con ese id en la base de datos"});
        } 
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = getRecipeById;
