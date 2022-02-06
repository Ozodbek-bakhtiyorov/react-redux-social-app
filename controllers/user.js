"use strict";
const { Post, User } = require("../models");

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy")
        .select("-password")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => console.log(err));
};

const unfollow = (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id }, //delete from followers list
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId }, //delete from following list
        },
        {
          new: true,
        }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((err) => console.log(err));
    }
  );
};
const follow = (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      console.log("userID", req.user._id);
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        {
          new: true,
        }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => console.log(err));
    }
  );
};
const updateavatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { avatar: req.body.avatar },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: "Picture Cannot Posted!" });
    } else {
      res.json(result);
    }
  });
};
const editname = (req, res) => {
  User.findByIdAndUpdate(
    req.user.id,
    {
      $set: { name: req.body.newname },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res
          .status(422)
          .json({ error: "Sizning Nomingizni o'zgartirib bo'lmaydi" });
      }
      res.json(result);
    }
  );
};

const searchuser = (req, res) => {
  const userSearchPanel = new RegExp("^" + req.body.query);
  User.find({ email: { $regex: userSearchPanel } })
    .select("_id name email avatar")
    .then((user) => res.json(user))
    .catch((err) => console.log(e));
};
const getallusers = (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ error: err.message }));
};

module.exports = {
  getUser,
  follow,
  unfollow,
  updateavatar,
  editname,
  searchuser,
  getallusers,
};
