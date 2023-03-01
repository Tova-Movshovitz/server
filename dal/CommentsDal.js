const db = require('../models/index');
const comment = db.comment;
const recipe=db.recipe;

class CommentsDal {

    getOne = async (id,userId) => {
        
        const ans = await comment.findOne(
            {
                where: { id: id },
                include: [
                    { model: recipe, as: 'recipe' }, 
                ],
                attributes:
                    {exclude: ['recipeId']}
               
            }
        )
       //comment belong to user------
    }

    create = async (newComment) => {
        return await recipe.createComment(newComment);
    }

    update = async (id,userId,commentToUpdate) => {
        return await comment.update(commentToUpdate, { where: { id: id } });
       //comment belong to user------
    }

    deleteOne = async (id,userId) => {       
        //comment belong to user
        await comment.destroy({ where: { id: id } });         
    }

}


module.exports = new CommentsDal();
