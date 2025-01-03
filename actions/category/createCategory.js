const models = require("../../models");

async function createCategory(categoryData) {
  try {
    const category = await models.Category.create(categoryData);

    if (category) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

module.exports = {
    createCategory: createCategory
}