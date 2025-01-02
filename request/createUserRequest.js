const Validator = require("fastest-validator");
const models = require("../models");

const schema = {
  name: {
    type: "string",
    optional: false,
    min: "3",
  },
  email: {
    type: "email",
    optional: false,
  },
  password: {
    type: "string",
    min: "8",
    optional: false,
  },
};

const v = new Validator();

async function validateUserRequest(req) {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const validated = v.validate(userData, schema);

    if (validated !== true) {
      return {
        error: validated,
      };
    }

    const existingUser = await models.User.findOne({
      where: {
        email: userData.email,
      },
    });

    if (existingUser) {
      return {
        error: "User already exist",
      };
    }

    return userData;
  } catch (error) {
    return {
      error: error,
    };
  }
}

module.exports = {
  validateUserRequest: validateUserRequest,
};
