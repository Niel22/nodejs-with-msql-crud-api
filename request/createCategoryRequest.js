const Validator = require('fastest-validator');
const {validationError, error} = require('../utils/apiResponse');
const models = require('../models');

const schema = {
    name: {
        type: "string",
        min: "3",
        optional: false
    },
}

const v = new Validator();

async function validateInput(req, res, next)
{
    const data = {
        name: req.body.name
    }

    const validated = v.validate(data, schema);

    if(validated !== true)
    {
        return validationError(res, validated);
    }

    const category = await models.Category.findOne({
        where: {
            name: data.name
        }
    });

    if(category)
    {
        return error(res, "This name has been taken");
    }

    req.categoryData = data;
    next();
}

module.exports = {
    validateInput: validateInput
}