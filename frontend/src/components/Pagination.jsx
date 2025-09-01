export default function Pagination({
  page,
  pages,
  onPrev,
  onNext,
}) {
  return (
    <div className="mt-12 flex items-center justify-between bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <button
        className={`border-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
          page <= 1
            ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
            : "border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:shadow-md transform hover:-translate-y-0.5"
        }`}
        disabled={page <= 1}
        onClick={onPrev}
      >
        Prev
      </button>

      <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-md">
        Page {page} / {pages}
      </div>

      <button
        className={`border-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
          page >= pages
            ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
            : "border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:shadow-md transform hover:-translate-y-0.5"
        }`}
        disabled={page >= pages}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}
