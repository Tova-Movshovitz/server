const { sequelize, DataTypes } = require("./sequelize");
const Shared = sequelize.define(
    "shared",
    {
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        from: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        to: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },   
    },
    {
        freezeTableName: true,
        timestamps: false,
    }

);
module.exports = Shared;