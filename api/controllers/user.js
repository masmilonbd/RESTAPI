const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user alredy exisits!");
  } else {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then((result) => {
            res.status(201).json({
              message: "user created successfully",
              user: result,
            });
          })
          .catch((err) => res.json({ err }));
      }
    });
  }
};

const getAllUser = (req, res, next) => {
  User.find()
    .then((users) => res.json({ message: "User List", users }))
    .catch((err) => res.json({ message: "Error" }));
};

const loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({ message: "error ocoured" });
        }
        if (result) {
          const token = jwt.sign(
            { email: user.email, _id: user._id },
            "SECRET",
            { expiresIn: "2h" }
          );
          res.json({
            message: "Login success",
            token,
          });
        } else {
          res.json({
            message: "Login failed, wrong password",
          });
        }
      });
    } else {
      res.json({ message: "user not found" });
    }
  });
};

module.exports = {
  registerController,
  getAllUser,
  loginUser,
};
