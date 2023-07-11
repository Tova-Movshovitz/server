const CommentsDal = require("../dal/CommentsDal");

class CommentsController {

    getOne = async (req, res) => {
        const id = req.params.id
        const userId=req.user.id
        const ans = await CommentsDal.getOne(id,userId);
        
        if (!ans) {
            return res.status(400).json({ message: 'No comment found' })
        }
        res.json(ans)
    }
    
    create = async (req, res) => {
        const {msg,recipeId} = req.body
        if (!msg||!recipeId) {
            return res.status(400).json({ message: 'All fields are required' })
        }
    
        const newComment = await CommentsDal.create({msg,recipeId});

        if (newComment) {
            return res.status(201).json({ message: 'New comment created', data: newComment })
        } else {
            return res.status(400).json({ message: 'Invalid comment data received' })
        }
    }

    update = async (req, res) => {
        const userId=req.user.id
        const id = req.params.id
        const {msg,recipeId} = req.body

        if (!msg||!recipeId||!id) {            
            return res.status(400).json({ message: 'All fields are required' })
        }
        const ans = await CommentsDal(id,userId,{msg,recipeId});
        
        if (!ans) {
            return res.status(400).json({ message: 'comment not found' })
        }
        res.json(ans)
    }

    deleteOne = async (req, res) => {       
        const id = req.params.id
        const userId=req.user.id

        if (!id) {
            return res.status(400).json({ message: 'ID required' })
        }
        await CommentsDal(id,userId);
        res.json(`comment  with ID ${id} deleted`)        
    }

}

module.exports = new CommentsController();
