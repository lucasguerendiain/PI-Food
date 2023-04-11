const axios = require("axios");
const { Recipe, Diet } = require("../db");
const URL = `https://api.spoonacular.com/recipes/`;
const { API_KEY } = process.env;

function convertDiets(diets) {
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
        if (Number(local) === 0) {
            const recipeApi = await axios.get(URL + `${id}/information?apiKey=${API_KEY}`);
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
                    description: recipeDB.summary,
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
