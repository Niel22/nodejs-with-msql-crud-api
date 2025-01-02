const Validator = require("fastest-validator");
const { validationError } = require("../utils/apiResponse");

const schema = {
  email: {
    type: "email",
    optional: false,
  },
  password: {
    type: "string",
    optional: false,
    min: "8",
  },
};

const v = new Validator();

async function validateInput(req, res, next) {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    const validated = v.validate(data, schema);

    if (validated !== true) {
      return validationError(res, validated);
    }

    req.userData = data;
    next()

  } catch (error) {
    return error;
  }
}

module.exports = {
    validateInput: validateInput
}
