const Validator = require("fastest-validator");

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
      return {
        error: validated
    };
    }

    req.postData = data;
  } catch (error) {
    return error;
  }
}

module.exports = {
    validateInput: validateInput
}
