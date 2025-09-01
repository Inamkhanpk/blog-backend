import PostCard from "../../components/PostCard";
import usePosts from "../../hooks/usePosts";

export default function AuthorDashboard() {
  const {
    posts,
    removePost,
    loading,
    handleSubmit,
    handleEdit,
    handleCancel,
    form,
    setForm,
    editing,
  } = usePosts();

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Author Dashboard
      </h2>

      <section className="mb-8 bg-white border-2 border-gray-200 shadow-xl rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          {editing ? "✏️ Edit Post" : "✨ Create Post"}
        </h3>
        <div className="space-y-6">
          <input
            className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 p-4 rounded-xl shadow-sm bg-white placeholder-gray-500 text-lg transition-all duration-300"
            placeholder="Enter your post title..."
            value={form.title}
            onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
          />

          <textarea
            className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 p-4 rounded-xl shadow-sm bg-white placeholder-gray-500 text-lg transition-all duration-300 resize-none"
            placeholder="Write your amazing content here..."
            rows={6}
            value={form.content}
            onChange={(e) =>
              setForm((s) => ({ ...s, content: e.target.value }))
            }
          />

          <select
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 p-4 rounded-xl shadow-sm bg-white text-lg transition-all duration-300 cursor-pointer"
            value={form.status}
            onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
          >
            <option value="draft">📝 Draft</option>
            <option value="published">🌟 Published</option>
          </select>

          <div className="flex gap-4">
            <button
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
              disabled={loading}
              onClick={handleSubmit}
            >
              {editing ? "💾 Save Changes" : "🚀 Create Post"}
            </button>

            {editing && (
              <button
                type="button"
                className="border-2 border-gray-300 hover:border-gray-400 px-8 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={handleCancel}
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white border-2 border-gray-200 shadow-xl rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          📚 My Posts
        </h3>

        <div className="grid gap-6">
          {posts.length === 0 && (
            <div className="text-center py-16 opacity-70">
              <div className="text-xl text-gray-500 font-medium mb-2">
                No posts yet
              </div>
              <p className="text-gray-400">
                Create your first post to get started!
              </p>
            </div>
          )}

          {posts.map((p) => (
            <div
              key={p._id}
              className="flex gap-6 items-start bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:bg-white"
            >
              <div className="flex-1">
                <PostCard post={p} />
              </div>
              <div className="flex flex-col gap-3">
                <button
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  onClick={() => handleEdit(p)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  onClick={() => removePost(p._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
