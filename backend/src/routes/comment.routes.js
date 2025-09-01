const { Router } = require("express");
const {
  createComment,
  getCommentsByPost,
  deleteComment,
} = require("../controllers/comment.controller");
const { auth } = require("../middleware/auth");

const router = Router();

router.post("/:id", auth, createComment);
router.get("/:postId", getCommentsByPost);
router.delete("/posts/:postId/:commentId", auth, deleteComment);

module.exports = router;
