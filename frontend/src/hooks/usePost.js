import { useEffect, useState } from "react";
import { getPostById } from "../api/postApi";

export function usePost(id) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPostById(id)
      .then(setPost)
      .catch((err) => setError(err.message || "Failed to load post"))
      .finally(() => setLoading(false));
  }, [id]);

  return { post, loading, error };
}