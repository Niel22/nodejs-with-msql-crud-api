const models = require("../../models");

async function deletePost(id, userId) {
  try {
    const post = await models.Post.destroy({
      where: {
        id: id,
        userId: userId,
      },
    });
    

    if (post) {
      return true;
    }

    return false;

  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
    deletePost: deletePost
}