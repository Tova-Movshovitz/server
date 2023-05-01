const db = require('../models/index');
const { sequelize } = require('sequelize');

const measuringUtensil = db.measuringUtensil;
const ingredient = db.ingredient;
const recipeIngredient = db.recipeIngredient;
const RecipesDal = require("../dal/RecipesDal");
const { Op } = require('sequelize');

class RecipesController {

    getAll = async (req, res) => {
        const userId = 1//req.user.id
        const ans = await RecipesDal.getAll(userId);

        if (!ans?.length) {
            return res.status(400).json({ message: 'No recipes found' })
        }
        res.json(ans)
    }

    getOne = async (req, res) => {
        const id = req.params.id
        const userId = 1//req.user.id

        const ans = await RecipesDal.getOne(id, userId);
        const ingridients=await recipeIngredient.findAll(
            {
                where:{
                    recipeId:id
                },
                include:[
                    measuringUtensil,
                    ingredient
                ]
            }
        )
        const cleanRecipe=ingridients.map(i=>(
            {
                qty:i.qty,
                ingredientName:i.ingredient.name,
                ingredientId:i.ingredientId,
                measuringUtensilName:i.measuringUtensil.name,
                measuringUtensilId:i.measuringUtensilId,
                img:i.ingredient.img,

            }
        ))

        if (!ans) {
            return res.status(400).json({ message: 'No recipe found' })
        }
        res.json({recipe:ans,ingridients:cleanRecipe})
    }

    create = async (req, res) => {
        const userId = 1// req.user.id;
        const { name, img, preperingTime, description, difficult, serves, tags, categories, steps, comments, ingredients } = req.body
        console.log(name, preperingTime, difficult, serves)
        if (!name || !preperingTime || !difficult || !serves) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const newRecipe = await RecipesDal.create({ userId, name, img, preperingTime, description, difficult, serves, steps, comments }, categories, tags, ingredients);

        if ((newRecipe)) {
            return res.status(201).json({ message: 'New recipe created', data: newRecipe })
        }
        else {
            return res.status(400).json({ message: 'Invalid recipe data received' })
        }
    }

    update = async (req, res) => {
        const userId = 1//req.user.id
        const id = req.params.id
        const { name, img, preperingTime, descreption, serves, tags, categories, steps, comments, ingredients } = req.body
        if (!name || !preperingTime || !difficult || !serves) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const ans = await RecipesDal.update(id, { userId, name, img, preperingTime, descreption, difficult, serves, steps, comments }, categories, tags, ingredients);

        if (!ans) {
            return res.status(400).json({ message: 'recipe not found' })
        }
        res.json(ans)
    }

    deleteOne = async (req, res) => {
        const userId = 1//req.user.id
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: 'ID required' })
        }
        await RecipesDal.deleteOne(id, userId);

        res.json(`recipe  with ID ${id} deleted`)
    }


}

module.exports = new RecipesController();