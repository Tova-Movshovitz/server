
const { sequelize, DataTypes } = require("./sequelize");
const RecipeIngredient = sequelize.define(
    "recipeIngredient",
    {

        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ingredientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        measuringUtensilId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        qty: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        meta: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);
module.exports = RecipeIngredient;