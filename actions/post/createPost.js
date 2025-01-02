const models = require('../../models');

async function createPost(postData)
{
    try{
        const post = await models.Post.create(postData);

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
    createPost: createPost
}