const SharedsDal = require("../dal/SharedsDal");

class SharedsController {
    //שיתפו אותי userId==to
    getAll = async (req, res) => {
        const userId=req.user.id
        const ans = await SharedsDal.getAll(userId);

        if (!ans?.length) {
            return res.status(400).json({ message: 'No shareds found' })
        }
        res.json(shareds)
    }

    getOne = async (req, res) => {
        const id = req.params.id
        const userId=req.user.id

        const ans = await SharedsDal.getOne(id, userId);

        if (!ans) {
            return res.status(400).json({ message: 'No shared found' })
        }
        res.json(ans)
    }

    create = async (req, res) => {
        const from=req.user.id
        const {to, recipeId } = req.body
        if (!from || !to || !recipeId) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const newShared = await SharedsDal.create({ recipeId, from, to })

        if (newShared) {
            return res.status(201).json({ message: 'New shared created', data: newShared })
        }
        else {
            return res.status(400).json({ message: 'Invalid shared data received' })
        }
    }

    update = async (req, res) => {
        const userId=req.user.id
        const id = req.params.id
        const { recipeId, from, to } = req.body

        if (!id || !from || !to || !recipeId) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const ans = await SharedsDal.update(id,userId, { recipeId, from, to })

        if (!ans) {
            return res.status(400).json({ message: 'shared not found' })
        }
        res.json(ans)
    }

    deleteOne = async (req, res) => {
        const userId=req.user.id
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: 'ID required' })
        }
        await SharedsDal.deleteOne(id, userId);

        res.json(`shared  with ID ${id} deleted`)
    }

}

module.exports = new SharedsController();


