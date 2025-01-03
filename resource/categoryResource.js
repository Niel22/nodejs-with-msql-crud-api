function transform(category)
{
    return {
        id: category.id,
        name: category.name,
    }
}

function transformCollection(categories)
{
    return categories.map(category => transform(category));
}

module.exports = {
    transform: transform,
    transformCollection: transformCollection
}