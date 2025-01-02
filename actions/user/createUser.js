const models = require("../../models");
const bcrypt = require("bcryptjs");


async function createUser(userData) {
  try {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const user = await models.User.create(userData);

    if (user) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  createUser: createUser,
};
