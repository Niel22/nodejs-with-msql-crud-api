const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function signUp(req, res) {
  models.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((result) => {
      if (result) {
        return res.status(409).json({
          message: "The email is already taken",
        });
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
          };

          models.User.create(user)
            .then((result) => {
              if (result) {
                return res.status(201).json({
                  message: "User Registered Successfully",
                  user: result,
                });
              }

              return res.status(500).json({
                message: "User not created",
              });
            })
            .catch((error) => {
              return res.status(500).json({
                message: "Something went wrong",
                error: error,
              });
            });
        });
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function login(req, res)
{
    models.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {

        if(user === null)
        {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        bcrypt.compare(req.body.password, user.password, (error, result) => {
            
            if(result)
            {
                
                jwt.sign({
                    email: user.email,
                    userId: user.id
                }, process.env.JWT_KEY, (error, token) => {

                    if(error)
                    {
                        return res.status(401).json({
                            message: "Invalid email or password",
                            error: error
                        });
                    }

                    return res.status(200).json({
                        message: "Authenticaton successful",
                        token: token
                    });
                })
            }
            
            return;
        })

    }).catch(errror => {
        return res.status(500).json({
            message: "Something went wrong",
            error: error,
          });
    })
}

module.exports = {
  signUp: signUp,
  login: login
};
