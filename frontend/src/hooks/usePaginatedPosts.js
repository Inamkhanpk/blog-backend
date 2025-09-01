import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";

export function usePaginatedPosts(initialPage = 1, initialQuery = "") {
  const [q, setQ] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ items: [], page: 1, pages: 1, total: 0 });

  const load = async (p = page, search = q) => {
    setLoading(true);
    try {
      const resp = await getPosts(p, search);

      // normalize different API shapes
      const items = Array.isArray(resp)
        ? resp
        : resp.items || resp.posts || resp.data || [];

      setData({
        items,
        page: resp.page || p,
        pages:
          resp.pages ||
          Math.max(
            1,
            Math.ceil((resp.total || items.length) / (resp.limit || 10))
          ),
        total: resp.total || items.length,
      });
    } catch (err) {
      console.error("Failed to load posts", err);
      setData({ items: [], page: 1, pages: 1, total: 0 });
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => load(1, q), 300);
    return () => clearTimeout(t);
  }, [q]);

  // reload on page change
  useEffect(() => {
    load(page, q);
  }, [page]);

  return { q, setQ, page, setPage, data, loading };
}
