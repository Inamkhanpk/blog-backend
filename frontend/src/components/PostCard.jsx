import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../utils/helper';
export default function PostCard({ post }) {
  const excerpt = post.content ? (post.content.length > 180 ? post.content.slice(0, 180) + '…' : post.content) : '';

  return (
    <article className="border rounded p-4 hover:shadow-sm">
      <Link to={`/posts/${post._id}`} className="block">
        <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
      </Link>
      <div className="text-sm opacity-75 mb-2">by {capitalizeFirstLetter(post.author?.username) || 'Unknown'}</div>
      <p className="text-sm whitespace-pre-wrap">{excerpt}</p>
      <div className="mt-3 flex gap-2">
        <Link to={`/posts/${post._id}`} className="text-sm underline">Read more</Link>
        <span className="text-xs opacity-60 ml-auto">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </article>
  );
}