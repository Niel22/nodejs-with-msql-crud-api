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
    const userData = await createUserRequest.validateUserRequest(req);

    if (userData.error) {
      return validationError(res, userData.error);
    }

    const isUserCreated = await createUser.createUser(userData);

    if (isUserCreated) {
      return success(res, "User Created Succesfully");
    }

    return error("User cannot be created");
  } catch (error) {
    return exceptionError(res, error);
  }
}

async function login(req, res) {
  try {
    const userData = await userLoginRequest.validateInput(req);

    if (userData.error) {
      return validationError(res, userData.error);
    }

    const token = await loginUser.loginUser(userData);

    if (token) {
      return success(res, token, "User Logged in");
    }

    return error(res, "Invalid email or password");

  } catch (error) {
    return exceptionError(res, error);
  }
}

module.exports = {
  signUp: signUp,
  login: login,
};
