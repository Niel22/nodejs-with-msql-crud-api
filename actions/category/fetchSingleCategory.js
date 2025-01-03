const models = require("../../models");

async function fetchSingleCategory(id) {
  try {
    const category = await models.Category.findByPk(id);

    if (category) {
      return category;
    }

    return false;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

module.exports = {
    fetchSingleCategory: fetchSingleCategory
}