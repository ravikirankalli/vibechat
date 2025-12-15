import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ username, setUsername }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      {/* Left side */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-purple-400 hover:text-purple-300 transition"
        >
          VibeChat
        </Link>

        {/* Home button - ALWAYS visible */}
        <Link
          to="/"
          className="hover:text-purple-400 transition"
        >
          Home
        </Link>
      </div>

      {/* Right side */}
      <div className="flex gap-4 items-center">
        {!username ? (
          <Link
            to="/login"
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition"
          >
            Login
          </Link>
        ) : (
          <>
            <Link
              to="/create-room"
              className="hover:text-purple-400 transition"
            >
              Create Room
            </Link>

            <Link
              to="/rooms"
              className="hover:text-purple-400 transition"
            >
              Join Room
            </Link>

            <Link
              to="/profile"
              className="hover:text-purple-400 transition"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
