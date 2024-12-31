const models = require('../models');

function save(req, res)
{
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: 1
    }

    models.Post.create(post).then(result => {
        if(result){

            return res.status(200).json({
                message: "Post Created",
                post: result
            })
        }
        
        return res.status(400).json({
            message: "Problem creating Post"
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    });
}

function show(req, res)
{
    const id = req.params.id;

    models.Post.findByPk(id).then(result => {
        if(result){

            return res.status(200).json(result)
        }
        
        return res.status(400).json({
            message: "Post not found"
        })

    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
    })
}

function index(req, res)
{
    models.Post.findAll().then(result => {
        if(result){

            return res.status(200).json(result)
        }
        
        return res.status(400).json({
            message: "No Post Found"
        })

    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
    })
}

function update(req, res)
{
    const id = req.params.id;

    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
    }

    const userId = 1;

    models.Post.update(updatedPost, {
        where: {
            id: id,
            userId: userId
        }
    }).then(result => {

        if(result){

            return res.status(200).json({
                message: "Post Updated",
                post: result
            });
        }

        return res.status(400).json({
            message: "Post Cannot be updated"
        })

    }).catch(error => {
        res.status(500).json({
            message: "something went wrong",
            error: error
        });
    })
}

function destroy(req, res)
{
    const id = req.params.id;
    const userId = 1;

    models.Post.destroy({
        where: {
            id: id,
            userId: userId
        }
    }).then(result => {
        if(result){

            return res.status(200).json({
                message: "Post Deleted",
                post: result
            });
        }

        return res.status(400).json({
            message: "post cannot be deleted"
        })


    }).catch(error => {
        res.status(500).json({
            message: "something went wrong",
            error: error
        });
    })
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}