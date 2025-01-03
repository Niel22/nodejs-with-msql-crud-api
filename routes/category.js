const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const createCategoryRequest = require('../request/createCategoryRequest');
const updateCategoryRequest = require('../request/updateCategoryRequest');

router.post('/', createCategoryRequest.validateInput, categoryController.store);
router.put('/:id', updateCategoryRequest.validateInput, categoryController.update);
router.get('/', categoryController.index);
router.get('/:id', categoryController.show);
router.delete('/:id', categoryController.destroy);

module.exports = router;