const express = require("express");
const stepRouter = express.Router();
const stepController = require("../controller/StepsController")


stepRouter.route('/')
    .post(stepController.create)


stepRouter.route('/:id')
    .get(stepController.getOne)
    .put(stepController.update)
    .delete(stepController.deleteOne)





module.exports = stepRouter;