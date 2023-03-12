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
        return await recipe.findOne(
            {
                where: { id: id, userId: userId },
                attributes: { exclude: ['userId'], },
                include: [
                    {
                        model: ingredient,
                        through: {
                            attributes: ["measuringUtensilId", "qty"],
                            //include: measuringUtensil
                        }
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
    }

    create = async (newRecipe, categories, tags, ingredients) => {



        //return result = await sequelize.transaction(async (t) => {
            const createdRecipe = await recipe.create(newRecipe, {
                include: [step, comment,]
            }
            );
            await createdRecipe.addTags(await tag.findAll({ where: { id: tags } }));
            await createdRecipe.addCategories(await category.findAll({ where: { id: categories } }));
            ingredients.map(x => x.recipeId = createdRecipe.id)
            await recipeIngredient.bulkCreate(ingredients);

            return await this.getOne(createdRecipe.id, createdRecipe.userId);

       // });
    }


    update = async (id, userId, recipeToUpdate) => {
        return await recipe.update(recipeToUpdate,
            { where: { id: id, userId: userId } })
    }

    deleteOne = async (id, userId) => {
        await recipe.destroy({ where: { id: id, userId: userId } });
    }

}

module.exports = new RecipesDal();