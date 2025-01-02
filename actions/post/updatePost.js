const models = require('../../models');

async function updatePost(id, userId, postData)
{
    try{
        const [post] = await models.Post.update(postData, {
            where:{
                id: id,
                userId: userId
            }
        });

        if(post)
        {
            return true;
        }

        return false;

        
    }catch(error){
        console.log(error);
        return false;
    }
}

module.exports = {
    updatePost: updatePost
}