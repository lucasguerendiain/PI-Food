const { Recipe, Diet } = require("../db");

async function pruebaDiets() {
    //funcion de prueba, borrar luego
    const dietas = [
        { name: "dairy free"},
        { name: "pescatarian"},
        { name: "gluten free"},
        { name: "vegetarian"},
        { name: "vegan"},
        { name: "ketogenic"},
        { name: "lacto ovo vegetarian"},
        { name: "paleolithic"},
        { name: "primal"},
        { name: "whole 30"}
    ]
    //mejor crear mientras se cargan las recipes creo
    //el endpoint que dice el readme tira data distinta a la que devuelve la info de las recetas
    await Diet.bulkCreate(dietas);
}

function convertDiet(diet) {
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
        console.log({receta: nuevaReceta, creada: created});
        await pruebaDiets();
        //esto funciona solo por id de la receta
        diets.forEach((elem) => {
            nuevaReceta.addDiet(convertDiet(elem));
        })
        //esto es para chequear que funciona, borrar luego
        res.status(200).json(nuevaReceta);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = saveRecipe;