import React from "react";

export default function RoomsList({ rooms, onJoin, onDelete, username }) {
  return (
    <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
      {rooms.length === 0 && (
        <p className="text-gray-300 text-center">No rooms available 😕</p>
      )}

      <div className="space-y-3">
        {rooms.map((room) => (
          <div
            key={room.name}
            className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10"
          >
            <span className="text-white font-medium">
              #{room.name}
              <span className="ml-2 text-xs text-gray-400">
                (by {room.owner})
              </span>
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => onJoin(room.name)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg"
              >
                Join
              </button>

              {room.owner === username && (
                <button
                  onClick={() => onDelete(room.name)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
