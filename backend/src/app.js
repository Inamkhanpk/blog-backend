const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");

const { connectDB } = require("./config/db");

// Routes
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://blog-frontend-gamma-taupe.vercel.app",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(morgan("dev"));
app.use(helmet());

// Database
connectDB(process.env.MONGODB_URI);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Blog API is running 🚀");
});

// Global Error Handler (fallback)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
