const express = require('express');
const PostController = require('../controllers/post.controller');

const router = express.Router();

router.post('/', PostController.save);
router.get('/', PostController.index);
router.get('/:id', PostController.show);
router.patch('/:id', PostController.update);
router.delete('/:id', PostController.destroy);

module.exports = router;