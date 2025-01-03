const createCategory = require('../actions/category/createCategory');
const updateCategory = require('../actions/category/updateCategory');
const fetchAllCategory = require('../actions/category/fetchAllCategory');
const deleteCategory = require('../actions/category/deleteCategory');
const categoryResource = require('../resource/categoryResource');
const fetchSingleCategory = require('../actions/category/fetchSingleCategory');
const {
    success,
    error,
    exceptionError,
  } = require("../utils/apiResponse");

async function store(req, res)
{
    try{
        const data = req.categoryData;
        const category = await createCategory.createCategory(data);

        if(category)
        {
            return success(res, {}, "Category created");
        }

        return error(res, "Cannot create category");

    }catch(error){
        return exceptionError(res, error.message);
    }
}

async function update(req, res)
{
    try{
        const id = req.params.id;
        const data = req.categoryData;

        const category = await updateCategory.updateCategory(id, data);

        if(category)
        {
            return success(res, {}, "Category Update");
        }

        return error('Cannot update category');

    }catch(error){
        return exceptionError(res, error.message);
    }
}

async function index(req, res)
{
    try{
        const category = await fetchAllCategory.fetchAllCategory();

        if(category)
        {
            return success(res, categoryResource.transformCollection(category));
        }

        return error(res, "No category Found");

    }catch(error){
        return exceptionError(res, error.message);
    }
}

async function show(req, res)
{
    try{
        const id = req.params.id;

        const category = await fetchSingleCategory.fetchSingleCategory(id);

        if(category)
        {
            return success(res, categoryResource.transform(category));
        }

        return error(res, "Category not found");
    }catch(error){
        return exceptionError(res, error.message);
    }
}

async function destroy(req, res)
{
    try{
        const id = req.params.id;

        const category = await deleteCategory.deleteCategory(id);

        if(category)
        {
            return success(res, {}, "Category Deleted");
        }

        return error(res, "Category not found");
    }catch(error){
        return exceptionError(res, error.message);
    }
}

module.exports = {
    store: store,
    update: update,
    index: index,
    show: show,
    destroy: destroy
}