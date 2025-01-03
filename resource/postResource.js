function transform(post)
{
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        imageUrl: 'http://localhost:4000/uploads/'+post.imageUrl,
        category: post.Category.name,
        user: post.User.name
    }
}

function transformCollection(posts)
{
    return posts.map(post => transform(post));
}

module.exports = {
    transform: transform,
    transformCollection: transformCollection
}