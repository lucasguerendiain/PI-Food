const { Recipe, Diet } = require("../db");
const axios = require("axios");

function convertDiet(diet) {
    //no se pueden conectar las tablas usando el nombre de las dietas, por eso las transformo al id de dieta
        switch(diet) {
            case "dairy free": return 1;
            case "pescatarian": return 2;
            case "gluten free": return 3;
            case "vegetarian": return 4;
            case "vegan": return 5;
            case "ketogenic": return 6;
            case "lacto ovo vegetarian": return 7;
            case "paleolithic": return 8;
            case "primal": return 9;
            case "whole 30": return 10;
        };
}

async function saveRecipe(req, res) {
    // tiene que recibir: name(string), image(string), description(string), healthScore(float),
    // steps(string) y dietas relacionadas(array?)
    try {
        const {name, image, description, healthScore, steps, diets} = req.body;
        const cuerpo = {
            name: name,
            image: image,
            description: description,
            healthScore: healthScore,
            steps: steps
        };
        const [nuevaReceta, created] = await Recipe.findOrCreate({ where : cuerpo });
        await axios.get("http://localhost:3001/diets");
        //esto funciona solo por id de la receta
        diets.forEach((elem) => {
            nuevaReceta.addDiet(convertDiet(elem));
        });
        console.log({elem: nuevaReceta, creado: created});
        if (created) res.status(200).json(nuevaReceta);
        else res.status(401).json({message: "ya existe la receta"});
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = saveRecipe;