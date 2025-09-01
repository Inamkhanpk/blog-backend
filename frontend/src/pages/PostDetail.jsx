import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import Comments from "../components/Comments";
import { capitalizeFirstLetter } from "../utils/helper";

export default function PostDetail() {
  const { id } = useParams();
  const { post, loading, error } = usePost(id);

  if (loading) return <div className="p-6">Loading post…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!post) return <div className="p-6">No post found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white border p-6 rounded-xl mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-2 mb-6 text-gray-600">
          <span>by {capitalizeFirstLetter(post.author.username)}</span>
          <span>• {new Date(post.createdAt).toLocaleDateString("en-US")}</span>
        </div>
        <div className="whitespace-pre-wrap">{post.content}</div>
      </div>

      <Comments postId={id} />
    </div>
  );
}