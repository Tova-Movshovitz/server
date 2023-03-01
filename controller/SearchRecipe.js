const db = require('../models/index');

const recipe = db.recipe;
const step = db.step;
const comment = db.comment;
const tag = db.tag;
const ingredient = db.ingredient;

const recipeIngredient = db.recipeIngredient;
const category = db.category;
const measuringUtensil = db.measuringUtensil

const search = async (req, res) => {
    const { name, cateogries, tags, preperingTimeMin, preperingTimeMan, difficult, withIngredients, withoutIngredients } = req.query

    let where = {}
    if (withIngredients) where.withIngredients = withIngredients
    if (withoutIngredients) where.withoutIngredients = withoutIngredients

    const ans = recipe.findAll({
        offset: 5, limit: 5,
        where: {
            name: {
                [Op.like]: `%${name}%`
            },
            difficult: {
                [op.or]: difficult
            },
            preperingTime: {
                [Op.between]: [preperingTimeMin, preperingTimeMan],
            }
        },
        include: [
            {
                model: category,
                through: { attributes: [] },
                where: {
                    id: {
                        [Op.or]: cateogries
                    }
                }
            },
            {
                model: tag,
                through: { attributes: [] },
                where: {
                    id: {
                        [Op.or]: tags
                    }
                }
            },
        ]
    }
    )


    if (!books?.length) {
        return res.status(400).json({ message: 'No books found' })
    }
    res.json(books)
}
const country = await Country.findByPk(1, {
    include: {
        model: City,
        where: {
            cityName: "York",
        },
    },
});




// const captains = await Captain.bulkCreate([
//     { name: 'Jack Sparrow' },
//     { name: 'Davy Jones' }
//   ]);