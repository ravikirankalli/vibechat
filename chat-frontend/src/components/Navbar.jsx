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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide text-indigo-400 hover:text-indigo-300 transition"
          >
            VibeChat
          </Link>

          <Link
            to="/"
            className="hidden sm:inline-block px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-white/5 hover:bg-indigo-500/20 transition"
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
              {/* Username badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-sm">
                  {username.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm text-indigo-300 font-medium">
                  {username}
                </span>
              </div>

              <Link
                to="/create-room"
                className="px-3 py-1.5 rounded-lg text-sm text-white bg-white/5 hover:bg-emerald-500/20 transition"
              >
                Create
              </Link>

              <Link
                to="/rooms"
                className="px-3 py-1.5 rounded-lg text-sm text-white bg-white/5 hover:bg-blue-500/20 transition"
              >
                Join
              </Link>

              <Link
                to="/profile"
                className="px-3 py-1.5 rounded-lg text-sm text-white bg-white/5 hover:bg-purple-500/20 transition"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white text-sm font-semibold transition"
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
