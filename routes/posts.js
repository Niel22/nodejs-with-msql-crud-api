const express = require('express');
const PostController = require('../controllers/post.controller');

const router = express.Router();

router.post('/', PostController.save);
router.get('/:id', PostController.show);
router.get('/', PostController.index);

module.exports = router;