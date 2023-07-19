const db = require("../models/index");
const shared = db.shared;
const user = db.user;
const recipe = db.recipe;

class SharedsDal {
  getAll = async (userId) => {
    return await shared.findAll({
      where: { to: userId },
    });
  };

  getOne = async (id, userId) => {
    return await shared.findOne({
      where: { id: id, to: userId },
      include: [
        { model: user, as: "from" },
        { model: user, as: "to" },
        { model: recipe, as: "recipe" },
      ],
    });
  };

  create = async (newShared) => {
    return await shared.create(newShared);
  };

  update = async (id, userId, sharedToUpdate) => {
    return await shared.update(sharedToUpdate, {
      where: { id: id, to: userId },
    });
  };

  deleteOne = async (id, userId) => {
    await shared.destroy({ where: { id: id, to: userId } });
  };
}

module.exports = new SharedsDal();
