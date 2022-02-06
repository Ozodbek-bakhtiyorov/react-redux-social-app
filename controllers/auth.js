const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_KEY} = require('../config/keys')
const signup = (req, res) => {
  const { name, email, password, avatar } = req.body;
  if (!email || !password || !name) {
    res.status(422).send({ error: "Please fill all fields!" });
  } else {
    User.findOne({ email }).then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exist with this email" });
      }
      bcrypt.hash(password, 10).then((hashpass) => {
        const user = new User({
          email,
          name,
          password: hashpass,
          avatar,
        });
        user
          .save()
          .then((user) => {
            res.send({ msg: "User Added Successfylly!" });
          })
          .catch((err) => console.log(err));
      });
    });
  }
};

const signin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all required fileds!" });
  } else {
    User.findOne({ email }).then((savedUser) => {
      console.log(savedUser);
      if (!savedUser) {
        return res.status(404).json({ error: "Email adress invalid" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id },JWT_KEY);
            const { _id, name, email, followers, following, avatar } =
              savedUser;
            res.json({
              token,
              user: { _id, name, email, followers, following, avatar },
              msg: "Avtoriztsiyadan muvafaqqiyatli o'tdingiz!",
            });
          } else {
            return res.status(422).json({ error: "Invalid Email or Password" });
          }
        })
        .catch((err) => console.log(err));
    });
  }
};
module.exports = {
  signin,
  signup,
};
