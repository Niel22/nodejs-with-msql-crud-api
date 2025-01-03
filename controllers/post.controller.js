const Validator = require('fastest-validator');
const postRequest = require('../request/createPostRequest');
const createPost = require('../actions/post/createPost');
const FetchAllPost = require('../actions/post/FetchAllPost');
const FetchSinglePost = require('../actions/post/FetchSinglePost');
const updatePost = require('../actions/post/updatePost');
const deletePost = require('../actions/post/deletePost');
const {transform, transformCollection} = require('../resource/postResource');
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
        const postData = req.postData;

        const result = await createPost.createPost(postData);

        if(result)
        {
            return success(res, "Post Created");
        }

        return error(res, 'Cannot create post');

    }catch(error){
        return exceptionError(res, error.message);
    }
}

async function show(req, res)
{
    try{

        const id = req.params.id;

        const post = await FetchSinglePost.FetchSinglePost(req.params.id);

        if(post)
        {
            return success(res, transform(post));
        }

        return error(res, "Post not found");

    }catch(error){

        return exceptionError(res, error.message);
    }

    
}

async function index(req, res)
{
    try{
        const posts = await FetchAllPost.FetchAllPost();

        if(posts)
        {
            return success(res, transformCollection(posts));
        }

        return error(res, 'No Post Found');

    }catch(error){

        return exceptionError(res, error.message);
    }
}

async function update(req, res)
{
    try{
        const id = req.params.id;
        const userId = req.userData.userId;
        const postData = req.postData;

        const post = await updatePost.updatePost(id, userId, postData);

        if(post)
        {
            return success(res, {}, "Post Updated Successfully");
        }

        return error(res, "Cannot update Post");

    }catch(error){
        return exceptionError(res, error.message);
    }
}

async function destroy(req, res)
{
    try{
        const id = req.params.id;
        const userId = req.userData.userId;

        const post = await deletePost.deletePost(id, userId);

        if(post)
        {
            return success(res, {}, "Post deleted");
        }

        return error(res, "Cannot delete Post");
    }catch(error){
        return exceptionError(res, error.message);
    }
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}