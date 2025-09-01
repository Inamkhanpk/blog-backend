const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Create Comment (any authenticated user)
const createComment = async (req, res) => {
  try {
    const { data } = req.body;
    const {id} = req.params;
    const post = await Post.findById(id);
    if (!post || post.status !== "published") {
      return res.status(400).json({ message: "Cannot comment on this post" });
    }
    const comment = new Comment({
      body:data,
      post:id,
      author: req.user?.id,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.log("Error creating comment:", err);
    res.status(500).json({ message: "Error creating comment", error: err });
  }
};

// Get comments for a post
const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
    
      .populate("author", "username email")
      .sort({ createdAt: -1 });
      
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err });
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (req.user?.role !== "admin" && req.user?.id !== String(comment.author)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment", error: err });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  deleteComment,
};