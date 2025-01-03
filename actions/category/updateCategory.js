const models = require('../../models');

async function updateCategory(id, categoryData)
{
    try{

        const [category] = await models.Category.update(categoryData, {
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
    updateCategory: updateCategory
}