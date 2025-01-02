const jwt = require("jsonwebtoken");
const apiResponse = require('../utils/apiResponse');

function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    req.userData = decodedToken;

    if(!req.userData.userId)
    {
      return apiResponse.error(res, "User not logged in");
    }

    next();
    
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error,
    });
  }
}

module.exports = {
  checkAuth: checkAuth,
};
