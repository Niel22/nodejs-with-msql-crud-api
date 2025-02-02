const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createUser = require("../actions/user/createUser");
const createUserRequest = require("../request/createUserRequest");
const userLoginRequest = require("../request/userLoginRequest");
const loginUser = require("../actions/user/loginUser");
const {
  success,
  error,
  validationError,
  exceptionError,
} = require("../utils/apiResponse");

async function signUp(req, res) {
  try {
  
    const userData = req.userData;
    const isUserCreated = await createUser.createUser(userData);

    if (isUserCreated) {
      return success(res, "User Created Succesfully");
    }

    return error("User cannot be created");

  } catch (error) {
    return exceptionError(res, error.message);
  }
}

async function login(req, res) {
  try {
    const userData = req.userData;
    
    const token = await loginUser.loginUser(userData);

    if (token) {
      return success(res, token, "User Logged in");
    }

    return error(res, "Invalid email or password");

  } catch (error) {
    return exceptionError(res, error.message);
  }
}

module.exports = {
  signUp: signUp,
  login: login,
};
