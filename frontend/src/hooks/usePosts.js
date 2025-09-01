import { useEffect, useState } from "react";
import { getPosts, getAdminPosts, deletePost,createPost,updatePost } from "../api/postApi";
import useAuth from "./useAuth";

export default function usePosts({ admin = false } = {}) {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", status: "draft" });
  const [editing, setEditing] = useState(null);
  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = admin
        ? await getAdminPosts(token)
        : await getPosts(1, ""); // page 1, no filter

      const items = Array.isArray(data) ? data : data.posts || data.items || [];

      // Authors see only their posts
      const filtered = admin
        ? items
        : items.filter(
            (p) => p.author && (p.author._id === user?.id || p.author === user?.id)
          );

      setPosts(filtered);
    } catch (err) {
      setError(err.message || "Failed to load posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const removePost = async (id) => {
    await deletePost(token, id);
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleEdit = (p) => {
    setEditing(p);
    setForm({
      title: p.title,
      content: p.content,
      status: p.status || "draft",
    });
  };

  // cancel edit
  const handleCancel = () => {
    setEditing(null);
    setForm({ title: "", content: "", status: "draft" });
  };

  // create / update post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await updatePost(token, editing._id, form);
      } else {
        await createPost(token, form);
      }
      setForm({ title: "", content: "", status: "draft" });
      setEditing(null);
      await loadPosts();
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not save post");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (user) loadPosts();
  }, [user]);

  return {posts,
    loading,
    error,
    form,
    setForm,
    editing,
    handleEdit,
    handleCancel,
    handleSubmit,
    loadPosts,
    removePost,
    setPosts, };
}
