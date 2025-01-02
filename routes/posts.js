const express = require('express');
const PostController = require('../controllers/post.controller');
const imageUploader = require('../helpers/imageUploader');
const checkAuthMiddleware = require('../middleware/checkAuth');
const postRequest = require('../request/createPostRequest');

const router = express.Router();


router.post('/', checkAuthMiddleware.checkAuth, imageUploader.upload.single('imageUrl'), postRequest.validateInput,  PostController.save);
router.get('/', PostController.index);
router.get('/:id', PostController.show);
router.patch('/:id', checkAuthMiddleware.checkAuth, PostController.update);
router.delete('/:id', checkAuthMiddleware.checkAuth, PostController.destroy);

module.exports = router;