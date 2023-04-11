const axios = require("axios");
const { Diet } = require("../db");
const { API_KEY } = process.env;

async function getAllDiets(req, res) {
    try {
        //primero chequeamos si está en la BD local
        const dietsBD = await Diet.findAll();
        if (dietsBD.length) {
            res.status(202).json(dietsBD);
        } else {
            //la BD está vacía, asi que precargamos data de la API
            //const dietsAPI = await axios.get(`https://spoonacular.com/food-api/docs#Diets?apiKey=${API_KEY}`);
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
            //este choclo es la parte del html que dice las dietas, pero no coinciden con los arreglos de las recipes que devuleve la API
            //const nombres = dietsAPI.data.split("<h2>Diet Definitions</h2>")[1].split("</section>")[0].split("\n").filter((data, index) => {
            //    if (data && index % 2 === 0) return data;
            //});
            //nombres.pop();
            res.status(201).json(dietas);
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = getAllDiets;
