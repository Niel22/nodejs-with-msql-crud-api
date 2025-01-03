const models = require('../../models');

async function fetchAllCategory()
{
    try{

        const category = await models.Category.findAll();

        if(category)
        {
            return category;
        }

        return false;
    }catch(error){
        console.log(error.message);
        return false;
    }
}

module.exports = {
    fetchAllCategory: fetchAllCategory
}