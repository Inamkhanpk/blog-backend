import usePosts from "../../hooks/usePosts";
import { formatDate } from "../../utils/helper";
import { POST_STATUS, DASHBOARD_STATS } from "../../utils/constant";

const AdminDashboard = () => {
  const { posts, removePost, loading, error } = usePosts({ admin: true });

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white border-2 border-gray-200 shadow-xl rounded-2xl p-8 mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            🛡️ Admin Dashboard
          </h2>
          <p className="text-gray-600">
            Manage all blog posts •{" "}
            <span className="font-bold text-red-600">{posts.length}</span> total
            posts
          </p>
        </div>

        {/* Posts */}
        <div className="bg-white border-2 border-gray-200 shadow-xl rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            📚 All Posts
          </h3>

          {posts.length === 0 ? (
            <div className="text-center py-16 opacity-70">
              <p className="text-xl text-gray-500 font-medium mb-2">
                No posts available
              </p>
              <p className="text-gray-400">
                Posts will appear here when authors create them
              </p>
            </div>
          ) : (
            posts.map((p) => (
              <div
                key={p._id}
                className="bg-gradient-to-r mt-5 from-gray-50 to-red-50 border-2 border-gray-200 hover:border-red-300 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-red-600">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>👤 {p.author?.name || "Unknown Author"}</span>
                      <span>📅 {formatDate(p.createdAt)}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          POST_STATUS[p.status]?.className
                        }`}
                      >
                        {POST_STATUS[p.status]?.label || "❓ Unknown"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removePost(p._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {DASHBOARD_STATS.map((stat) => {
            let value = 0;
            if (stat.key === "total") value = posts.length;
            if (stat.key === "published")
              value = posts.filter((p) => p.status === "published").length;
            if (stat.key === "draft")
              value = posts.filter((p) => p.status === "draft").length;
            if (stat.key === "authors")
              value = new Set(posts.map((p) => p.author?.name)).size;

            return (
              <div
                key={stat.key}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div
                  className={`text-3xl font-bold mb-1 text-${stat.color}-600`}
                >
                  {value}
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
