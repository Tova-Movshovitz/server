const express = require("express");
const recipeRouter = express.Router();
const recipeController = require("../controller/RecipesController")
const fullrecipeController = require("../controller/FullRecipeController");

const verifyJWT = require("../middleware/verifyJWT");
//recipeRouter.use(verifyJWT);

recipeRouter.route('/')
    .get(recipeController.getAll)
    .post(recipeController.create)


recipeRouter.route('/:id')
    .get(recipeController.getOne)
    .put(recipeController.update)
    .delete(recipeController.deleteOne)

// recipeRouter.route('/:id/step')
//     .put(recipeController.search)
//     .post(recipeController.search)

module.exports = recipeRouter;