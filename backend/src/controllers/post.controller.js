const Post = require("../models/Post");

// Create Post (author only)
const createPost = async (req, res) => {
  try {
    const { title, content, status } = req.body;
    const post = new Post({
      title,
      content,
      status: status || "draft",
      author: req.user?.id,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err });
  }
};

// Get all published posts (public with pagination & search)
const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = { status: "published" };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const posts = await Post.find(query)
      .populate("author", "username email role")
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .sort({ createdAt: -1 });

    const total = await Post.countDocuments(query);

    res.json({ posts, total, page: +page, pages: Math.ceil(total / +limit) });
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err });
  }
};

// // Get all published/draft posts 
// const getAdminPosts = async (req, res) => {
//   try {
    
 
//     const posts = await Post.find({});
//       console.log("posts",posts)
      

    

//    res.json(posts);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching posts", error: err });
//   }
// };

const getAdminPosts = async (req, res) => {
  console.log("=== getAdminPosts called ===");
  
  try {
    console.log("About to query database...");
    console.log("Post model:", Post); // Check if model exists
    
    const posts = await Post.find({});
    console.log("Query successful, posts count:", posts.length);
    
    res.json(posts);
  } catch (err) {
    console.error("=== ERROR DETAILS ===");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Full error:", err);
    
    res.status(500).json({ 
      message: "Error fetching posts", 
      error: err.message // Don't send full error object to client
    });
  }
};

// Get single post (only published or author/admin can see draft)
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email role"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.status === "draft") {
      if (req.user?.role !== "admin" && req.user?.id !== String(post.author._id)) {
        return res.status(403).json({ message: "Not authorized to view draft" });
      }
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post", error: err });
  }
};

// Update Post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (req.user?.role !== "admin" && req.user?.id !== String(post.author)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, content, status } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    if (status) post.status = status;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (req.user?.role !== "admin" && req.user?.id !== String(post.author)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  getAdminPosts,
  updatePost,
  deletePost,
};