import { useState } from "react";
import { useComments } from "../hooks/useComments";
import useAuth from "../hooks/useAuth";

export default function Comments({ postId }) {
  const { user, token } = useAuth();
  const { comments, add, remove, loading } = useComments(postId, token);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    await add(text);
    setText("");
  };

  return (
    <section className="bg-white border-2 border-gray-200 shadow-xl rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">💬 Comments</h3>

      {user ? (
        <div className="flex gap-4 mb-6">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts..."
            className="flex-1 border p-3 rounded-xl"
          />
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            {loading ? "⏳" : "💬 Add"}
          </button>
        </div>
      ) : (
        <div className="p-4 bg-yellow-50 rounded-xl text-center">
          🔐 Log in to join the conversation
        </div>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center">No comments yet</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="p-4 border rounded-xl">
              <p className="mb-2">{c.body}</p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>👤 {c.author?.name}</span>
                {user &&
                  (user.role === "admin" || user.id === (c.author?._id || c.author)) && (
                    <button
                      onClick={() => remove(c._id)}
                      className="text-red-500 hover:underline"
                    >
                      🗑️ Delete
                    </button>
                  )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}