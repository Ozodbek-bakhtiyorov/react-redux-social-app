const router = require("express").Router();
const { post } = require("../controllers");

const { signinmiddleware } = require("../middleware");

router.get("/allposts", signinmiddleware, post.getposts);
router.get("/mypost", signinmiddleware, post.getmyposts);
router.get("/subscribepost", signinmiddleware, post.getsubscribepost);
router.post("/create", signinmiddleware, post.create);
router.put("/like", signinmiddleware, post.like);
router.put("/unlike", signinmiddleware, post.unlike);
router.put("/comments", signinmiddleware, post.comments);
router.delete("/deletepost/:id", signinmiddleware, post.del);
module.exports = router;
