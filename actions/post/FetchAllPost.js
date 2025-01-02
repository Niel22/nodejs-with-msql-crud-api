const models = require('../../models');

async function FetchAllPost()
{
    try{

        const posts = await models.Post.findAll({
            include: [
                models.Category,
                models.User
            ]
        });

        if(posts)
        {
            return posts;
        }

        return false;

    }catch(error){
        console.log(error);
        return false;
    }
}

module.exports = {
    FetchAllPost: FetchAllPost  
}