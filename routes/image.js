const express = require('express');
const imageController = require('../controllers/image.controller');
const imageUploader = require('../helpers/imageUploader');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.post('/uploads', checkAuth.checkAuth, imageUploader.upload.single('image'), imageController.uploader);

module.exports = router;