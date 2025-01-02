const Validator = require('fastest-validator');
const postRequest = require('../request/createPostRequest');
const createPost = require('../actions/post/createPost');
const models = require('../models');
const {
    success,
    error,
    exceptionError,
  } = require("../utils/apiResponse");

async function save(req, res)
{
    try{
        
        req.postData.userId = req.userData.userId;

        const result = await createPost.createPost(req.postData);

        if(result)
        {
            return success(res, "Post Created");
        }

        return error('Cannot create post');

    }catch(error){
        return exceptionError(res, error);
    }
}

function show(req, res)
{
    const id = req.params.id;

    models.Post.findByPk(id, {
        include: [
            models.Category,
            models.User
        ]
    }).then(result => {
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

    const schema = {
        title: {
            type: "string",
            optional: false,
            min: "5",
            max: "100"
        },
        content: {
            type: "string",
            optional: false,
            max: "500"
        },
        categoryId: {
            type: "number",
            optional: false
        }
    }

    const v = new Validator();
    const response = v.validate(updatedPost, schema);

    if(response !== true)
    {
        return res.status(422).json({
            message: "Validation fail",
            errors: response
        });
    }

    const userId = 1;

    models.Category.findByPk(req.body.categoryId).then(result => {
        if(result === null)
        {
            return res.status(422).json({
                message: "Category does not exist",
            });
        }

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

    }).catch(error => {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        })
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