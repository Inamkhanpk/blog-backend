import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { usePaginatedPosts } from "../hooks/usePaginatedPosts";

export default function Home() {
  const { q, setQ, setPage, data, loading } = usePaginatedPosts();

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Blog
      </h1>

      {/* Search Box */}
      <div className="mb-8">
        <input
          className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 p-4 rounded-xl shadow-lg bg-white placeholder-gray-500 text-lg transition-all duration-300"
          placeholder="Search posts..."
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-xl text-gray-600 font-medium animate-pulse">
            Loading…
          </div>
        </div>
      ) : (
        <>
          {/* Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {data.items.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
            {data.items.length === 0 && (
              <div className="col-span-full text-center py-16 opacity-70">
                <div className="text-xl text-gray-500 font-medium">
                  No posts found
                </div>
                <p className="text-gray-400 mt-2">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="absolute bottom-0 left-0 w-full  text-white p-4 text-center">
          <Pagination
            page={data.page}
            pages={data.pages}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(data.pages, p + 1))}
          />
          </div>
        </>
      )}
    </div>
  );
}