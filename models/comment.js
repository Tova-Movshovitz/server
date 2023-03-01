const { sequelize, DataTypes } = require("./sequelize");
const Comment = sequelize.define(
    "comment",
    {

        msg: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);
module.exports = Comment;