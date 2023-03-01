const { sequelize, DataTypes } = require("./sequelize");
const Recipe = sequelize.define(
    "recipe",
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,

        },
        preperingTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descreption: {
            type: DataTypes.STRING,
        },
        difficult: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serves: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.INTEGER,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }

);
module.exports = Recipe;