const models = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginUser(userData) {
  try {
    const user = await models.User.findOne({
      where: { email: userData.email },
    });

    if (user !== null) {
      const result = await bcrypt.compare(userData.password, user.password);

      if (result) {
        return jwt.sign(
          {
            userId: user.id,
            email: user.email,
          },
          process.env.JWT_KEY
        );
      }

      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
    loginUser: loginUser
}