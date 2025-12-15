import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoom({ socket }) {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createRoom = (e) => {
    e.preventDefault();
    setError("");

    socket.emit("create_room", roomName.trim(), (res) => {
      if (!res.success) {
        setError(res.error);
        return;
      }

      navigate("/rooms");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Room 🚀
        </h2>

        {error && <p className="text-red-300 mb-4">{error}</p>}

        <form onSubmit={createRoom} className="space-y-4">
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room name"
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white"
          />

          <button className="w-full bg-yellow-400 py-3 rounded-xl font-semibold">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
