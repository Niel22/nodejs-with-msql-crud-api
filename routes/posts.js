const express = require('express');
const PostController = require('../controllers/post.controller');
const checkAuthMiddleware = require('../middleware/checkAuth');

const router = express.Router();


router.post('/', checkAuthMiddleware.checkAuth, PostController.save);
router.get('/', PostController.index);
router.get('/:id', PostController.show);
router.patch('/:id', checkAuthMiddleware.checkAuth, PostController.update);
router.delete('/:id', checkAuthMiddleware.checkAuth, PostController.destroy);

module.exports = router;