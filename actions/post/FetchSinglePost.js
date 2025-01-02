const models = require("../../models");

async function FetchSinglePost(id) {
  try {
    const post = await models.Post.findByPk(id, {
      include: [models.Category, models.User],
    });

    if (post) {
      return post;
    }

    return false;

  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
    FetchSinglePost: FetchSinglePost
}