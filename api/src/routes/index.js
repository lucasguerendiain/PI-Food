const { Router } = require('express');
const getAllDiets = require('../controllers/getAllDiets');
const getRecipeById = require('../controllers/getRecipeById');
const getRecipeByName = require('../controllers/getRecipesByName');
const saveRecipe = require('../controllers/saveRecipe');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes/:id/:local", getRecipeById);
//si pongo el query en la ruta, no funciona
router.get("/recipes/", getRecipeByName);
router.post("/recipes", saveRecipe);
router.get("/diets", getAllDiets);

module.exports = router;
