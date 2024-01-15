const db = require("../models");
const User = db.user;

exports.me = (req, res) => {
  const userId = req.userId;
  User.findOne({
    _id: userId,
  })
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,

      name: user.name,
      birthday: user.birthday,
    });
  });
};
