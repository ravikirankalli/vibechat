import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ username }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 max-w-xl w-full text-center shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to <span className="text-indigo-300">VibeChat</span>
        </h1>

        <p className="text-gray-300 mb-8">
          Connect instantly. Create rooms. Chat in real-time.
        </p>

        {!username ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg"
          >
            Login to Continue
          </button>
        ) : (
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/create-room")}
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-5 py-3 rounded-xl transition shadow-lg"
            >
              Create Room
            </button>

            <button
              onClick={() => navigate("/rooms")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-xl transition shadow-lg"
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
