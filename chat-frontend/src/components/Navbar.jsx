import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ username, setUsername }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Left */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide text-indigo-400 hover:text-indigo-300 transition"
          >
            VibeChat
          </Link>

          {/* Home button (always visible) */}
          <Link
            to="/"
            className="px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-300 transition"
          >
            Home
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {!username ? (
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold transition shadow"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/create-room"
                className="px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 transition"
              >
                Create
              </Link>

              <Link
                to="/rooms"
                className="px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 transition"
              >
                Join
              </Link>

              <Link
                to="/profile"
                className="px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-white/5 hover:bg-purple-500/20 hover:text-purple-300 transition"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white text-sm font-semibold transition shadow"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
