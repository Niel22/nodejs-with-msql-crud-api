const express = require('express');
const userController = require('../controllers/user.controller');
const createUserRequest = require('../request/createUserRequest');
const userLoginRequest = require('../request/userLoginRequest');

const router = express.Router();

router.post('/sign-up', createUserRequest.validateUserRequest, userController.signUp);
router.post('/sign-in', userLoginRequest.validateInput, userController.login);

module.exports = router;