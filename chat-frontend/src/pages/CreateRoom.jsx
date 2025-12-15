import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoom({ socket }) {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createRoom = (e) => {
    e.preventDefault();
    setError("");

    if (!roomName.trim()) {
      setError("Room name is required");
      return;
    }

    socket.emit("create_room", roomName.trim(), (res) => {
      if (res.success) {
        // ✅ Go to rooms page (rooms will refresh correctly now)
        navigate("/rooms");
      } else {
        setError(res.error);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create a New Room 🚀
        </h2>

        {error && (
          <div className="text-red-300 bg-red-500/20 border border-red-400/30 rounded-lg p-2 mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={createRoom} className="space-y-5">
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name"
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl transition">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}
