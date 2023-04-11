const axios = require("axios");
const { Recipe, Diet } = require("../db");
const URL = `https://api.spoonacular.com/recipes/`;
const { API_KEY } = process.env;
const {Op} = require("sequelize");
const  fs = require("fs");
const path = require("path");

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

async function getRecipeByName(req, res) {
    const { name } = req.query;
    if (!name) res.status(400).send("falta el nombre por query");
    if (name === "allRecipes") {
        //no hice una ruta aparte para allRecipes porque estando ambas no funcionaba la ruta de query
        const localRecipes = await Recipe.findAll({
            include: Diet,
        });
        const recetaUsable = localRecipes.map((elem) => {
            return {
                localId: elem.localId,
                name: elem.name,
                image: elem.image,
                decription: elem.description,
                healthScore: elem.healthScore,
                steps: elem.steps,
                diets: convertDiets(elem.Diets)
            }})
        //esto hay que cambiarlo por agarrar 100 recetas de la API
        const dir = path.join(__dirname, "../utils/pivot.json");
        const response = fs.readFileSync(dir, "utf-8");
        const respuestaUsable = JSON.parse(response).data.map((elem) => {
            return {
                id: elem.id,
                name: elem.title,
                image: elem.image,
                description: elem.summary,
                healthScore: elem.healthScore,
                steps: elem.instructions,
                diets: elem.diets
            }
        })
        //se usa un archivo local por el tema del limite de pedidos a la API
        res.status(200).json([...recetaUsable, ...respuestaUsable]);
    } else {
        try {
            //primero chequeamos si está en la BD local
            const recipeDB = await Recipe.findAll({
                include: Diet,
                where: {
                    name: {[Op.iLike]: "%" + name + "%"},
                }, include: Diet
            });
            const recetaUsable = recipeDB.map((elem) => {
                return {
                    localId: elem.localId,
                    name: elem.name,
                    image: elem.image,
                    decription: elem.description,
                    healthScore: elem.healthScore,
                    steps: elem.steps,
                    diets: convertDiets(elem.Diets)
                }});
            const recipeApi = await axios.get(URL + `complexSearch?titleMatch=${name}&number=20&addRecipeInformation=true&apiKey=${API_KEY}`);
            if (recipeApi.data.results.length) {
                var datosApiRefinados = recipeApi.data.results.map((elem) => {
                    return {
                        id: elem.id,
                        name: elem.title,
                        image: elem.image,
                        description: elem.summary,
                        healthScore: elem.healthScore,
                        steps: elem.instructions,
                        diets: elem.diets
                    }
                })
            }
            if (recipeDB.length || datosApiRefinados.length) {
                res.status(201).json([...recetaUsable, ...datosApiRefinados]);
            } else res.status(400).json({message: "no hay recetas con ese nombre"});
        } catch (error) {
            res.status(401).json(error.message);
        }
    }
}

module.exports = getRecipeByName;