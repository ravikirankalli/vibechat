import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ username }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 max-w-xl w-full text-center shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to <span className="text-yellow-300">VibeChat</span>
        </h1>

        <p className="text-gray-200 mb-8">
          Connect instantly. Create rooms. Chat in real-time.
        </p>

        {!username ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl transition"
          >
            Login to Continue
          </button>
        ) : (
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/create-room")}
              className="bg-green-400 hover:bg-green-500 text-black font-semibold px-5 py-3 rounded-xl transition"
            >
              Create Room
            </button>

            <button
              onClick={() => navigate("/rooms")}
              className="bg-blue-400 hover:bg-blue-500 text-black font-semibold px-5 py-3 rounded-xl transition"
            >
              Join Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
