const Validator = require("fastest-validator");
const models = require("../models");
const deleteImage = require('../helpers/deleteImage');
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
  imageUrl: {
    type: "string",
    optional: false
  },
  categoryId: {
    type: "string",
    optional: false,
  },
};

const v = new Validator();

async function validateInput(req, res, next) {
  const data = {
    title: req.body.title,
    content: req.body.content,
    categoryId: req.body.categoryId,
    imageUrl: req.file.filename
  };

  const validated = v.validate(data, schema);
  
  if (validated !== true) {
    if (req.file) {
      deleteImage.deleteImage(req.file.filename);
    }

    return validationError(res, validated);
  }

  const category = await models.Category.findOne({
    where: {
      id: data.categoryId,
    },
  });

  if (category === null) {
    if (req.file) {
        deleteImage.deleteImage(req.file.filename);
    }
    return error(res, "Category Already exist");
  }

  req.postData = data;
  next();
}

module.exports = {
  validateInput: validateInput,
};
