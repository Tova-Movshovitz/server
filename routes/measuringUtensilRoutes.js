const express = require("express");
const measuringUtensilRouter = express.Router();
const measuringUtensilController = require("../controllers/MeasuringUtensilsController")

const verifyJWT=require("../middleware/verifyJWT");
measuringUtensilRouter.use(verifyJWT);

measuringUtensilRouter.route('/')
    .get(measuringUtensilController.getAll)
    .post(measuringUtensilController.create)


measuringUtensilRouter.route('/:id')
    .get(measuringUtensilController.getOne)
    .put(measuringUtensilController.update)
    .delete(measuringUtensilController.deleteOne)





module.exports = measuringUtensilRouter;