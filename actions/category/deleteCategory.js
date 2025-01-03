const models = require('../../models');

async function deleteCategory(id)
{
    try{

        const category = await models.Category.destroy({
            where: {
                id: id
            }
        });


        if(category)
        {
            return true;
        }

        return false;
    }catch(error){
        console.log(error.message);
        return false;
    }
}

module.exports = {
    deleteCategory: deleteCategory
}