const config = require("../config/auth.config");
const db = require("../models");
const utils = require("../utils");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const email = req.body.email;
  if (!utils.isValidEmail(email)) {
    return res.status(400).json({ message: "err.invalidEmail" });
  }

  const password = req.body.password;
  if (!utils.isValidPassword(password)) {
    return res.status(400).json({
      message: "err.invalidPassword",
    });
  }
  const confirmPassword = req.body.confirmPassword;
  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "err.passwordsDoNotMatch",
    });
  }

  const user = new User({
    //username: req.body.username,
    email: email,
    password: bcrypt.hashSync(password, 8),
    confirmPassword: bcrypt.hashSync(confirmPassword),
    name: req.body.name,
    surname: req.body.surname,
    birthday: req.body.birthday,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "User was registered successfully!" });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,

      accessToken: token,
      name: user.name,
      surname: user.surname,
    });
  });
};
