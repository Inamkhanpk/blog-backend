import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center bg-white/80 backdrop-blur-xl border-2 border-white/50 shadow-2xl rounded-3xl p-12 max-w-lg">
        <div className="mb-8">
          <h1 className="text-8xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        <p className="text-2xl text-gray-700 font-semibold mb-2">
          Oops! Page Not Found
        </p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you're looking for seems to have wandered off into the
          digital wilderness. Let's get you back on track!
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          🏠 Go Home
          <span className="text-xl">→</span>
        </Link>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Or try these popular pages:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/blog"
              className="px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
            >
              📚 Blog
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
            >
              ℹ️ About
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
            >
              📞 Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
