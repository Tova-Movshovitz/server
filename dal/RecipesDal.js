const db = require('../models/index');
const { sequelize } = require('sequelize');

const recipe = db.recipe;
const step = db.step;
const comment = db.comment;
const ingredient = db.ingredient;
const measuringUtensil = db.measuringUtensil;
const tag = db.tag;
const category = db.category;
const recipeIngredient = db.recipeIngredient;

class RecipesDal {

    getAll = async (userId) => {
        return await recipe.findAll({
            where: { userId: userId }
        })
    }

    getOne = async (id, userId) => {
        const singleRecipe = await recipe.findOne(
            {
                where: { id: id, userId: userId },
                attributes: { exclude: ['userId'], },
                include: [
                    {
                        model: ingredient,
                        through: {
                             attributes: ["measuringUtensilId", "qty","meta"],
                            //  include: [{
                            //     model:measuringUtensil
                            // }]

                        },
                       
                    },
                    step,
                    comment,

                    {
                        model: tag,
                        through: {
                            attributes: [],
                        }
                    },
                    {
                        model: category,
                        through: {
                            attributes: [],
                        }
                    }
                ]
            }
        )

        // const ingdi = singleRecipe.ingredients.map(async (o) => {
        //     console.log("this is in the map")
        //     const newObj = { ...o }
        //     const measuring = await measuringUtensil.findByPk(o.recipeIngredient?.measuringUtensilId)
        //     const name = measuring.toJSON().name
        //     console.log("aaaaaa", name);
        //     const c = { ...newObj, measuringUtensilName: name }
        //     // console.log(c);
        //     return c;
        // })
        // console.log(ingdi);
        //return {...singleRecipe.toJSON(),aaa:"aaaa"}
        return singleRecipe
    }

    create = async (newRecipe, categories, tags, ingredients) => {
        //return result = await sequelize.transaction(async (t) => {
        const createdRecipe = await recipe.create(newRecipe, {
            include: [step]
        }
        );
        await createdRecipe.addTags(await tag.findAll({ where: { id: tags } }));
        await createdRecipe.addCategories(await category.findAll({ where: { id: categories } }));
        ingredients.map(x => x.recipeId = createdRecipe.id)
        await recipeIngredient.bulkCreate(ingredients);
        return await this.getOne(createdRecipe.id, createdRecipe.userId);

        // });
    }


    update = async (id, userId, recipeToUpdate, categories, tags, ingredients) => {

        // return await recipe.update(recipeToUpdate,
        //     { where: { id: id, userId: userId } })
        await this.deleteOne(id, userId);
        await this.create(id, userId, recipeToUpdate, categories, tags, ingredients);
    }

    deleteOne = async (id, userId) => {
        await recipe.destroy({ where: { id: id, userId: userId } });
    }

}

module.exports = new RecipesDal();