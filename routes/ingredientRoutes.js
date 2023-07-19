const express = require("express");
const ingredientRouter = express.Router();
const ingredientController = require("../controllers/IngredientsController");

const verifyJWT = require("../middleware/verifyJWT");
ingredientRouter.use(verifyJWT);

ingredientRouter
  .route("/")
  .get(ingredientController.getAll)
  .post(ingredientController.create);

ingredientRouter
  .route("/:id")
  .get(ingredientController.getOne)
  .put(ingredientController.update)
  .delete(ingredientController.deleteOne);

module.exports = ingredientRouter;
