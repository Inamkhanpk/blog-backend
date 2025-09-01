import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { capitalizeFirstLetter } from '../../utils/helper';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    nav('/');
  };

  return (
   <nav className="w-full flex items-center justify-between p-4 border-b bg-white">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold">
          MyBlog
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="sm:hidden flex items-center px-2 py-1 border rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Right: Links */}
      <div
        className={`flex-col sm:flex-row sm:flex items-center gap-3 absolute sm:static left-0 top-16 sm:top-0 w-full sm:w-auto bg-white sm:bg-transparent shadow sm:shadow-none p-4 sm:p-0 transition-all ${
          isOpen ? "flex" : "hidden sm:flex"
        }`}
      >
        <Link
          to="/"
          className="px-2 py-1 rounded hover:bg-slate-100 w-full sm:w-auto"
        >
          Home
        </Link>

        {user ? (
          <>
            <Link
              to={user.role === "admin" ? "/admin" : "/author"}
              className="px-2 py-1 rounded hover:bg-slate-100 w-full sm:w-auto"
            >
              {user.role === "admin" ? "Admin" : "Author"}
            </Link>
            <span className="px-2 py-1 text-sm opacity-80 w-full sm:w-auto">
              Hi, {capitalizeFirstLetter(user.username)}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 border rounded w-full sm:w-auto"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-2 py-1 rounded hover:bg-slate-100 w-full sm:w-auto"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-2 py-1 rounded hover:bg-slate-100 w-full sm:w-auto"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}