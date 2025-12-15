import React from "react";

export default function RoomsList({ rooms, onJoin }) {
  return (
    <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
      {rooms.length === 0 && (
        <p className="text-gray-300 text-center">
          No rooms available 😕
        </p>
      )}

      <div className="space-y-3">
        {rooms.map((room) => (
          <div
            key={room}
            className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10"
          >
            <span className="text-white font-medium">#{room}</span>

            <button
              onClick={() => onJoin(room)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg transition"
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
