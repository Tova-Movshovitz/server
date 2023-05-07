const express = require("express");
const sharedRouter = express.Router();
const sharedController = require("../controllers/SharedsController")

const verifyJWT=require("../middleware/verifyJWT");
sharedRouter.use(verifyJWT);

sharedRouter.route('/')
    .get(sharedController.getAll)
    .post(sharedController.create)


sharedRouter.route('/:id')
    .get(sharedController.getOne)
    .put(sharedController.update)
    .delete(sharedController.deleteOne)





module.exports = sharedRouter;