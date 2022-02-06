const { Post } = require("../models");
const create = (req, res) => {
  const { title, body, picture } = req.body;
  if (!title || !body || !picture) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  const post = new Post({
    title,
    body,
    photo: picture,
    postedBy: req.user,
  });

  post
    .save()
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => console.log(err));
};
const getposts = (req, res) => {
  Post.find()
    .populate("postedBy", "_id name avatar")
    .populate("comments.commitedBy", "_id name avatar")
    .then((posts) => res.json({ posts }))
    .catch((err) => console.log(err));
};
const getmyposts = (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("comments.commitedBy", "name _id avatar")
    .populate("postedBy", "_id name avatar")
    .then((posts) => res.json({ posts }))
    .catch((err) => console.log(err));
};

const like = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "name _id avatar")
    .populate("comments.commitedBy", "name _id  avatar")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};
const unlike = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "name _id avatar")
    .populate("comments.commitedBy", "name _id avatar")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};
const comments = (req, res) => {
  const comment = {
    text: req.body.comment,
    commitedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("postedBy", "_id name avatar")
    .populate("comments.commitedBy", "name _id avatar")
    .exec((err, result) => {
      if (err) {
        res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

const del = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(404).json({ error: err ? err : "Post Not Found" });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => console.log(err));
      }
    });
};

const getsubscribepost = (req, res) => {
  Post.find({postedBy:{$in:req.user.following}})
  .populate("postedBy", "_id name avatar")
  .populate("comments.commitedBy", "name _id avatar ")
  .then(posts => res.json({posts}))
  .catch(err=>console.log(err));
};
module.exports = {
  create,
  getposts,
  getmyposts,
  like,
  unlike,
  comments,
  del,
  getsubscribepost,
};
