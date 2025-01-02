const Validator = require("fastest-validator");
const models = require("../models");
const deleteImage = require("../helpers/deleteImage");
const {
  success,
  error,
  validationError,
  exceptionError,
} = require("../utils/apiResponse");

const schema = {
  title: {
    type: "string",
    optional: false,
    min: "5",
  },
  content: {
    type: "string",
    min: 25,
    optional: false,
  },
  categoryId: {
    type: "string",
    optional: false,
  },
};

const v = new Validator();

async function validateInput(req, res, next) {
  try {
    const data = {
      title: req.body.title,
      content: req.body.content,
      categoryId: req.body.categoryId,
    };

    const validated = v.validate(data, schema);

    if (validated !== true) {
      return validationError(res, validated);
    }

    const category = await models.Category.findOne({
      where: {
        id: data.categoryId,
      },
    });

    if (category === null) {
      return error(res, "Category deos not exist");
    }

    req.postData = data;
    next();
  } catch (error) {
    return exceptionError(res, error);
  }
}

module.exports = {
  validateInput: validateInput,
};
