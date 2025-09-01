const { Router } = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getAdminPosts
} = require("../controllers/post.controller");
const { auth } = require("../middleware/auth");

const router = Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/getAllPosts",auth, getAdminPosts);
router.get("/:id", getPostById);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
