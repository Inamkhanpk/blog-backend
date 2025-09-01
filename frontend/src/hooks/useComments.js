import { useEffect, useState } from "react";
import { getComments, createComment, deleteComment } from "../api/commentApi";

export function useComments(postId, token) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const data = await getComments(postId);
      setComments(data);
    } catch (err) {
      console.error("comments error", err);
    }
  };

  const add = async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await createComment(token, postId, text.trim());
      await load();
    } finally {
      setLoading(false);
    }
  };

  const remove = async (commentId) => {
    await deleteComment(token, postId, commentId);
    await load();
  };

  useEffect(() => {
    load();
  }, [postId]);

  return { comments, add, remove, loading };
}