const Validator = require("fastest-validator");
const models = require("../models");
const {
  success,
  error,
  validationError,
  exceptionError,
} = require("../utils/apiResponse");

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

async function validateUserRequest(req, res, next) {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const validated = v.validate(userData, schema);

    if (validated !== true) {
      return validationError(res, validated);
    }

    const existingUser = await models.User.findOne({
      where: {
        email: userData.email,
      },
    });

    if (existingUser) {
      return error(res, "User with this email already exist")
    }

    req.userData = userData;
    next();
  } catch (error) {
    return exceptionError(res, error);
  }
}

module.exports = {
  validateUserRequest: validateUserRequest,
};
