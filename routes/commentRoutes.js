const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/CommentsController")

const verifyJWT=require("../middleware/verifyJWT");
commentRouter.use(verifyJWT);

commentRouter.route('/')
    .post(commentController.create)


commentRouter.route('/:id')
    .get(commentController.getOne)
    .put(commentController.update)
    .delete(commentController.deleteOne)





module.exports = commentRouter;