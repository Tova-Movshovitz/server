const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {
  console.log(sequelize.models)
  const { tag, ingredient, category, recipeIngredient, measuringUtensil, shared, recipe, comment, step, user } = sequelize.models;

  //-----one-to-many-----
  user.hasMany(recipe,{onDelete: 'CASCADE'})
  recipe.belongsTo(user)

  recipe.hasMany(step ,{onDelete: 'CASCADE'})
  step.belongsTo(recipe)

  recipe.hasMany(comment ,{onDelete: 'CASCADE'})
  comment.belongsTo(recipe)

  shared.belongsTo(recipe);
  shared.belongsTo(user, { foreignKey: "from", as: "fromUser" })
  shared.belongsTo(user, { foreignKey: "to", as: "toUser" })
  recipe.hasMany(shared, {onDelete: 'CASCADE'});
  user.hasMany(shared, { foreignKey: "to", as: "shareds" } ,{onDelete: 'CASCADE'})

  recipeIngredient.belongsTo(measuringUtensil)
  measuringUtensil.hasMany(recipeIngredient ,{onDelete: 'CASCADE'})
  
  recipeIngredient.belongsTo(ingredient)
  ingredient.hasMany(recipeIngredient ,{onDelete: 'CASCADE'})
  
  //-----many-to-many-----
  recipe.belongsToMany(ingredient, { through: recipeIngredient })
  ingredient.belongsToMany(recipe, { through: recipeIngredient })

  recipe.belongsToMany(category, { through: 'recipeCategory' })
  category.belongsToMany(recipe, { through: 'recipeCategory' })

  recipe.belongsToMany(tag, { through: 'recipeTag' })
  tag.belongsToMany(recipe, { through: 'recipeTag' })
};

module.exports = { applyExtraSetup };
